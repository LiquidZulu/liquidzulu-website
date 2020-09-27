const ENV =  process.env.ENV;

module.exports = class File {

    constructor(ARGS){
        this.ENV = ARGS.ENV
        this.title = ARGS.title || 'Social | LiquidZulu.xyz';
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
        
            </head>
        
            <body data-instant-intensity="viewport-all">

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

                    ${this.ENV.body.footer}

                </div>
                <script src="/instant.page" type="module" integrity="sha384-by67kQnR+pyfy8yWP4kPO12fHKRLHZPfEsiSXR8u2IKcTdxD805MGUXBzVPnkLHw"></script>
                
            </body>
        
        </html>`
        return;
    }
}