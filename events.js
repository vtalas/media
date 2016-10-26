events = function () {

    function getAllEvents(element) {
        var result = [];
        for (var key in element) {

            if (key.indexOf('on') === 0) {
                result.push(key.slice(2));
            }
        }

        result.push('touchstart', 'touchend', 'touchmove', 'touchcancel');
        return result.join(' ');
    }

    return {
        bindAll: function (element, callback) {
            element.bind(getAllEvents(element[0]), callback);
        }
    };

}