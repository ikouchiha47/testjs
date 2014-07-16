/*
load the js files you need, by passing their names as array
var mod = modules(["jquery.min", "helloworld"]);
mod.loadModules(); //this will load the files, make sure they are in your .js folder.
//Also check files which couldnot be loaded because you messed up. You can chain it.

var res = mod.loadModules().checkModules();

// checkModules returns an object which has a status and string of filenames dat wasn't loaded'
res.status and res.noload;

*/

var modules = (function (files) {
    var scripts = {},
        notLoaded = " ",
        len = files.length;
    
    function createScript(name) {
    	//add the script tag with the ./js/<name>.js as src
        var body, sc, reader, filepath;
        body = document.querySelectorAll('body')[0];
        filepath = "./js/" + name + ".js";
        //just to check if the file exists, no real web workers here
        try {
            reader = new Worker(filepath);
        } catch (e) {
        	// if not return false
            return false;
        }
        
        if (reader) { //if the file exists create the tag
            sc = document.createElement('script');
            sc.src = filepath;
            body.lastChild.appendChild(sc);
            return true;
        }
    }
    
    return {

        loadModules : function () {
            var fname, i, res;
            if (files && files.length > 0) {
                for (i = 0; i < len; i += 1) {
                    fname = files[i];
                    if (!scripts[fname]) { //check if the filename to include is false or undefined
                        res = createScript(fname);
                        scripts[fname] = res;
                        //res is true or false depending if the file was found.
                        //include the filename in the scripts object and put res as value, {jquery.min : true, somefile : false}
                       
                    } else {
                    	//if the filename already exists in the scripts object, then just return false, because its naturall to assume, it has been included already. if not i need to take measures later.
                        //do nothing
                    }
                }
            } else { //u passed shitty parameters maybe, i dont care.
            	return false;
            }
            
            return this;
            
        },
        
        checkModules : function () {
            var s, success = true;
            if (scripts) {
                for (s in scripts) {
                    if (!scripts[s]) {
                        notLoaded += (s+ " ");
                        success = false;
                    }
                }
            } else {
                console.log("no scripts loaded");
                success = false;
            }
            
            return {
                status : success,
                noload : notLoaded.trim()
            };
        },
        
        tester : function () {
            console.log(len);
            console.log(scripts);
        }
    };
});
