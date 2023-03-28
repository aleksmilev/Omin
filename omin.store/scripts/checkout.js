const progress_bar = document.getElementById("progress_bar");
progress_bar.style.width = "1%";

const stage_1_section = document.getElementById("cart");
const stage_2_section = document.getElementById("info");
const stage_3_section = document.getElementById("sended");

let total = 0;

//////////////////////////////////////////////////

function big_create_item(id, img, name, price, quantity) {
    // Create the main div element
    const cartItem_el = document.createElement("div");
    cartItem_el.classList.add("cart_item");

    // Create the first inner div element
    const itemInfo_el = document.createElement("div");
    itemInfo_el.classList.add("item_info");

    // Create the img element
    const img_el = document.createElement("img");
    img_el.src = img;

    // Create the first p element
    const name_el = document.createElement("p");
    name_el.classList.add("name");
    name_el.textContent = name;

    // Create the second p element
    const price_el = document.createElement("p");
    price_el.classList.add("price");
    price_el.textContent = price + " BGN";

    // Append all elements to the appropriate parent elements
    itemInfo_el.appendChild(img_el);
    itemInfo_el.appendChild(name_el);
    itemInfo_el.appendChild(price_el);

    // Create the second inner div element
    const itemQuantity_el = document.createElement("div");
    itemQuantity_el.classList.add("item_quantity");

    // Create the first i element
    const minus_el = document.createElement("i");
    minus_el.classList.add("fa-solid");
    minus_el.classList.add("fa-minus");
    minus_el.addEventListener("click", function () {
        big_change_count(id, "-");
    });

    // Create the p element
    const quantity_el = document.createElement("p");
    quantity_el.classList.add("quantity");
    quantity_el.textContent = quantity;

    // Create the second i element
    const plus_el = document.createElement("i");
    plus_el.classList.add("fa-solid");
    plus_el.classList.add("fa-plus");
    plus_el.addEventListener("click", function () {
        big_change_count(id, "+");
    });

    // Append all elements to the appropriate parent elements
    itemQuantity_el.appendChild(minus_el);
    itemQuantity_el.appendChild(quantity_el);
    itemQuantity_el.appendChild(plus_el);

    const remove_el = document.createElement("i");
    remove_el.classList.add("fa-solid");
    remove_el.classList.add("fa-trash");
    remove_el.addEventListener("click", function () {
        remove_item(id);
    });

    // Append all elements to the main div element
    cartItem_el.appendChild(itemInfo_el);
    cartItem_el.appendChild(itemQuantity_el);
    itemQuantity_el.appendChild(remove_el);


    document.getElementById("main_cart").appendChild(cartItem_el);
}

function big_change_count(id, change_type) {
    let item = localStorage.getItem(id);
    item = item.split("╓");

    if (change_type == "+") {
        if(parseInt(item[0]) < 9){
            item[0] = parseInt(item[0]) + 1; 
        }
    } else if(change_type == "-"){
        item[0] = parseInt(item[0]) - 1; 

        if (item[0] <= 0) {
            localStorage.removeItem(id);
        
            let temp = localStorage.getItem("cart_item_list");
            temp = temp.split("┐" + id);
            localStorage.setItem("cart_item_list",temp.join(""));
        }
        
    }

    localStorage.setItem(id, item.join("╓"));

    big_cart_update();
}

function big_cart_update() {
    const cart_items = document.getElementsByClassName("cart_item");
    Array.from(cart_items).forEach(cart_item => {
        cart_item.remove();
    });

    let items = localStorage.getItem('cart_item_list').split("┐");

    for (let a = 1; a <= items.length - 1; a++){
        let id = items[a];

        let info = localStorage.getItem(id);

        if (info != null) {
            info = info.split("╓");

            let [quantity,img,name,price] = info;

            big_create_item(id, img, name, price , quantity);
        }
    }

    calc_total()
}

function remove_item(id) {
    let cart_item_list = localStorage.getItem("cart_item_list");
    cart_item_list = cart_item_list.split("┐" + id);
    localStorage.setItem("cart_item_list", cart_item_list.join(''));

    localStorage.removeItem(id);

    big_cart_update();
}

function calc_total() {
    total = 0;
    let total_item_list = localStorage.getItem("cart_item_list").split("┐");

    for (let a = 1; a <= total_item_list.length - 1; a++){
        let item_temp = localStorage.getItem(total_item_list[a]).split("╓");
        let total_temp = item_temp[0] * item_temp[3];

        total += parseFloat(total_temp);
    }

    document.getElementById("total_el").innerText = total + " BGN";
}

////////////////////////////////////////////////

let f_name_inp = document.getElementById("f_name");
let l_name_inp = document.getElementById("l_name");
let phone_inp = document.getElementById("phone");
let address_inp = document.getElementById("address");

const f_name_ls = localStorage.getItem("f_name");
const l_name_ls = localStorage.getItem("l_name");
const email_ls = localStorage.getItem("email");
const phone_ls = localStorage.getItem("phone");
const address_ls = localStorage.getItem("address");

if(f_name_ls != null && f_name_ls != ""){
    document.getElementById("f_name_h1").style.display = "none";
}
if(l_name_ls != null && l_name_ls != ""){
    document.getElementById("l_name_h1").style.display = "none";
}
if(phone_ls != null && phone_ls != ""){
    document.getElementById("phone_h1").style.display = "none";
}
if(address_ls != null && address_ls != ""){
    document.getElementById("address_h1").style.display = "none";
}

