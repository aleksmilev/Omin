const f_name = localStorage.getItem("f_name");
const l_name = localStorage.getItem("l_name");
const email = localStorage.getItem("email");
const phone = localStorage.getItem("phone");
const address = localStorage.getItem("address");

const edit_save = document.getElementById("edit_save");
edit_save.edit_mode = true;
edit_save.innerText = "Edit";

const f_name_inp = document.getElementById("f_name_inp");
const l_name_inp = document.getElementById("l_name_inp");
const email_inp = document.getElementById("email_inp");
const phone_inp = document.getElementById("phone_inp");
const address_inp = document.getElementById("address_inp");

const f_name_lock = document.getElementsByClassName("f_name_lock")[0];
const l_name_lock = document.getElementsByClassName("l_name_lock")[0];
const email_lock =  document.getElementsByClassName("email_lock")[0];
const phone_lock = document.getElementsByClassName("phone_lock")[0];
const address_lock = document.getElementsByClassName("address_lock")[0]; 

f_name_inp.disabled = true;
l_name_inp.disabled = true;
email_inp.disabled = true;
phone_inp.disabled = true;
address_inp.disabled = true;

const f_name_ls= localStorage.getItem("f_name");
const l_name_ls = localStorage.getItem("l_name");
const email_ls = localStorage.getItem("email");
const phone_ls = localStorage.getItem("phone");
const address_ls = localStorage.getItem("address");

f_name_inp.value = f_name ?? "";
l_name_inp.value = l_name ?? "";
email_inp.value = email ?? "";
phone_inp.value = phone ?? "";
address_inp.value = address ?? "";

document.getElementById("edit_save").addEventListener("click", function () {
    if (edit_save.edit_mode == false) {

        if (email_check(email_inp.value)) {
            
            if (phone_check(phone_inp.value)) {
                
                document.getElementById("title").innerText = "Account management";

                save_changes();

                edit_save.innerText = "Edit";
                edit_save.edit_mode = true;

            } else {
                alert("Enter valid phone number");
            }

        } else {
            alert("Enter valid email.");
        }
        
    } else {
        document.getElementById("title").innerText = "Account management (editing)";

        f_name_inp.disabled = false;
        l_name_inp.disabled = false;
        email_inp.disabled = false;
        phone_inp.disabled = false;
        address_inp.disabled = false;

        f_name_inp.style.transition = "0.3s";
        l_name_inp.style.transition = "0.3s";
        email_inp.style.transition = "0.3s";
        phone_inp.style.transition = "0.3s";
        address_inp.style.transition = "0.3s";

        f_name_inp.style.backgroundColor = "var(--lavender_web)";
        l_name_inp.style.backgroundColor = "var(--lavender_web)";
        email_inp.style.backgroundColor = "var(--lavender_web)";
        phone_inp.style.backgroundColor = "var(--lavender_web)";
        address_inp.style.backgroundColor = "var(--lavender_web)";


        f_name_lock.classList.remove("fa-lock");
        l_name_lock.classList.remove("fa-lock");
        email_lock.classList.remove("fa-lock");
        phone_lock.classList.remove("fa-lock");
        address_lock.classList.remove("fa-lock");
    
        f_name_lock.classList.add("fa-lock-open");
        l_name_lock.classList.add("fa-lock-open");
        email_lock.classList.add("fa-lock-open");
        phone_lock.classList.add("fa-lock-open");
        address_lock.classList.add("fa-lock-open");


        edit_save.innerText = "Save";
        edit_save.edit_mode = false;
    }
});

document.getElementById("delate").addEventListener("click",() => {
    localStorage.setItem("f_name","");
    localStorage.setItem("l_name","");
    localStorage.setItem("email","");
    localStorage.setItem("phone","");
    localStorage.setItem("address", "");
    
    window.location.reload();
});

const phone_check = phone => {
    if (phone != null && phone != "") {
        const phone_check1 = Number(phone) ? true : false;
        if (phone_check1) {
            if (phone.length == 10) { 
                return true;
            }   
        }
    } else {
        return true;
    }

    return false;
}

const email_check = email => {
    if (email != null && email != "") {
        let email_check1 = email.split("@")[1];

        if (email_check1 != null && email_check1 != "") {
            let email_check2 = email_check1.split(".")[1];
            
            if (email_check2 != null && email_check2 != "") { 
                return true;
            }
        }
    } else {
        return true;
    }

    return false;
}

function save_changes() { 
    localStorage.setItem("f_name",f_name_inp.value);
    localStorage.setItem("l_name",l_name_inp.value);
    localStorage.setItem("email",email_inp.value);
    localStorage.setItem("phone",phone_inp.value);
    localStorage.setItem("address",address_inp.value);

    f_name_inp.disabled = true;
    l_name_inp.disabled = true;
    email_inp.disabled = true;
    phone_inp.disabled = true;
    address_inp.disabled = true;

    f_name_inp.style.transition = "0.3s";
    l_name_inp.style.transition = "0.3s";
    email_inp.style.transition = "0.3s";
    phone_inp.style.transition = "0.3s";
    address_inp.style.transition = "0.3s";

    f_name_inp.style.backgroundColor = "#a091e47a";
    l_name_inp.style.backgroundColor = "#a091e47a";
    email_inp.style.backgroundColor = "#a091e47a";
    phone_inp.style.backgroundColor = "#a091e47a";
    address_inp.style.backgroundColor = "#a091e47a";

    
    f_name_lock.classList.remove("fa-lock-open");
    l_name_lock.classList.remove("fa-lock-open");
    email_lock.classList.remove("fa-lock-open");
    phone_lock.classList.remove("fa-lock-open");
    address_lock.classList.remove("fa-lock-open");

    f_name_lock.classList.add("fa-lock");
    l_name_lock.classList.add("fa-lock");
    email_lock.classList.add("fa-lock");
    phone_lock.classList.add("fa-lock");
    address_lock.classList.add("fa-lock");
}