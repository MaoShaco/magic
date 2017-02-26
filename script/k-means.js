function k_means(mas, numclas) {
    var clas = numclas;
    var temp = [];
    var oldcentor = [];
    var newcentor = [];
    var clases = [];
    var bool;
    var q = 0;
    newcentor = getcentor(mas, clas);

    do {
        oldcentor = newcentor;
        temp = getD(mas, clas, oldcentor);
        clases = CreateClast(mas, temp, clas);
        newcentor = findCenter(clases);
        bool = compare(oldcentor, newcentor);
        q++;
        if (q > 30) {
            break;
        }
    } while (!bool);
    plotgraf(clases, newcentor, temp);

}
function plotgraf(clases, centers, temp) {
    var options = {
        series: {
            lines: {show: false},
            points: {show: true, radius: 1}
        },
        yaxis: {tickSize: 2, max: 15, min: 0},
        xaxis: {tickSize: 2, max: 30, min: 0}
    };
    var all_data = [];
    var plotdata = {
        label: "Data",
        color: 0,
        constructor: function (data) {
            this.data = data;
        }
    };

    var i;
    var j;
    var k;
    var temp1;
    var temp2 = [];
    var temp3;

    for (i = 0; i < clases.length; i++) {
        temp1 = Object.create(plotdata);
        temp1.label = "Cluster - " + i;
        temp1.color = i;
        temp1.constructor(clases[i]);
        delete temp1.constructor;
        all_data.push(temp1);

        temp3 = 0;
        for (k = 0; k < temp.length; k++) {
            if (temp[k][1] == i) {
                temp3 = Math.max(temp3, temp[k][0]);
            }
        }
        temp2.push(temp3);
    }
    for (j = 0; j < centers.length; j++) {
        temp1 = Object.create(plotdata);
        temp1.label = "Cluster's center - " + j;
        temp1.color = j + centers.length;
        temp1.constructor([centers[j]]);
        delete temp1.constructor;
        all_data.push(temp1);
    }
    $.plot($("#graf"), all_data, options);
}

function compare(oldcentor, newcentor) {
    var i;
    var j;
    var k;
    var temp = [];
    var bool = true;
    var count;
    for (i = 0; i < newcentor.length; i++) {
        count = newcentor[i].length;
        for (j = 0; j < count; j++) {
            if (newcentor[i][j] === oldcentor[i][j]) {
                temp.push(true);
            }
            else {
                temp.push(false);
            }
        }
    }
    for (k = 0; k < temp.length; k++) {
        bool = bool && temp[k];
    }
    return bool;
}
function show(m) {
    var i;
    var j;
    var count;
    for (i = 0; i < m.length; i++) {
        count = m[i].length;
    }
}
function findCenter(clases) {
    var i;
    var j;
    var count;
    var sumX;
    var sumY;
    var x;
    var y;
    var newCenter = [];
    for (i = 0; i < clases.length; i++) {
        sumX = 0;
        sumY = 0;
        count = clases[i].length;
        for (j = 0; j < count; j++) {
            sumX += Number(clases[i][j][0]);
            sumY += Number(clases[i][j][1]);
        }
        x = sumX / count;
        y = sumY / count;
        newCenter.push([x, y]);
    }
    return newCenter;
}
function CreateClast(mas, temp, clas) {
    var i;
    var j;
    var clases = [];
    var temp1;
    for (j = 0; j < clas; j++) {
        temp1 = [];
        for (i = 0; i < mas.length; i++) {
            if (temp[i][1] === j) {
                temp1.push(mas[i]);
            }
        }
        clases.push(temp1);
    }
    return clases;
}
function getD(mas, clas, centor) {
    var a;
    var temp;
    var temp1 = [];
    for (var i = 0; i < mas.length; i++) {
        a = [100, 0];
        for (var j = 0; j < clas; j++) {
            temp = Math.min(Math.abs((mas[i][0] - centor[j][0])), Math.abs((mas[i][1] - centor[j][1])));
            if (temp < a[0]) {
                a[0] = temp;
                a[1] = j;
            }
        }
        temp1.push(a);
    }
    return temp1;
}
function getcentor(mas, clas) {
    var rand;
    var newcentor = [];
    var masrand = ["330", "110", "200"];
    for (var i = 0; i < clas; i++) {
        do {
            rand = (getRandomArbitary(0, mas.length - 1)).toFixed();
        }
        while ((masrand.indexOf(String(rand))) !== -1 || Number.isInteger(rand));
        masrand.push(rand);
        newcentor[i] = mas[rand];
    }
    return newcentor;
}
function getRandomArbitary(min, max) {
    return Math.random() * (max - min) + min;
}
