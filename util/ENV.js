const dir  = __dirname
const desc = `On this website you will find documentation for my programs, my music and anything else I make. I am the owner of The First Church of Garfield and a moderator of r/LasagnaCat. I spend most of my free time programming (mostly Garfield based things and making music. When I'm not doing that I am completing a BSc in Physics and Mathematics, I plan to become a tenured physics professor one day.`
const keys = `Liquid,Zulu,LiquidZulu,liquidzulu,nodejs,node.js,node,heroku,njalla,soundcloud,sc,JavaScript,js,java script,Garfield,Garf,Garfield Comics,Bot,Garfield Comics Bot,garfield-comics,First,Church,of,Garfield,First Church of Garfield,Discord,Server,Nitro`
const pic  = `http://liquidzulu.xyz/pics/face.logo`

module.exports = class {
    constructor(ARGS){

        this.port = (() => {
            let port = process.env.PORT;
            if (port === null || port === undefined || port === "") {
                port = ARGS.argv.port;
                if (port === null || port === undefined || port === "") {
                    port = 8080;
                }
            }
            return port;
        })(),
        this.root = dir.substring(0, dir.length - 5), // "util/".length = 5
        this.head = {
            static: 
            `<!-- static -->

                <meta charset="utf-8" />

                <meta name="description" content="${desc}" />
                <meta name="keywords" content="${keys}" />
                <meta name="author" content="LiquidZulu" />
                <meta name="theme-color" content="#FFFFFF">

                <!-- Facebook Open Graph -->

                    <meta name="og:description" content="${desc}" />
                    <meta name="og:image" content="${pic}/png" />
                    <meta name="og:type" content="website" />
                    <meta name="og:site_name" content="liquidzulu.xyz" />

                <!-- Facebook Open Graph -->

                <!-- Twitter Card Tags -->
        
                    <meta name="twitter:card" content="summary_large_image">
                    <meta name="twitter:site" content="liquidzulu.xyz">
                    <meta name="twitter:creator" content="@LiquidZulu">
                    <meta name="twitter:description" content="${desc}">
                    <meta name="twitter:image" content="${pic}/png">

                <!-- Twitter Card Tags -->

                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="shortcut icon" type="image/png" href="${pic}/png"/>
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

            <!-- static -->`
        },

        this.body = {
            footer:
            `<footer class="footer">
                <div class="content has-text-centered">
                    <p>
                        <strong>liquidzulu.xyz</strong> is <a href='https://github.com/LiquidZulu/liquidzulu-website'>open source</a> and licensed under <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.<br/>
                        This website employs no trackers as far as I'm aware but they are very sneaky these days so if you find one embedded in one of the modules used then please <a href='./contact'>let me know</a>.<br/>
                        Frontend made with <a href='https://bulma.io'>Bulma CSS</a>, <a href='https://tympanus.net/Development/CreativeButtons/'>CreativeButtons</a>, <a href='https://tympanus.net/Development/CreativeLinkEffects/'>CreativeLinkEffects</a>, <a href='https://www.cssscript.com/demo/stylish-custom-scrollbar-pure-javascript-minibar/'>MiniBar</a> and <a href='http://wavesurfer-js.org/'>WaveSurfer</a>.<br/>
                        Backend has many npm dependencies and they can be seen <a href='https://github.com/LiquidZulu/liquidzulu-website/blob/master/package.json'>here</a>.
                    </p>
                </div>
            </footer>`
        }
    }
}