(function ($) {
	$._dup_ajax = $.ajax;
	$._mocked = new Array();
	
	
	$.mockAjax = function(params) {
		$._mocked.push(params);
	}
	
	$.ajax = function() {
		var args = arguments[0];
		for(i in $._mocked) {
			if (args.url == $._mocked[i].url)
				if (args.success != undefined)
					return args.success($._mocked[i].content);
				else
					return $._mocked[i].content;
		};
		
		return $._dup_ajax.apply($, arguments);
	};
})(jQuery);