new URL(location.href).searchParams.get('page');
new URL(location.href).searchParams.get('filter');

const params = new URL(location.href).searchParams;

let page = params.get('page');
const filter = params.get('filter');

const count_div = document.getElementById("page_count");
const count = document.createElement("span");
count.innerText = page;
count_div.appendChild(count);

//?page=1

const filter_el = document.getElementById("filter");

if (filter == "none") {
    filter_el.innerText = "These are all our products";
}
else if (filter == "man") {
    filter_el.innerText = "You are in men's section";
}
else if (filter == "woman") {
    filter_el.innerText = "You are in women's section";
}
else {
    fetch("./server/collections.php")
    .then((response) => response.json())
    .then((data) => {
        data.forEach(element => {
            let [id_, name_] = element;

            if (id_ == filter) {
                filter_el.innerText = "You are in " + name_  + " collection";
            }
        });
    });
}


function next_page() {
    page = parseInt(page) + 1;
    params.set('page', page);

    if (filter != null) {
        location.href = "./shop?page=" + page + "&filter=" + filter;
    }

}

function previous_page() {
    page = parseInt(page) - 1;
    params.set('page', page);

    if (filter != null) {
        location.href = "./shop?page=" + page + "&filter=" + filter;
    }
    
}

let total_pages;

document.getElementById("next_page").addEventListener("click", function () {
    if (page <= (total_pages - 1)) {
        next_page();
    }
});

document.getElementById("previous_page").addEventListener("click", function () {
    if (page >= 2) {
        previous_page();
    }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function create_product(id, img, name, price) {
    const img_el = document.createElement("img");
    img_el.className = "product_img";
    img_el.src = img;

    const img_container_el = document.createElement("div");
    img_container_el.className = "img_container";
    img_container_el.appendChild(img_el);


    const name_el = document.createElement("p");
    name_el.innerText = name;
    name_el.className = "name";

    const price_el = document.createElement("p");
    price_el.innerText = price + "лв.";
    price_el.className = "price";


    const product_name_el = document.createElement("div");
    product_name_el.className = "product_name";
    product_name_el.appendChild(name_el);
    product_name_el.appendChild(price_el);


    const product = document.createElement("a");
    product.href = "./item?item=" + id;
    product.className = "product";
    product.appendChild(img_container_el);
    product.appendChild(product_name_el);

    const product_container =  document.getElementById("product_container");
    product_container.appendChild(product);
}

class product{
    id;
    img;
    name;
    price;

    constructor(id,img,name,price){
        this.id = id;
        this.img = img;
        this.name = name;
        this.price = price;
    }

    create_product_() {
        create_product(this.id,this.img,this.name,this.price);
    };
}

let product_array = [];

// for (let a = 0; a <= 15; a++){
//     product_array.push(new product("id_" + a, "./test_product/7041N-99X-002-1-558533_5.webp", "name_" + a, "price_"));
// }
// product_array.forEach(element => {
//     if (element !== undefined) {
//         element.create_product_();
//     }
// });

fetch("./server/products.php")
    .then((response) => response.json())
    .then((data) => {
        data.forEach(element => {
            let [id_, name_, price_, size_list_, gender_, collection_] = element;

            if (params.get('filter') == "none") {
                if (gender_ == "N" || gender_ == "M" || gender_ == "F") {
                    product_array.push(new product(id_, "./server/images/products/" + id_ + "/1.webp", name_, price_));
                }
            }else if (params.get('filter') == "man") {
                if (gender_ == "N" || gender_ == "M") {
                    product_array.push(new product(id_, "./server/images/products/" + id_ + "/1.webp", name_, price_));
                }
            }else if (params.get('filter') == "woman") {
                if (gender_ == "N" || gender_ == "F") {
                    product_array.push(new product(id_, "./server/images/products/" + id_ + "/1.webp", name_, price_));
                }
            } else {
                if (collection_ == params.get('filter')) {
                    product_array.push(new product(id_, "./server/images/products/" + id_ + "/1.webp", name_, price_));
                }
            }
        });

        total_pages = Math.ceil(product_array.length / 16);

        for (let a = parseInt(params.get('page') - 1) * 16; a <= parseInt(params.get('page')) * 16 - 1; a++){
            if (product_array[a] !== undefined) {
                product_array[a].create_product_();
            }
        }
    });