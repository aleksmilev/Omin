new URL(location.href).searchParams.get('item');

const params = new URL(location.href).searchParams;

fetch("./server/products.php")
    .then((response) => response.json())
    .then((data) => {
        let id_;
        let img_1_;
        let img_2_;
        let name_;
        let price_;
        let size_list_;

        let size_;
        let quantity_;

        data.forEach(element => {
            if (element[0] == params.get('item')) {
                id_ = element[0];
                img_1_ = './server/images/products/' + id_ + "/1.webp";
                img_2_ = './server/images/products/' + id_ + "/2.webp";
                name_ = element[1];
                price_ = element[2];
                size_list_ = element[3];
            }
        })

        try {
            quantity_ = localStorage.getItem(id_).split("╓")[0];
        } catch {
            quantity_ = 1;
        }

        const img_1_el = document.getElementById("img_1");
        const img_2_el = document.getElementById("img_2");
        const name_el = document.getElementById("name");
        const price_el = document.getElementById("price");
        const count = document.getElementById("count");

        img_1_el.src = img_1_;
        img_2_el.src = img_2_;
        name_el.innerText = name_;
        price_el.innerText = price_ + " BGN";
        count.innerText = quantity_;

        function big_change_count(change_type) {
            let count = document.getElementById("count");

            if (change_type == "+") {
                if (parseInt(count.innerText) < 9) {
                    count.innerText = parseInt(count.innerText) + 1;
                }
            } else if (change_type == "-") {
                if (parseInt(count.innerText) >= 2) {
                    count.innerText = parseInt(count.innerText) - 1;
                }
            }
        }

        document.getElementById("minus").addEventListener("click", function () {
            big_change_count("-");
        });
        document.getElementById("plus").addEventListener("click", function () {
            big_change_count("+");
        });

        function change_img_state() {
            const img_1 = document.getElementById("img_1");
            const img_2 = document.getElementById("img_2");

            if (img_1.style.display == "none") {
                img_1.style.display = "block";
                img_2.style.display = "none";
            } else {
                img_1.style.display = "none";
                img_2.style.display = "block";
            }
        }

        document.getElementsByClassName("fa-backward")[0].addEventListener("click", function () {
            change_img_state()
        });
        document.getElementsByClassName("fa-forward")[0].addEventListener("click", function () {
            change_img_state()
        });

        document.getElementById("add_to_cart").addEventListener("click", () => {
            const selected_size = document.getElementsByClassName("selected_size")[0].innerText;
            const current_quantity = document.getElementById("count").innerText;

            let info = [quantity_, img_1_, name_, price_, quantity_, selected_size];
            size_ = selected_size;

            let cart_item_list = localStorage.getItem("cart_item_list");
            if (cart_item_list != null) {
                if (!(cart_item_list.split("┐").includes(id_))) {
                    cart_item_list = localStorage.getItem('cart_item_list') + "┐" + id_;
                }
            } else {
                cart_item_list = localStorage.getItem('cart_item_list') + "┐" + id_;
            }
            
            localStorage.setItem(id_, info.join("╓"));
            localStorage.setItem("cart_item_list", cart_item_list);

            let item = new cart_items(id_, current_quantity, img_, name_, price_, size_);
        });


        function create_size_list() {
            let sizes = size_list_.split(",");

            for (let a = 0; a <= sizes.length - 1; a++) {
                let size = document.createElement("li");
                size.className = "size";
                size.innerText = sizes[a];
                
                document.getElementById("sizes_available").appendChild(size);
            }

            const sizes_available = document.querySelectorAll("#sizes_available > .size");
            try { 
                size_ = localStorage.getItem(id_).split("╓")[4];

                sizes_available.forEach(element => {
                    if (element.innerText == size_) {
                        element.classList.add("selected_size");
                    }
                });
            } catch {
                sizes_available[0].classList.add("selected_size");
            }
        }
        create_size_list();


        const sizes_available = document.querySelectorAll("#sizes_available > li");
        sizes_available.forEach(item => {
            item.addEventListener("click", function () {
                const size_selected = document.getElementsByClassName("selected_size");
                for (let i = 0; i < size_selected.length; i++) {
                    size_selected[i].classList.remove("selected_size");
                }

                item.classList.add("selected_size");
            });
        })
    });


function create_similar_product(id,img,name,price){
    const img_el = document.createElement("img");
    img_el.src = img;

    const img_div = document.createElement("div");
    img_div.className = "img_container";
    img_div.appendChild(img_el);

    const name_el = document.createElement("p");
    name_el.className = "name";
    name_el.innerText = name;

    const price_el = document.createElement("p");
    price_el.className = "price";
    price_el.innerText = price + " BGN";

    const info_div = document.createElement("div");
    info_div.className = "similar_product_name";
    info_div.appendChild(name_el);
    info_div.appendChild(price_el);

    const similar_product = document.createElement("a");
    similar_product.className = "similar_product";
    similar_product.href = "./item?item=" + id;
    similar_product.appendChild(img_div);
    similar_product.appendChild(info_div);

    document.getElementById("similar_products").appendChild(similar_product);
}

fetch("./server/products.php")
    .then((response) => response.json())
    .then((data) => {
        let max_items = 4;
        let current_items = new Array();

        for (let a = 0; a <= max_items - 1; a++){
            let item = Math.floor(Math.random() * data.length);

            if (!current_items.includes(item)) {
                let [id_, name_, price_, size_list_, gender_, collection_] = data[item];
                create_similar_product(id_, "./server/images/items/" + id_ + "/1.webp", name_, price_,);

                current_items.push(item);
            } else {
                a--;
            }
        }
    });
