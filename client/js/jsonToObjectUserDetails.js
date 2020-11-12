// const fs = require('fs');
// const readline = require('readline');


// async function processLineByLine() {
//   const fileStream = fs.createReadStream('users.txt');

//   const rl = readline.createInterface({
//     input: fileStream,
//     crlfDelay: Infinity
//   });

//   var x = document.regPage.emailid.value;
//     var atPos = x.indexOf("@");
//     var dotPos = x.indexOf(".");
//     if (atPos < 1 || dotPos < atPos + 2 || dotPos + 2 >= x.length) {
//         alert("Please enter a valid email address.");
//         return false;
//     }
//   for await (const line of rl) {
//     // Each line in input.txt will be successively available here as `line`.
//     console.log(`Line from file: ${line}`);

//     var objUser=JSON.parse(line);
//     var emailid =document.getElementById('emailid').value
//     if(objUser.email==emailid)
//     {
//       console.log(objUser.userName )
//     document.getElementById("name").value = objUser.userName 
//     document.getElementById("gender").value = objUser.typeGender 
//     document.getElementById("bgroup").value = objUser.blood_group

//     }
//     else{
//       alert("USER INVALID")
//     }

//   }
// }

// //processLineByLine();

function onDonateCall(event) {
  event.preventDefault();
  var a=document.getElementById('weight');
  var b=a.options[a.selectedIndex].value;
  
  if (b =="Under 50"  || document.getElementById('myCheck').checked) {
    alert("Sorry you are not eligible either you are under weight or you have donated blood in last 3 months it's against donation policy")

  } else {
   
    fetch('http://localhost:2000/user/updatedonortrue', {

      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailid)
    }).then(function (response) {
      return response.json()
    }).then(function (data) {
      console.log("inside fetch");
      if (data.message == "Successfully updated Donar Record") {
        alert("You have donated the blood successfully!!!")
        window.open("vcertificate.html");
    
        console.log(data);
      }
    }).catch(function (err) {
      console.log("Error from backend", err);
    })
   

  }

  // var txt = '{"name":"John", "age":30, "city":"New York"}'
  // var obj = JSON.parse(txt);
  // document.getElementById("demo").innerHTML = obj.name + ", " + obj.age;

}



function getData(event) {
  event.preventDefault();
  var forgotEmail = document.getElementById('emailid').value;

  let emailid = {
    email: forgotEmail
  }

  console.log(emailid);

  fetch('http://localhost:2000/user/verifyemail', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(emailid)
  }).then(function (response) {
    return response.json()
  }).then(function (data) {
    console.log(">>>>>>>>", data)
    if (data.message == "Email verified successfully") {


      fetch('http://localhost:2000/user/updatedetails', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailid)
      }).then(function (response) {
        return response.json()
      }).then(function (data) {

        if (data.message == "Details are updated") {
          alert("Details are updated");


          document.getElementById("name").value = data.data.userName
          document.getElementById("gender").value = data.data.typeGender
          document.getElementById("bgroup").value = data.data.blood_grp


        }


      }).catch(function (err) {
        console.log("Error from backend", err);
      })

    } else {

      alert("Your Email is not registered...Please Register!!!")
      window.location = "donar-registration.html"
    }
  }).catch(function (err) {
    console.log("Error from backend", err);
  })



}