module.exports = class File {

    constructor(ARGS){
        this.ENV = ARGS.ENV
        this.title = ARGS.title || 'Music | LiquidZulu.xyz';
    }

    async load() {
        this.html = `<!DOCTYPE html>
        <html>
        
            <head>
                
                <!-- dynamic -->

                    <title>${this.title}</title>
                    <meta name="og:title" content="${this.title}" />
                    <meta name="twitter:title" content="${this.title}">

                <!-- dynamic -->
                
                ${this.ENV.head.static}

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
                        <h1>My Music WIP (CURRENTLY BROKEN</h1>
                        <h2>This page is where you can listen to the music I make, also availible <a href='https://soundcloud.com/liquidzulu'>on SoundCloud</a>.</h2>

                    </section>

                    ${this.ENV.body.footer}

                </div>
                
            </body>
        
        </html>`
        return;
    }
}