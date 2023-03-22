const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

const LoginButton = document.getElementById("loginButton");
const RegisterButton = document.getElementById("registerButton");

const formLogin = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

RegisterButton.addEventListener("click", () => {
    let registerEmail = document.getElementById("registerEmail").value;
    let registerName = document.getElementById("registerName").value;
    let registerPassword = document.getElementById("registerPassword").value;
    console.log(registerEmail, registerName, registerPassword);
    if(!registerEmail || !registerName || !registerPassword){
        alert("Field can't be empty");
    }
    else if(!registerEmail.match(mailformat)){
        alert("Invalid Email Format");
    }
    else if(!registerPassword.match(passwordFormat)){
        alert("Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number");
    }
    else{
        sendToBackend();
    }
})

LoginButton.addEventListener("click", () => {
    var logEmail = document.getElementById("loginEmail").value;
    var logPassword = document.getElementById("loginPassword").value;

    if(!logEmail || !logPassword){
        alert("Field can't be empty");
    }
    else if(!logEmail.match(mailformat)){
        alert("Invalid Email Format");
    }
    else{
        loginSendBackend()
    }
})

function loginSendBackend(){
    formLogin.addEventListener("submit", () => {
    
    })
}

function sendToBackend(){
    registerForm.addEventListener("submit", () => {
        
    })
}

