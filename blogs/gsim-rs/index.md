# Volumetric Simulation for G-code

![GSim-RS Demo, simulating an adaptive toolpath](https://github.com/navrajkalsi/gsim-rs/blob/blog/media/demo.gif?raw=true)

The first thing I would wonder looking at the demo is how the stock simulation runs in **realtime**,
without compromising on stock resolution and simulation frame rate.
That exactly is the most interesting part and here I will break down my implementation.


## Setting Up

Firstly, may I suggest taking a brief look at this high-level architecture diagram:
![An extremely high-level architecture diagram of GSim](https://github.com/navrajkalsi/gsim-rs/blob/blog/media/arch.svg?raw=true)

We will specifically focus on the following modules:
![Zoomed architecture view of Rendering & Geometry modules](https://github.com/navrajkalsi/gsim-rs/blob/blog/media/arch-simulation.svg?raw=true)

All the rest of the parts are related to *parsing* and *interpretation*, and can be inferred from the full diagram.

### Note
Common GPU optimizations are already applied and will not be discussed about, such as:
- Back-face culling
- Depth testing
- Instancing
- Vertex indexing


## Stock Representation

Originally, stock was implemented as a 3D grid of cube-shaped voxels.
Now, it is represented as a 2D grid of voxels with dynamic heights (**a heightfield**).
This simplification is valid because material is removed *top to down* in a vertical milling setup,
and reduces stock instance counts substantially. Therefore, the stock surface can be described by a
single Z height for every XY position.

Stock resolution is a single constant and determines the number of voxels on the longest edge of the
stock. Therefore for a cube-shaped stock, this approach cuts instance count by **1000 times** at a
resolution of 1000 (*default*).
This approach has its own [limitations](#limitations) though, which are covered at the end.

```rust
struct StockTracker {
    instances: Vec<StockInstance>,
    voxel_counts: (usize, usize), // along x and y
    total_count: usize,
    voxel_edge: f32,
    size: Size, // full stock size, from program config
}

struct StockInstance {
    center: [f32; 2], // center of voxel's bottom face
    height: f32,
}

struct Size {
    x: f32,
    y: f32,
    z: f32,
}
```

`StockInstance` is our "voxel" and the `StockTracker` serves as the interface for constructing and
manipulating stock and owns all the `StockInstance`s. Stock `size` comes from the program config.

Visual uses resolution of `100` for better visibility of voxels. Default is `1000`.

<div style="display: flex; flex-direction: row;">
    <div style="width: 50%; padding: 5px;">
        <img src="https://github.com/navrajkalsi/gsim-rs/blob/blog/media/3d_grid.gif?raw=true" alt="Multiple cube-shaped voxels
        representing a single XY cell in a 3D grid." />
        Multiple cube-shaped voxels represent a single XY cell in a 3D grid.
    </div>
    <div style="width: 50%; padding: 5px;">
        <img src="https://github.com/navrajkalsi/gsim-rs/blob/blog/media/2d_grid.gif?raw=true" alt="Single height-adjustable voxel
        represents a single XY cell in a 2D grid." />
        Single height-adjustable voxel (heightfield) represents a single XY cell in a 2D grid.
    </div>
</div>

### Face Visibility Control

If we arrange multiple of these **heightfields** on the XY plane, we get a cuboidal stock.
`StockTracker::new` does exactly this using a *stock size* and *RESOLUTION*, defined as a constant:

```rust
// number of instances to draw on the longer of X or Y axis.
const RESOLUTION: u32 = 1000;

fn new(size: Size) -> StockTracker {
    let longest = size.x.max(size.y);
    let edge = longest / RESOLUTION as f32; // x and y edge of each stockinstance

    let start = edge / 2.0; // x and y start

    let mut current_x = start;
    let mut current_y = start;

    // calculate final count for loop
    let count_x = (size.x / edge).ceil() as usize;
    let count_y = (size.y / edge).ceil() as usize;
    let total_count = count_x * count_y;

    // preallocate
    let mut instances = Vec::with_capacity(total_count);

    for x in 0..count_x {
        for y in 0..count_y {
            instances.push(StockInstance {
                center: [current_x, current_y],
                height: size.z,
            });

            current_y += edge;
        }
        current_y = start;
        current_x += edge;
    }

    StockTracker {
        instances,
        voxel_counts: (count_x, count_y),
        total_count,
        voxel_edge: edge,
        size,
        ...
    }
}
```

A line-only view of the polygons making up a stock of size **500x250x250**:

*Visual uses resolution of `10` for better visibility of heightfields. Default is `1000`.*

![Full stock made of a 2D grid of heightfields with all faces visible](https://github.com/navrajkalsi/gsim-rs/blob/blog/media/stock_all_faces.gif?raw=true)

Even with **back-face culling** that's a lot of wasted polygons.
This will only be amplified at the default resolution.
We see that most of the voxel faces are occluded by their neighbours and will not be visible to the user.

Although we do not pay all of this rasterization cost because of **depth testing**, but we still
pay all the cost for vertex drawing, only to have them hidden by other voxels. We need to only draw
faces whose neighbour is not visible.

To solve this, we need **independent face visibility control per voxel**,
by encoding the visible faces into the `StockInstance` so that the GPU shader can draw only the required faces.
Like so:

```diff
struct StockInstance {
    center: [f32; 2], // center of voxel's bottom face
    height: f32,
+   faces: u32, // visible faces
}
```

`faces` is a **bit mask** of face bits described here:
```rust
TOP: u32 = 1;
FRONT: u32 = 1 << 1;
RIGHT: u32 = 1 << 2;
BOTTOM: u32 = 1 << 3;
BACK: u32 = 1 << 4;
LEFT: u32 = 1 << 5;
```

Next, changing `StockTracker` constructor to only show the exposed faces:

```diff
fn new(size: Size) -> StockTracker {
    ...

    for x in 0..count_x {
        for y in 0..count_y {
+           let mut faces = TOP | BOTTOM; // always show top and bottom

+           if x == 0 { // first col, show left face
+               faces |= LEFT
+           }

+           if x == count_x - 1 { // last col, show right face
+               faces |= RIGHT
+           }

+           if y == 0 { // first row, show front face
+               faces |= FRONT
+           }

+           if y == count_y - 1 { // last row, show back face
+               faces |= BACK
+           }

            instances.push(StockInstance {
                center: [current_x, current_y],
                height: size.z,
+               faces,
            });

            current_y += edge;
        }
        current_y = start;
        current_x += edge;
    }

    StockTracker {
        instances,
        voxel_counts: (count_x, count_y),
        total_count,
        size,
        ...
    }
}
```

After this change:
- Every voxel has its `TOP` and `BOTTOM` face bits set.
- Boundary voxels have their outward-facing face bits set.
- Fully enclosed voxels have nothing but their `TOP` and `BOTTOM` face bits set.

After this optimization, only exposed faces are included in `faces` mask of an instance.
**Back-face culling** then further discards faces that are facing away from the user,
based on the simulation orientation.

Here is the *after* line-only view of the same stock of size **500x250x250**:

*Visual uses resolution of `10` for better visibility of heightfields. Default is `1000`.*

![Full stock made of a 2D grid of heightfields with only exposed faces visible](https://github.com/navrajkalsi/gsim-rs/blob/blog/media/stock_exposed_faces.gif?raw=true)


## Stock Cutting

Now we need to *remove* material based on current **tool position** from G-code execution.
We also need diameter of the active tool, which we get from the program config:

```rust
struct ToolConfig {
    diameter: f32,
    ...
}
```

This can be done by lowering the voxels whose center falls under the cross-section of the tool.
Instead of checking every voxel's distance from the tool, since our voxels are a regular 2D grid we
can use **indexing to narrow** the search region.
Like so:

```rust
impl StockTracker {
    fn cut(&mut self, tool: ToolConfig, tool_pos: Point) {
        if tool_pos.z >= self.size.z {
            return; // tool is not touching the stock
        }

        let rad = tool.diameter / 2.0;

        // square shaped dirty area coordinates
        let max_x = tool_pos.x + rad;
        let min_x = tool_pos.x - rad;
        let max_y = tool_pos.y + rad;
        let min_y = tool_pos.y - rad;

        if max_x < 0.0 || max_y < 0.0 || min_x > self.size.x || min_y > self.size.y {
            return; // tool is not touching the stock
        }

        let edge = self.voxel_edge;

        // dirty area indices
        let min_x_index = if min_x < 0.0 {
            0
        } else {
            (min_x / edge).floor() as usize
        };
        let min_y_index = if min_y < 0.0 {
            0
        } else {
            (min_y / edge).floor() as usize
        };

        let max_x_index = if max_x > self.size.x {
            self.voxel_counts.0 - 1 // counts are not 0 indexed
        } else {
            let ret = max_x / self.voxel_edge;
            let floored = ret.floor();
            if ret - floored > f32::EPSILON {
                floored as usize // beyond boundary, hide this cell
            } else {
                floored as usize - 1 // on the boundary, hide previous cell
            }
        };
        let max_y_index = if max_y > self.size.y {
            self.voxel_counts.1 - 1
        } else {
            let ret = max_y / self.voxel_edge;
            let floored = ret.floor();
            if ret - floored > f32::EPSILON {
                floored as usize // beyond boundary, hide this cell
            } else {
                floored as usize - 1 // on the boundary, hide previous cell
            }
        };

        // between tool center and voxel center in xy plane
        // consider a 2d voxel square, split the edge and its diagonal is the max
        // possible distance
        let max_dist = rad + (edge / 2.0) * SQRT_2;
        let count_y = self.voxel_counts.1;

        for x_index in min_x_index..=max_x_index {
            for y_index in min_y_index..=max_y_index {
                let index = count_y * x_index + y_index;

                let target = &mut self.instances[index];

                let dist = ((tool_pos.x - target.center[0]).powi(2)
                    + (tool_pos.y - target.center[1]).powi(2))
                .sqrt();

                if dist > max_dist || target.height <= tool_pos.z {
                    continue;
                }

                // target voxel is higher than the tool and will be shortened
                target.height = if tool_pos.z <= 0.0 {
                    0.0 // the voxel is hidden now
                } else {
                    tool_pos.z
                };
            }
        }
    }
}
```

The voxel height is now changed dynamically, based on tool diameter and position and we are
only examining **a fraction of the total grid**.

We are not done yet!
Check this simulation with a tool - stock pipeline is not set to render **filled polygons**:

![Stock cutting demo without restoring visible faces](https://github.com/navrajkalsi/gsim-rs/blob/blog/media/no_face_restoring.gif?raw=true)

`cut` just lowers the voxels that overlap with the tool, but
the [optimization of hiding inner faces](#face-visibility-control) needs to be undone now for the newly exposed voxel faces.

### Runtime Face Toggling

We need to make the newly exposed faces visible:

```rust
impl StockTracker {
    // returns a bitmask of the newly exposed faces, relative to the voxel at provided `index`
    fn show_neighbours(&mut self, index: usize, height: f32) -> u32 {
        assert!(index < self.total_count, "invalid index");

        let count_y = self.voxel_counts.1;

        let mut sides = 0; // voxels changed on the relative side of current voxel
        if index >= count_y {
            let left = &mut self.instances[index - count_y]; // voxel on left side
            if left.height > height && (left.faces & RIGHT == 0) {
                left.faces |= RIGHT;
                sides |= LEFT;
            }
        }

        if index < self.total_count - count_y {
            let right = &mut self.instances[index + count_y]; // voxel on right side
            if right.height > height && (right.faces & LEFT == 0) {
                right.faces |= LEFT;
                sides |= RIGHT;
            }
        }

        if !index.is_multiple_of(count_y) {
            let front = &mut self.instances[index - 1]; // voxel in the front
            if front.height > height && (front.faces & BACK == 0) {
                front.faces |= BACK;
                sides |= FRONT;
            }
        }

        if !(index + 1).is_multiple_of(count_y) {
            let back = &mut self.instances[index + 1]; // voxel in the back
            if back.height > height && (back.faces & FRONT == 0) {
                back.faces |= FRONT;
                sides |= BACK;
            }
        }

        sides // used later
    }
}
```

`show_neighbours` takes the index of the voxel whose height was changed in `cut` and its new `height`,
compares it with the heights of neighbouring voxels and sets `faces` bits in these voxels, making
the faces visible that will be exposed as a result of lowering the target voxel.
Returns a new bit mask of the direction of voxel instances that changed relative to the target
voxel - this will come in use later.

Plugging this into `cut`:

```diff
    fn cut(&mut self, tool: ToolConfig, tool_pos: Point) {
        ...

        for x_index in min_x_index..=max_x_index {
            for y_index in min_y_index..=max_y_index {
                let index = count_y * x_index + y_index;

                let target = &mut self.instances[index];

                let dist = ((tool_pos.x - target.center[0]).powi(2)
                    + (tool_pos.y - target.center[1]).powi(2))
                .sqrt();

                if dist > max_dist || target.height <= tool_pos.z {
                    continue;
                }

                // target voxel is higher than the tool and will be shortened
                target.height = if tool_pos.z <= 0.0 {
                    0.0 // the voxel is hidden now
                } else {
                    tool_pos.z
                };

+               // checks which neighbours have changed
+               let neighbours = self.show_neighbours(index, tool_pos.z);
            }
        }
    }
```

Here's the final version:

![Stock cutting demo with restoring visible faces](https://github.com/navrajkalsi/gsim-rs/blob/blog/media/with_face_restoring.gif?raw=true)

This works as expected.

### Updating GPU Buffer

`StockTracker::instances` now correctly reflects all voxels faces for each cut.
We have been uploading the whole `instances` vector to the GPU for each frame:

```rust
queue.write_buffer(
    &stock_instance_buffer, // GPU buffer
    0, // write start offset
    bytemuck::cast_slice(stock_tracker.instances),
);
```

For only a small updated section that's pretty wasteful.
On top of this, we are **rewriting the same instances** if the tool did not contact the stock.

Instead, we can track the range that actually changed and only upload that:

```diff
struct StockTracker {
    instances: Vec<StockInstance>,
    voxel_counts: (usize, usize),
    total_count: usize,
    voxel_edge: f32,
    size: Size,
+   start_index: usize, // index of the range to start uploading from
+   end_index: usize, // last index to upload
}

impl StockTracker {
    fn new(size: Size) -> StockTracker {
        ...

        StockTracker {
            instances,
            voxel_counts: (count_x, count_y),
            total_count,
            voxel_edge: edge,
            size,
+           start_index: 0,
+           end_index: total_count - 1,
        }
    }

-   fn cut(&mut self, tool: ToolConfig, tool_pos: Point) {
+   fn cut(&mut self, tool: ToolConfig, tool_pos: Point) -> bool {
        ...

        let max_dist = rad + (edge / 2.0) * SQRT_2;
        let count_y = self.voxel_counts.1;
+       let mut start_index = None;
+       let mut end_index = 0;

        for x_index in min_x_index..=max_x_index {
            for y_index in min_y_index..=max_y_index {
                let index = count_y * x_index + y_index;

                let target = &mut self.instances[index];

                let dist = ((tool_pos.x - target.center[0]).powi(2)
                    + (tool_pos.y - target.center[1]).powi(2))
                .sqrt();

                if dist > max_dist || target.height <= tool_pos.z {
                    continue;
                }

                target.height = if tool_pos.z <= 0.0 { 0.0 } else { tool_pos.z };

                let neighbours = self.show_neighbours(index, tool_pos.z);

+               if start_index.is_none() {
+                   start_index = if neighbours & LEFT != 0 {
+                       Some(index - count_y)
+                   } else if neighbours & FRONT != 0 {
+                       Some(index - 1)
+                   } else {
+                       Some(index)
+                   };
+               }

+               end_index = if neighbours & RIGHT != 0 {
+                   index + count_y
+               } else if neighbours & BACK != 0 {
+                   index + 1
+               } else {
+                   index
+               };
            }
        }

+       match start_index {
+           Some(start_index) => {
+               self.start_index = start_index;
+               self.end_index = end_index;
+               true
+           }
+           None => false, // no voxel changed
+       }
    }
}
```

As another optimization, we change `cut` signature. It now returns `false` if there was **no
change** in `instances`, so that we can **skip updating** the GPU buffer altogether.

Retrieving the slice that needs to be re-uploaded is then straightforward:

```rust
impl StockTracker {
    fn instances(&self) -> (usize, &[StockInstance]) {
        (self.start_index, &self.instances[self.start_index..=self.end_index])
    }
}
```

And used like so:

```diff
+   if stock_tracker.cut(tool, tool_pos) {
+      let (index, instances) = stock_tracker.instances();
+      let offset = index * size_of::<StockInstance>();

        queue.write_buffer(
            &stock_instance_buffer, // GPU buffer
-           0, // write start offset
+           offset as u64,
-           bytemuck::cast_slice(stock_tracker.instances),
+           bytemuck::cast_slice(instances),
        );
    }
```

Although this is my current implementation, I must say that this is not the most efficient way I can
think of to update the GPU buffer.
If a cut spans multiple `x` columns, *almost* every `y` value between the first and the last column
falls inside that range - even the ones the tool never came near.

The solution would be returning a slice of changed `y` values for each of the changed `x` columns from
`StockTracker::instances`, meaning: `&[&[StockInstance]]`.


## Limitations

- Using a 2D grid of voxel instances, only allows us to construct **cuboidal** stocks and cannot be
  used to simulate **undercuts** with a tool.
- Type of machine is limited to **vertical milling** machines.
- The range tracked for GPU updates is not a tight diff. See the explanation above.
- While checking for affected voxels in a cut, we mathematically check the distance between each
  voxel and tool center. A more efficient approach could be to create an **index mask** for each tool that
  contains the index of each changed voxel for given tool position.
- The per-voxel cut test uses a slightly larger effective radius. We get a small amount of
  over-inclusion for simplicity.
