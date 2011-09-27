jQuery.mockAjax({
  url: '/test',
  content: "Hello World !"
});

jQuery.mockAjax({
  url: new RegExp('^/regex/([0-9]+)$'),
  content: "Request with regex. Param: $1"
});

jQuery.mockAjax({
  url: '/get_request',
  type: 'get',
  content: "Standard request available only in GET"
});
