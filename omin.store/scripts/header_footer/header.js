const mainDiv = document.createElement('div');
mainDiv.classList.add('main');

// Create the logo div and its contents
const logoDiv = document.createElement('div');
logoDiv.classList.add('logo');
const logoLink = document.createElement('a');
logoLink.href = './home';
const logoImg = document.createElement('img');
logoImg.src = './images/logo.webp';
logoImg.alt = '';
logoLink.appendChild(logoImg);
logoDiv.appendChild(logoLink);

// Create the icons div
const iconsDiv = document.createElement('div');
iconsDiv.classList.add('icons');

// Create the mini cart div and its contents
const minicartDiv = document.createElement('div');
minicartDiv.classList.add('mini_cart_link');
const cartDiv = document.createElement('div');
cartDiv.classList.add('cart');
const cartIcon = document.createElement('i');
cartIcon.classList.add('fa-solid', 'fa-cart-shopping');
const cartMenuDiv = document.createElement('div');
cartMenuDiv.classList.add('cart_menu');
const cartMenuP = document.createElement('p');
cartMenuP.textContent = 'Cart menu';
const innercartDiv = document.createElement('div');
innercartDiv.id = 'inner_cart';
const checkoutButton = document.createElement('button');
checkoutButton.textContent = 'Go to cart';
checkoutButton.onclick = function() {open_checkout();}

cartMenuDiv.appendChild(cartMenuP);
cartMenuDiv.appendChild(innercartDiv);
cartMenuDiv.appendChild(checkoutButton);
cartIcon.appendChild(cartMenuDiv);
cartDiv.appendChild(cartIcon);
minicartDiv.appendChild(cartDiv);

// Create the user link and its contents
const userLink = document.createElement('a');
userLink.href = './account';
userLink.classList.add('user_link');
const userDiv = document.createElement('div');
userDiv.classList.add('user');
const userIcon = document.createElement('i');
userIcon.classList.add('fa', 'fa-user');
userDiv.appendChild(userIcon);
userLink.appendChild(userDiv);
const menu_icn = document.createElement('i');
menu_icn.id = "menu_icn";
menu_icn.classList.add("fa-solid");
menu_icn.classList.add("fa-bars");


// Add all elements to the icons div
iconsDiv.appendChild(minicartDiv);
iconsDiv.appendChild(userLink);
iconsDiv.appendChild(menu_icn);

// Create the nav and its contents
const nav = document.createElement('nav');
nav.id = "nav";
const mansLink = document.createElement('a');
mansLink.href = './shop?page=1&filter=man';
mansLink.textContent = "Man's";
const womansLink = document.createElement('a');
womansLink.href = './shop?page=1&filter=woman';
womansLink.textContent = "Woman's";
const collectionsLink = document.createElement('a');
collectionsLink.href = './collections?page=1';
collectionsLink.textContent = 'Collections';
const customDesignsLink = document.createElement('a');
customDesignsLink.href = './shop?page=1&filter=1';
customDesignsLink.textContent = 'Special editions';
// customDesignsLink.textContent = 'Custom designs';
customDesignsLink.id = 'custom_designs';

// Add all links to the nav
nav.appendChild(mansLink);
nav.appendChild(womansLink);
nav.appendChild(collectionsLink);
nav.appendChild(customDesignsLink);

// Add all elements to the main div
mainDiv.appendChild(logoDiv);
mainDiv.appendChild(iconsDiv);

const header = document.getElementById("header");
header.appendChild(mainDiv);
header.appendChild(nav);


function open_checkout() {
    window.open("./checkout","_self");
}

document.getElementById("menu_icn").addEventListener("click", () => {
    const nav_display = document.getElementById("nav");

    if(window.getComputedStyle(nav_display).display == "block"){
        nav_display.style.display = "none";
    }
    else if(window.getComputedStyle(nav_display).display == "none"){
        nav_display.style.display = "block";
    }
    
})

