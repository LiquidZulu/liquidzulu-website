const fs = require('fs');
fs.readFile('./.css/main.css', (e, d) => {
    if(e){
        throw e
    }

    module.exports =  d
})