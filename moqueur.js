(function ($) {
	$._dup_ajax = $.ajax;
	$._mocked = new Array();
	$.counter = new Array();
	
	
	$.mockAjax = function(params) {
		$._mocked.push(params);
	},
	
	$.ajax = function() {		
		var args = arguments[0];
		
		$.counter.push({url: args.url})
		for(i=0; i < $._mocked.length; i++) {
			if (
				($._mocked[i].url.constructor == String && args.url == $._mocked[i].url) ||
				($._mocked[i].url.constructor == RegExp && args.url.search($._mocked[i].url) > -1)
			) {
	  		var content = $._mockAjax.parse_content($._mocked[i].url, args.url, $._mocked[i].content);
				
				if (args.success != undefined) 
					return args.success(content);
				else 
					return content;
			}
		};
		
		return $._dup_ajax.apply($, arguments);
	},
	
	
	$._mockAjax = {
		
		parse_content: function(regex, url, content) {
			if (regex.constructor == RegExp) {
				var occurencies = regex.exec(url);
				for(i=1; i <= occurencies.length; i++) {
					content = content.replace('$' + i, occurencies[i]);
				}
			}
			
			return content;
		}
	}
})(jQuery);