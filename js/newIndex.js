var currentId;
var selectedValues = [];
var selectedIds = [];
var targetIds = []
var sum = 0
var Rows
var Cells
var initialId
var finalId

function Cell() {
    this.color = 'white'
    this.row
    this.column

    var cell = document.createElement('div')
    cell.style.width = 'max-content';
    cell.style.position = 'relative'

    cell.setAttribute('border', '1');
    cell.setAttribute('value', '1');
    cell.setAttribute('onmouseover', 'onMouseOver()')
    var input = document.createElement('input')
    input.style.width = '100%';
    input.style.textAlign = 'center';
    input.style.background = this.color

    this.setInputOnclick = function (data) {
        // console.log(data)
    }
    this.setInputValue = function (value) {
        input.setAttribute('value', value)
    }

    this.setInputOnChange = function () {
        input.setAttribute('onchange', 'changed()')
    }

    this.setId = function (id) {
        // console.log(id)
        cell.setAttribute("id", id);
    }


    this.setOnClick = function (id) {
        cell.setAttribute('onclick', " selectValue(" + id + ")")
    }

    this.appendInput = function () {
        cell.appendChild(input)
    }
    this.getCell = function () {
        return cell
    }
    this.appendChild = function (id) {
        console.log('here')
        var selectionCell = new SelectionCell()
        selectionCell.setId(id)
        selectionCell.setBackground(id)
        selectionCell.setInputValue(id)
        selectionCell.appendInput()
        var select = selectionCell.getCell()
        // console.log(select)
        cell.style.zIndex = '1'
        cell.style.opacity='0.9'
        cell.appendChild(select)
    }

}

function SelectionCell() {
    this.color = 'cyan'
    this.row
    this.column
    var cell = document.createElement('div')
    cell.style.width = 'max-content';
    cell.style.height='100%'
    cell.style.position = 'relative'
    cell.setAttribute('border', '1');
    cell.setAttribute('value', '1');
    cell.setAttribute('onmouseover', 'onMouseOver()')
    var input = document.createElement('input')
    input.style.width = '100%';
    input.style.background='cyan'
    input.style.textAlign = 'center';
    input.style.background = this.color
    this.setInputValue = function (value) {
        // input.setAttribute('value', value)
        
    }
    this.setId = function (id) {
        // console.log(id)
        cell.setAttribute("id", id);
    }
    this.appendInput = function () {
        cell.appendChild(input)
    }
    this.getCell = function () {
        return cell
    }
    this.setBackground = function (id) {

        cell.style.background = '#a0c3ff'
        cell.style.zIndex = '0'
        cell.style.opacity = '0.20'
        cell.style.top = ' 0px'
        cell.style.left = ' 0px'
        cell.style.position = 'absolute'
        cell.style.display='none'
    }
}

