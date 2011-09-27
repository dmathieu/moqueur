(function() {
  $((function() {
    $._dup_ajax = $.ajax;
    $._mocked = new Array();
    $.counter = new Array();
    $.mockAjax = function(params) {
      return $._mocked.push(params);
    };
    $.ajax = function() {
      var args, content, entry, _i, _len, _ref;
      args = arguments[0];
      _ref = $._mocked;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entry = _ref[_i];
        if ((entry.url.constructor === String && args.url === entry.url) || (entry.url.constructor === RegExp && args.url.search(entry.url) > -1)) {
          if (!(entry.type != null) || entry.type.toLowerCase() === args.type.toLowerCase()) {
            content = $._mockAjax.parse_content(entry.url, args.url, entry.content);
            $.counter.push({
              url: args.url,
              mocked: true
            });
            if (args.success != null) {
              return args.success(content);
            } else {
              return content;
            }
          }
        }
      }
      $.counter.push({
        url: args.url,
        mocked: false
      });
      return $._dup_ajax.apply($, arguments);
    };
    return $._mockAjax = {
      parse_content: function(regex, url, content) {
        var i, occurencies, occurency, _len;
        if (regex.constructor === RegExp) {
          occurencies = regex.exec(url);
          for (i = 0, _len = occurencies.length; i < _len; i++) {
            occurency = occurencies[i];
            content = content.replace('$' + i, occurency);
          }
        }
        return content;
      }
    };
  })(jQuery));
}).call(this);
