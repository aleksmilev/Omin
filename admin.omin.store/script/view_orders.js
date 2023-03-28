class order_{
    id;
    name;
    phone;
    address;
    items = [];

    constructor(id,name,phone,address,items) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.address = address;


        JSON.parse(items).forEach(item => {
            this.items.push({
                id: item.id_,
                size: item.size_,
                quantity: item.quantity_
            });
        });

        this.create_order();
    }

    create_order() {
        const orderDiv = document.createElement('div');
        orderDiv.className = 'order';

        const userInfoDiv = document.createElement('div');
        userInfoDiv.className = 'user_info';

        const nameDiv = document.createElement('div');
        nameDiv.className = 'name';

        const nameLabel = document.createElement('h1');
        nameLabel.textContent = 'Name:';
        const nameText = document.createElement('h1');
        nameText.textContent = this.name;

        nameDiv.appendChild(nameLabel);
        nameDiv.appendChild(nameText);

        const phoneDiv = document.createElement('div');
        phoneDiv.className = 'phone';
        const phoneLabel = document.createElement('h1');
        phoneLabel.textContent = 'Phone number:';
        const phoneText = document.createElement('h1');
        phoneText.textContent = this.phone;
        phoneDiv.appendChild(phoneLabel);
        phoneDiv.appendChild(phoneText);

        const addressDiv = document.createElement('div');
        addressDiv.className = 'address';
        const addressLabel = document.createElement('h1');
        addressLabel.textContent = 'Address:';
        const addressText = document.createElement('h1');
        addressText.textContent = this.address;
        addressDiv.appendChild(addressLabel);
        addressDiv.appendChild(addressText);

        userInfoDiv.appendChild(nameDiv);
        userInfoDiv.appendChild(phoneDiv);
        userInfoDiv.appendChild(addressDiv);

        const orderInfoDiv = document.createElement('div');
        orderInfoDiv.className = 'order_info';

        this.items.forEach(item => {
            this.create_item(item.id, item.size, item.quantity, orderInfoDiv);
        });

        const button = document.createElement('button');
        button.textContent = 'Set order as sended';
        button.onclick = () => {
            this.remove_order();
        }

        orderDiv.appendChild(userInfoDiv);
        orderDiv.appendChild(orderInfoDiv);
        orderDiv.appendChild(button);

        document.getElementById("orders").appendChild(orderDiv);
    }

    create_item(id, size, quantity, parent) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        const itemLabel = document.createElement('h1');
        itemLabel.textContent = 'Item: ';
        const itemText = document.createElement('h1');
        itemText.textContent = `${id} - ${size} - ${quantity}`;
        itemDiv.appendChild(itemLabel);
        itemDiv.appendChild(itemText);

        parent.appendChild(itemDiv);
    }

    async remove_order() {
        await fetch("./server/functions/remove_order.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: this.id
        });

        alert("You successfully deleted this order");
        window.location.href = window.location.href;
    }
}

fetch("./server/all_orders.php")
    .then((response) => response.json())
    .then((data) => {
        data.forEach(order => {
            let id = order.id;
            let name = order.name;
            let phone = order.phone;
            let address = order.address;
            let items = order.items;

            new order_(id,name,phone,address,items);
        });
    });