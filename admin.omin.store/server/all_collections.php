<?php
include 'connection.php';

$sql = "SELECT * FROM `collections` WHERE `collections`.`name` != 'none';";
$result = mysqli_query($user_conn, $sql);

$collections = [];

while($row = mysqli_fetch_assoc($result)){
    $id = $row["id"];
    $name = $row["name"];
    $items = [];

    $sql_ = "SELECT products.id FROM products WHERE products.collection_id = '$id';";
    $result_ =  mysqli_query($user_conn, $sql_);

    while($row = mysqli_fetch_assoc($result_)){
        array_push($items, $row['id']);
    }

    array_push($collections, (object)[
        'id' => $id,
        'name' => $name,
        'items' => $items
    ]);
}

mysqli_close($admin_conn);
mysqli_close($user_conn);

echo json_encode($collections);