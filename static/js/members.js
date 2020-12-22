var highscoreObject;
var members = [];
var totalMembers;

var highscore = (function () {

    function init() {
        makeHighscoreObject("static/highscores.json");
        membersToHtml();
    }

    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    function makeHighscoreObject(file) {
        var rawFile = new XMLHttpRequest();
	var timestamp = Math.floor(Date.now() / (1000 * 60))
        rawFile.open("GET", file + "?" + timestamp, false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var allText = rawFile.responseText;
                    highscoreObject = JSON.parse(allText);
                }
            }
        }
        rawFile.send(null);
    }

    function membersToHtml() {
        $.each(highscoreObject, function (nb, obj) {
            if (nb === "UUID") {
                $('.membersh1').text("Our " + obj.length + " members")
                for (var i = 0; i < obj.length; i++) {
                    $(".membersslick")
                        .append($("<div>")
                            .append($('<img src="https://crafatar.com/avatars/' + obj[i].UUID + '?overlay=true">').addClass("member"))
                            .append($("<div>").addClass("overlay")
                                .append($('<div>').text(obj[i].lastKnownName).addClass("text"))));
                }
            }
        })
    }

    return {
        init: init
    };

}());

$(document).ready(function () {
    highscore.init();
}); // end ready
