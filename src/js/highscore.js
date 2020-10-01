var highscoreObject;
var startTime;
var hue = 0;
var highscoreOnName = [];
var highscoreSort = ["Playtime", "Blocks traveled", "Stone mined", "Diamonds mined", "Mobs killed", "Deaths", "Damage taken", "Obsidian mined", "Villagers traded"];
var playerList;
var uuidByPlayerName;

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
        initializePlayerList();
        calculateDeathsPerDay();
        shortenPlayedMinutesText();

        higscoreToHtml();
        calculateTimeAndToHtml();
        renderPlayerListToHtml();
    }

    //
    // Initializing
    //

    function initializePlayerList() {
        playerList = highscoreObject.UUID.map(u => u.lastKnownName).sort((playerA, playerB) => {
            return playerA.toLowerCase().localeCompare(playerB.toLowerCase());
        });
        uuidByPlayerName = highscoreObject.UUID.reduce((result, item) => {
            result[item.lastKnownName] = item.UUID;
            return result;
        }, {});
    }

    /**
     * Calculate deaths per day from "Deaths" and "Played Minutes" for players with >= 24h of gameplay
     */
    function calculateDeathsPerDay() {
        const playerPlayedMinutes = generatePlayerScoreMap(highscoreObject.scores["ts_PlayedMinutes"].scores);
        const playerDeaths = generatePlayerScoreMap(highscoreObject.scores["ts_Deaths"].scores);

        let deathPerDayScores = [];
        for(let player of playerList) {
            const hoursPlayed = parsePlayedHours(playerPlayedMinutes[player]);
            if(hoursPlayed >= 24) {
                const daysPlayed = hoursPlayed / 24;
                const deaths = playerDeaths[player] || 0;
                deathPerDayScores.push({
                    playerName: player,
                    score: deaths / daysPlayed
                });
            }
        }

        // sort descending, format score and add index / rank
        deathPerDayScores = deathPerDayScores.sort((a,b) => b.score - a.score).map((score, idx) => {
            return {
                playerName: score.playerName,
                score: score.score.toFixed(2),
                index: idx + 1
            };
        });

        // add to highscoreObject
        highscoreObject.scores["ts_DeathsPerDay"] = {
            scores: deathPerDayScores,
            DisplayName: "Deaths per Day"
        }
    }

    /**
     * parse string like "xx hours xx minutes" to number of hours
     */
    function parsePlayedHours(playedMinutesText) {
        const playedMinutesPattern = /^([0-9]+) hours ([0-9]+) minutes$/;
        const match = playedMinutesText.match(playedMinutesPattern);
        if(match != null && match.length > 2) {
            return +match[1] + (+match[2] / 60);
        }
        return 0;
    }

    /**
     * transform array of objects with {playerName, score} to dictionary from playerName => score
     */
    function generatePlayerScoreMap(highscoreArray) {
        return highscoreArray.reduce((result, item) => {
            result[item.playerName] = item.score;
            return result;
        }, {});
    }

    function shortenPlayedMinutesText() {
        for(let score of highscoreObject.scores["ts_PlayedMinutes"].scores) {
            score.score = score.score.replace(/minutes$/, 'min');
        }
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

    //
    // Rendering
    //
    function renderPlayerListToHtml() {
        const playerSelect = document.getElementById("username");
        for(let player of playerList) {
            const optionElement = document.createElement("option");
            optionElement.value = player;
            optionElement.text = player;
            playerSelect.appendChild(optionElement);
        }
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
                            .text(""))
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
            .append($("<td>").addClass("avatar")
                .append($("<img>").attr("alt", "Avatar of " + playername)
                    .attr("src", 'https://crafatar.com/avatars/' + uuidByPlayerName[playername])))
            .append($("<td>")
                .append($("<a href='#'>").addClass("playername").text(playername)))
            .append($("<td>").text(score)));
    }

    function higscoreToHtml() {
        hue = 0;
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

    function onUserNameChange() {
        const selectedUserName = $("#username").val();
        $("#row").empty();
        if(selectedUserName === '') {
            higscoreToHtml();
            return;
        }

        hue = 0;
        highscoreOnName.length = 0;
        $.each(highscoreObject, function (nb, obj) {
            if (nb === "scores") {
                $.each(obj, function (nb, obj) {
                    makeHighscoreHeader(obj.DisplayName);
                    var found = false;
                    $.each(obj.scores, function (nb, obj) {
                        if (obj.playerName.toLowerCase() === selectedUserName.toLowerCase()) {
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
                            .append($("<td>").addClass("avatar")
                                .append($("<img>").attr("alt", "Avatar of " + obj[1])
                                    .attr("src", 'https://crafatar.com/avatars/' + uuidByPlayerName[obj[1]])))
                            .append($("<td>")
                                .append($("<a href='#'>").addClass("playername").text(obj[1])))
                            .append($("<td>").text(obj[2])));
                    })
                    hue += 40;
                })
            }
        })
    }

    $("#username").change(onUserNameChange);

    $('body').on('click', '.playername', function() {
        const playerLink = $(this);
        $('#username').val(playerLink.text());
        onUserNameChange();
        return false;
    })

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
