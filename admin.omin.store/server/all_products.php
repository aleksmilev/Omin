<?php
include 'connection.php';

$sql = "SELECT products.id, products.name, products.price, products.size_list, products.gender, collections.name AS collection_name FROM products, collections WHERE products.collection_id = collections.id;";
$result = mysqli_query($user_conn, $sql);

$products = [];

while($row = mysqli_fetch_assoc($result)){
    $id = $row["id"];
    $name = $row["name"];
    $price = $row["price"];
    $size_list = $row["size_list"];
    $gender = $row["gender"];
    $collection_name = $row["collection_name"];

    array_push($products, (object)[
        'id' => $id,
        'name' => $name,
        'price' => $price,
        'size_list' => $size_list,
        'gender' => $gender,
        'collection_name' => $collection_name
    ]);
}

mysqli_close($admin_conn);
mysqli_close($user_conn);

echo json_encode($products);