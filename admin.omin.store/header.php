<?php
$user_id = $_COOKIE["user_id"];
$user_name = $_COOKIE["user_name"];
$user_password = $_COOKIE["user_password"];

if($_COOKIE["permission_level"] == "2"){
    $permission_level = "root";
}else{
    $permission_level = "admin";
}

?>

<header>
    <div id="header_main">
        <div id="id">
            <h1>Id:</h1>
            <h1><?php echo $user_id;?></h1>
        </div>

        <div id="username">
            <h1>Username:</h1>
            <h1><?php echo $user_name;?></h1>
        </div>

        <div id="password">
            <h1>Password:</h1>
            <h1><?php echo $user_password;?></h1>
        </div>

        <div id="permission_level">
            <h1>Access:</h1>
            <h1><?php echo $permission_level;?></h1>
        </div>
    </div>

    <nav>
        <div id="root">
            <a href="./create_user">Create user</a>
            <a href="./view_users">View users</a>
            <a href="./view_activities">View activities</a>
        </div>
        
        <div id="admin">
            <a href="./view_orders">View orders</a>
            <a href="./view_products">View products</a>
            <a href="./create_product">Create product</a>
            <a href="./view_collections">View collections</a>
            <a href="./create_collection">Create collection</a>
            <a href="./view_feedbacks">View feedbacks</a>
        </div>
    </nav>
</header>

<div id="log_out">Log out</div>

<script src="./script/header/header.js"></script>