function setup_blog_handlers() {
  let blogs = document.querySelectorAll("section");

  for (let blog of blogs) {
    const blog_name = blog.getAttribute("blog-name");

    if (!blog_name) continue;

    blog.onclick = () => {
      window.location.href = `/blogs/${blog_name}`;
    }
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  setup_blog_handlers();
});
