function forel(mas, R) {
    var i;
    var k = 0;
    var j;
    var mas1 = [];
    var clusters = [];
    var centers = [];
    var nears = [];
    var temp = [];
    for (i = 0; i < mas.length; i++) {
        mas1[i] = mas[i];
    }
    while (isClusterNotDone(mas1.length !== 0)) {
        var current_object = getRandom(mas1);
        var neighbour_objects = getNext(mas1, current_object, R);
        var center_object = getCenter(neighbour_objects);
        while (center_object[0] != current_object[0] && center_object[1] != current_object[1]) {
            current_object = center_object;
            neighbour_objects = getNext(mas1, current_object, R);
            center_object = getCenter(neighbour_objects);
            if (k > 3) {
                break;
            }
            k++;
        }


        nears = getNext(mas1, current_object, R);

        clusters.push(nears);


        centers.push(center_object);

        mas1 = deleteObjects(mas1, neighbour_objects);
    }
    plotgraf(clusters, centers, temp);
}
function isClusterNotDone(mas1) {
    return mas1 != [];
}
function getRandom(mas1) {
    var rand;
    if (mas1.length > 1) {
        rand = getRandomArbitary(0, mas1.length - 1).toFixed();
        return mas1[rand];
    }
    else {
        return mas1[0];
    }
}
function getNext(mas1, object, R) {
    var i;
    var temp = [];
    var d;
    for (i = 0; i < mas1.length; i++) {
        d = Math.min(Math.abs(mas1[i][0] - object[0]), Math.abs(mas1[i][1] - object[1]));
        if (d <= R) {
            temp.push(mas1[i]);
        }
    }
    return temp;
}
function getCenter(neighbour_objects) {
    var i;
    var sumx = 0;
    var sumy = 0;
    var x;
    var y;
    var center;
    for (i = 0; i < neighbour_objects.length; i++) {
        sumx += Number(neighbour_objects[i][0]);
        sumy += Number(neighbour_objects[i][1]);
    }
    x = sumx / neighbour_objects.length;
    y = sumy / neighbour_objects.length;
    center = [x, y];
    return center;
}
function deleteObjects(mas1, neighbour_objects) {
    var tempmas = [];
    while (neighbour_objects.length !== 0) {
        tempmas = deleteObject(mas1, neighbour_objects);
        mas1 = tempmas[0];
        neighbour_objects = tempmas[1];
    }
    return mas1;
}
function deleteObject(mas1, neighbour_objects) {
    var i;
    var temp = [];
    var length = mas1.length;
    for (i = 0; i < length; i++) {
        if (mas1[i][0] == neighbour_objects[0][0] && mas1[i][1] == neighbour_objects[0][1]) {
            tempmas = mas1.slice(0, i).concat(mas1.slice(i + 1, mas1.length));
            neighbour_objects.shift();
            temp.push(tempmas);
            temp.push(neighbour_objects);
            break;
        }
    }
    return temp;
}
