mm.Media = {

    initialize: function(options) {

        this.options = options || {};
        this.listeners = [];
        this.matched = {};

        var opt = this.options;

        var steps = opt.steps;
        opt.onChange = opt.onChange || function() {
            };

        opt.log = opt.log || function() {
            };

        var toMediaString = function(step) {
            var mediaString = [];

            _.each(step, function(value, key) {
                if (key !== 'options') {
                    mediaString.push('(' + _.kebabCase(key) + ': ' + value + ')');
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
            opt.log(step.options.className + ':  ' + matchMedia.media);
            this.onChange(step, matchMedia);
            this.attach(step, matchMedia);
        }
        return this;

    },

    isMobile: function() {
        return !!this.matched['mobile'];
    },

    attach: function(step, matchMedia) {

        var handler = _.bind(this.onChange, this, step);
        this.listeners.push({ media: matchMedia, handler: handler });
        matchMedia.addListener(handler);
    },


    onChange: function(step, matchMedia) {

        this.matched[step.options.type] = matchMedia.matches;
        this.options.onChange(step, matchMedia);
    },

    destroy: function() {

        for (var i = 0; i < this.listeners.length; i++) {
            var listener = this.listeners[i];
            console.log(listener.query);
            listener.media.removeListener(listener.handler);
        }
    }

};

