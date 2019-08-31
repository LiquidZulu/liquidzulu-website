module.exports = class File {

    constructor(ARGS){
        this.title = ARGS.title || 'Social | LiquidZulu.xyz';
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
        
            </head>
        
            <body>

                <div class='container' id='container'>

                    <section id='section-0' class='section'>

                        <a href='./'><img src='./pics/face.logo/svg'></a>
                        <h1>My Social Media</h1>
                        <h2>This page is where you can my other social media.</h2>

                    </section>

                    <section id='section-1' class='section color-1 spaced-text light-text'>

                        <h1>Discord</h1>
                        <h2>My most active discord is <nav class="cl-effect-9" id="cl-effect-9"><a href='https://discordapp.com/invite/yQC8Hqz'>The First Church of Garfield</a></nav>.</h2>

                    </section>

                    <section id='section-2' class='section color-2 spaced-text light-text'>

                        <h1>GitHub</h1>
                        <h2>My GitHub account is <nav class="cl-effect-9" id="cl-effect-9"><a href='https://github.com/LiquidZulu/'>LiquidZulu</a></nav>.</h2>

                    </section>

                    <section id='section-3' class='section color-3 spaced-text'>

                        <h1>SoundCloud</h1>
                        <h2>My SoundCloud account is <nav class="cl-effect-9" id="cl-effect-9"><a href='https://soundcloud.com/liquidzulu'>LiquidZulu</a></nav>.</h2>

                    </section>

                    <section id='section-4' class='section color-4 spaced-text light-text'>

                        <h1>Gab</h1>
                        <h2>My Gab.com account is <nav class="cl-effect-9" id="cl-effect-9"><a href='https://gab.com/LiquidZulu'>LiquidZulu</a></nav>.</h2>

                    </section>

                    <section id='section-5' class='section color-5 spaced-text light-text'>

                        <h1>Twitter</h1>
                        <h2>My Twitter account is <nav class="cl-effect-9" id="cl-effect-9"><a href='https://twitter.com/LiquidZulu'>LiquidZulu</a></nav>.</h2>

                    </section>

                    <section id='section-6' class='section color-6 spaced-text light-text'>

                        <h1>YouTube</h1>
                        <h2>My YouTube account is <nav class="cl-effect-9" id="cl-effect-9"><a href='https://www.youtube.com/channel/UCTf0py7ryuSldOsDm4abSsg'>LiquidZulu</a></nav>.</h2>

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