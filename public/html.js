const ENV =  process.env.ENV;

module.exports = class File {

    constructor(ARGS){
        this.ENV = ARGS.ENV
        this.title = ARGS.title || 'LiquidZulu.xyz';
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
                        <h1>LiquidZulu.xyz</h1>
                        <h2>On this website you will find documentation for my programs, my music and anything else I make</h2>

                    </section>

                    <section id='section-1' class='section color-1 spaced-text light-text'>

                        <h1>About me</h1>
                        <h2>I am the owner of <nav class="cl-effect-9" id="cl-effect-9"><a href='https://discordapp.com/invite/yQC8Hqz'>The First Church of Garfield</a></nav> and a moderator of <nav class="cl-effect-9" id="cl-effect-9"><a href='https://reddit.com/r/LasagnaCat'>r/LasagnaCat</a></nav>. I spend most of my free time programming (mostly Garfield based things and making music. When I'm not doing that I am completing a BSc in Physics and Mathematics, I plan to become a tenured physics professor one day.</h2>

                    </section>

                    <section id='section-2' class='section color-2 spaced-text light-text'>

                        <h1>Programs</h1>
                        <h2>Full documentation for <i>most</i> of my programs is listed <nav class="cl-effect-9" id="cl-effect-9"><a href='https://github.com/liquidzulu'>here</a></nav>.</h2>

                    </section>

                    <section id='section-3' class='section color-3 spaced-text'>

                        <h1>Music</h1>
                        <h2>My music can be listened to and downloaded from <nav class="cl-effect-9" id="cl-effect-9"><a href='./music'>here</a></nav>.</h2>

                    </section>

                    <section id='section-4' class='section color-4 spaced-text light-text'>

                        <h1>Social Media</h1>
                        <h2>Links to my social media can be found <nav class="cl-effect-9" id="cl-effect-9"><a href='./social'>here</a></nav>.</h2>

                    </section>

                    <section id='section-5' class='section color-5 spaced-text light-text'>

                        <h1>Donate</h1>
                        <h2>If you want to give me money do that <nav class="cl-effect-9" id="cl-effect-9"><a href='./donate'>here</a></nav>.</h2>

                    </section>

                    ${this.ENV.body.footer}

                </div>
                <script src="/instant.page" type="module" integrity="sha384-by67kQnR+pyfy8yWP4kPO12fHKRLHZPfEsiSXR8u2IKcTdxD805MGUXBzVPnkLHw"></script>
                
            </body>
        
        </html>`
        return;
    }
}