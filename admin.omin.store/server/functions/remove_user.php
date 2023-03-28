<?php
include "../connection.php";

$username_ = $_COOKIE["user_name"];

$id = (int)file_get_contents('php://input');
$username = "";

$sql = 

$sql_ = "SELECT * FROM users WHERE users.id = $id";
$result = mysqli_query($admin_conn,$sql_);

while($row = mysqli_fetch_assoc($result)) {
    $username = $row["username"];
}

if($username != query_encoder("root") && query_encoder($username) != $username_){
    $sql = "DELETE FROM users WHERE users.id = $id AND users.username != 'root';";

    if(mysqli_query($admin_conn,$sql)){
        echo "1";

        new_activity("New deleted user:" . $username, $admin_conn);
    }else{
        echo "0";
    }
}

mysqli_close($admin_conn);
mysqli_close($user_conn);
?>