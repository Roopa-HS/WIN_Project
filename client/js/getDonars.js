

function showTable(records){
    //event.preventDefault();
   

    var list = records;
    console.log("show table....",list.length)
    var table = document.getElementById("table")
    if(list.length > 0) {
    for(var i=0;i<list.length;i++){
        var record = list[i]
        console.log("record: ",record)

        var newRow = document.createElement("tr")
       
        var cell1 = newRow.insertCell(0)
        var cell2 = newRow.insertCell(1)
        var cell3 = newRow.insertCell(2)
        var cell4 = newRow.insertCell(3)
        var cell5 = newRow.insertCell(4)
        var cell6 = newRow.insertCell(5)
        var cell7 = newRow.insertCell(6)
       cell1.innerHTML = record.firstname
       cell2.innerHTML = record.lastname
       cell3.innerHTML = record.age
       cell4.innerHTML = record.email
       cell5.innerHTML = record.phone
       cell6.innerHTML = record.donorid
       cell7.innerHTML = record.bloodgroup
     

       table.appendChild(newRow)

    }
 }

}

window.onload = function(){
    getList()
}


// function deleteRecord(record){
//     fetch('http://localhost:9000/user/deleteRecord',{
//    method:"post",
//    headers: {
//    'Accept': 'application/json',
//    'Content-Type': 'application/json'
//    },
//    body:JSON.stringify(record)
//    }).then(function(response){
//    return response.json()
//    }).then(function(records){
//        if(records.message = "Record Deletion Successfully") {
//         localStorage.removeItem("editrecord");
//           console.log("After deletion",records)
//           var table = document.getElementById("table")
//           var tableRows = document.getElementsByTagName("tr")
//          console.log(tableRows)
//          for(var j=0;j<tableRows.length;j++){
//         table.deleteRow(j)
//        }

//           getList()
//        }
//    })
// }
function getList(){
    fetch('http://localhost:7700/user/getdonorlist',{
   method:"get",
   headers: {
   'Accept': 'application/json',
   'Content-Type': 'application/json'
   }
   }).then(function(response){
   return response.json()
   }).then(function(records){
     
        showTable(records.data)
     //}
    //  else{
    //     //alert("Hospital Registration Records Not Available")
    //     var table = document.getElementById("table")
    //     var span = document.getElementById("norecords")
    //     norecords.innerHTML = "No Records Availble"
    //    // table.appendChild(span)
    //  }
   })
  }
