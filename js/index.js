var mytable = "<table cellpadding=\"0\" cellspacing=\"0\"><tbody><tr>";
var currentId;
var selectedValues = [];
var selectedIds = [];
var targetIds = []
var sum = 0
var rows= 7
var columns=7
for (var i = 1; i <= rows; i++) {
    let col = "";
    for (var j = 1; j <= columns; j++) {
        // console.log(i + "" + j)
        col += `<td ` + "id=" + i + "" + j + ` ` + "onclick=selectValue(" + i + "" + j + ")" + `> 
                <input type="text" name="FirstName" value=` + i + j + `>  </td>`
    }
    mytable += "<tr>" + col + "</tr>";
}

mytable += "</tr" + "onclick=getRowIndex(this)" + "></table>";
document.write(mytable);
function  showTable() {
        for (var i = 1; i <= rows; i++) {
        let col = "";
        for (var j = 1; j <= columns; j++) {
            // console.log(i + "" + j)
            col += `<td ` + "id=" + i + "" + j + ` ` + "onclick=getValue(" + i + "" + j + ")" + `> 
                <input type="text" name="FirstName" value=` + i + j + `>  </td>`
        }
        mytable += "<tr>" + col + "</tr>";
    }

    mytable += "</tr" + "onclick=getRowIndex(this)" + "></table>";
    document.write(mytable);
}

// setter for rows and columns
var setRows=(Rows)=>{
    
    rows=Rows
    console.log(Rows)
    showTable()
}
var setColumns = (Columns) => {
    columns = Columns
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
    var evtobj = window.event ? event : e
    var Row = document.getElementById(currentId);
    var Cells = Row.getElementsByTagName("input");
    // console.log(evtobj)
    if (evtobj.keyCode == 67 && evtobj.ctrlKey) { // on copy
        // console.log(currentId);
        if (selectedIds.length != 0) {
            var textarea = document.createElement("textarea");
            textarea.textContent = selectedIds;
            textarea.style.position = "fixed";
            document.body.appendChild(textarea);
            textarea.select();
            try {
                
                return document.execCommand("copy");
            } catch (ex) {
                console.warn("Copy to clipboard failed.", ex);
                return false;
            } finally {
                selectedIds = [];
                document.body.removeChild(textarea);
            }
        } else {
            // console.log(Cells[0]);
            Cells[0].select();
            document.execCommand("copy");
        }

    } else if (evtobj.keyCode == 88 && evtobj.ctrlKey) { // on cut
        // console.log(currentId);
        if (selectedIds.length != 0) {

            selectedIds.forEach((id, index) => {
                // console.log(id)
                document.getElementById(id).style.border = "1px solid #0000FF";
                let idTag = document.getElementById(id)
                let tag = idTag.getElementsByTagName('input')
                tag[0].select()
                // tag.select()
                document.execCommand('cut')
                
            })
            
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
    } else if (evtobj.ctrlKey && evtobj.keyCode == 86 && targetIds.length == 0 ) { // paste
        // let id = document.getElementById(11)
        // let tag = id.getElementsByTagName('input')
        // tag[0].value()
        // document.execCommand("paste");
        
        e.stopPropagation();
        e.preventDefault();
        targetIds.push(currentId)
        selectedIds.forEach((id, index) => {
            if (index > 0) {
                console.log(selectedIds[index] - selectedIds[0])
                targetIds.push(targetIds[0] + (selectedIds[index] - selectedIds[0]))
            }
        })
        console.log(targetIds)
        console.log(selectedValues)
        targetIds.forEach((id, index) => {
            let idTag = document.getElementById(id)
            let tag = idTag.getElementsByTagName('input')
            tag[0].value = selectedValues[index]
        })
        sumOfSelected()
    }
}

var sumOfSelected = () => {
    selectedIds.forEach((value) => {
        sum += value
    })
    console.log(sum)
    sum = 0;
}
document.onkeydown = KeyPress;
document.onclick = KeyPress;