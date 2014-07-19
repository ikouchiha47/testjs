var modules = (function(files) {
	var scripts = {},
		len = files.length,
		body = document.getElementsByTagName('body')[0],
		curCount = 0;

	if(len) {
		each(files, function(file) {
			if(scripts[file] === undefined) {
				scripts[file] = {state : false};
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

	function onScriptLoad(e) {
	}

	function loadScript (ctx, node) {
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
				ctx.state = true;
				curCount++;//executes , but it doesnot change the global curCount and hence, outside here, is always 0;
			}
			node.onerror = function() {
				ctx.sate = false;
				console.log("bye bye");
			}
		}

		body.appendChild(node);
		//ctx.state = true;
		return ctx.state;
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
		load : function(name) {
			node = createScript(name);
			return loadScript(scripts[name], node);
		},

		exec : function (callback) {
			var count = 0;
			for(var dep in scripts) {
				console.log(dep);
				if(dep) {
					var res = this.load(dep);
					console.log(res);
				}
			}
			for(var dep in scripts) {
				console.log(scripts[dep].state);//all states are false;
				if(scripts[dep].state) {
					count ++;
				}
			}
			console.log(curCount);//count is 0;
			console.log(count);
			if(count >= len && count == curCount){
				callback && callback();
			}
			//at this stage, i would check if the state were true, and if they were i would call the callback, but .. :'(
		}
	};
});
