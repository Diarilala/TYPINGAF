/**Here's the script of the login page
 * mail : student@gmail.com
 * password : password (very secure)
 */

const email = document.querySelector(".email");
const password = document.querySelector(".password");
const button = document.querySelector(".button");

button.addEventListener('click', function () {
    button.textContent = "Wait for it. . . . .";
    button.disabled = true;

    setTimeout(function () {
        const correctEmail = "student@gmail.com";
        const correctPassword = "password";

        if (email.value === correctEmail && password.value === correctPassword) {
            window.location.href = '../main/main.html';
        } else {
            alert("Invalid email or password");
        }

        button.textContent = "Login";
        button.disabled = false;

    }, 3000);
});

