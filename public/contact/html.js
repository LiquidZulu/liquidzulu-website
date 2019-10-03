const ENV =  process.env.ENV

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
        
            <body>

                <div class='container' id='container'>

                    <section id='section-0' class='section'>

                        <a href='./'><img src='./pics/face.logo/svg'></a>
                        <h1>Contact Form (not yet working</h1>
                        <h2>THIS FORM DOESNT WORK YET, PLEASE EMAIL OR DM ONE OF MY SOCIALS. This page is where you can send anonymous messages to me using the form below. If you want to email me send an email to <a href='mailto:liquidzulu@liquidzulu.xyz'>liquidzulu@liquidzulu.xyz</a> or you can see my social media <a href='../social'>here</a></h2>

                    </section>

                    <section id='section-1' class='section color-1 spaced-text light-text'>

                        <div class='container half-width'>

                            <div class="field">
                                <label class="label">Name</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Optional name for me to identify you">
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Subject</label>
                                <div class="control">
                                    <div class="Category">
                                        <select>
                                            <option>Feedback</option>
                                            <option>Help</option>
                                            <option>Request</option>
                                            <option>Security enquiry</option>
                                            <option>Privacy enquiry</option>
                                            <option>Tracking enquiry</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Message</label>
                                <div class="control">
                                    <textarea class="textarea" placeholder="Mandatory message"></textarea>
                                </div>
                            </div>

                            <div class="field is-grouped">
                                <div class="control">
                                    <button class="button is-link">Submit</button>
                                </div>
                                <div class="control">
                                    <button class="button is-text">Cancel</button>
                                </div>
                            </div>

                        </div>


                    </section>

                    ${this.ENV.body.footer}

                </div>
                
            </body>
        
        </html>`
        return;
    }
}