const form = document.getElementById("new_collection");

form.addEventListener("submit", async (event) => {
	event.preventDefault();

	let id;
	let name = document.getElementById("coll_name").value;
	let image = document.getElementById("coll_img").files[0];

	let xhr_info = new XMLHttpRequest();
	xhr_info.open('POST', './server/functions/create_collection.php');
	xhr_info.onload = () => {
        const response = JSON.parse(xhr_info.responseText);

		if (response != "-1") {
			let formImage = new FormData();
			formImage.append('collection_cover', image);
			formImage.append('id' , response);
		
			let xhr_img = new XMLHttpRequest();
			xhr_img.open('POST', './server//images/collections.php');
			xhr_img.onload = () => {
				const response_img = JSON.parse(xhr_img.responseText);

				if (response_img == "Success") {
					location.reload(); 
				}else{
					alert("Error");
				}
			}
			xhr_img.send(formImage);
		} else {
			alert("Error");
		}
    };
	xhr_info.send(name);
});


document.addEventListener("DOMContentLoaded", () => form.reset());
