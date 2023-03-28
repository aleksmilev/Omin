new URL(location.href).searchParams.get('page');

const params = new URL(location.href).searchParams;

let page = params.get('page');

const count_div = document.getElementById("page_count");
const count = document.createElement("span");
count.innerText = page;
count_div.appendChild(count);

//?page=1

function next_page() {
    page = parseInt(page) + 1;
    params.set('page', page);

    location.href = "./shop?page=" + page;
}

function previous_page() {
    page = parseInt(page) - 1;
    params.set('page', page);

    location.href = "./shop?page=" + page;
}

let total_pages = 5;

document.getElementById("next_page").addEventListener("click", function () {
    if (page <= (total_pages - 1)) {
        next_page();
    }
});

document.getElementById("previous_page").addEventListener("click", function () {
    if (page >= 5) {
        previous_page();
    }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function create_collection(id, img, name) {
    const img_el = document.createElement("img");
    img_el.className = "collection_img";
    img_el.src = img;

    const img_div = document.createElement("div");
    img_div.className = "img_container";
    img_div.appendChild(img_el);

    const name_el = document.createElement("p");
    name_el.innerText = name;
    name_el.className = "collection_name";

    const collection = document.createElement("a");
    collection.className = "collection";
    collection.href = "./shop?page=1&filter=" +id;
    collection.appendChild(img_div);
    collection.appendChild(name_el);

    document.getElementById("collections").appendChild(collection);
}

class collection{
    url;
    img;
    name;
    price;

    constructor(url,img,name,price){
        this.url = url;
        this.img = img;
        this.name = name;
        this.price = price;
    }

    create_collection_() {
        create_collection(this.url,this.img,this.name,this.price);
    }
}

let collection_array = [];

// for(let a = 0; a <= (16-1); a++){
//     collection_array.push(new collection("?????","./test_product/7041N-99X-002-1-558533_5.webp","Reality is poison"));
// }

fetch("./server/collections.php")
    .then((response) => response.json())
    .then((data) => {
        data.forEach(element => {
            let [id_, name_] = element;

            collection_array.push(new collection(id_, "./server/images/collections/" + id_ + ".webp" , name_));
        });

        total_pages = Math.ceil(collection_array.length / 16);

        for (let a = parseInt(params.get('page') - 1) * 16; a <= parseInt(params.get('page')) * 16 - 1; a++){
            if (collection_array[a] !== undefined) {
                collection_array[a].create_collection_();
            }
        }
    });