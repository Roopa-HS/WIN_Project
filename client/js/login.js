

	function login(event){
	event.preventDefault();
	var email=document.getElementById('emailid').value;
	var password =document.getElementById('pwd').value;

	   var logindetails  = { 
		 email: email , 
		 password: password , 	
	  }; 
	   console.log (logindetails);
	
	   fetch( 'http://localhost:2000/user/login',{ 
			method: 'post', 
			headers: { 
			'Accept' : 'application/json' , 
			'Content-Type' : 'application/json' 
			}, 
			body:JSON.stringify(logindetails) 
			}).then( function (response){ 
			return response.json() 
			}).then( function (data){ 
			console.log( ">>>>>>>>" , data) 
			if(data.message=="Login Success"){
				 window.location="donate.html"
			}
			else{
				alert("INVALID CREDENTIALS!!!")
			}
			}).catch(function(err){
				console.log("Error from backend",err);
			})     
		}
		
		function showPassword() {
			var pass = document.getElementById("pwd");
			if (pass.type === "password") {
				pass.type = "text";
			} else {    
				pass.type = "password";
			}
		}