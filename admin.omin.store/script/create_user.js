const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = form.user_inp.value;
    const password = form.pass_inp.value;
    const permission_level = form.permission_level_inp.value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', './server/functions/create_user.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = () => {
        const response = JSON.parse(xhr.responseText);

        console.log(response);

        if (response == "1") {
            form.reset();
            alert("You successfully created new user");
            window.location.href = window.location.href;
        } else {
            alert("This username already exists");
        }
    };
    xhr.send(`username=${username}&password=${password}&permission_level=${permission_level}`);
});

document.addEventListener("DOMContentLoaded", () => form.reset());