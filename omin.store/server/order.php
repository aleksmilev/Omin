<?php
include 'connection.php';

$order_info = file_get_contents('php://input');
$object = json_decode($order_info);
$stdClass = new stdClass();

$stdClass->items_info = $object->items_info;
$stdClass->order_info = $object->order_info;

$f_name = query_encoder($stdClass->order_info->f_name_);
$l_name = query_encoder($stdClass->order_info->l_name_);
$phone = query_encoder($stdClass->order_info->phone_);
$address = query_encoder($stdClass->order_info->address_);

$items_info = json_encode($stdClass->items_info);

$sql = "INSERT INTO orders (orders.f_name, orders.l_name, orders.phone, orders.address, orders.items_info)
        VALUES ('$f_name', '$l_name', '$phone', '$address', '$items_info');";

if(mysqli_query($conn,$sql)){
    echo "1";
}else{
    echo "0";
}

mysqli_close($conn);