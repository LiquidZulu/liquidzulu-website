const got = require('got');


const ERR_NO_ERR          = 000
const ERR_COMIC_NOT_FOUND = 600

const MIME_UNDEFINED      = 0x00
const MIME_UNKNOWN        = 0x01
const MIME_XML            = 0x02
const MIME_GIF            = 0x03
const MIME_PNG            = 0x04
const MIME_JPEG           = 0x04

const CDN_UNDEFINED       = 0x00
const CDN_CLOUDFRONT      = 0x01
const CDN_GOCOMICS        = 0x02

module.exports = class File {

    constructor(ARGS){
        
        this.ARGS = ARGS;
        this.date = ARGS.data || undefined;
        this.comic = {
            err:  ERR_NO_ERR,
            MIME: MIME_UNDEFINED,
            CDN:  CDN_UNDEFINED
        };
    }

    async load() {
        this.comic.res = await this.getComic(CDN_CLOUDFRONT); // this doesnt wait
        this.html = this.comic.res.body
        this.MIME = this.comic.MIME
        return;
    } 

    async getComic(n) {

        switch(n){

            case CDN_CLOUDFRONT:{
                {
                    try{
                        let cloudfront = await got(
                            `https://d1ejxu6vysztl5.cloudfront.net/comics/garfield/${this.date[0]}/${this.date[0]}-${this.date[1]}-${this.date[2]}.gif`
                        )
                
                        switch(cloudfront.headers['content-type']){
                
                            case 'application/xml':
                            case 'text/xml':{
                                {
                                    this.comic.MIME = MIME_XML
                                    return this.getComic(CDN_GOCOMICS);
                                }
                                break;
                            }
                
                            case 'image/gif':{
                                {
                                    this.comic.MIME = MIME_GIF
                                    this.comic.CDN  = CDN_CLOUDFRONT
                                    this.comic.res  = cloudfront
                                    return new Promise(resolve => {
                                        resolve(this.comic.res)
                                    });
                                }
                                break;
                            }
                
                            case 'image/png':{
                                {
                                    this.comic.MIME = MIME_PNG
                                    this.comic.CDN  = CDN_CLOUDFRONT
                                    this.comic.res  = cloudfront
                                    return new Promise(resolve => {
                                        resolve(this.comic.res)
                                    });
                                }
                                break;
                            }
                
                            default:{
                                {
                                    return this.getComic(CDN_GOCOMICS);
                                }
                            }
                        }
                    }catch(e){
                        this.getComic(CDN_GOCOMICS)
                    }
                    
                }
                break;
            }

            case CDN_GOCOMICS:{
                {
                    let gocomics = await got(
                        `https://www.gocomics.com/garfield/${this.date[0]}/${this.date[1]}/${this.date[2]}`
                    );

                    let i = gocomics.body.search('<meta property="og:image" content="') + 35;
                    let url = gocomics.body.substring(i, i+63);

                    let amuniversal = await got(
                        url
                    )
            
                    switch(amuniversal.headers['content-type']){
            
                        case 'image/gif':{
                            {
                                this.comic.MIME = MIME_GIF
                                this.comic.CDN  = CDN_GOCOMICS
                                this.comic.res  = amuniversal
                                return new Promise(resolve => {
                                    resolve(this.comic.res)
                                });
                            }
                            break;
                        }
            
                        case 'image/png':{
                            {
                                this.comic.MIME = MIME_PNG
                                this.comic.CDN  = CDN_GOCOMICS
                                this.comic.res  = amuniversal
                                return new Promise(resolve => {
                                    resolve(this.comic.res)
                                });
                            }
                            break;
                        }

                        case 'image/jpeg':{
                            {
                                this.comic.MIME = MIME_JPEG
                                this.comic.CDN  = CDN_GOCOMICS
                                this.comic.res  = amuniversal
                                return new Promise(resolve => {
                                    resolve(this.comic.res)
                                });
                            }
                            break;
                        }
                    }
                }
                break;
            }
        }

        return new Promise((resolve, reject) => {
            reject(this.comic.res)
        });
    }
}