module.exports = class File {

    constructor(ARGS){
        this.title = ARGS.title || 'Music | LiquidZulu.xyz';
    }

    async load() {
        this.html = `<!DOCTYPE html>
        <html>
        
            <head>
            
                <title>${this.title}</title>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="shortcut icon" type="image/png" href="./pics/face.logo/png"/>
                <meta http-equiv="Content-Security-Policy" content="
                    default-src 'self' 'unsafe-inline'; 
                    script-src  'self' 'unsafe-inline'; 
                    img-src     'self' data:; 
                    font-src    'self' data:;"
                />
                
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

                <script>
                    document.lz_song = {};
                    
                    function wavesurferLoaded(){
                        document.dispatchEvent(
                            new CustomEvent(
                                "WAVESURFER_READY", 
                                {
                                    detail: {
                                        time: new Date()
                                    },
                                    bubbles: true,
                                    cancelable: true
                                }
                            )
                        )
                    }

                    function colorLoaded(){
                        document.dispatchEvent(
                            new CustomEvent(
                                "COLOR_READY", 
                                {
                                    detail: {
                                        time: new Date()
                                    },
                                    bubbles: true,
                                    cancelable: true
                                }
                            )
                        )
                    }
                </script>

                <script async src="./wavesurfer/min.js" onload='wavesurferLoaded()' type="module"></script>
                <script async src="./js/music"></script>
                <script async src="./js/color" onload='colorLoaded()'></script>
        
            </head>
        
            <body>

                <div class='container' id='container'>

                    <section id='section-0' class='section'>

                        <a href='./'><img src='./pics/face.logo/svg'></a>
                        <h1>My Music</h1>
                        <h2>This page is where you can listen to the music I make, also availible <a href='https://soundcloud.com/liquidzulu'>on SoundCloud</a>.</h2>

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