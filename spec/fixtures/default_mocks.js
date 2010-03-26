jQuery.mockAjax({
	url: '/test',
	content: "Hello World !"
});

jQuery.mockAjax({
	url: new RegExp('^/regex/([0-9]+)$'),
	content: "Request with regex."
});