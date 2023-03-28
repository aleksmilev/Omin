<?php
include "../connection.php";

$username = query_encoder($_POST['username']);
$password = query_encoder($_POST['password']);
$permission_level = (int)$_POST['permission_level'];

$sql = "INSERT INTO users (users.username, users.password, users.permission_level) VALUES ('$username', '$password', $permission_level);";
$result = mysqli_query($admin_conn, $sql);

if($result){
    echo "1";

    new_activity("New user created with username:" . query_decoder($username), $admin_conn);
}else{
    echo "0";
}

mysqli_close($admin_conn);
mysqli_close($user_conn);
?>