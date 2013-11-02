var zHash = function() {
	var functions = new Object();
	var strip = function(x) {return x.replace('#', '').replace('!','').replace(/\s/g, '_')}
	var prevHash = strip(window.location.hash);
	var currentHash = "";
	return {
		hash: function(){ return strip(currentHash) },
		listen: function(hash, func) {
			if (typeof hash == "string") functions[hash] = func;
		},
		run: function(hash) {
			hash = strip(hash);
			var parameters = hash.split('/');
			for(var i = 1 ; i<parameters.length; i++){
				if(parameters[i].length > 0){
					parameters[0] += "/$";
				}
			}
			if (functions[parameters[0]]) {
				currentHash = parameters[0];
				functions[parameters[0]].apply(undefined, parameters.slice(1));
			}
		},
		start: function(defaultHash) {
			if ('onhashchange' in window && (document.documentMode === undefined || document.documentMode > 7 )) {
				if (defaultHash && strip(window.location.hash) == "") window.location.hash = defaultHash;
				window.onhashchange = function() {zHash.run(window.location.hash);}
				zHash.run(window.location.hash);
			}
			else {
				var timing = 300;
				if (defaultHash) { zHash.listen('', function() {zHash.run(defaultHash);} ); }
				zHash.run(window.location.hash);
				window.setInterval(function () {
					var currentHash = strip(window.location.hash);
					if (currentHash != prevHash) {
						zHash.run(currentHash);
					}
					prevHash = currentHash;
				}, timing);
			}
		}
	}
}();
