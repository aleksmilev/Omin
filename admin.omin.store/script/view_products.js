class product_{
    id;
    name;
    price;
    size_list;
    gender;
    collection;

    first_img;
    second_img;

    constructor(id,name,price,size_list,gender,collection) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.size_list = size_list;
        this.gender = gender;
        this.collection = collection;

        let img_url = "./server/images/products/" + id + "/";

        this.first_img = img_url + "1.webp";
        this.second_img = img_url + "2.webp";

        this.create_product();
    }

    create_product() {
        const div = document.createElement('div');
        div.className = 'product';
        
        const firstImg = document.createElement('img');
        firstImg.src = this.first_img;
        firstImg.className = 'first_img';
        div.appendChild(firstImg);
        
        const secondImg = document.createElement('img');
        secondImg.src = this.second_img;
        secondImg.className = 'second_img';
        div.appendChild(secondImg);
        
        const infoDiv = document.createElement('div');
        infoDiv.className = 'info';
        
        const idH1 = document.createElement('h1');
        idH1.textContent = 'Id: ';
        const idSpan = document.createElement('span');
        idSpan.textContent = this.id;
        idH1.appendChild(idSpan);
        infoDiv.appendChild(idH1);
        
        const nameH1 = document.createElement('h1');
        nameH1.textContent = 'Name: ';
        const nameSpan = document.createElement('span');
        nameSpan.textContent = this.name;
        nameH1.appendChild(nameSpan);
        infoDiv.appendChild(nameH1);
        
        const priceH1 = document.createElement('h1');
        priceH1.textContent = 'Price: ';
        const priceSpan = document.createElement('span');
        priceSpan.textContent = this.price + "BGN";
        priceH1.appendChild(priceSpan);
        infoDiv.appendChild(priceH1);
        
        const sizeH1 = document.createElement('h1');
        sizeH1.textContent = 'Size list: ';
        const sizeSpan = document.createElement('span');
        sizeSpan.textContent = this.size_list;
        sizeH1.appendChild(sizeSpan);
        infoDiv.appendChild(sizeH1);
        
        const genderH1 = document.createElement('h1');
        genderH1.textContent = 'Gender: ';
        const genderSpan = document.createElement('span');
        genderSpan.textContent = this.gender;
        genderH1.appendChild(genderSpan);
        infoDiv.appendChild(genderH1);
        
        const collectionH1 = document.createElement('h1');
        collectionH1.textContent = 'Collection: ';
        const collectionSpan = document.createElement('span');
        collectionSpan.textContent = this.collection;
        collectionH1.appendChild(collectionSpan);
        infoDiv.appendChild(collectionH1);
        
        div.appendChild(infoDiv);
        
        const button = document.createElement('button');
        button.textContent = 'Remove this product';
        button.onclick = () => {
            this.remove_product();
        }
        div.appendChild(button);
        
        document.getElementById("products").appendChild(div);
    }

    async remove_product() {
        await fetch("./server/functions/remove_product.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: this.id
        });

        await fetch("./server//images/remove_collection.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: this.id
        });

        alert("You successfully deleted this collection");
        window.location.href = window.location.href;
    }
}

fetch("./server/all_products.php")
    .then((response) => response.json())
    .then((data) => {
        data.forEach(product => {
            let id = product.id;
            let name = product.name;
            let price = product.price;
            let size_list = product.size_list;
            let gender;
            switch (product.gender) {
                case "N":
                    gender = "Unisex";
                    break;
                case "M":
                    gender = "Male";
                    break;
                case "F":
                    gender = "Female";
                    break;
            }

            let collection = product.collection_name;

            new product_(id,name,price,size_list,gender,collection);
        });
    });