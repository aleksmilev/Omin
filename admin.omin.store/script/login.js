function setCookie(name, value, expats) {
    const date = new Date();
    date.setTime(date.getTime() + (expats*24*60*60*1000));
    let expires = "expires="+ date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = form.user_inp.value;
    const password = form.pass_inp.value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', './server/login.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = () => {
        if (xhr.responseText.replace(/\s/g, '') != "0") {
            const response = JSON.parse(xhr.responseText);

            const id = response.user_id;
            const username = response.username;
            const password = response.password;
            const permission_level = response.permission_level;

            setCookie("user_id", id, 1);
            setCookie("user_name", username, 1);
            setCookie("user_password", password, 1);
            setCookie("permission_level", permission_level, 1);

            window.open("./","_self");
        } else {
            alert("Invalid username or password");
            form.reset();
        }
    };
    xhr.send(`username=${username}&password=${password}`);
});