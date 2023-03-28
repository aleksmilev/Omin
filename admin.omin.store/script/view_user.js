class user_{
    id;
    username;
    permission_level;

    constructor(id,username,permission_level) {
        this.id = id;
        this.username = username;
        this.permission_level = permission_level;

        this.create_user();
    }

    create_user() {
        const userDiv = document.createElement("div");
        userDiv.className = "user";

        const userInfoDiv = document.createElement("div");
        userInfoDiv.className = "user_info";

        const idDiv = document.createElement("div");
        idDiv.className = "id";
        const idHeader = document.createElement("h1");
        idHeader.innerText = "Id:";
        const idContent = document.createElement("h1");
        idContent.innerText = this.id;
        idDiv.appendChild(idHeader);
        idDiv.appendChild(idContent);

        const usernameDiv = document.createElement("div");
        usernameDiv.className = "username";
        const usernameHeader = document.createElement("h1");
        usernameHeader.innerText = "Username:";
        const usernameContent = document.createElement("h1");
        usernameContent.innerText = this.username;
        usernameDiv.appendChild(usernameHeader);
        usernameDiv.appendChild(usernameContent);

        const passwordDiv = document.createElement("div");
        passwordDiv.className = "password";
        const passwordHeader = document.createElement("h1");
        passwordHeader.innerText = "Password:";
        const passwordContent = document.createElement("h1");
        passwordContent.innerText = "********";
        passwordDiv.appendChild(passwordHeader);
        passwordDiv.appendChild(passwordContent);

        const permissionDiv = document.createElement("div");
        permissionDiv.className = "permission_level";
        const permissionHeader = document.createElement("h1");
        permissionHeader.innerText = "Role:";
        const permissionContent = document.createElement("h1");
        permissionContent.innerText = this.permission_level;
        permissionDiv.appendChild(permissionHeader);
        permissionDiv.appendChild(permissionContent);

        userInfoDiv.appendChild(idDiv);
        userInfoDiv.appendChild(usernameDiv);
        userInfoDiv.appendChild(passwordDiv);
        userInfoDiv.appendChild(permissionDiv);

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete this user";
        deleteButton.onclick = () => {
            this.remove_user();
        }

        userDiv.appendChild(userInfoDiv);
        userDiv.appendChild(deleteButton);

        document.getElementById("users").appendChild(userDiv);
    }

    remove_user() {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', './server/functions/remove_user.php', true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onload = () => {
            const response = xhr.responseText.replace(/\s/g, '');

            if (response == "1") {
                alert("You successfully deleted this user");
                window.location.href = window.location.href;
            } else {
                alert("You can`t deleted this user");
            }
        };
        xhr.send(this.id);
    }
}

fetch("./server/all_users.php")
    .then((response) => response.json())
    .then((data) => {
        data.forEach(user => {
            let id = user.id;
            let username = user.username;
            let permission_level = user.permission_level;

            new user_(id,username,permission_level);
        });
    });
