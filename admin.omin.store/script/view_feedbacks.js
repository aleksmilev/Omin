class feedback_{
    id;
    name;
    email;
    message;

    constructor(id, name, email, message) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.message = message;

        this.create_feedback();
    }

    create_feedback() {
        const feedbackDiv = document.createElement("div");
        feedbackDiv.classList.add("feedback");

        const userInfoDiv = document.createElement("div");
        userInfoDiv.classList.add("user_info");

        const nameDiv = document.createElement("div");
        nameDiv.classList.add("name");
        const nameTitle = document.createElement("h1");
        nameTitle.textContent = "Name:";
        const nameValue = document.createElement("h1");
        nameValue.textContent = this.name;
        nameDiv.appendChild(nameTitle);
        nameDiv.appendChild(nameValue);

        const emailDiv = document.createElement("div");
        emailDiv.classList.add("email");
        const emailTitle = document.createElement("h1");
        emailTitle.textContent = "Email:";
        const emailValue = document.createElement("h1");
        emailValue.textContent = this.email;
        emailDiv.appendChild(emailTitle);
        emailDiv.appendChild(emailValue);

        userInfoDiv.appendChild(nameDiv);
        userInfoDiv.appendChild(emailDiv);

        const feedbackInfoDiv = document.createElement("div");
        feedbackInfoDiv.classList.add("feedback_info");
        const messageTitle = document.createElement("h1");
        messageTitle.textContent = "Massage:";
        const messageValue = document.createElement("h1");
        messageValue.textContent = this.message;
        feedbackInfoDiv.appendChild(messageTitle);
        feedbackInfoDiv.appendChild(messageValue);

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove this feedback";
        removeButton.onclick = () => {
            this.remove_feedback();
        }

        feedbackDiv.appendChild(userInfoDiv);
        feedbackDiv.appendChild(feedbackInfoDiv);
        feedbackDiv.appendChild(removeButton);

        document.getElementById("feedbacks").appendChild(feedbackDiv);
    }

    async remove_feedback() {
        await fetch("./server/functions/remove_feedback.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: this.id
        });

        alert("You successfully deleted this feedback");
        window.location.href = window.location.href;
    }
}

fetch("./server/all_feedbacks.php")
    .then((response) => response.json())
    .then((data) => {
        data.forEach(feedback => {
            let id = feedback.id;
            let name = feedback.name;
            let email = feedback.email;
            let message = feedback.message;

            new feedback_(id, name, email, message);
        });
    });