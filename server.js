/**
 * @argv {String|Number}randy - A highly entropic seed for the randy, recommend button mashed string or true random.
 * @argv {Number}port         - The port to run the server on, defaults to 8080.
 * @argv {String}root         - The root directory of the server, set a default in ENV.
 * @argv {Number}randy-len    - the length that the final generated randy should be, defaults to 1024
 */

/**
 * @interface HTTPerr      - A Class that holds info on a HTTP error.
 * @interface Express      - A Function that allows for interacting with the Express module.
 * @interface cookieParser - A middleware for Express that allows for the use of cookies.
 * @interface md5          - A function to quickly calculate MD5 hashes, dont worry im not storing passwords with md5 just need a quick way to convert randy seed to a number.
 * @interface argv         - An object that holds formatted cli arguments through the use of yargs.
 * @interface app          - The current Express instance.
 */

const HTTPerr      = require('./err/error_response.js');
const Express      = require('express');
const cookieParser = require('cookie-parser');
const md5          = require('./md5');
const { argv }     = require('yargs')
const app          = Express();

const ENV = {
    port: argv.port || 8080,
    root: argv.root || "D:/_lz com/"
}

function make_randy (seed){

    let hash = md5(seed); // yes, md5 is fine here, not using it to store the passwords, just need to convert strings to numbers.
    let n    = 0;

    for(let c of hash){
        n += c.charCodeAt(0)
    }

    return (1 / ( 1 + (Math.E**(-n)) ) )
}


switch(typeof argv.randy){
    
    case 'string':
    case 'number':{
        {
            index(ENV);
        }
        break;
    }

    case 'undefined':{
        {
            throw new TypeError('no random specified, please use --randy SOME_BUTTON_MASHED_STRING_OR_TRUE_RANDOM');
        }
    }

    default:{
        {
            throw new TypeError('unknown data passed through --randy');
        }
    }
}


/**
 * server.js is the index file to parse all requests sent to the server.
 * See LEGAL/LICENSE.md for more info.
 * 
 * @param {Object}ENV - Enviroment variables
 */

async function index(ENV){


    /**
     * Returns the internal directory for a given request URI. Mapped with sitemap.json
     * 
     * @param   {String}d - the request URI
     * @returns {String}  - The internal directory as defined by sitemap.json
     */

    function getDir(d){

        const dir = require('./sitemap.json');
        const uri = d.split('/');
        uri.shift();

        let index = dir;
        let n = 0;

        try{

            for(i of uri){
                if(i.length > 0){
                    if(typeof index['/*'] == 'undefined'){
                        index = index[`/${i}`]
                    }
                    else{
                        return (() => {
                            let theuri = '';

                            for(let j=0; j<n; j++){
                                theuri += `/${uri[j]}`
                            }

                            for(let j=n; j<uri.length; j++){
                                theuri += `/${uri[j]}`
                            }

                            return {i: theuri, MIME: index['/*']['MIME']};
                        })()
                    }
                }
                n++;
            };
        }catch(e){
            return ({i: undefined, MIME: undefined});
        }

        return (index || 404);
    }


    /**
     * Returns either a {Promise<File>} class or plaintext for non formatted responses.
     * 
     * @param   {String}d                                        - the internal directory to get the file
     * @returns {Promise<File>|Promise<String>|Promise<HTTPerr>} - Either a {Promise<File>} in need of formatting, plaintext or {Promise<HTTPerr>}
     */

    async function getFile(d){

        switch (typeof d){

            case (typeof ''):{
                {
                    try{
                        return require(d);
                    }catch(e){
                        return fs.readFileSync(d, 'utf8')
                    }
                }
            } 
            
            case (typeof 0):{
                {
                    let page = new HTTPerr(d)
                    let toreturn = await page.genErrPage()
                    return toreturn
                }
            }

            case (typeof undefined):{
                {
                    let page = new HTTPerr(404)
                    let toreturn = await page.genErrPage()
                    return toreturn
                }
            }

            default:{
                {
                    let page = new HTTPerr('5xx')
                    let toreturn = await page.genErrPage()
                    return toreturn
                }
            }
        }
    }


    /**
     * Parses return from getFile() into a response.
     * 
     * @param   {File|String|HTTPerr}file - The {File|String|HTTPerr} returned by getFile()
     * @param   {Object}req               - req object from Express
     * @param   {Object}res               - res object from Express
     * @param   {Object}_DATA             - metadata to pass into {File} class
     * @returns {Promise<String>|String}  - Plaintext response, potentially promisified.
     */

    async function getResp(file, req, res, _DATA){
        try{
            let resp = new file({
                url: req.originalUrl,
                data: _DATA,
                req: req,
                res: res
            })
            await resp.load()
            return resp.html
        }catch(e){
            let resp = file
            return resp
        }
    }


    /**
     * Generates a uniformly distributed random number through the use of y = arccos(cos(x)) which with perfect mathematical implementation would not work as the values for y would increase as x -> Infinity but the computer to increase efficiency will only calculate the smallest possible value.
     * 
     * @param   {Number}low  - The lowest possible value you want to return
     * @param   {Number}high - The highest possible value you want to return
     * @param   {Number}seed - the seed with which you want to generate the numbers, if none is passed in pi is used
     * @returns {Number}     - the resulting number
     */

    function RandInt(low, high, seed){
        
        let n = seed || Math.PI;
        let k = (high-low)/Math.PI;
        n = Math.acos(Math.cos(n**3*1000 + Math.E))*k + low; // if you are working with small seeds ( -10 < seed < 10 ) then you may want to multiply n by some constant to make the numbers seem more random as they will be more spread out with small changes to the seed.
        n = Math.round(n);
        
        return n;
    }


    let randy = "";
    for(let i=0; i<(argv['randy-len'] || 1024); i++){
        randy += String.fromCharCode(RandInt(32, 65535*17, 1000*make_randy(argv['randy'])*Math.PI))
    }

    app.use(cookieParser(randy))
    if(argv['show-randy']){
        console.log(randy) // THIS IS FOR DEBUG ONLY, DONT EVER SHOW THIS IN DEPLOY
    }
    randy = undefined;

    const port = ENV.port;
    const fs = require('fs')

    app.get('/*', async (req, res) => {

        let splitReq = req.originalUrl.split('~//')
        let dir = getDir(splitReq[0])

        if(dir['MIME'] == 'text/html'){
            let file = await getFile(dir['i'])

            resp = await getResp(file, req, res, splitReq[1]);
            res.send(resp)
        }else{
            try{
                res.sendFile(dir['i'], {root: ENV.root})
            }catch(e){
                try{
                    let file = await getFile(dir['i'])
                    res.send(file)
                }catch(e){
                    res.send('Critical error')
                }
            }
        }
    });

    app.listen(port, () => console.log(`liquidzulu.xyz listening on port ${port}`));
}
