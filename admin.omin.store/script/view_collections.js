class collection_{
    image;
    id;
    name;
    items;

    constructor(id, name, items){
        this.name = name;
        this.id = id;
        this.items = items;

        this.image = `./server/images/collections/${id}.webp`;

        this.create_collection();
    }

    create_collection(){
        const collectionDiv = document.createElement("div");
        collectionDiv.classList.add("collection");
    
        const imageDiv = document.createElement("div");
        imageDiv.classList.add("image");
    
        const img = document.createElement("img");
        img.src = this.image;
    
        imageDiv.appendChild(img);
    
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("info");
    
        const idH1 = document.createElement("h1");
        idH1.classList.add("id");
        const idSpan = document.createElement("span");
        idSpan.textContent = this.id;
        idH1.textContent = "Id: ";
        idH1.appendChild(idSpan);
    
        const nameH1 = document.createElement("h1");
        nameH1.classList.add("name");
        const nameSpan = document.createElement("span");
        nameSpan.textContent = this.name;
        nameH1.textContent = "Name: ";
        nameH1.appendChild(nameSpan);
    
        infoDiv.appendChild(idH1);
        infoDiv.appendChild(nameH1);
    
        const itemsDiv = document.createElement("div");
        itemsDiv.classList.add("items");

        this.items.forEach(item => {
            this.create_collection_item(item, itemsDiv);
        });
    
        const button = document.createElement("button");
        button.textContent = "Remove this collection";
        button.onclick = () => {
            this.remove_collection();
        }
    
        collectionDiv.appendChild(imageDiv);
        collectionDiv.appendChild(infoDiv);
        collectionDiv.appendChild(itemsDiv);
        collectionDiv.appendChild(button);
    
        document.getElementById("collections").appendChild(collectionDiv);
    }

    create_collection_item(id, div){
        const itemH1 = document.createElement("h1");
        const itemSpan = document.createElement("span");
        itemSpan.textContent = id;
        itemH1.textContent = "Item with id: ";
        itemH1.appendChild(itemSpan);
        div.appendChild(itemH1);
    }

    async remove_collection(){
        await fetch("./server/functions/remove_collection.php", {
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

fetch("./server/all_collections.php")
    .then((response) => response.json())
    .then((data) => {
        data.forEach(order => {
            let id = order.id;
            let name = order.name;
            let items = order.items;

            new collection_(id,name,items);
        });
    });