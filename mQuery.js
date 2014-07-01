var fn = function(){},
    elm,
    routes = [],
    mquery;

mquery = new fn();

fn.prototype.route = function(path, templateUrl) {
	routes[path] = {templateUrl : templateUrl};
};

fn.prototype.router = function() {
	var url, route;
	elm = elm || document.getElementById('view');
	url = location.hash.slice(1) || '/';
	route = routes[url];
	
	//console.log(route.templateUrl);

	if (elm && route && route.templateUrl) {
		mquery.load(elm, route.templateUrl);
	} else if(url != '/'){
		//do something
		console.log("route not define");
	} else {
		console.log("at main page");
	}
};

fn.prototype.createXHR = function() {
	var request = false;
	request = window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject("MSXML2.XMLHTTP.3.0");

	return request;
};

fn.prototype.createDOM = function() {
	var nwdiv = document.createElement('div');
	return nwdiv;
};

fn.prototype.load = function(id, view) {
	var xhr = mquery.createXHR();
	
	xhr.onreadystatechange = function() {
				
		if(xhr.readyState == 4) {
			//console.log(xhr.status);
			if(xhr.status == 200 || xhr.status == 0) {
				//console.log(xhr.responseText);
				id.innerHTML += xhr.responseText;
			} else {
				alert("Error HTTP "+xhr.status);
				return;
			}
		}
	};
	xhr.open("GET", view, true);
	xhr.send();
};

//mquery.route('/', './index.html');
mquery.route('/output', './partials/output.html');
