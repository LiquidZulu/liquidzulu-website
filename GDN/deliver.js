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
const CDN_IIMAGES         = 0x02
const CDN_GOCOMICS        = 0x03
const CDN_FINISH          = 0xff

module.exports = class File {

    constructor(ARGS){
        
        this.ARGS = ARGS;
        this.date = ARGS.data || undefined;
        this.comic = {
            err:  ERR_NO_ERR,
            MIME: MIME_UNDEFINED,
            CDN:  CDN_UNDEFINED,
            res:  {}
        };
    }

    async load() {
        this.comic.res = await this.getComic(CDN_CLOUDFRONT);
        console.log('Working')
        this.html = this.comic.res.body
        console.log('Working')
        this.MIME = this.comic.MIME
        console.log('Working')
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
                                    return this.getComic(CDN_IIMAGES);
                                }
                                break;
                            }
                
                            case 'image/gif':{
                                {
                                    this.comic.MIME  = MIME_GIF
                                    this.comic.CDN   = CDN_CLOUDFRONT
                                    //console.log(typeof cloudfront)
                                    this.comic.return = cloudfront
                                    this.getComic(CDN_FINISH)
                                }
                                break;
                            }
                
                            case 'image/png':{
                                {
                                    this.comic.MIME = MIME_PNG
                                    this.comic.CDN  = CDN_CLOUDFRONT
                                    this.comic.res  = cloudfront
                                    this.getComic(CDN_FINISH)
                                }
                                break;
                            }
                
                            default:{
                                {
                                    return this.getComic(CDN_IIMAGES);
                                }
                            }
                        }
                    }catch(e){
                        this.getComic(CDN_IIMAGES)
                    }
                    
                }
                break;
            }

            case CDN_IIMAGES:{
                {
                    try{
                        let iimages = await got(
                            `http://strips.garfield.com/iimages1200/${this.date[0]}/ga${this.date[0][2]}${this.date[0][3]}${this.date[1]}${this.date[3]}.gif`
                        )
                
                        switch(iimages.headers['content-type']){
                
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
                                    this.comic.CDN  = CDN_IIMAGES
                                    this.comic.res  = iimages
                                    this.getComic(CDN_FINISH)
                                }
                                break;
                            }
                
                            case 'image/png':{
                                {
                                    this.comic.MIME = MIME_PNG
                                    this.comic.CDN  = CDN_IIMAGES
                                    this.comic.res  = iimages
                                    this.getComic(CDN_FINISH)
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
                                this.getComic(CDN_FINISH)
                            }
                            break;
                        }
            
                        case 'image/png':{
                            {
                                this.comic.MIME = MIME_PNG
                                this.comic.CDN  = CDN_GOCOMICS
                                this.comic.res  = amuniversal
                                this.getComic(CDN_FINISH)
                            }
                            break;
                        }

                        case 'image/jpeg':{
                            {
                                this.comic.MIME = MIME_JPEG
                                this.comic.CDN  = CDN_GOCOMICS
                                this.comic.res  = amuniversal
                                this.getComic(CDN_FINISH)
                            }
                            break;
                        }
                    }
                }
                break;
            }

            case CDN_FINISH:{
                {
                    console.log('Working')
                    console.log(this.comic.return)
                    return this.comic.return
                }
            }
        }

        return new Promise((resolve, reject) => {
            reject(this.comic.res)
        });
    }
}