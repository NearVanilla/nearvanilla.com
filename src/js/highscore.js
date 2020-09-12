var highscoreObject;
var startTime;
var hue = 0;
var highscoreOnName = [];
var highscoreSort = ["Playtime", "Blocks traveled", "Stone mined", "Diamonds mined", "Mobs killed", "Deaths", "Damage taken", "Obsidian mined", "Villagers traded"];

var highscore = (function () {

    function sortHighscore(a, b) {
        if (highscoreSort.indexOf(a) > highscoreSort.indexOf(b)) {
            return 1;
        } else if (highscoreSort.indexOf(a) < highscoreSort.indexOf(b)) {
            return -1;
        } else {
            return 0;
        }
    }

    function init() {
        makeHighscoreObject("highscores.json");
        higscoreToHtml();
        calculateTimeAndToHtml();
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

    function makeHighscoreHeader(highscorename) {
        $("#row").append($("<div>").addClass("col-md-4 p-2")
            .append($("<div>").addClass("hiheader").css("filter", "hue-rotate(" + hue + "deg)")
                .append($("<h1>")
                    .append(highscorename)))
            .append($("<table>").addClass("highscores")
                .append($("<thead>")
                    .append($("<tr>")
                        .append($("<th>")
                            .text("rank"))
                        .append($("<th>")
                            .text("player"))
                        .append($("<th>")
                            .text("amount"))))
                .append($("<tbody>"))));
    }

    function addHighscorePlayer(rank, playername, score) {
        $("tbody").last().append($("<tr>")
            .append($("<td>").addClass("rank")
                .text(rank))
            .append($("<td>")
                .append($("<a href='#'>").addClass("playername").text(playername)))
            .append($("<td>").text(score)));
    }

    function higscoreToHtml() {
        $.each(highscoreObject, function (nb, obj) {
            if (nb === "time") {
                startTime = obj;
            } else if (nb === "scores") {
                $.each(obj, function (nb, obj) {
                    makeHighscoreHeader(obj.DisplayName);
                    $.each(obj, function (nb, obj) {
                        if (nb)
                            if (nb === "scores") {
                                for (var i = 0; i < 15; i++) {
                                    if (obj.length > i) {
                                        addHighscorePlayer(i + 1, obj[i].playerName, obj[i].score);
                                    } else {
                                        addHighscorePlayer(i + 1, "-", "-");
                                    }
                                }
                            }
                        hue += 40;
                    })
                })
            }
        })
    }

    function hasPlayerPlayedOnServer(playername) {
        $.each(highscoreObject, function (nb, obj) {
            if (nb === "scores") {

            }
        })
    }

    $('#highscoreOnUsername').submit(function () {
        $("#row").empty();
        highscoreOnName.length = 0;
        $.each(highscoreObject, function (nb, obj) {
            if (nb === "scores") {
                $.each(obj, function (nb, obj) {
                    makeHighscoreHeader(obj.DisplayName);
                    var found = false;
                    $.each(obj.scores, function (nb, obj) {
                        if (obj.playerName.toLowerCase() === $("#username").val().toLowerCase()) {
                            highscoreOnName[0] = [obj.index, obj.playerName, obj.score];
                            found = true;
                        } else if (found == false) {
                            highscoreOnName[0] = ["-", "-", "-"]
                        }
                    })
                    $.each(highscoreOnName, function (nb, obj) {
                        $("tbody").last().append($("<tr>").addClass("usernameHighlight")
                            .append($("<td>").addClass("rank")
                                .text(obj[0]))
                            .append($("<td>")
                                .append($("<a href='#'>").addClass("playername").text(obj[1])))
                            .append($("<td>").text(obj[2])));
                    })
                    hue += 40;
                })
            }
        })
        return false;
    });

    function timeConverter(UNIX_timestamp){
      var a = new Date(UNIX_timestamp * 1000);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time = date + '.' + month + '.' + year + ' ' + hour + ':' + ((min <= 9) ? '0' + min : min) + ':' + ((sec <= 9)? '0' + sec : sec) ;
      return time;
    }

    function calculateTimeAndToHtml() {
      $("#highscoreUpdateTimestamp").text(timeConverter(highscoreObject["timestamp"]));
    }

    return {
        init: init
    };

}());

$(document).ready(function () {
    highscore.init();
}); // end ready
