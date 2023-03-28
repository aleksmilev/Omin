<?php
include 'connection.php';

header('Content-Type: application/json');

$sql = "SELECT * FROM `collections` WHERE `collections`.`name` != 'none' AND `collections`.`name` != 'special';";
$collection_query = mysqli_query($conn, $sql);
mysqli_close($conn);

$collections = [];

foreach($collection_query as $row){
    $id_ = $row["id"];
    $name_ = $row["name"];

    array_push($collections, [$id_, $name_]);
}

echo json_encode($collections);
?>