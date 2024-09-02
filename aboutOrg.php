<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="theme-color" content="#000000">
    <title>About Me</title>
    <link rel="stylesheet" href="Resources/Styles/fonts.css">
    <link rel="stylesheet" href="Resources/Styles/about.css">
    <link rel="shortcut icon" href="Resources/Icons/animoji.ico">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
</head>

<div id="loader" fetchpriority="veryhigh"><img src="/Resources/Images/loader.gif" fetchpriority="veryhigh"></div>

<body>
    <nav id="navigation">
        <div id="left">
            <a href="series.html">TV Shows</a>
        </div>
        <header id="center">
            <a href="index.html"><span id="head">NavThinks</span></a>
        </header>
        <div id="right">
            <a href="movies.html">Movies</a>
        </div>
    </nav>

    <div id="first">
        <div id="opening">
            <h2>Here is a timeline I made of myself :)</h2><br>This page also contains some Python code & MySQL Database
            done by me along with the code of this website.<br>Also, a certificate of an online course I completed.
        </div>
    </div>

    <p id="spacer" style="height: 0;"></p>

    <div id="timeline">
        <ul id="timeline_container">
            <li class="left">
                <div class="content">
                    <section>
                        <span>29 December</span>
                        <h2>2004</h2>
                    </section>
                    <div>My Birth in
                        <a target="_blank" href="https://g.co/kgs/oEA4Asp">Faridkot,
                            Punjab</a><img src="Resources/Icons/link.svg" alt="">
                    </div>
                </div>
            </li>
            <li class="right">
                <div class="content">
                    <h2>2015</h2>
                    <div>Study was going on perfectly fine. Grades were good. But then, I was given a tablet, everything
                        went
                        downhill from there. Grades were not good.</div>
                </div>
            </li>
            <li class="left">
                <div class="content">
                    <h2>2020</h2>
                    <div>Covid hit. I spent most of my time on my phone, watching Netflix. I was in Grade 10 at the time
                        and always wanted to score great in that grade. But when the time came I just kept wasting my
                        time on the phone.<br>An important thing happened this year, I was introduced to
                        CHRISTOPHER NOLAN and realized what movies really were, the main reason behind
                        it being TENET, which released this year.
                    </div>
                </div>
            </li>
            <li class="right">
                <div class="content">
                    <section>
                        <h2>2020</h2>
                        <span>7 September</span>
                    </section>
                    <div>I was hit by the realization that now is the time that I should prove myself and got back to
                        studing the same day and then, perhaps, never stopped.</div>
                </div>
            </li>
            <li class="left">
                <div class="content">
                    <h2>2021</h2>
                    <div style="padding-bottom: 5%;">Got 93.5% in Grade 10. Decided to do Non-Medical. Really struggled
                        in the beginning.</div>
                    <span style="padding: 5% 0;"><a target="_blank" href="Resources/Images/class10.jpg">My Grade 10
                            Result.</a><img src="Resources/Icons/link.svg" alt=""></span>
                </div>
            </li>
            <li class="right">
                <div class="content">
                    <h2>2023</h2>
                    <div>Completed Grade 12, got 94.4%. Then decided to come to Canada. My love for movies really
                        escalated this year as I saw many releases in a theater, especially OPPENHEIMER.</div>
                    <span style="padding: 5% 0;"><a target="_blank" href="Resources/Images/class12.jpg">My Grade 12
                            Result.</a><img src="Resources/Icons/link.svg" alt=""></span>
                </div>
            </li>
            <li class="left">
                <div class="content">
                    <h2>2024</h2>
                    <div>Currently in Canada, studying Computer Programming at Sheridan College. Suddenly one day, I
                        felt like I should create and publish my own website and here I am writing code for the
                        same:)<br>Thanks!</div>
                </div>
            </li>
        </ul>
    </div>
    <div id="end_list"></div>
    <div id="let_see">IDK</div>

    <div id="code_intro">Following are the examples of code written by me in various languages:</div>

    <div class="card">
        <div id="python">
            <span>Python</span>
        </div>
        <div id="sql">
            <span>MySQL</span>
        </div>
        <div id="site">
            <span>Website</span>
        </div>
    </div>

    <div id="python_code" class="code">
        <div class="code_header">
            <div class="code_title">Python Code</div>
            <div class="close_code">&times;</div>
        </div>
        <div class="code_body">
            <!-- Source: https://stackoverflow.com/questions/28389073/generate-multiple-divs-within-php-code -->
            <?php
            $dir = 'Resources/python/*';
            foreach (glob($dir) as $file) {
            ?>
                <div>
                    <span>
                        <?php echo substr($file, 17, -3) ?>
                    </span>
                    <a></a>
                </div>
            <?php
            }
            ?>
        </div>
    </div>

    <div id="sql_code" class="code">
        <div class="code_header">
            <div class="code_title">SQL Code</div>
            <div class="close_code">&times;</div>
        </div>
        <div class="code_body">
            <!-- Source: https://stackoverflow.com/questions/28389073/generate-multiple-divs-within-php-code -->
            <?php
            $dir = 'Resources/sql/*';
            foreach (glob($dir) as $file) {
            ?>
                <div>
                    <span>
                        <?php echo substr($file, 14, -4) ?>
                    </span>
                    <a></a>
                </div>
            <?php
            }
            ?>
        </div>
    </div>

    <div id="site_code" class="code">
        <div class="code_header">
            <div class="code_title">Site Code</div>
            <div class="close_code">&times;</div>
        </div>
        <div class="code_body" style="display: block;">
            <div id="site_card">
                <div id="html">
                    <span>HTML</span>
                </div>
                <div id="css">
                    <span>CSS</span>
                </div>
                <div id="js">
                    <span>JavaScript</span>
                </div>
            </div>
        </div>
    </div>

    <div id="code_file" class="code">
        <div class="code_header">
            <div class="code_title"></div>
            <div class="close_code">&times;</div>
        </div>
        <div class="code_body">
            <pre></pre>
        </div>
    </div>

    <div id="html_code" class="code">
        <div class="code_header">
            <div class="code_title">HTML Code</div>
            <div class="close_code">&times;</div>
        </div>
        <div class="code_body">
            <!-- Source: https://stackoverflow.com/questions/28389073/generate-multiple-divs-within-php-code -->
            <?php
            $dir = '*.html';
            foreach (glob($dir) as $file) {
            ?>
                <div>
                    <span>
                        <?php echo substr($file, 0, -5) ?>
                    </span>
                    <a></a>
                </div>
            <?php
            }
            ?>
        </div>
    </div>

    <div id="css_code" class="code">
        <div class="code_header">
            <div class="code_title">CSS Code</div>
            <div class="close_code">&times;</div>
        </div>
        <div class="code_body">
            <!-- Source: https://stackoverflow.com/questions/28389073/generate-multiple-divs-within-php-code -->
            <?php
            $dir = 'Resources/Styles/*';
            foreach (glob($dir) as $file) {
            ?>
                <div>
                    <span>
                        <?php echo substr($file, 17, -4) ?>
                    </span>
                    <a></a>
                </div>
            <?php
            }
            ?>
        </div>
    </div>

    <div id="js_code" class="code">
        <div class="code_header">
            <div class="code_title">JavaScript Code</div>
            <div class="close_code">&times;</div>
        </div>
        <div class="code_body">
            <!-- Source: https://stackoverflow.com/questions/28389073/generate-multiple-divs-within-php-code -->
            <?php
            $dir = 'Resources/Scripts/*';
            foreach (glob($dir) as $file) {
            ?>
                <div>
                    <span>
                        <?php echo substr($file, 18, -3) ?>
                    </span>
                    <a></a>
                </div>
            <?php
            }
            ?>
        </div>
    </div>

    <div id="site_file" class="code">
        <div class="code_header">
            <div class="code_title"></div>
            <div class="close_code">&times;</div>
        </div>
        <div class="code_body">
            <pre></pre>
        </div>
    </div>

    <div id="resume" class="code">
        <div class="code_header">
            <div class="code_title">Resume</div>
            <div class="close_code">&times;</div>
        </div>
        <div class="code_body">
            <object data="/Resources/Resume.pdf">
                <img src="/Resources/resume1.jpg" alt="Image 1 of my Resume">
                <img src="/Resources/resume2.jpg" alt="Image 2 of my Resume">
                <span>This broswer does not support PDF embedding, please click on the download icon to download the document in PDF form.</span>
            </object>
            <span><a href="./Resources/Resume.pdf" download="Navraj Kalsi's Resume"><img src="./Resources/Icons/download.png"></a></span>
        </div>
    </div>

    <div id="resume_button">My Resume&nbsp;
        <div><img src="Resources/Icons/menu_1.png" alt=""></div>
    </div>

    <div id="certificate" class="code">
        <div class="code_header">
            <div class="code_title">Meta Database Engineer</div>
            <div class="close_code">&times;</div>
        </div>
        <div class="code_body">
            <object data="/Resources/meta_database.pdf">
                <img src="/Resources/meta_database.jpg" alt="Image of my Meta Database Engineer Course Certification">
                <span>This broswer does not support PDF embedding, please click on the download icon to download the document in PDF form.</span>
            </object>
            <span><a href="./Resources/meta_database.pdf" download="Navraj Kalsi's Meta Database Engineer Certificate"><img src="./Resources/Icons/download.png"></a></span>
        </div>
    </div>

    <div id="certificate_button">Meta Database Engineer Course Certificate&nbsp;
        <div><img src="Resources/Icons/menu_1.png" alt=""></div>
    </div>

    <div id="models" class="code">
        <div class="code_header">
            <div class="code_title">3D Models</div>
            <div class="close_code">&times;</div>
        </div>
        <div class="code_body">
            <div class="model">
                <model-viewer src="/Resources/Models/Block.glb" camera-controls ar ios-src="/Resources/Models/Block.usdz"></model-viewer>
            </div>
            <div class="model">
                <model-viewer src="/Resources/Models/Template.glb" camera-controls ar ios-src="/Resources/Models/Template.usdz"></model-viewer>
            </div>
            <div class="model">
                <model-viewer src="/Resources/Models/Part.glb" camera-controls ar ios-src="/Resources/Models/Part.usdz"></model-viewer>
            </div>
        </div>
    </div>

    <div id="models_button">3D Models I Created&nbsp;
        <div><img src="Resources/Icons/menu_1.png" alt=""></div>
    </div>

    <div id="overlay"></div>

    <button data-learnt-target="#learnt" id="learning" type="button">What I learned while building this page.&nbsp;
        <div><img src="Resources/Icons/menu_1.png" alt=""></div>
    </button>

    <div id="learnt">
        <div id="learnt_header">
            <div id="learnt_title">What I learned.</div>
            <button data-close-button id="learnt_close" type="button">&times;</button>
        </div>
        <div id="learnt_body">Last page I made for this website.<br>Learnt <strong>a lot</strong> from this excursion.<br>This page took a lot of time as for it to be possible I had to delve into backend.<br>Had to learn some PHP to access and display code examples.<br><br>Thanks for visiting :)</div>
    </div>


    <nav id="socials">My Socials:<div id="socials_list">
            <div class="app"><a href="https://twitter.com/navrajkalsi" target="_blank"><img src="Resources/Icons/twitter.png" alt="twitter/x logo"></a></div>
            <div class="app"><a href="https://reddit.com/u/NavrajKalsi" target="_blank"><img src="Resources/Icons/reddit.png" alt="reddit logo"></a></div>
            <div class="app"><a href="https://linkedin.com/in/navrajsinghkalsi" target="_blank"><img src="Resources/Icons/linkedin.png" alt="linkedin logo"></a></div>
            <div class="app"><a href="https://github.com/navrajkalsi" target="_blank"><img src="Resources/Icons/github.png" alt="gihub logo"></a></div>
        </div>
    </nav>

    <footer>
        Copyright&copy; 2024 Navraj Singh Kalsi
    </footer>

    <script src="Resources/Scripts/about.js"></script>
    <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"></script>
</body>

</html>