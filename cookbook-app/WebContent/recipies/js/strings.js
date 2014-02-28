/**
 * 
 */

angular.module('stringsFilters', []).filter('strings', function() {
	return function(input, strings) {
		var output = input;
		if (strings) {
			var stringsArray = strings;
			if (stringsArray instanceof Array == false) {
				stringsArray = [strings];
			}
			
			for (var i = 0; i < stringsArray.length; i++) {
				output = output.replace(new RegExp("\\{" + i + "\\}", "g"), stringsArray[i]);
			}
		}
		return output;
	};
});