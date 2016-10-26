mm.Media = {

    initialize: function(options) {

        this.options = options || {};
        this.listeners = [];

        var opt = this.options;

        var steps = opt.steps;
        opt.onChange = opt.onChange || function() {
            };
        opt.log = opt.log || function() {
            };

        var toMediaString = function(step, ratio) {
            var mediaString = [];

            _.each(step, function(value, key) {
                if (key !== 'className') {
                    mediaString.push('(' + _.kebabCase(key) + ': ' + value + 'px)')
                }
            });

            return mediaString.join(' and ');
        };

        if (!window.matchMedia) {
            return;
        }

        var ratio = window.devicePixelRatio || 1;

        for (var i = 0; i < steps.length; i++) {

            var step = steps[i];
            var matchMedia = window.matchMedia(toMediaString(step, ratio));

            opt.log(step.className + ':  ' + matchMedia.media);
            if (matchMedia.matches) {
                opt.onChange(step, matchMedia);
            }

            this.attach(step, matchMedia);
        }
        return this;

    },

    attach: function(step, matchMedia) {

        var mediaChanged = this.options.onChange;
        var handler = function(media) {
            console.log(media.media);
            mediaChanged(step, media)
        };
        this.listeners.push({ media: matchMedia, handler: handler });
        matchMedia.addListener(handler);
    },

    destroy: function() {

        for (var i = 0; i < this.listeners.length; i++) {
            var listener = this.listeners[i];
            console.log(listener.query);
            listener.media.removeListener(listener.handler);
        }
    }

};

