<?php
include "../connection.php";

$collection_name = file_get_contents('php://input');

$sql = "INSERT INTO collections (collections.name) VALUES ('$collection_name');";
$result = mysqli_query($user_conn, $sql);

$sql_ = "SELECT * FROM collections WHERE collections.name = '$collection_name';";
$result_ = mysqli_query($user_conn, $sql_);

if($result){
    while($row = mysqli_fetch_assoc($result_)){
        echo $row["id"];
    }

    new_activity("New collection created with name:" . $collection_name, $admin_conn);
}else{
    echo "-1";
}

mysqli_close($admin_conn);
mysqli_close($user_conn);
?>