### mm.Media

handle mediaQuery using window.matchMedia

demo: [https://vtalas.github.io/media/](https://vtalas.github.io/media/)

```
$(document).ready(function() {
    var steps = [
        { maxWidth: 500, className: 'media-red', minWidth: 0 },
        { maxWidth: 1000, className: 'media-blue', minWidth: 501 }
    ];

    mm.Media.initialize({
        steps: steps,
        onChange: function(step, media) {
            $('body').toggleClass(step.className, media.matches)
        },
    });
})

```
