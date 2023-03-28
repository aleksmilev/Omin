<?php
include "../connection.php";

$data = json_decode(file_get_contents('php://input'));

$name = $data->name;
$price = (double)$data->price;
$size_list = $data->size_list;
$gender = $data->gender;
$collection = (int)$data->collection;

$sql = "INSERT INTO products (products.name, products.price, products.size_list, products.gender, products.collection_id) VALUES ('$name', $price, '$size_list', '$gender', $collection)";
$result = mysqli_query($user_conn, $sql);

$sql_ = "SELECT * FROM products WHERE products.name = '$name';";
$result_ = mysqli_query($user_conn, $sql_);

if($result){
    while($row = mysqli_fetch_assoc($result_)){
        echo $row["id"];
    }

    new_activity("New product created with name:" . $name, $admin_conn);
}else{
    echo "-1";
}

mysqli_close($admin_conn);
mysqli_close($user_conn);
?>