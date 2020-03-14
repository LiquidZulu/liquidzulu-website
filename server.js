/**
 * @copyright LiquidZulu (c) 2019-present | This is only for documentation purposes, see legal/LICENSE.html for legal info.
 * @author    LiquidZulu
 * @license   CC-BY-NC-SA-4.0
 */

/**
 * @todo make css minifier recursively minify all files.
 * @todo finish adding music to music,js
 * @todo Add @argv to JSDoc
 * @todo work out why CSP is fucked, added error passing to getResp
 */

/**
 * @argv {String|Number}randy - A highly entropic seed for the randy, recommend button mashed string or true random.
 * @argv {Number}port         - The port to run the server on, defaults to 8080.
 * @argv {String}root         - The root directory of the server, set a default in ENV.
 * @argv {Number}randy-len    - the length that the final generated randy should be, defaults to 1024
 */

/**
 * https://remysharp.com/2014/05/23/where-is-that-console-log
 * @author remysharp
 */

['log', 'warn'].forEach(function(method) {
    var old = console[method];
    console[method] = function() {
      var stack = (new Error()).stack.split(/\n/);
      // Chrome includes a single "Error" line, FF doesn't.
      if (stack[0].indexOf('Error') === 0) {
        stack = stack.slice(1);
      }
      var args = [].slice.apply(arguments).concat([stack[1].trim()]);
      return old.apply(console, args);
    };
});

"use strict"

const ERR_NO_ERR          = 0
const ERR_COMIC_NOT_FOUND = 600

const MIME_UNDEFINED      = 0x00
const MIME_UNKNOWN        = 0x01
const MIME_XML            = 0x02
const MIME_GIF            = 0x03
const MIME_PNG            = 0x04
const MIME_JPEG           = 0x05

const MIME_MAPPER         = [undefined, 'err/UNKNOWN', 'application/XML', 'image/GIF', 'img/PNG', 'image/JPEG']

const CDN_UNDEFINED       = 0x00
const CDN_CLOUDFRONT      = 0x01
const CDN_GOCOMICS        = 0x02

/** 
 * @interface HTTPerr      - A Class that holds info on a HTTP error.
 * @constant  {HTTPerr} 
 * @author    LiquidZulu
 */
const HTTPerr = require('./err/error_response.js');

/** 
 * @interface Express      - A Function that allows for interacting with the Express module.
 * @constant  {Express} 
 */
const Express = require('express');

/** 
 * @interface cookieParser - A middleware for Express that allows for the use of cookies.
 * @constant  {cookieParser}
 */
const cookieParser = require('cookie-parser');

/** 
 * @interface md5          - A function to quickly calculate MD5 hashes, dont worry im not storing passwords with md5 just need a quick way to convert randy seed to a number.
 * @constant  {md5} 
 */
const md5 = require('./md5');

/** 
 * @interface argv         - An object that holds formatted cli (@argv) arguments through the use of yargs.
 * @constant  {argv} 
 */
const { argv } = require('yargs')

/** 
 * @interface app          - The current Express instance.
 * @constant  {app} 
 */
const app = Express();

/**
 * @constant {Object}
 */
const path = require('path');

/** 
 * @constant  {Object} 
 * @author    LiquidZulu
 */
const ENV = new (require('./util/ENV.js'))({argv: argv});
process.env.ENV = ENV;


/**
 * Generates a `randy` for a given seed.
 * 
 * @param   {String|Number}seed - The seed with which the randy is generated, should be crypto secure, user input recommended. 
 * @returns {String}            - The produced randy
 * @author  LiquidZulu
 */

function make_randy (seed){

    let hash = md5(seed); // yes, md5 is fine here, not using it to store the passwords, just need to convert strings to numbers.
    let n    = 0;

    for(let c of hash){
        n += c.charCodeAt(0)
    }

    return ( 1 / ( 1 + (Math.E**(-n)) ) )
}


/**
 * @author LiquidZulu
 */

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
 * @param  {Object}ENV - Enviroment variables
 * @author LiquidZulu
 */

async function index(ENV){


    /**
     * Returns the internal directory for a given request URI. Mapped with sitemap.json
     * 
     * @param   {String}d - the request URI
     * @returns {String}  - The internal directory as defined by sitemap.json
     * @author  LiquidZulu
     */

    function getDir(d){

        const dir = require('./sitemap.json');
        const uri = d.split('/');
        uri.shift();

        let index = dir;
        let n = 0;

        try{

            for(let i of uri){
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
     * @param   {String}d  - the internal directory to get the file
     * @returns {Object}   - Object containing either a {Promise<File>} in need of formatting, plaintext or {Promise<HTTPerr>} in prototype.file
     * @author  LiquidZulu
     */

    async function getFile(d){

        switch (typeof d){

            case (typeof ''):{
                {
                    try{
                        return { file:require(d) };
                    }catch(e){
                        return { file:fs.readFileSync(d, 'utf8') };
                    }
                }
            } 
            
            case (typeof 0):{
                {
                    let page = new HTTPerr(d)
                    let toreturn = await page.genErrPage()
                    return { file:toreturn, err:d }
                }
            }

            case (typeof undefined):{
                {
                    let page = new HTTPerr(404)
                    let toreturn = await page.genErrPage()
                    return { file:toreturn, err:404 }
                }
            }

            default:{
                {
                    let page = new HTTPerr('5xx')
                    let toreturn = await page.genErrPage()
                    return { file:toreturn, err:'5xx' }
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
     * @author  LiquidZulu
     */

    async function getResp(file, req, res, _DATA){
        
        try{
            let resp = new file.file({
                url: req.originalUrl,
                data: _DATA,
                req: req,
                res: res,
                ENV: ENV
            })
            await resp.load()
            return {resp:resp.html, err:file.err, MIME:resp.MIME||undefined}
        }catch(e){
            console.log(e)
            let resp = file.file
            return { resp:resp, err:file.err }
        }
    }


    /**
     * Generates a uniformly distributed random number through the use of y = arccos(cos(x)) which with perfect mathematical implementation would not work as the values for y would increase as x -> Infinity but the computer to increase efficiency will only calculate the smallest possible value.
     * 
     * @param   {Number}low  - The lowest possible value you want to return
     * @param   {Number}high - The highest possible value you want to return
     * @param   {Number}seed - the seed with which you want to generate the numbers, if none is passed in pi is used
     * @returns {Number}     - the resulting number
     * @author  LiquidZulu
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

    app.get('/GDN/*', async (req, res) => {

        try{
            let GDNloc = req.originalUrl.search('/GDN/');
            let date = req.originalUrl.substring(GDNloc+5, GDNloc+15).split('-')
    
            let resp = (await getResp({file: require('./GDN/deliver.js')}, req, res, date))
            res.MIME = MIME_MAPPER[resp.MIME]
            res.set('Content-Type', MIME_MAPPER[resp.MIME])
            res.send(resp.resp)
        }catch(e){
            console.error(e)
        }

    })

    app.get('/*', async (req, res) => {

        let splitReq = req.originalUrl.split('~//')
        let dir = getDir(splitReq[0])

        if(dir['MIME'] == 'text/html'){
            res.send((await getResp(await getFile(dir['i']), req, res, splitReq[1])).resp)
        }else{
            try{
                res.sendFile(dir['i'], {root: ENV.root, headers: {'Content-Security-Policy': `default-src 'self'; script-src 'self'`}})
            }catch(e){
                try{
                    res.send((await getFile(dir['i'])).file)
                }catch(e){
                    res.send('Critical error')
                }
            }
        }
    });

    app.listen(port, () => console.log(`liquidzulu.xyz listening on port ${port}`));
}
