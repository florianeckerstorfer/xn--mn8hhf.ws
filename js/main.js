(function () {
    var reasons = [{
        trigger: [
            '\uD83D\uDCAA', '\uD83D\uDCAA\uD83C\uDFFB', '\uD83D\uDCAA\uD83C\uDFFC', '\uD83D\uDCAA\uD83C\uDFFC', '\uD83D\uDCAA\uD83C\uDFFE', '\uD83D\uDCAA\uD83C\uDFFF'],
        text: 'being strong'
    }, {
        trigger: ['\uD83D\uDC42', '\uD83D\uDC42\uD83C\uDFFB', '\uD83D\uDC42\uD83C\uDFFC', '\uD83D\uDC42\uD83C\uDFFD', '\uD83D\uDC42\uD83C\uDFFE', '\uD83D\uDC42\uD83C\uDFFF'],
        text: 'listening'
    }, {
        trigger: ['\uD83D\uDC6B', '\uD83D\uDC6C', '\uD83D\uDC6D'],
        text: 'being a friend'
    }, {
        trigger: ['\uD83D\uDC83'],
        text: 'the dance'
    }, {
        trigger: ['\uD83C\uDFA8', '\uD83C\uDFB8', '\uD83C\uDFBC', '\uD83C\uDFB7'],
        text: 'your creativity'
    }, {
        trigger: ['\uD83C\uDF7A', '\uD83C\uDF7B'],
        text: 'the beer'
    }, {
        trigger: ['\uD83C\uDF77'],
        text: 'the wine'
    }, {
        trigger: ['\uD83C\uDF78', '\uD83C\uDF79'],
        text: 'the drink'
    }, {
        trigger: ['\uD83C\uDF75'],
        text: 'the tea'
    }, {
        trigger: ['\u2615\uFE0F'],
        text: 'the coffee'
    }, {
        trigger: ['\uD83C\uDF89'],
        text: 'the party'
    }, {
        trigger: ['\uD83C\uDF93'],
        text: 'your wisdom'
    }, {
        trigger: ['\uD83C\uDFF9'],
        text: 'defending me'
    }];

    var init = function () {
        var path = decodeURI(location.pathname);
        if (path.length > 1) {
            var reason = findReason(path.substr(1), reasons);
            if (reason) {
                setReason(reason.text, path.substr(1));
            }
        } else {
            setRandomReason(reasons);
        }
    };

    var setReason = function (text, emoji) {
        document.querySelector('.thanks .reason').textContent = text;
        document.querySelector('.thanks .emoji-reason').textContent = emoji;
    };

    var setRandomReason = function (reasons) {
        var reason = reasons[rand(0, reasons.length)];
        var emoji = reason.trigger[rand(0, reason.trigger.length)];
        setReason(reason.text, emoji);
    };

    var findReason = function (needle, haystack) {
        for (var i = 0; i < haystack.length; i++) {
            if (matchReason(needle, haystack[i])) {
                return haystack[i];
            }
        }

        return null;
    };

    var matchReason = function (needle, haystack) {
        for (var i = 0; i < haystack.trigger.length; i++) {
            if (haystack.trigger[i] === needle) {
                return true;
            }
        }

        return false;
    };

    var rand = function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    };

    window.onload = init;
})();
