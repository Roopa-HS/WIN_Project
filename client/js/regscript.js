function validate(event){
event.preventDefault();
var username=document.getElementById('name').value;
var pwd1=document.getElementById('pwd1').value;
var pwd2=document.getElementById('pwd2').value;
var gender=document.getElementById('gender').value;
var mobNo=document.getElementById('mobNo').value;
var emailid=document.getElementById('emailid').value;
var dateString=document.getElementById('dateString').value;
var blood_grp=document.getElementById('blood_grp').value;
var city=document.getElementById('city').value;
var state=document.getElementById('state').value;

   let   show  = { 
	 userName: username , 
	 password: pwd1 , 
	 confirmPassword: pwd2 , 
	 phoneNumber:mobNo,
     typeGender: gender , 
	 email:   emailid , 
	 date:dateString,
	 blood_grp:  blood_grp,
     city:city , 
     state:state
  }; 
   console.log ( show );

if(document.getElementById("checkAge").checked==true){
  alert("You have registerd successfully!!!Please login to donate the Blood")
  

   fetch( 'http://localhost:2000/user/signup',{ 
    method: 'post', 
    headers: { 
    'Accept' : 'application/json' , 
    'Content-Type' : 'application/json' 
    }, 
    body:JSON.stringify(show) 
    }).then( function (response){ 
    return response.json() 
    }).then( function (data){ 
    console.log( ">>>>>>>>" , data) 
    if(data.message=="User Successfully registered"){
        window.location="donarLogin.html"
    }
    if(data.message=="User With this email already exists"){
        alert("User With this email already exists!!! Login to donate the blood")
        window.location="donarLogin.html"
        
    }
    }).catch(function(err){
        console.log("Error from backend",err);
    })   

}
else{
    alert("Insufficient details");
    return false;
}

}

function validateEmail() {
    var x = document.regPage.emailid.value;
    var atPos = x.indexOf("@");
    var dotPos = x.indexOf(".");
    if (atPos < 1 || dotPos < atPos + 2 || dotPos + 2 >= x.length) {
        alert("Please enter a valid email address.");
        return false;
    }
}
function validateMobileNumber() {
    var num = document.regPage.mobNo.value;
    if (isNaN(num)||num.length != 10) {
        alert("Ensure the 10-digit Mobile Numbers are Entered Correctly!!");
        // document.regPage.mobNo.focus();
        return false;
    }
}
function showPassword() {
    var pass = document.getElementById("pwd2");
    if (pass.type === "password") {
        pass.type = "text";
    } else {    
        pass.type = "password";
    }
}

function matchpass(){  
    var firstpassword=document.regPage.password1.value;  
    var secondpassword=document.regPage.password2.value;  
      
    if(firstpassword==secondpassword){  
     return true;  
   
    }  
    else{  
    alert("password must be same!");  
    return false;  
    }  
    } 
    
function checklen() {
    for (i = 0; i <= 1; i++) {
        val = document.regPage.elements[i].value;
        len = val.length;
        if (len > 20) {
            alert("Value exceeds 20 characters");
            document.regPage.elements[i].value = "";
            document.regPage.elements[i].focus();
        }
    }
}

function pincode(){
    if(  document.regPage.pincode.value == "" ||
           isNaN(  document.regPage.pincode.value) ||
           document.regPage.pincode.value.length != 6 )
   {
     alert( "Enter your pincode in format ######." );
     document.regPage.pincode.focus() ;
     return;
   }
}