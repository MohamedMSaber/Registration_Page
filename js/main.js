let userNameInput = document.getElementById("signUpUserName");
let userEmailInput = document.getElementById("signUpEmail");
let UserPasswordInput = document.getElementById("signUpPassword");
let loginEmail = document.getElementById("loginEmail");
let loginPassword = document.getElementById("loginPassword");
let fillMsg = document.getElementById("fillMsg");
let wrongMsg = document.getElementById("wrongMsg");
let loginBtn = document.getElementById("loginBtn");
let welcomeUsername = document.getElementById("welcomeUsername")
let userInfo;
let username = localStorage.getItem("sessionUserName");
let signUpButton = document.getElementById("signUpButton");

if (localStorage.getItem("users") == null) {
    userInfo = [];
}
else {
    userInfo = JSON.parse(localStorage.getItem("users"));
}

function signUp() {

    userInputsValidation();
    isExist();

    if (userInputsValidation() == true && isExist() == false) {
        let user =
        {
            name: userNameInput.value,
            email: userEmailInput.value,
            password: UserPasswordInput.value
        };
        userInfo.push(user);
        localStorage.setItem("users", JSON.stringify(userInfo));
        signUpButton.setAttribute("href","index.html");

    }
    else {
        console.log("ok");
    }
}

function userNameValidation() {
    let nameAlert = document.getElementById("nameAlert");
    let regex = /^[A-Za-z]{3,10}(\s?[A-Za-z]{3,10})?$/;

    if (regex.test(userNameInput.value) == true && userNameInput.value != "") {
        userNameInput.classList.add("is-valid");
        userNameInput.classList.remove("is-invalid");
        nameAlert.classList.replace("d-block", "d-none");
        return true;
    }
    else {
        userNameInput.classList.add("is-invalid");
        userNameInput.classList.remove("is-valid");
        nameAlert.classList.replace("d-none", "d-block");
        return false;
    }
}

function userPasswordValidation() {
    let regex = /^.{5,15}$/;
    let passAlert = document.getElementById("passAlert");
    if (regex.test(UserPasswordInput.value) == true && UserPasswordInput.value != "") {
        UserPasswordInput.classList.add("is-valid");
        UserPasswordInput.classList.remove("is-invalid");
        passAlert.classList.replace("d-block", "d-none");
        return true;
    }
    else {
        UserPasswordInput.classList.add("is-invalid");
        UserPasswordInput.classList.remove("is-valid");
        passAlert.classList.replace("d-none", "d-block");
        return false;
    }

}

function userEmailValidation() {
    let emailAlert = document.getElementById("emailAlert");
    let regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    if (regex.test(userEmailInput.value) == true && userEmailInput.value != "") {
        userEmailInput.classList.add("is-valid");
        userEmailInput.classList.remove("is-invalid");
        emailAlert.classList.replace("d-block", "d-none");
        return true;
    }
    else {
        userEmailInput.classList.add("is-invalid");
        userEmailInput.classList.remove("is-valid");
        emailAlert.classList.replace("d-none", "d-block");
        return false;
    }
}

function userInputsValidation() {
    userEmailValidation();
    userNameValidation();
    userPasswordValidation();

    if (userNameValidation && userEmailValidation && userPasswordValidation) {
        return true;
    }
    else {
        return false;
    }
}

function isExist() {
    let accountExistMsg = document.getElementById("checkExist");

    for (var i = 0; i < userInfo.length; i++) {

        if (userInfo[i].name.toLowerCase() == userNameInput.value.toLowerCase() || userInfo[i].email.toLowerCase() == userEmailInput.value.toLowerCase()) {
            accountExistMsg.classList.replace("d-none", "d-block");
            userNameInput.classList.remove("is-valid");
            userEmailInput.classList.remove("is-valid");
            UserPasswordInput.classList.remove("is-valid");

            return true
        }

    }
    return false;
}

function login() {

    if (loginEmail.value == "" || loginPassword.value == "") {
        fillMsg.classList.replace("d-none","d-block");
        return false;
    }
    for (let i = 0; i < userInfo.length; i++) {
        if (loginEmail.value.toLowerCase() == userInfo[i].email.toLowerCase() && loginPassword.value.toLowerCase() == userInfo[i].password.toLowerCase()) {
        localStorage.setItem("sessionUserName",userInfo[i].name)
        fillMsg.classList.replace("d-block","d-none");
        wrongMsg.classList.replace("d-block","d-none");
        loginBtn.setAttribute("href","welcome.html");
        }
        else
        {
            wrongMsg.classList.replace("d-none","d-block");
            fillMsg.classList.replace("d-block","d-none");
        }
    }
}

function displayUsername(){
    document.getElementById("welcomeUsername").innerHTML = "Welcome "+ username;
}

function logout() {
    localStorage.removeItem('sessionUserName');
}