f_name_inp.value = f_name_ls ?? "";
l_name_inp.value = l_name_ls ?? "";
phone_inp.value = phone_ls ?? "";
address_inp.value = address_ls ?? ""; 


f_name_inp.addEventListener('focus', (event) => {
    document.getElementById("f_name_h1").style.display = "none";
});
f_name_inp.addEventListener('focusout', (event) => {
    if (f_name_inp.value == null || f_name_inp.value == "") {
        document.getElementById("f_name_h1").style.display = "block";
    }
});


l_name_inp.addEventListener('focus',(event) => {
    document.getElementById("l_name_h1").style.display = "none";
});
l_name_inp.addEventListener('focusout', (event) => {
    if (l_name_inp.value == null || l_name_inp.value == "") {
        document.getElementById("l_name_h1").style.display = "block";
    }
});


phone_inp.addEventListener('focus',(event) => {
    document.getElementById("phone_h1").style.display = "none";
});
phone_inp.addEventListener('focusout', (event) => {
    if (phone_inp.value == null || phone_inp.value == "") {
        document.getElementById("phone_h1").style.display = "block";
    }
});


address_inp.addEventListener('focus',(event) => {
    document.getElementById("address_h1").style.display = "none";
});
address_inp.addEventListener('focusout', (event) => {
    if (address_inp.value == null || address_inp.value == "") {
        document.getElementById("address_h1").style.display = "block";
    }
});

const phone_check = phone => {
    if(phone == null && phone == ""){
        alert("Enter your phone number");

        return false;
    }

    if(phone[0] != 0){
        alert("Enter valid phone number");

        return false;
    }

    const phone_check1 = Number(phone) ? true : false;
    if(!phone_check1){
        alert("Enter valid phone number");
        console.log(phone_check1);

        return false;
    }

    if(phone.length != 10){
        alert("Enter valid phone number");

        return false;
    }

    return true;
}

const form_check = () => {
    if(f_name_inp.value == null || f_name_inp.value == ""){
        alert("Enter your first name");

        return false;
    }

    if(l_name_inp.value == null || l_name_inp.value == ""){
        alert("Enter your last name");

        return false;
    }

    if(!phone_check(phone_inp.value)){
        return false;
    }

    if(address_inp.value == null || address_inp.value == ""){
        alert("Enter your address");

        return false;
    }

    localStorage.setItem("f_name",f_name_inp.value);
    localStorage.setItem("l_name",l_name_inp.value);
    localStorage.setItem("phone",phone.value);
    localStorage.setItem("address",address_inp.value);

    return true;
}

////////////////////////////////////////////////

function go_home() {
    location.href = "./";
}

function reset_card() {
    let card_items = localStorage.getItem("cart_item_list").split("┐");
    card_items.forEach(element => {
        if (element != "null") { 
            localStorage.removeItem(element);
        }
    });

    localStorage.setItem("cart_item_list", "null");
}

////////////////////////////////////////////////

function stage_1() {
    progress_bar.style.width = "33%";

    stage_1_section.style.display = "grid";
    stage_2_section.style.display = "none";
    stage_3_section.style.display = "none";
    
    big_cart_update();
}

function stage_2() {
    progress_bar.style.width = "66%";

    stage_1_section.style.display = "none";
    stage_2_section.style.display = "grid";
    stage_3_section.style.display = "none";
}

function stage_3() {
    progress_bar.style.width = "100%";

    stage_1_section.style.display = "none";
    stage_2_section.style.display = "none";
    stage_3_section.style.display = "flex";
}

//////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
    stage_1();
});

document.getElementById("to_stage_2").addEventListener("click", function () {
    let cart_item_list = localStorage.getItem("cart_item_list");

    if (cart_item_list != null && cart_item_list != "null") {
        stage_2();        
    } else {
        alert("Your cart is empty");
    }
});

document.getElementById("to_stage_3").addEventListener("click", function () {
    if (form_check()) {
        document.getElementById("to_stage_3").style.backgroundColor = "var(--pink_blue2)";
        document.getElementById("to_stage_3").style.boxShadow = "0px 0px 10px 15px var(--lavender_web2)";
        document.body.style.cursor = "wait";

        let items_info = [];
        let items = localStorage.getItem("cart_item_list").split("┐");
        items.forEach(element => {
            if (element != "null") {
                let id_ = element;
                let quantity_ = localStorage.getItem(id_).split("╓")[0];
                let size_ = localStorage.getItem(id_).split("╓")[4];

                items_info.push({
                    id_: id_,
                    quantity_: quantity_,
                    size_: size_
                });
            }
        });

        let data =
            {
                items_info: items_info,
                order_info: {
                    f_name_: localStorage.getItem("f_name"),
                    l_name_: localStorage.getItem("l_name"),
                    phone_: localStorage.getItem("phone"),
                    address_: localStorage.getItem("address")
                }
            };

        const xhr = new XMLHttpRequest();
        xhr.open('POST', './server/order.php', true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onload = () => {
            let response = xhr.responseText.replace(/\s+/g, '');

            console.log(response);
            console.log(response == "1");

            if (response == "1") {
                document.body.style.cursor = "default";

                console.log("Success");
                reset_card();
                stage_3();
            } else {
                alert("Error");
                document.getElementById("to_stage_3").style.backgroundColor = "var(--phthalo_blue)";
                document.body.style.cursor = "default";
            }
        };
        xhr.send(JSON.stringify(data));
    }
});