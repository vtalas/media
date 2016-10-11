var Logger = (function() {

    var $logContainer = $('.log');
    var $infoConatiner = $('.device-info');

    var x = 0;
    var log = function(text, target) {
        x++;

        var destination = target || $logContainer;

        if (x > 50) {
            x = 0;
            destination.empty();
        }
        destination.prepend($('<div/>').text(text));
    };
    var viewport = window.document.documentElement;

    var logBasicInfo = function() {

        $logContainer.empty();

        log('pixel ratio: ' + window.devicePixelRatio);
        log('viewport.client: ' + viewport.clientWidth + 'x' + viewport.clientHeight);
        log('window.outer: ' + window.outerWidth + 'x' + window.outerHeight);
        log('window.screen.avail: ' + window.screen.availWidth + 'x' + window.screen.availHeight);

        log('active query: ' + ($('body').attr('class') || ''));
    };

    logBasicInfo();

    window.addEventListener('resize', function() {
        logBasicInfo();
    });


    return {
        logBasicInfo: logBasicInfo,
        log: function(text) {
            log(text, $infoConatiner)
        }
    };
}());