function Table() {
    this.data = []
    this.idRowColumn = {}
    this.getRows = function () {

        return parseInt(this.rows)
    };
    this.getColumns = function () {
        console.log(this.columns)
        return this.columns
    };
    this.setRows = function (row) {
        save.saveCells(newTable.tableData())
        console.log(row)
        this.rows = row;
        save.saveRows(row)
    };
    this.setColumns = function (column) {
        save.saveCells(newTable.tableData())
        console.log(column)
        this.columns = column;
        save.saveColumns(column)
    };
    this.makeTable = function () {
        this.idRowColumn = {}
        var table = document.getElementById('table');
        var oldTable = document.getElementById("table");
        while (oldTable.hasChildNodes()) {
            oldTable.removeChild(oldTable.firstChild);
        }
        for (var i = 1; i <= this.rows; i++) {
            var row = document.createElement("div");
            for (var j = 1; j <= this.columns; j++) {
                // console.log("hi")
                var newCell = new Cell()
                // var selectionCell = new SelectionCell()
                // selectionCell.setId(i + "" + j + i + "" + j)
                // selectionCell.setBackground(i + "" + j + i + "" + j)
                // selectionCell.setInputValue(i + "" + j + i + "" + j)
                // selectionCell.appendInput()
                newCell.setId(i + "" + j)
                newCell.setOnClick(i + "" + j)
                newCell.setInputValue(i + "" + j)
                newCell.setInputOnChange()
                newCell.setInputOnclick(newCell)
                newCell.appendInput()
                newCell.appendChild(i + "" + j + i + "" + j)
                var cell = newCell.getCell()
                // var selectionCell = selectionCell.getCell()
                // console.log(i + "" + j + i + "" + j)
                // console.log(cell)

                row.appendChild(cell);
                // row.appendChild(selectionCell)
                row.style.display = 'flex'
                let idRow = i
                let idColumn = j
                this.idRowColumn[i + '' + j] = {
                    'row': idRow,
                    'column': idColumn
                }
            }
            // console.log(i)
            table.appendChild(row)
        }
    };
    this.savedTable = function (data) {
        this.idRowColumn = {}
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
        for (var i = 1; i <= this.rows; i++) {
            var row = document.createElement("div");
            for (var j = 1; j <= this.columns; j++) {
                // console.log('inside saved table')
                var newCell = new Cell()
                
                // console.log((i + "" + j) + 1)
                // debugger
                // console.log(data[count]);

                if (data[count] && Object.keys(data[count]) == i + "" + j) {

                    newCell.setInputValue(Object.values(data[count]))
                    count++
                } else {

                    newCell.setInputValue(i + "" + j)
                }

                newCell.setInputOnChange()
                newCell.appendInput()
                newCell.appendChild(i + "" + j + i + "" + j)
                var cell = newCell.getCell()
                
                // console.log(cell)
                row.appendChild(cell);
                row.appendChild(selectionCell)
                row.style.display = 'flex'
                let idRow = i
                let idColumn = j
                this.idRowColumn[i + '' + j] = {
                    'row': idRow,
                    'column': idColumn
                }
            }
            // console.log(i)
            table.appendChild(row)
        }
    };
    this.sum = function () {
        sum = 0;
        selectedIds.forEach((value) => {
            let idTag = document.getElementById(value)
            let tag = idTag.getElementsByTagName('input')
            if (!isNaN(parseFloat(tag[0].value)) && isFinite(tag[0].value)) {
                sum += JSON.parse(tag[0].value)
            } else {
                document.getElementById('Sum').value = 0
            }
        })
        console.log(sum)
        document.getElementById('Sum').value = sum
    }
    this.tableData = function () {
        this.data = []
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
        console.log(this.data)
        return this.data
    }
    this.changed = function () {
        let idTag = document.getElementById(value)
        let tag = idTag.getElementsByTagName('input')
        console.log(tag[0].value)
    }
    this.isNumber = function (number) {
        return !isNaN(parseFloat(number)) && isFinite(number);
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
        // debugger
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
    newTable.rows = 4
}
if (window.localStorage.getItem('columns')) {
    newTable.columns = window.localStorage.getItem('columns')
} else {
    newTable.columns = 4
}
document.addEventListener('DOMContentLoaded', function () {
    if (window.localStorage.getItem('data')) {
        var con = JSON.parse(window.localStorage.getItem('data'))
        newTable.savedTable(con);
        // newTable.makeTable();
        console.log(con)
    } else {
        newTable.makeTable();
    }
})

var changed = () => {
    save.saveCells(newTable.tableData())
}
var changeColor = (data) => {
    console.log(data)
}
var onMouseOver = () => {

    if (window.event.which == 1) {
        event.preventDefault();


        var newFinalId = event.target.parentElement.id

        console.log("1", "initial :-", initialId, "newfinal :-", newFinalId, "final :-", finalId)
        // dragSelect(initialId, newFinalId)
        // console.log(newTable.idRowColumn[initialId].row, newTable.idRowColumn[initialId].row)
        // console.log(newTable.idRowColumn[finalId].row, newTable.idRowColumn[finalId].row)
        if (initialId && newFinalId) {
            if (!finalId) {
                finalId = newFinalId
                console.log("2", newFinalId, finalId)
            }
            var initialRow = newTable.idRowColumn[initialId].row
            var initialCol = newTable.idRowColumn[initialId].column
            var finalRow = newTable.idRowColumn[finalId].row
            var finalCol = newTable.idRowColumn[finalId].column
            var newFinalRow = newTable.idRowColumn[newFinalId].row
            var newFinalCol = newTable.idRowColumn[newFinalId].column

            if (finalCol >= initialCol && finalRow >= initialRow) { // case 1
                if (newFinalRow < finalRow) {
                    //remove selection
                    removeSelections(newFinalRow, finalRow, 'row')
                    finalId = newFinalId
                }
                if (newFinalCol < finalCol) {
                    //remove selection
                    removeSelections(newFinalCol, finalCol, 'column')
                    finalId = newFinalId
                }
                if (newFinalRow >= finalRow) {
                    //drag and select\
                    finalId = newFinalId
                    dragSelect(initialId, finalId)
                }
                if (newFinalCol >= finalCol) {
                    //drag and select
                    finalId = newFinalId
                    dragSelect(initialId, finalId)
                }

            }
            if (finalCol >= initialCol && finalRow <= initialRow) { // case 2
                if (newFinalRow > finalRow) {
                    //remove selection
                    removeSelections(finalRow, newFinalRow, 'row')
                    finalId = newFinalId
                }
                if (newFinalCol < finalCol) {
                    //remove selection
                    removeSelections(newFinalCol, finalCol, 'column')
                    finalId = newFinalId
                }
                if (newFinalRow <= finalRow) {
                    //drag and select\
                    finalId = newFinalId
                    dragSelect(initialId, finalId)
                }
                if (newFinalCol >= finalCol) {
                    //drag and select
                    finalId = newFinalId
                    dragSelect(initialId, finalId)
                }

            }
            if (finalCol <= initialCol && finalRow <= initialRow) { // case 3 
                console.log('inside case 3 ')
                if (newFinalRow > finalRow) {
                    //remove selection
                    removeSelections(finalRow, newFinalRow, 'row')
                    finalId = newFinalId
                }
                if (newFinalCol > finalCol) {
                    //remove selection
                    removeSelections(finalCol, newFinalCol, 'column')
                    finalId = newFinalId
                }
                if (newFinalRow <= finalRow) {
                    //drag and select\
                    finalId = newFinalId
                    dragSelect(initialId, finalId)
                }
                if (newFinalCol <= finalCol) {
                    //drag and select
                    finalId = newFinalId
                    dragSelect(initialId, finalId)
                }

            }
            if (finalCol <= initialCol && finalRow >= initialRow) { // case 4
                if (newFinalRow < finalRow) {
                    //remove selection
                    removeSelections(newFinalRow, finalRow, 'row')
                    finalId = newFinalId
                }
                if (newFinalCol > finalCol) {
                    //remove selection
                    removeSelections(finalCol, newFinalCol, 'column')
                    finalId = newFinalId
                }
                if (newFinalRow >= finalRow) {
                    //drag and select\
                    finalId = newFinalId
                    dragSelect(initialId, finalId)
                }
                if (newFinalCol <= finalCol) {
                    //drag and select
                    finalId = newFinalId
                    dragSelect(initialId, finalId)
                }

            }


        }

    }
}
var removeSelections = (start, end, type) => {

    console.log("inside remove", start, end, type)


    for (i = start + 1; i <= end; i++) {
        var copy = selectedIds
        copy.forEach((a) => {
            // console.log('22',newTable.idRowColumn['22'][type] ==i)
            // console.log('a',newTable.idRowColumn[a][type] == i)
            console.log(selectedIds, a)
            if (newTable.idRowColumn[a][type] == i) {
                // console.log("check", selectedIds, a)
                var index = selectedIds.indexOf(a)
                // console.log(index)
                if (index > -1) {
                    // console.log("here")
                    selectedIds.splice(index, 1);
                    selectedValues.splice(index, 1)
                    console.log(selectedIds, selectedValues)
                    // document.getElementById(a).style.border = "none";
                    document.getElementById(a).getElementsByTagName('input')[0].style.background = "#ffffff";
                }
            }
        })
    }


}
var dragSelect = (initialId, finalId) => {
    var rowStart = newTable.idRowColumn[initialId].row
    var rowEnd = newTable.idRowColumn[finalId].row
    var colStart = newTable.idRowColumn[initialId].column
    var colEnd = newTable.idRowColumn[finalId].column
    // console.log(initialId,finalId)
    // console.log(newTable.idRowColumn[initialId].row, newTable.idRowColumn[initialId].column)
    // console.log(newTable.idRowColumn[finalId].row, newTable.idRowColumn[finalId].column)
    if (newTable.idRowColumn[initialId].row > newTable.idRowColumn[finalId].row) {
        rowStart = newTable.idRowColumn[finalId].row
        rowEnd = newTable.idRowColumn[initialId].row
    }

    if (newTable.idRowColumn[initialId].column > newTable.idRowColumn[finalId].column) {
        colStart = newTable.idRowColumn[finalId].column
        colEnd = newTable.idRowColumn[initialId].column
    }
    for (let i = rowStart; i <= rowEnd; i++) {
        for (let j = colStart; j <= colEnd; j++) {
            // console.log("inside loop")
            Row = document.getElementById(i + '' + j);
            Cells = Row.getElementsByTagName("input");
            // console.log(Cells[0].value)
            Cells[0].select();
            // console.log(window.getSelection().getRangeAt(0))    imp
            // window.getSelection().removeRange(window.getSelection().getRangeAt(0))
            // console.log(window.getSelection())

            //      
            if (!selectedIds.includes(i + '' + j)) {
                selectedValues.push(Cells[0].value)
                selectedIds.push(i + '' + j)
                // selectedIds.splice(0, 1)    imp
                // console.log(Cells[0])
                selectedIds.forEach((id, index) => {
                    // console.log(id)
                    // document.getElementById(id).getElementsByTagName('input')[0].style.background = "#0000FF";
                    document.getElementById(id+id).style.display='block'
                })
            }
        }

    }
}

var selectValue = (id) => {
    currentId = id;
    Row = document.getElementById(id);
    Cells = Row.getElementsByTagName("input");
    console.log(id);
    Cells[0].select();
    // console.log(window.getSelection());
    initialId = id
}


// key press events
var KeyPress = (e) => {
    // e.stopPropagation();
    // e.preventDefault();
    // console.log(e.target)
    var evtobj = window.event ? event : e
    // var Row = document.getElementById(currentId);
    // var Cells = Row.getElementsByTagName("input");
    // console.log(evtobj)
    if (evtobj.keyCode == 67 && evtobj.ctrlKey) { // on copy
        console.log(currentId);
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
            console.log(Cells[0]);
            Cells[0].select();
            return document.getElementById('clipboard').innerHTML = getSelection()
        }

    } else if (evtobj.keyCode == 88 && evtobj.ctrlKey) { // on cut
        // console.log(currentId);
        if (selectedIds.length != 0) {
            var cutCells = []
            selectedIds.forEach((id, index) => {
                // console.log(id)
                // document.getElementById(id).getElementsByTagName('input')[0].style.background = "#0000FF";
                document.getElementById(id+id).style.display='block'

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
            document.execCommand("cut");
            save.saveCells(newTable.tableData())
        }

    } else if (evtobj.ctrlKey && window.event.which == 1) { // ctrl+select(works with mouse)
        if (!selectedIds.includes(i + '' + j)) {
            selectedValues.push(Cells[0].value)
            selectedIds.push(currentId)
            // console.log(Cells[0])
            selectedIds.forEach((id, index) => {
                // console.log(id)
                // document.getElementById(id).getElementsByTagName('input')[0].style.background = "#0000FF";
                document.getElementById(id+id).style.display='block'
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
            document.getElementById(id).getElementsByTagName('input')[0].style.background = "white";
        })
        save.saveCells(newTable.tableData())
        selectedIds = []
        selectedValues = []
        targetIds = []
    }

}

document.onkeydown = KeyPress;
document.onclick = KeyPress;