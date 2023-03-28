function create_collection(id,img,name){
    const img_el = document.createElement("img");
    img_el.className = "collection_img";
    img_el.src = img;

    const img_div = document.createElement("div");
    img_div.className = "img_container";
    img_div.appendChild(img_el);

    const name_el = document.createElement("p");
    name_el.className = "collection_name";
    name_el.innerText = name;

    const collection = document.createElement("a");
    collection.href = "./shop?page=1&filter=" + id;
    collection.appendChild(img_div);
    collection.appendChild(name_el);

    document.getElementById("collections").prepend(collection);
}
                                                        
fetch("./server/collections.php")
    .then((response) => response.json())
    .then((data) => {
        let max_items = 3;
        let current_items = new Array();

        for (let a = 0; a <= max_items - 1; a++){
            let item = Math.floor(Math.random() * data.length);

            if (!current_items.includes(item)) {
                let [id_,name_] = data[item];
                create_collection(id_, "./server/images/collections/" + id_ + ".webp", name_);

                current_items.push(item);
            } else {
                a--;
            }   
        }
    });

function create_product(id, img, name, price) {
    const img_el = document.createElement("img");
    img_el.className = "best_product_img";
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


    const best_product_name_el = document.createElement("div");
    best_product_name_el.className = "best_product_name";
    best_product_name_el.appendChild(name_el);
    best_product_name_el.appendChild(price_el);


    const best_product = document.createElement("a");
    best_product.href = "./item?item=" + id;
    best_product.className = "best_product";
    best_product.appendChild(img_container_el);
    best_product.appendChild(best_product_name_el);

    const container =  document.getElementById("inner_best_products");
    container.appendChild(best_product);
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

        create_product(id,img,name,price);
    }
}

let best_product_array = [];

fetch("./server/products.php")
    .then((response) => response.json())
    .then((data) => {
        let max_items = 8;
        let current_items = new Array();

        for (let a = 0; a <= max_items - 1; a++){
            let item = Math.floor(Math.random() * data.length);

            if (!current_items.includes(item)) {
                let [id_, name_, price_, size_list_, gender_, collection_] = data[item];
                best_product_array.push(new product(id_, "./server/images/products/" + id_ + "/1.webp", name_, price_));

                current_items.push(item);
            } else {
                a--;
            }
        }
    });
