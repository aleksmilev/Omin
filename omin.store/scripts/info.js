let f_name_inp = document.getElementById("f_name_inp");
let l_name_inp = document.getElementById("l_name_inp");
let email_inp = document.getElementById("email_inp");
let message_inp = document.getElementById("message_inp");

f_name_inp.value = null;
l_name_inp.value = null;
email_inp.value = null;
message_inp.value = null; 


f_name_inp.addEventListener('focus', (event) => {
    document.getElementsByClassName("f_name")[0].style.display = "none";
});
f_name_inp.addEventListener('focusout', (event) => {
    if (f_name_inp.value == null || f_name_inp.value == "") {
        document.getElementsByClassName("f_name")[0].style.display = "block";
    }
});


l_name_inp.addEventListener('focus',(event) => {
    document.getElementsByClassName("l_name")[0].style.display = "none";
});
l_name_inp.addEventListener('focusout', (event) => {
    if (l_name_inp.value == null || l_name_inp.value == "") {
        document.getElementsByClassName("l_name")[0].style.display = "block";
    }
});


email_inp.addEventListener('focus',(event) => {
    document.getElementsByClassName("email")[0].style.display = "none";
});
email_inp.addEventListener('focusout', (event) => {
    if (email_inp.value == null || email_inp.value == "") {
        document.getElementsByClassName("email")[0].style.display = "block";
    }
});


message_inp.addEventListener('focus',(event) => {
    document.getElementsByClassName("message")[0].style.display = "none";
});
message_inp.addEventListener('focusout', (event) => {
    if (message_inp.value == null || message_inp.value == "") {
        document.getElementsByClassName("message")[0].style.display = "block";
    }
});

const email_check = (email) => {
    let email_check_1 = email.split("@");

    if (email_check_1[1] != null && email_check_1[1] != "") {
        let email_check_2 = email_check_1[1].split(".");

        if (email_check_2[1] != null && email_check_2[1] != "") { 
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

const form_check = (f_name,l_name,email,message) => {
    if (!(f_name != null && f_name != "")) {
        alert("Enter your first name");

        return false;
    }

    if (!(l_name != null && l_name != "")) {
        alert("Enter your last name");

        return false;
    }

    if (!(email != null && email != "")) {
        alert("Enter your email address");

        return false;
    }

    if (!email_check(email)) {
        alert("Enter valid email");

        return false;
    }

    if (!(message != null && message != "")) {
        alert("Enter your message");

        return false;
    }

    return true;
};

let submit = document.getElementsByClassName("submit")[0];
submit.addEventListener("click", async () => {

    let f_name = document.getElementById("f_name_inp").value;
    let l_name = document.getElementById("l_name_inp").value;
    let email = document.getElementById("email_inp").value;
    let message = document.getElementById("message_inp").value;

    if (form_check(f_name,l_name,email,message)) {
        submit.style.backgroundColor = "var(--pink_blue2)";
        submit.style.boxShadow = "0px 0px 10px 15px var(--lavender_web2)";
        document.body.style.cursor = "wait";

        let data = {
            f_name: f_name,
            l_name: l_name,
            email: email,
            message: message
        }

        const xhr = new XMLHttpRequest();
        xhr.open('POST', './server/feedback.php', true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onload = () => {
            let response = xhr.responseText.replace(/\s+/g, '');

            if (response = "1") {
                submit.style.backgroundColor = "var(--phthalo_blue)";
                submit.style.boxShadow = "0px 0px 10px 10px #0000ff45";
                document.body.style.cursor = "default";

                localStorage.setItem("f_name",f_name);
                localStorage.setItem("l_name",l_name);
                localStorage.setItem("email",email);
        
                f_name_inp.value = null;
                l_name_inp.value = null;
                email_inp.value = null;
                message_inp.value = null; 
        
                document.getElementsByClassName("f_name")[0].style.display = "block";
                document.getElementsByClassName("l_name")[0].style.display = "block";
                document.getElementsByClassName("email")[0].style.display = "block";
                document.getElementsByClassName("message")[0].style.display = "block";

                alert("You successfully send a message");
            } else {
                alert("Error");
                submit.style.backgroundColor = "var(--phthalo_blue)";
                document.body.style.cursor = "default";
            }
        };
        xhr.send(JSON.stringify(data));

                // await fetch('./server/feedback.php', {
                //     method: 'post',
                //     headers: {
                //         'Content-Type': 'application/json'
                //     },
                //     body: 
                // })
                //     .then(response => {
                //         if (response.text() = "1") {
                //             submit.style.backgroundColor = "var(--phthalo_blue)";
                //             submit.style.boxShadow = "0px 0px 10px 10px #0000ff45";
                //             document.body.style.cursor = "default";

                //             localStorage.setItem("f_name",f_name);
                //             localStorage.setItem("l_name",l_name);
                //             localStorage.setItem("email",email);
                    
                //             f_name_inp.value = null;
                //             l_name_inp.value = null;
                //             email_inp.value = null;
                //             message_inp.value = null; 
                    
                //             document.getElementsByClassName("f_name")[0].style.display = "block";
                //             document.getElementsByClassName("l_name")[0].style.display = "block";
                //             document.getElementsByClassName("email")[0].style.display = "block";
                //             document.getElementsByClassName("message")[0].style.display = "block";

                //             alert("You successfully send a message");
                //         } else {
                //             alert("Error");
                //             submit.style.backgroundColor = "var(--phthalo_blue)";
                //             document.body.style.cursor = "default";
                //         }
                //     })
                //     .catch((error) => {
                //         console.error('Error:', error);
                //         alert("Error");
                //         submit.style.backgroundColor = "var(--phthalo_blue)";
                //         document.body.style.cursor = "default";

                //     });
    }

});