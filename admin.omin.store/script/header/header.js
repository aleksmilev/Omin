document.getElementById("header_main").addEventListener("click", () => {
    window.open("./", "_self");
});

document.getElementById("log_out").addEventListener("click", () => {
    document.cookie = "user_id=;expires=" + new Date(0).toUTCString();
    document.cookie = "user_name=;expires=" + new Date(0).toUTCString();
    document.cookie = "user_password=;expires=" + new Date(0).toUTCString();
    document.cookie = "permission_level=;expires=" + new Date(0).toUTCString();

    window.open("./", "_self"); 
});