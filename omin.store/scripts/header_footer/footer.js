const footerContainer = document.getElementById("footer");

const sloganFooter = document.createElement("div");
sloganFooter.id = "slogan_footer";
footerContainer.appendChild(sloganFooter);

const footer = document.createElement("div");
footer.classList.add("footer");
footerContainer.appendChild(footer);

const startSection = document.createElement("section");
startSection.classList.add("start");
footer.appendChild(startSection);

const follow = document.createElement("div");
follow.classList.add("follow");
startSection.appendChild(follow);

const followHeader = document.createElement("h3");
followHeader.innerHTML = "Follow us on";
follow.appendChild(followHeader);

const socialMedia = document.createElement("div");
socialMedia.classList.add("social_media");
follow.appendChild(socialMedia);

const instagram = document.createElement("div");
socialMedia.appendChild(instagram);

const instagramLink = document.createElement("a");
instagramLink.className = "link";
instagramLink.addEventListener("click", function () {
    window.open("https://www.instagram.com/", '_blank').focus();
});
instagram.appendChild(instagramLink);

const instagramIcon = document.createElement("i");
instagramIcon.classList.add("fa-brands", "fa-instagram");
instagramLink.appendChild(instagramIcon);

const instagramText = document.createElement("span");
instagramText.innerHTML = "instagram";
instagramLink.appendChild(instagramText);

const facebook = document.createElement("div");
socialMedia.appendChild(facebook);

const facebookLink = document.createElement("a");
facebookLink.className = "link";
facebookLink.addEventListener("click", function () {
    window.open("https://www.facebook.com/", '_blank').focus();
});
facebook.appendChild(facebookLink);

const facebookIcon = document.createElement("i");
facebookIcon.classList.add("fa-brands", "fa-facebook");
facebookLink.appendChild(facebookIcon);

const facebookText = document.createElement("span");
facebookText.innerHTML = "facebook";
facebookLink.appendChild(facebookText);

const tiktok = document.createElement("div");
socialMedia.appendChild(tiktok);

const tiktokLink = document.createElement("a");
tiktokLink.className = "link";
tiktokLink.addEventListener("click", function () {
    window.open("https://www.tiktok.com/", '_blank').focus();
});
tiktok.appendChild(tiktokLink);

const tiktokIcon = document.createElement("i");
tiktokIcon.classList.add("fa-brands", "fa-tiktok");
tiktokLink.appendChild(tiktokIcon);

const tiktokText = document.createElement("span");
tiktokText.innerHTML = "tiktok";
tiktokLink.appendChild(tiktokText);

const copyright_el = document.createElement("h2");
copyright_el.id = "copyright";
startSection.appendChild(copyright_el);

const endSection = document.createElement("section");
endSection.classList.add("end");
footer.appendChild(endSection);

const info = document.createElement("div");
const infoLink = document.createElement("a");
infoLink.href = "./info#info";
info.appendChild(infoLink);

const infoHeader = document.createElement("h2");
infoHeader.innerHTML = "Info";
infoLink.appendChild(infoHeader);
endSection.appendChild(info);

const contactUs = document.createElement("div");
const contactUsLink = document.createElement("a");
contactUsLink.href = "./info#contact_us";
contactUs.appendChild(contactUsLink);

const contactUsHeader = document.createElement("h2");
contactUsHeader.innerHTML = "Contact us";
contactUsLink.appendChild(contactUsHeader);
endSection.appendChild(contactUs);

const shipping = document.createElement("div");
const shippingLink = document.createElement("a");
shippingLink.href = "./info#shipping";
shipping.appendChild(shippingLink);

const shippingHeader = document.createElement("h2");
shippingHeader.innerHTML = "Shipping";
shippingLink.appendChild(shippingHeader);
endSection.appendChild(shipping);

const policies = document.createElement("div");
const policiesLink = document.createElement("a");
policiesLink.href = "./info#policies";
policies.appendChild(policiesLink);

const policiesHeader = document.createElement("h2");
policiesHeader.innerHTML = "Policies";
policiesLink.appendChild(policiesHeader);
endSection.appendChild(policies);



const copyright = document.getElementById("copyright");
let current_year = new Date().getFullYear();
copyright.innerText = "©️2022-"+ current_year +" Omin.store. All rights reserved.";

