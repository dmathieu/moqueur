# MOQUEUR

## Presentation

Moqueur is a jQuery plugin allowing you to mock your ajax requests so they return the value you wish them to.
It's particularly useful when testing your javascript code.

In ruby/rails, with [harmony](http://github.com/mynyml/harmony)/[holygrail](http://github.com/mynyml/holygrail), you can then test your javascript in ruby.
For an example, you can check [moqueur's specs](http://github.com/dmathieu/moqueur/blob/master/spec/lib/moqueur_spec.rb).

## Installation

If you only wish to use moqueur, you can just pick the file "moqueur.js" and add it wherever you want in your public directory.
In your test environment, add this file in your content. Create some mocks and you're ready to go !


## Mocking a request

For now, there's not a lot of options. But more are coming !
And if you wish something to be included, feel free to [open a ticket](http://github.com/dmathieu/moqueur/issues).

You can mock an url with the following :

    jQuery.mockAjax({
        url: '/test',
        content: "Hello World !"
    });

When whenever you make an ajax request (with jQuery.ajax) to the url /test, no  call will really be made and the content returned will be "Hello World".

Example :
    jQuery.ajax({url: '/test'});

You can also use the success method, which will be appropriately executed.

    jQuery.ajax({
        url: '/test',
        success: function() {
            return 'Yay, it works !'
        }
    });

## Contributing

If you think Moqueur is great but can be improved, feel free to contribute.
To do so, you can :

* [Fork](http://help.github.com/forking/) the project
* Do your changes and commit them to your repository
* Test your changes. We won't accept any untested contributions (except if they're not testable).
* Create an [issue](http://github.com/dmathieu/moqueur/issues) with a link to your commits.

And that's it! We'll soon take a look at your issue and review your changes.

## Author and Credits

Damien MATHIEU :: 42 (AT|CHEZ) dmathieu.com