document.getElementsByClassName("fa-cart-shopping")[0].addEventListener("click", () => {
    const cart_menu = document.getElementsByClassName("cart_menu")[0];

    if (window.getComputedStyle(cart_menu).display == "none") {
        window.open("./checkout","_self");
    }
})

function max_length(word , max_length_num){
    let word_finished = [];

    word = word.split("");

    for(let a = 0;a <= (max_length_num - 1); a++){
        word_finished.push(word[a]);
    }
    word_finished.push("...");

    return word_finished.join('');
}



function add_to_cart(id, quantity,img,name,price,size) {
    let info = quantity + "╓" + img + "╓" + name + "╓" + price + "╓" + size;
    localStorage.setItem(id,info);

    let cart_item_list = localStorage.getItem('cart_item_list');

    if (cart_item_list != null) {
        if (!cart_item_list.split("┐").includes(id)) {
            cart_item_list = localStorage.getItem('cart_item_list') + "┐" + id;
        }
    } else {
        cart_item_list = localStorage.getItem('cart_item_list') + "┐" + id;
    }
    

    localStorage.setItem('cart_item_list',cart_item_list);
}

class cart_items{
    id;
    quantity; 
    img;
    name;
    price;
    link;
    size;

    constructor(id,quantity,img,name,price,link,size) {
        this.id = id;
        this.img = img;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.size = size;

        add_to_cart(id, quantity, img, name, price, link, size);
        cart_update();
    }
}

function cart_update() {
    const cart_items = document.getElementsByClassName("inner_item");
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

            create_cart_item(id, img, name, price , quantity);
        }
    }
}

function create_cart_item(id,img,name,price,quantity) {
    const img_el = document.createElement("img");
    img_el.className = "inner_item_img";
    img_el.src = img;

    const name_el = document.createElement("p");
    name_el.className = "inner_item_name";
    name_el.innerText = max_length(name,10);

    const price_el = document.createElement("p");
    price_el.className = "inner_item_price";
    price_el.innerText = price + "лв.";

    const info_div_el = document.createElement("div");
    info_div_el.className = "inner_item_info";
    info_div_el.addEventListener("click", function () {
        window.open("./item?item=" + id,"_self");
    });
    info_div_el.appendChild(img_el);
    info_div_el.appendChild(name_el);
    info_div_el.appendChild(price_el);

    const minus_el = document.createElement("i");
    minus_el.className = "fa-solid fa-minus";
    minus_el.onclick = function () {
        change_count(id, "-");
    };

    const quantity_el = document.createElement("p");
    quantity_el.className = "inner_item_count";
    quantity_el.innerText = quantity;

    const plus_el = document.createElement("i");
    plus_el.className = "fa-solid fa-plus";
    plus_el.onclick = function () {
        change_count(id, "+");
    };

    const count_div_el = document.createElement("div");
    count_div_el.className = "count";
    count_div_el.appendChild(minus_el);
    count_div_el.appendChild(quantity_el);
    count_div_el.appendChild(plus_el);

    const inner_item_div_el = document.createElement("div");
    inner_item_div_el.className = "inner_item";
    inner_item_div_el.id = "inner_item" + id;
    inner_item_div_el.appendChild(info_div_el);
    inner_item_div_el.appendChild(count_div_el);

    document.getElementById("inner_cart").appendChild(inner_item_div_el);
}

function change_count(id, change_type) {
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

    cart_update();
}


document.addEventListener("DOMContentLoaded", function () {
    cart_update();
});

// let test1 = new cart_items("0001",1 , "./test_product/7041N-99X-002-1-558533_5.webp", "Reality is poison", 50,"L");
// let test2 = new cart_items("0002",1 , "./test_product/7041N-99X-002-1-558533_5.webp", "Reality is poison", 150,"L");
// let test3 = new cart_items("0003",1 , "./test_product/7041N-99X-002-1-558533_5.webp", "Reality is poison", 250,"L");