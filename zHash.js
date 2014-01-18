/*!
 * zHash Library v1.1
 * https://github.com/maxo/zHash
 *
 * Released under the GPLv3 license
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 * Date: 2014-01-18
 */

var zHash = function() {
	var functions = new Object();
	var strip = function(x) {return x.replace('#', '').replace('!','').replace(/\s/g, '_')}
	var prevHash = strip(window.location.hash);
	var currentHash = "";
	return {
		hash: function(){ return strip(currentHash) },
		listen: function(hash, func) {
			if (typeof hash == "string") {
				functions[hash] = func;
			} else if (hash != null && typeof hash == "object" && hash.length > 0) { // array of strings
				for (var i=0; i<hash.length; i++)
					zHash.listen(hash[i], func);
			}
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
