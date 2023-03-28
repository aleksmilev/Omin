function create_option(name,id) {
    const option = document.createElement("option");
    option.value = id;
    option.innerText = name.charAt(0).toUpperCase() + name.slice(1);

    document.getElementById("prod_collection").appendChild(option);
}
fetch("./server/all_collections.php")
    .then((response) => response.json())
    .then((data) => {
        data.forEach(collection => {
            let name = collection.name;
            let id = collection.id;

            create_option(name,id);
        });
    });


const form = document.getElementById("new_product");

form.addEventListener("submit", async (event) => {
	event.preventDefault();

	let id;
	let name = document.getElementById("prod_name").value;
	let price = document.getElementById("prod_price").value;
    let gender = document.getElementById("prod_gender").value;
    let collection = document.getElementById("prod_collection").value;
	let image_first = document.getElementById("first_img").files[0];
	let image_second = document.getElementById("second_img").files[0];

    let size_list = [];
    document.querySelectorAll(".size_checkbox").forEach(size => {
        if (size.checked) {
            size_list.push(size.value);
        }
    });

    let info = {
        name: name,
        price: price,
        gender: gender,
        collection: collection,
        size_list: size_list.join()
    }

	let xhr_info = new XMLHttpRequest();
	xhr_info.open('POST', './server/functions/create_product.php');
	xhr_info.onload = () => {
        const response = JSON.parse(xhr_info.responseText);

		if (response != "-1") {
			let formImage = new FormData();
			formImage.append('product_first', image_first);
			formImage.append('product_second', image_second);
			formImage.append('id' , response);
		
			let xhr_img = new XMLHttpRequest();
			xhr_img.open('POST', './server//images/products.php');
			xhr_img.onload = () => {
				const response_img = JSON.parse(xhr_img.responseText);

				if (response_img == "Success") {
					// location.reload(); 
				}else{
					alert("Error");
				}
			}
			xhr_img.send(formImage);
		} else {
			alert("Error");
		}
    };
	xhr_info.send(JSON.stringify(info));
});

document.addEventListener("DOMContentLoaded", () => form.reset());


