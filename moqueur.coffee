($) (->
  $._dup_ajax = $.ajax
  $._mocked = new Array()
  $.counter = new Array()


  $.mockAjax = (params) ->
    $._mocked.push(params)

  $.ajax = ->
    args = arguments[0]

    for entry in $._mocked
      if (entry.url.constructor == String && args.url == entry.url) || (entry.url.constructor == RegExp && args.url.search(entry.url) > -1)
        if (!entry.type? || entry.type.toLowerCase() == args.type.toLowerCase())

          content = $._mockAjax.parse_content(entry.url, args.url, entry.content)

          $.counter.push({url: args.url, mocked: true})
          if args.success?
            return args.success(content)
          else
            return content

    $.counter.push({url: args.url, mocked: false})
    return $._dup_ajax.apply($, arguments)


  $._mockAjax =
    parse_content: (regex, url, content) ->
      if regex.constructor == RegExp
        occurencies = regex.exec(url)
        for occurency, i in occurencies
          content = content.replace('$' + i, occurency)
      content
)(jQuery)

