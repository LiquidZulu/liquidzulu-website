module.exports = class File {

    constructor(ARGS){
        this.title = ARGS.title || 'LiquidZulu.xyz';

    }

    async load() {
        this.html = `<!DOCTYPE html>
        <html>
        
            <head>
            
                <title>${this.title}</title>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="shortcut icon" type="image/png" href="./pics/face.logo/png"/>
                
                <link rel="stylesheet" type="text/css" href="./CreativeButtons/.css/default.css" />
                <link rel="stylesheet" type="text/css" href="./CreativeButtons/.css/component.css" />
                <script src="./CreativeButtons/.js/modernizr.custom.js"></script>

                <link rel="stylesheet" type="text/css" href="./CreativeLinkEffects/.css/component.css" />
                <link rel="stylesheet" type="text/css" href="./CreativeLinkEffects/.css/normalize.css" />
                <script src="./CreativeLinkEffects/.js/modernizr.custom.js"></script>
                
                <link rel="stylesheet" href="./minibar/.css">
                <script src="./minibar/.js"></script>
        
                <link rel="stylesheet" type="text/css" href="./css/css.main"/>
                <script defer src="./js/all"></script>

                <link href="./fontawesome/css/all.css" rel="stylesheet">
        
            </head>
        
            <body>

                <div class='container' id='container'>

                    <section id='section-0' class='section'>

                        <a href='./'><img src='./pics/face.logo/svg'></a>
                        <h1>LiquidZulu.xyz</h1>
                        <h2>On this website you will find documentation for my programs, my music and anything else I make</h2>

                    </section>

                    <section id='section-1' class='section color-1 spaced-text light-text'>

                        <h1>About me</h1>
                        <h2>I am the owner of <nav class="cl-effect-9" id="cl-effect-9"><a href='https://church.liquidzulu.xyz'>The First Church of Garfield</a></nav> and a moderator of <nav class="cl-effect-9" id="cl-effect-9"><a href='https://reddit.com/r/LasagnaCat'>r/LasagnaCat</a></nav>. I spend most of my free time programming (mostly Garfield based things and making music. When I'm not doing that I am completing a BSc in Physics and Mathematics, I plan to become a tenured physics professor one day.</h2>

                    </section>

                    <section id='section-2' class='section color-2 spaced-text light-text'>

                        <h1>Programs</h1>
                        <h2>Full documentation for <i>most</i> of my programs is listed <nav class="cl-effect-9" id="cl-effect-9"><a href='./programs'>here</a></nav>.</h2>

                    </section>

                    <section id='section-3' class='section color-3 spaced-text'>

                        <h1>Music</h1>
                        <h2>My music can be listened to and downloaded from <nav class="cl-effect-9" id="cl-effect-9"><a href='./music'>here</a></nav>.</h2>

                    </section>

                    <section id='section-4' class='section color-4 spaced-text light-text'>

                        <h1>Social Media</h1>
                        <h2>Links to my social media can be found <nav class="cl-effect-9" id="cl-effect-9"><a href='./social'>here</a></nav>.</h2>

                    </section>

                    <footer class="footer">
                        <div class="content has-text-centered">
                            <p>
                                <strong>liquidzulu.xyz</strong> is <a href='https://github.com/LiquidZulu/liquidzulu-website'>open source</a> and licensed under <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.<br/>
                                This website employs no trackers as far as I'm aware but they are very sneaky these days so if you find one embedded in one of the modules used then please <a href='./contact'>let me know</a>.<br/>
                                Frontend made with <a href='https://bulma.io'>Bulma CSS</a>, <a href='https://tympanus.net/Development/CreativeButtons/'>CreativeButtons</a>, <a href='https://tympanus.net/Development/CreativeLinkEffects/'>CreativeLinkEffects</a>, <a href='https://www.cssscript.com/demo/stylish-custom-scrollbar-pure-javascript-minibar/'>MiniBar</a> and <a href='http://wavesurfer-js.org/'>WaveSurfer</a>.<br/>
                                Backend has many npm dependencies and they can be seen <a href='https://github.com/LiquidZulu/liquidzulu-website/blob/master/package.json'>here</a>.
                            </p>
                        </div>
                    </footer>

                </div>
                
            </body>
        
        </html>`
        return;
    }
}