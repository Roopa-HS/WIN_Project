function showDonors(event){
    event.preventDefault()
    var sel=document.getElementById("blood_grp");
    var opt =sel.options[sel.selectedIndex] ;
    if(sel.options[sel.selectedIndex]){
       // alert("You have registerd successfully!!!Please login to donate the Blood")
       alert("Yes Donor with this blood group "+opt.value+" is available in your location. You can reach us!!!S.");
             window.location = "donors.html"
        
      console.log(opt.value);
         fetch( 'http://localhost:2000/user/allDonors',{ 
          method: 'get', 
          headers: { 
          'Accept' : 'application/json' , 
          'Content-Type' : 'application/json' 
          }, 
          body:JSON.stringify(show) 
          }).then( function (response){ 
          return response.json() 
          }).then( function (data){ 
          console.log( ">>>>>>>>" , data) 
          
          if(data.message=="Donars FOUND"){
             alert("Yes Donor with this blood group "+opt.value+" is availale in your location. You can reach out in our contact us page.");
             window.location ="donars.html"
            }
          }).catch(function(err){
              console.log("Error from backend",err);
              
          })   
      
      }
      else{
          alert("Currently Donors are not available for the given blood group...");
          return false;
      }
    }



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
           cell1.innerHTML = record.userName
           cell2.innerHTML = record.phoneNumber
           cell3.innerHTML = record.typeGender
           cell4.innerHTML = record.email
           cell5.innerHTML = record.blood_grp
           cell6.innerHTML = record.state
           cell7.innerHTML = record.city
         
    
           table.appendChild(newRow)
    
        }
     }
    
    }
    
    window.onload = function(){
        getList();

    }

        function getList(){
            fetch('http://localhost:2000/user/getdonorlist',{
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
        