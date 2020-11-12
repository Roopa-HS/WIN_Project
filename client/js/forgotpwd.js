function forgot(event) {
    event.preventDefault();
    var forgotEmail = document.getElementById('emailid').value;

    let forgot = {
        email: forgotEmail
    }

    console.log(forgot);

    fetch('http://localhost:2000/user/verifyemail', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(forgot)
    }).then(function (response) {
        return response.json()
    }).then(function (data) {
        console.log(">>>>>>>>", data)
        if (data.message == "Email verified successfully") {

            fetch('http://localhost:2000/user/forgot', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(forgot)
            }).then(function (response) {
                return response.json()
            }).then(function (data) {
                console.log(">>>>>>>>", data)
                if (data.message == "Password Sent at your Email") {
                    alert("Password sent successfully to your registered email address");
                    window.location="donarLogin.html";
                }


            }).catch(function (err) {
                console.log("Error from backend", err);
            })

        }
        else{

alert("Your Email is not registered...Please Register!!!")
window.location="donar-registration.html"
        }
    }).catch(function (err) {
        console.log("Error from backend", err);
    })



}