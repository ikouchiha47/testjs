var modules = (function(files) {
	var scripts = {},
		len = files.length,
		body = document.querySelector('body'),
		curCount = 0;

	if(len) {
		each(files, function(file) {
			if(scripts[file] === undefined) {
				scripts[file] = {name : file, state : false};
			}
		
		});
	}

	
	function createScript(name) {
		var dom = document.createElement("script"),
			url = name.split("/"),
			filepath;
		
		url[url.length - 1] += ".js"; 
		filepath = "./" + url.join("/");
			
		dom.type = "text/javascript";
		dom.async = true;
		
		dom.src = filepath;

		return dom;
	}

	function countScripts(obj) {
		var count = 0;
		for(var i in obj) {
			count ++;
		}
		return count;
	}

	function onScriptLoad(ctx, count, cb) {
		var cs = countScripts(scripts);
		ctx.state = true;
		if(count == cs) {
			cb && cb();
		}
	}

	function loadScript (ctx, node, callback) {
		if(node.readyState) {
			node.onreadystatechange = function() {
				if (node.readyState == 'complete' ||
					node.readyState == 'loaded' )
				 {
					 ctx.state = true;
				 }
			};
		} else {
			node.onload = function () {
				curCount++;
				onScriptLoad(ctx, curCount, callback);
			}
			node.onerror = function() {
				ctx.sate = false;
				console.log("error loading " + ctx.name);
			}
		}
		body.appendChild(node);
	}


	function each(ary, func) {
		if(ary) {
			var i,
				arlen = ary.length;
				for(i = 0; i < arlen; i += 1) {
					if(ary[i] && func(ary[i], i, ary))
						break;
				}
		}
	}

	return {
		load : function(name, cb) {
			node = createScript(name);
			return loadScript(scripts[name], node, cb);
		},

		exec : function (callback) {
			var count = 0;
			for(var dep in scripts) {
				//console.log(dep);
				if(dep) {
					this.load(dep, callback);
				}
			}
		}
	};
});
