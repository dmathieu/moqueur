(function ($) {
	$._dup_ajax = $.ajax;
	$._mocked = new Array();
	$.counter = new Array();
	
	
	$.mockAjax = function(params) {
		$._mocked.push(params);
	}
	
	$.ajax = function() {		
		var args = arguments[0];
		
		$.counter.push({url: args.url})
		for(i in $._mocked) {
			if (
				($._mocked[i].url.constructor == String && args.url == $._mocked[i].url) ||
				($._mocked[i].url.constructor == RegExp && args.url.search($._mocked[i].url) > -1)
			)
				if (args.success != undefined)
					return args.success($._mocked[i].content);
				else
					return $._mocked[i].content;
		};
		
		return $._dup_ajax.apply($, arguments);
	};
})(jQuery);