function create_slogan(word) {
    word = word.split("");

    for(let a = 0; a <= word.length-1;a++){
        if(word[a] == " "){
            word[a] = " ";
        }

        let h1_letter = document.createElement("h1");
        h1_letter.innerText = word[a];
        h1_letter.className = "text";
        h1_letter.id = "text_" + (a+1);

        document.getElementById("slogan_footer").appendChild(h1_letter);
    }
}


document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".text").forEach(function (element) {
        element.addEventListener("mouseover", function (element) {
            set_animation(element.target.id);
        });
        
        element.addEventListener("mouseleave", function (element) {
            reset_animation(element.target.id);
        }); 
    });
});

function set_animation(id) {
    let first_id = id;

    first_id = parseInt(first_id.split("_")[1]);
    let second_id = [parseInt(first_id) - 1,parseInt(first_id) - 2];
    let third_id = [parseInt(first_id) + 1,parseInt(first_id) + 2];

    let left1 = document.getElementById("text_" + second_id[1]);
    let left0 = document.getElementById("text_" + second_id[0]);
    let mid = document.getElementById("text_" + first_id);
    let right0 = document.getElementById("text_" + third_id[0]);
    let right1 = document.getElementById("text_" + third_id[1]);

    if (left1 != null) {
        left1.style.transition = "0.5s";
        left1.style.color = "#AF9CFC";
        left1.style.textShadow = "0px 0px 3px #7F61FAab"; 
    }
    if (left0 != null) {
        left0.style.transition = "0.5s";
        left0.style.color = "#8E73FB";
        left0.style.textShadow = "0px 0px 3px #603AF8"; 
    }
    
    mid.style.transition = "0.5s";
    mid.style.color="#6d4afa";
    mid.style.textShadow = "0px 0px 3px #3F10F9"; 

    if (right0 != null) {
        right0.style.transition = "0.5s";
        right0.style.color="#8E73FB";
        right0.style.textShadow = "0px 0px 3px #603AF8";  
    }
    if (right1 != null) {
        right1.style.transition = "0.5s";
        right1.style.color="#AF9CFC";
        right1.style.textShadow = "0px 0px 3px #7F61FAab";  
    }
}

function reset_animation(id) {
    let first_id = id;

    first_id = parseInt(first_id.split("_")[1]);
    let second_id = [parseInt(first_id) - 1, parseInt(first_id) - 2, parseInt(first_id) - 3,parseInt(first_id) - 4];
    let third_id = [parseInt(first_id) + 1, parseInt(first_id) + 2, parseInt(first_id) + 3,parseInt(first_id) + 4];

    let left3 = document.getElementById("text_" + second_id[3]);
    let left2 = document.getElementById("text_" + second_id[2]);
    let left1 = document.getElementById("text_" + second_id[1]);
    let left0 = document.getElementById("text_" + second_id[0]);
    let mid = document.getElementById("text_" + first_id);
    let right0 = document.getElementById("text_" + third_id[0]);
    let right1 = document.getElementById("text_" + third_id[1]);
    let right2 = document.getElementById("text_" + third_id[2]);
    let right3 = document.getElementById("text_" + third_id[3]);

    if (left3 != null) {
        left3.style.transition = "0.5s";
        left3.style.color="#F0EDFD";
        left3.style.textShadow = "none"; 
    }
    if (left2 != null) {
        left2.style.transition = "0.5s";
        left2.style.color="#F0EDFD";
        left2.style.textShadow = "none"; 
    }
    if (left1 != null) {
        left1.style.transition = "0.5s";
        left1.style.color="#F0EDFD";
        left1.style.textShadow = "none"; 
    }
    if (left0 != null) {
        left0.style.transition = "0.5s";
        left0.style.color="#F0EDFD";
        left0.style.textShadow = "none"; 
    }
    
    mid.style.transition = "0.5s";
    mid.style.color="#F0EDFD";
    mid.style.textShadow = "none"; 

    if (right0 != null) {
        right0.style.transition = "0.5s";
        right0.style.color="#F0EDFD";
        right0.style.textShadow = "none"; 
    }
    if (right1 != null) {
        right1.style.transition = "0.5s";
        right1.style.color="#F0EDFD";
        right1.style.textShadow = "none"; 
    }
    if (right2 != null) {
        right2.style.transition = "0.5s";
        right2.style.color="#F0EDFD";
        right2.style.textShadow = "none"; 
    }
    if (right3 != null) {
        right3.style.transition = "0.5s";
        right3.style.color="#F0EDFD";
        right3.style.textShadow = "none"; 
    }
}

create_slogan("Let creativity choose your style");

