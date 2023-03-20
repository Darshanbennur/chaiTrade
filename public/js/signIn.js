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


formLogin.addEventListener("submit", () => {

    var logEmail = document.getElementById("loginEmail").value;
    var logPassword = document.getElementById("loginPassword").value;

    if(!logEmail || !logPassword){
        alert("Field can't be empty");
    }
    else if(!logEmail.match(mailformat)){
        alert("Invalid Email Format");
    }
    else{
        
    }
})

registerForm.addEventListener("submit", () => {
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
    else{
        
    }
})