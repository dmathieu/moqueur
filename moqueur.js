(function ($) {
	$._dup_ajax = $.ajax;
	$._mocked = new Array();
	$.counter = new Array();
	
	
	$.mockAjax = function(params) {
		$._mocked.push(params);
	},
	
	$.ajax = function() {		
		var args = arguments[0];
		
		for(i=0; i < $._mocked.length; i++) {
			if (
				(($._mocked[i].url.constructor == String && args.url == $._mocked[i].url) ||
				($._mocked[i].url.constructor == RegExp && args.url.search($._mocked[i].url) > -1))
				&& ($._mocked[i].type == undefined || $._mocked[i].type.toLowerCase() == args.type.toLowerCase())
			) {
	  		var content = $._mockAjax.parse_content($._mocked[i].url, args.url, $._mocked[i].content);
				
				$.counter.push({url: args.url, mocked: true})
				if (args.success != undefined) 
					return args.success(content);
				else 
					return content;
			}
		};
		
		$.counter.push({url: args.url, mocked: false})
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