var instances;
var evidences;
var inputMatrix;

var excludedEvidences;
var excludedInstances;

$(document).ready(function () {
    instances = ["I / E"];
    evidences = ["I / E"];
    excludedEvidences = [];
    excludedInstances = [];

    $('#instanceNewBtn').click(function () {
        var instanceInput = $('#instanceInput');
        pushElement(instances, instanceInput);
    });

    $('#evidenceNewBtn').click(function () {
        var evidenceInput = $('#evidenceInput');
        pushElement(evidences, evidenceInput);
    });

    $('#controls').find('button').click(function () {
        initColor();
    });
});

function showDialog(minRow) {
    colorRow(minRow, 'green');

    var dialog = $('#dialog-confirm');
    dialog.find('p b').html(evidences[minRow + 1]);

    dialog.dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
            "Yes": function () {
                $(this).dialog("close");
                excludeInstances(minRow, true);
            },
            "No": function () {
                $(this).dialog("close");
                excludeInstances(minRow, false);
            }
        }
    });
}

function excludeInstances(rowIndex, evidenceExists) {
    excludedEvidences.push(rowIndex);
    $.each(inputMatrix[rowIndex], function (i, val) {
        if ((evidenceExists && val == 0) || (!evidenceExists && val == 1)) {
            excludedInstances.push(i);
        }
    });

    $.each(excludedInstances, function (i, val) {
        $('.column-' + val + ' input:not(:disabled)').css('background-color', 'lightcoral');
    });
    setTimeout(spliceMatrix, 5000);
}

function spliceMatrix() {
    debugger;
    $.each(inputMatrix, function (i, row) {
        var deleted = 0;
        $.each(excludedInstances, function (j, val) {
            row.splice(val - deleted, 1);
            deleted++;
        })
    });
    debugger;
    var deleted = -1;
    $.each(excludedInstances, function (j, val) {
        instances.splice(val - deleted, 1);
        deleted++;
    });
    excludedInstances = [];
    debugger;

    deleted = 0;
    $.each(excludedEvidences, function (i, evidence) {
        inputMatrix.splice(evidence - deleted, 1);
        deleted++;
    });
    debugger;
    deleted = -1;
    $.each(excludedEvidences, function (i, val) {
        evidences.splice(val - deleted, 1);
        deleted++;
    });
    excludedEvidences = [];

    drawTable(inputMatrix);
}

function pushElement(array, element) {
    element.val(element.val().toLowerCase());
    if (array.indexOf(element.val()) != -1) {
        alert("Element <" + element.val() + "> already exists")
    } else {
        if (element.val() != "") {
            array.push(element.val());
            element.val('');
        }
    }

    inputMatrix = createArray(evidences.length - 1, instances.length - 1);
    $.each(inputMatrix, function (i, row) {
        $.each(row, function (j) {
            inputMatrix[i][j] = Math.floor(Math.random() * 2);
        })
    });

    drawTable(inputMatrix);
}

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while (i--) arr[length - 1 - i] = createArray.apply(this, args);
    }

    return arr;
}

function rowSum(row) {
    return row.reduce(function (a, b) {
        return a + b;
    });
}

function initColor() {
    excludedEvidences = [];
    $.each(inputMatrix, function (i, val) {
        if (rowSum(val) == 0) {
            excludedEvidences.push(i);
        }
    });
    colorRowsAndFindMin();
}

function colorRowsAndFindMin() {
    var min = inputMatrix.length;
    var minRow = -1;

    $.each(inputMatrix, function (i, val) {
        colorRow(i, 'white');

        if (excludedEvidences.indexOf(i) == -1) {
            var minSum = rowSum(val);
            if (minSum < min) {
                min = minSum;
                minRow = i;
            }
        } else {
            colorRow(i, 'lightcoral');

        }
    });

    showDialog(minRow);

}

function colorRow(rowIndex, color) {
    $('#rowIndex-' + rowIndex + ' input:not(:disabled)').css('background-color', color)
}

function drawTable(inputMatrix) {
    var outputGrid = $('#outputGrid');
    outputGrid.html('');

    $.each(evidences, function (i, evidence) {
        var rowId = "rowIndex-".concat((i - 1).toString());
        var $row = $('<div>', {id: rowId, "class": "row"});
        outputGrid.append($row);
        $.each(instances, function (j, instance) {
            var row = $('#' + rowId);
            var $div = $('<div>', {"class": "col-sm-1 column-" + (j - 1)});
            var $input = $('<input>', {
                value: i == 0 ? instance :
                    (j == 0 ? evidence : inputMatrix[i - 1][j - 1])
            });
            if (i == 0 || j == 0) {
                $input.prop('disabled', true);
            } else {
                $input.on("change", function () {
                    inputMatrix[i - 1][j - 1] = parseInt($(this).val());
                });
            }
            if ($input.val() != "") {
                $div.append($input);
                row.append($div);
            }
        });
    });
}