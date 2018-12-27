var currentId;
var selectedValues = [];
var selectedIds = [];
var targetIds = []
var sum = 0
var Rows
var Cells

function Table() {
    this.data = []
    this.rows
    this.columns
    this.getRows = function () {

        return parseInt(this.rows)
    };
    this.getColumns = function () {
        console.log(this.columns)
        return this.columns
    };
    this.setRows = function (row) {
        console.log(row)
        this.rows = row;
        save.saveRows(row)
    };
    this.setColumns = function (column) {
        console.log(column)
        this.columns = column;
        save.saveColumns(column)
    };
    this.makeTable = function () {
        var oldTable = document.getElementById("table");
        while (oldTable.hasChildNodes()) {
            oldTable.removeChild(oldTable.firstChild);
        }
        // console.log(this.rows)
        // console.log(this.columns)
        var table = document.getElementById('table');
        var tbl = document.createElement('table');
        tbl.style.width = 'max-content';
        tbl.setAttribute('border', '1');
        var tbdy = document.createElement('tbody');
        for (var i = 1; i <= this.rows; i++) {
            var tr = document.createElement('tr');
            tr.style.width = '100%';
            for (var j = 1; j <= this.columns; j++) {

                var td = document.createElement('td');
                td.setAttribute("id", i + "" + j);
                td.setAttribute('onclick', " selectValue(" + i + "" + j + ")")
                var input = document.createElement('input')
                input.style.width = '100%';
                input.style.textAlign = 'center';
                input.setAttribute('value', i + "" + j)
                td.appendChild(input)
                tr.appendChild(td)
            }
            tbdy.appendChild(tr);
        }
        tbl.appendChild(tbdy);
        table.appendChild(tbl)
    };
    this.savedTable = function (data) {
        var count = 0
        console.log(this.rows)
        console.log(this.columns)
        var oldTable = document.getElementById("table");
        while (oldTable.hasChildNodes()) {
            oldTable.removeChild(oldTable.firstChild);
        }
        // console.log(this.rows)
        // console.log(this.columns)
        var table = document.getElementById('table');
        var tbl = document.createElement('table');
        tbl.style.width = 'max-content';
        tbl.setAttribute('border', '1');
        var tbdy = document.createElement('tbody');
        for (var i = 1; i <= this.rows; i++) {

            var tr = document.createElement('tr');
            tr.style.width = '100%';
            for (var j = 1; j <= this.columns; j++) {
                console.log('inside saved table')
                var td = document.createElement('td');
                td.setAttribute("id", i + "" + j);
                td.setAttribute('onclick', " selectValue(" + i + "" + j + ")")
                var input = document.createElement('input')
                input.style.width = '100%';
                input.style.textAlign = 'center';
                // console.log((i + "" + j) + 1)
                // debugger
                console.log(count, Object.values(data[count]))
                input.setAttribute('value', Object.values(data[count]))
                td.appendChild(input)
                tr.appendChild(td)
                count++
            }
            tbdy.appendChild(tr);
        }
        tbl.appendChild(tbdy);
        table.appendChild(tbl)
    };
    this.sum = function () {
        sum = 0;
        selectedIds.forEach((value) => {
            let idTag = document.getElementById(value)
            let tag = idTag.getElementsByTagName('input')
            sum += JSON.parse(tag[0].value)
        })
        console.log(sum)
        document.getElementById('Sum').value = sum
    }
    this.tableData = function () {
        this.data=[]
        for (let i = 1; i <= this.rows; i++) {
            for (let j = 1; j <= this.columns; j++) {
                let tr = document.getElementById(i + '' + j)
                // console.log(document.getElementById(i + '' + j))
                let value = tr.getElementsByTagName('input')[0].value
                let dat = {}
                dat[i + "" + j] = value
                this.data.push(dat)
            }
        }
        // console.log(this.data)
        return this.data
    }
}

function AutoSave() {
    this.saveRows = function (rows) {
        window.localStorage.removeItem('rows')
        window.localStorage.setItem('rows', rows)
    };
    this.saveColumns = function (columns) {
        window.localStorage.removeItem('columns')
        window.localStorage.setItem('columns', columns)
    }
    this.saveCells = function (data) {
        console.log(data);
        window.localStorage.removeItem('data')
        window.localStorage.setItem('data', JSON.stringify(data))
        console.log(window.localStorage.getItem('data'))
    }
}

let newTable = new Table()
let save = new AutoSave()
if (window.localStorage.getItem('rows')) {
    newTable.rows = window.localStorage.getItem('rows')

} else {
    newTable.rows = 2
}
if (window.localStorage.getItem('columns')) {
    newTable.columns = window.localStorage.getItem('columns')
} else {
    newTable.columns = 2
}
document.addEventListener('DOMContentLoaded', function () {
    // newTable.rows = document.getElementById('r').value
    // newTable.columns = document.getElementById('c').value
    // console.log(parseInt(newTable.getColumns()))
    if (window.localStorage.getItem('data')) {
        var con = JSON.parse(window.localStorage.getItem('data'))
        newTable.savedTable(con);
        console.log(con)
        // debugger 
    } else {
        newTable.makeTable();
    }

    // console.log(newTable.tableData());
})

var selectValue = (id) => {
    currentId = id;
    Row = document.getElementById(id);
    Cells = Row.getElementsByTagName("input");
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
    // var Row = document.getElementById(currentId);
    // var Cells = Row.getElementsByTagName("input");
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
            save.saveCells(newTable.tableData())
            document.getElementById('clipboard').innerHTML = cutCells


        } else {
            // console.log(Cells[0]);
            Cells[0].select();
            document.execCommand("cur");
            save.saveCells(newTable.tableData())
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
        save.saveCells(newTable.tableData())
        selectedIds = []
        selectedValues = []
        targetIds = []
    }

}

document.onkeydown = KeyPress;
document.onclick = KeyPress;