const ENV =  process.env.ENV;

module.exports = class File {

    constructor(ARGS){
        this.ENV = ARGS.ENV
        this.title = ARGS.title || 'LiquidZulu.xyz | Donate';
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
        
            <body>

                <div class='container' id='container'>

                    <section id='section-0' class='section'>

                        <a href='../'><img src='../pics/face.logo/svg'></a>
                        <h1>Donate</h1>
                        <h2>Gotta find some way to monetise, right?</h2>

                    </section>

                    <section id='section-1' class='section color-1 spaced-text light-text'>

                        <h1>Cryptocurrency Wallets</h1>
                        <h2>A list of some of my crypto wallet addresses is <nav class="cl-effect-9" id="cl-effect-9"><a href='/donate/crypto'>here</a></nav> and if you want to automate it a JSON version is <nav class="cl-effect-9" id="cl-effect-9"><a href='/donate/crypto/json'>here</a></nav>.</h2>

                    </section>

                    <section id='section-2' class='section color-2 spaced-text light-text'>

                        <h1>Patreon et al</h1>
                        <h2>I have <nav class="cl-effect-9" id="cl-effect-9"><a href='https://www.patreon.com/liquidzulu'>Patreon</a></nav> and <nav class="cl-effect-9" id="cl-effect-9"><a href='https://www.subscribestar.com/liquidzulu'>Subscribe Star</a></nav></h2>

                    </section>

                    ${this.ENV.body.footer}

                </div>
                
            </body>
        
        </html>`
        return;
    }
}