const fs = require('fs');
const path = require('path');

// function to encode file data to base64 encoded string
function b64(file) {



    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return `data:image/${file.split('.')[1]};base64,${(new Buffer(bitmap).toString('base64'))}`;
}


/**
 * Explores recursively a directory and returns all the filepaths and folderpaths in the callback.
 * 
 * @see http://stackoverflow.com/a/5827895/4241030
 * @param {String} dir 
 * @param {Function} done 
 */
function filewalker(dir, done) {
    let results = [];

    fs.readdir(dir, function(err, list) {
        if (err) return done(err);

        var pending = list.length;

        if (!pending) return done(null, results);

        list.forEach(function(file){
            file = path.resolve(dir, file);

            fs.stat(file, function(err, stat){
                // If directory, execute a recursive call
                if (stat && stat.isDirectory()) {
                    // Add directory to array [comment if you need to remove the directories from the array]
                    results.push(file);

                    filewalker(file, function(err, res){
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push(file);

                    if (!--pending) done(null, results);
                }
            });
        });
    });
};

filewalker("./img", function(err, data){
    if(err){
        throw err;
    }
    
    var json = {};

    for(var path of data){
        var filename = path.split('\\')
        json[filename[filename.length - 1]] = (b64(path));
    }

    fs.writeFile("./.pics/data.json", JSON.stringify(json), function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log("The file was saved!");
    }); 
});