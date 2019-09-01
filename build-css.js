// "node-sass --omit-source-map-url sass/mystyles.scss css/main.css"
const sass     = require('node-sass');
const csso     = require('csso');
const fs       = require('fs');
const { argv } = require('yargs');

const cssLoc  = argv.css  || './public/css/main.min.css'
const scssLoc = argv.scss || './sass/mystyles.scss'

try{
    let res = sass.renderSync(
        {
            file:             scssLoc,
            outputStyle:      "compressed",
            omitSourceMapUrl: true,
            outFile:          cssLoc
        }
    );

    fs.writeFile(cssLoc, csso.minify(res.css).css, err => {
        if (err) throw err;
        console.log(`Minified css saved to ${cssLoc}`)
    });
}
catch(e){
    console.error(e)
}