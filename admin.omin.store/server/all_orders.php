<?php
include 'connection.php';

$sql = "SELECT * FROM orders;";
$result = mysqli_query($user_conn, $sql);

$orders = [];

while($row = mysqli_fetch_assoc($result)){
    $id = $row["id"];
    $name = query_decoder($row["f_name"]) . "-" . query_decoder($row["l_name"]);
    $phone = query_decoder($row["phone"]);
    $address = query_decoder($row["address"]);
    $items_info = $row["items_info"];

    array_push($orders, (object)[
        'id' => $id,
        'name' => $name,
        'phone' => $phone,
        'address' => $address,
        'items' => $items_info,
    ]);
}

mysqli_close($admin_conn);
mysqli_close($user_conn);

echo json_encode($orders);
?>