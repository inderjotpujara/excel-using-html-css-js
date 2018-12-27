var mytable 
var currentId;
var selectedValues = [];
var selectedIds = [];
var targetIds = []
var sum = 0
var rows = 7
var columns = 7
var div



function showTable() {
    // var myTable = document.getElementById("table");
    // console.log(myTable)
    // myTable.removeChild(myTable.childNodes[0])
    var table = document.getElementById('table');
    console.log(table)
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');
    for (var i = 1; i <= rows; i++) {
        var tr = document.createElement('tr');
        for (var j = 1; j <= columns; j++) {

            var td = document.createElement('td');
            td.setAttribute("id", i + "" + j);
            td.setAttribute('onclick', " selectValue(" + i + "" + j + ")")
            var input = document.createElement('input')
            input.setAttribute('value', i + "" + j)
            td.appendChild(input)
            tr.appendChild(td)

        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    table.appendChild(tbl)
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('hi')
    // div = document.getElementById('setCol');
    // // debugger
    // div.insertAdjacentHTML('afterend', mytable)
    var table = document.getElementById('table');
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');
    for (var i = 1; i <= rows; i++) {
        var tr = document.createElement('tr');
        for (var j = 1; j <= columns; j++) {

            var td = document.createElement('td');
            td.setAttribute("id", i + "" + j);
            td.setAttribute('onclick', " selectValue(" + i + "" + j + ")")
            var input = document.createElement('input')
            input.setAttribute('value', i + "" + j)
            td.appendChild(input)
            tr.appendChild(td)

        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    table.appendChild(tbl)
})

// setter for rows and columns
var setRows = (Rows) => {
    rows = Rows
     var myTable = document.getElementById("table");
     while (myTable.hasChildNodes()) {
         myTable.removeChild(myTable.firstChild);
     }
    //  console.log(myTable.childNodes[0])
    //  myTable.removeChild(myTable.childNodes[0])
    showTable()

}
var setColumns = (Columns) => {
    columns = Columns
    var myTable = document.getElementById("table");
    while (myTable.hasChildNodes()) {
        myTable.removeChild(myTable.firstChild);
    }
    showTable()
}


// select the  cell
var selectValue = (id) => {
    currentId = id;
    var Row = document.getElementById(id);
    var Cells = Row.getElementsByTagName("input");
    // console.log(Cells[0].value);
    Cells[0].select();
    // document.execCommand("copy");
    // if (window.event) {

    // }
    // console.log(window.event.which)
}


// key press events
var KeyPress = (e) => {
    // e.stopPropagation();
    // e.preventDefault();
    var evtobj = window.event ? event : e
    var Row = document.getElementById(currentId);
    var Cells = Row.getElementsByTagName("input");
    // console.log(evtobj)
    if (evtobj.keyCode == 67 && evtobj.ctrlKey) { // on copy
        // console.log(currentId);
        if (selectedIds.length != 0) {
            console.log(selectedIds)
            var textarea = document.createElement("textarea");
            textarea.textContent = selectedIds;
            textarea.style.position = "fixed";
            document.body.appendChild(textarea);
            // console.log(textarea)
            textarea.select();
            try {
                return document.getElementById('clipboard').innerHTML = getSelection()
                // return document.execCommand("copy");
            } catch (ex) {
                console.warn("Copy to clipboard failed.", ex);
                return false;
            } finally {
                document.body.removeChild(textarea);
            }
        } else {
            // console.log(Cells[0]);
            Cells[0].select();
            return document.getElementById('clipboard').innerHTML = getSelection()
        }

    } else if (evtobj.keyCode == 88 && evtobj.ctrlKey) { // on cut
        // console.log(currentId);
        if (selectedIds.length != 0) {
            var cutCells = []
            selectedIds.forEach((id, index) => {
                // console.log(id)
                document.getElementById(id).style.border = "1px solid #0000FF";
                let idTag = document.getElementById(id)
                let tag = idTag.getElementsByTagName('input')
                tag[0].select()
                // tag.select()
                cutCells.push(getSelection().toString())
                document.execCommand("cut");
            })
            console.log(cutCells)
            document.getElementById('clipboard').innerHTML = cutCells

        } else {
            // console.log(Cells[0]);
            Cells[0].select();
            document.execCommand("copy");
        }

    } else if (evtobj.ctrlKey && window.event.which == 1) { // ctrl+select(works with mouse)
        if (!selectedValues.includes(Cells[0].value)) {
            selectedValues.push(Cells[0].value)
            selectedIds.push(currentId)
            // console.log(Cells[0])
            selectedIds.forEach((id, index) => {
                // console.log(id)
                document.getElementById(id).style.border = "1px solid #0000FF";
            })
        }
    } else if (evtobj.ctrlKey && evtobj.keyCode == 86 && targetIds.length == 0 && document.getElementById('clipboard').innerHTML != 0) { // paste
        // let id = document.getElementById(11)
        // let tag = id.getElementsByTagName('input')
        // tag[0].value()
        // document.execCommand("paste");
        console.log(document.getElementById('clipboard').innerHTML.length)
        e.stopPropagation();
        e.preventDefault();
        targetIds.push(currentId)
        selectedIds.forEach((id, index) => {
            if (index > 0) {
                console.log(selectedIds[index] - selectedIds[0])
                targetIds.push(targetIds[0] + (selectedIds[index] - selectedIds[0]))
            }
        })
        document.getElementById('clipboard').innerHTML = null
        console.log(targetIds)
        console.log(selectedValues)
        targetIds.forEach((id, index) => {
            let idTag = document.getElementById(id)
            let tag = idTag.getElementsByTagName('input')
            tag[0].value = selectedValues[index]
        })
        selectedIds.forEach((id, index) => {
            // console.log(id)
            document.getElementById(id).style.border = 'none';
        })
        selectedIds = []
        selectedValues = []
        targetIds = []
    }

}

var sumOfSelected = () => {
    sum = 0;
    selectedIds.forEach((value) => {
        let idTag = document.getElementById(value)
        let tag = idTag.getElementsByTagName('input')
        sum += JSON.parse(tag[0].value)
    })
    console.log(sum)
    document.getElementById('Sum').value = sum
}
document.onkeydown = KeyPress;
document.onclick = KeyPress;