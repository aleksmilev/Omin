class activity_{
    id;
    user;
    info;

    constructor(id, user, info) {
        this.id = id;
        this.user = user;
        this.info = info;

        this.create_activity();
    }

    create_activity() {
        const activityDiv = document.createElement("div");
        activityDiv.classList.add("activity");

        const h1 = document.createElement("h1");
        h1.textContent = this.info + " by user with ";

        const span = document.createElement("span");
        span.textContent = "id:" + this.user;

        h1.appendChild(span);

        activityDiv.appendChild(h1);

        const button = document.createElement("button");
        button.textContent = "Remove this activity";
        button.onclick = () => {
            this.remove_activity();
        }

        activityDiv.appendChild(button);

        document.getElementById("activities").appendChild(activityDiv);
    }

    async remove_activity() {
        await fetch("./server/functions/remove_activity.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: this.id
        });

        alert("You successfully deleted this activity");
        window.location.href = window.location.href;
    }
}

document.getElementById("remove_all").addEventListener("click", async () => {
    await fetch("./server/functions/remove_all_activities.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: "all"
    });

    alert("You successfully deleted all activities");
    window.location.href = window.location.href;
});

fetch("./server/all_activities.php")
    .then((response) => response.json())
    .then((data) => {
        data.forEach(activity => {
            let id = activity.id;
            let user = activity.user_id;
            let info = activity.activity_info;

            new activity_(id, user, info);
        });
    });