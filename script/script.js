$(function () {
    var mas = [];

    showmas(mas);
    var generator = $("#randombut");
    var clustersNum = $("#input-num-clas");
    var kMeans = $("#means");
    var forelBtn = $("#forel");

    generator.click(randomMas);
    kMeans.click(cluster);
    forelBtn.click(cluster);

    function randomMas() {
        var size = $("#randominp").val();
        if (size !== '') {
            mas = getRandomMas(mas, size);
            showmas(mas);
        }
        else {
            alert("Enter number > 1");
        }
    }

    function cluster(e) {
        if (e.target.id == "means") {
            var clusterCount = clustersNum.val();
            if (clusterCount !== '') {
                $("#input-num-clas").val('');
                k_means(mas, clusterCount);
            }
            else {
                alert("Enter amount of clusters");
            }
        }
        else if (e.target.id == "forel") {
            var R = $("#inputR").val();
            if (R !== '') {
                $("#inputR").val('');
                forel(mas, R);
            }
            else {
                alert("Enter clusters' radius");
            }
        }
    }
});

function showmas(mas, mas1) {
    var i;
    var j;
    var temp = 'Input Matrix:<br><br>';
    if (mas1) {
        mas.push(mas1);
    }
    for (i = 0; i < mas.length; i++) {
        for (j = 0; j < 2; j++) {
            if (j === 0) {
                var k = i + 1;
                temp = temp + k + ":  X = " + mas[i][j] + ";   ";
            } else if (j === 1) {
                temp = temp + "Y = " + mas[i][j] + ";<br>";
            }
        }
    }
    $("#intext").html(temp);
}

function isRepeat(mas, randx, randy) {
    mas.forEach(function (i, val) {
        if (val[0] == randx && mas[1] == randy) {
            return true;
        }
    });
    return false;
}

function getRandomMas(mas, size) {
    $("#randominp").val('');
    mas = [];
    mas.push([getRandomArbitary(0, 9).toFixed(2), getRandomArbitary(0, 9).toFixed(2)]);
    for (var i = 0; i < (size - 1); i++) {
        do {
            var randomX = getRandomArbitary(0, 30).toFixed(2);
            var randomY = getRandomArbitary(0, 15).toFixed(2);
        } while (isRepeat(mas, randomX, randomY));
        mas.push([randomX, randomY]);
    }
    return mas;
}