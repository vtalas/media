mm.Media = {

    initialize: function(options) {

        this.options = options || {};
        var opt = this.options;

        var steps = opt.steps;
        opt.onChange = opt.onChange || function() {};
        opt.log = opt.log || function() {};

        var toMediaString = function(step, ratio) {
            var mediaString = [];

            if (step.minWidth) {
                mediaString.push('(min-width: ' + (step.minWidth * Math.ceil(ratio)) + 'px)')
            }

            if (step.maxWidth) {
                mediaString.push('(max-width: ' + (step.maxWidth * Math.ceil(ratio)) + 'px)')
            }

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
    },

    attach: function(step, matchMedia) {

        var mediaChanged = this.options.onChange;

        matchMedia.addListener(function(media) {
            mediaChanged(step, media)
        });
    }
};

