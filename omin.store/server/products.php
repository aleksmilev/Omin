<?php
include 'connection.php';

header('Content-Type: application/json');


$sql = "SELECT * FROM products;";
$product_query = mysqli_query($conn, $sql);
mysqli_close($conn);

$products = [];

foreach($product_query as $row){
    $id_ = $row["id"];
    $name_ = $row["name"];
    $price_ = $row["price"];
    $size_list_ = $row["size_list"];
    $gender_ = $row["gender"];
    $collection_id_ = $row["collection_id"];

    array_push($products, [$id_, $name_, $price_, $size_list_, $gender_, $collection_id_]);
}

echo json_encode($products);

// $products =  [
//     ["0000","test0000","100","XL:L:M:S","F","0001"],
//     ["0001","test0001","100","XL:L:M:S","N","0001"],
//     ["0002","test0002","100","XL:L:M:S","M","0001"],
//     ["0003","test0003","100","XL:L:M:S","F","0001"],
//     ["0004","test0004","100","XL:L:M:S","N","0001"],
//     ["0005","test0005","100","XL:L:M:S","M","0001"],
//     ["0006","test0006","100","XL:L:M:S","F","0001"],
//     ["0007","test0007","100","XL:L:M:S","N","0001"],
//     ["0008","test0008","100","XL:L:M:S","M","0001"],
//     ["0009","test0009","100","XL:L:M:S","F","0001"],
    
//     ["0010","test0010","100","XL:L:M:S","F","0002"],
//     ["0011","test0011","100","XL:L:M:S","N","0002"],
//     ["0012","test0012","100","XL:L:M:S","M","0002"],
//     ["0013","test0013","100","XL:L:M:S","F","0002"],
//     ["0014","test0014","100","XL:L:M:S","N","0002"],
//     ["0015","test0015","100","XL:L:M:S","M","0002"],
//     ["0016","test0016","100","XL:L:M:S","F","0002"],
//     ["0017","test0017","100","XL:L:M:S","N","0002"],
//     ["0018","test0018","100","XL:L:M:S","M","0002"],
//     ["0019","test0019","100","XL:L:M:S","F","0002"],
    
//     ["0020","test0020","100","XL:L:M:S","F","0003"],
//     ["0021","test0021","100","XL:L:M:S","N","0003"],
//     ["0022","test0022","100","XL:L:M:S","M","0003"],
//     ["0023","test0023","100","XL:L:M:S","F","0003"],
//     ["0024","test0024","100","XL:L:M:S","N","0003"],
//     ["0025","test0025","100","XL:L:M:S","M","0003"],
//     ["0026","test0026","100","XL:L:M:S","F","0003"],
//     ["0027","test0027","100","XL:L:M:S","N","0003"],
//     ["0028","test0028","100","XL:L:M:S","M","0003"],
//     ["0029","test0029","100","XL:L:M:S","F","0003"],
    
//     ["0030","test0030","100","XL:L:M:S","F","0004"],
//     ["0031","test0031","100","XL:L:M:S","N","0004"],
//     ["0032","test0032","100","XL:L:M:S","M","0004"],
//     ["0033","test0033","100","XL:L:M:S","F","0004"],
//     ["0034","test0034","100","XL:L:M:S","N","0004"],
//     ["0035","test0035","100","XL:L:M:S","M","0004"],
//     ["0036","test0036","100","XL:L:M:S","F","0004"],
//     ["0037","test0037","100","XL:L:M:S","N","0004"],
//     ["0038","test0038","100","XL:L:M:S","M","0004"],
//     ["0039","test0039","100","XL:L:M:S","F","0004"],
    
//     ["0040","test0040","100","XL:L:M:S","F","0005"],
//     ["0041","test0041","100","XL:L:M:S","N","0005"],
//     ["0042","test0042","100","XL:L:M:S","M","0005"],
//     ["0043","test0043","100","XL:L:M:S","F","0005"],
//     ["0044","test0044","100","XL:L:M:S","N","0005"],
//     ["0045","test0045","100","XL:L:M:S","M","0005"],
//     ["0046","test0046","100","XL:L:M:S","F","0005"],
//     ["0047","test0047","100","XL:L:M:S","N","0005"],
//     ["0048","test0048","100","XL:L:M:S","M","0005"],
//     ["0049","test0049","100","XL:L:M:S","F","0005"],

//     ["0050","test0050","100","XL:L:M:S","F","0006"],
//     ["0051","test0051","100","XL:L:M:S","N","0006"],
//     ["0052","test0052","100","XL:L:M:S","M","0006"],
//     ["0053","test0053","100","XL:L:M:S","F","0006"],
//     ["0054","test0054","100","XL:L:M:S","N","0006"],
//     ["0055","test0055","100","XL:L:M:S","M","0006"],
//     ["0056","test0056","100","XL:L:M:S","F","0006"],
//     ["0057","test0057","100","XL:L:M:S","N","0006"],
//     ["0058","test0058","100","XL:L:M:S","M","0006"],
//     ["0059","test0059","100","XL:L:M:S","F","0006"],

//     ["0060","test0060","100","XL:L:M:S","F","0007"],
//     ["0061","test0061","100","XL:L:M:S","N","0007"],
//     ["0062","test0062","100","XL:L:M:S","M","0007"],
//     ["0063","test0063","100","XL:L:M:S","F","0007"],
//     ["0064","test0064","100","XL:L:M:S","N","0007"],
//     ["0065","test0065","100","XL:L:M:S","M","0007"],
//     ["0066","test0066","100","XL:L:M:S","F","0007"],
//     ["0067","test0067","100","XL:L:M:S","N","0007"],
//     ["0068","test0068","100","XL:L:M:S","M","0007"],
//     ["0069","test0069","100","XL:L:M:S","F","0007"],

//     ["0070","test0070","100","XL:L:M:S","F","0008"],
//     ["0071","test0071","100","XL:L:M:S","N","0008"],
//     ["0072","test0072","100","XL:L:M:S","M","0008"],
//     ["0073","test0073","100","XL:L:M:S","F","0008"],
//     ["0074","test0074","100","XL:L:M:S","N","0008"],
//     ["0075","test0075","100","XL:L:M:S","M","0008"],
//     ["0076","test0076","100","XL:L:M:S","F","0008"],
//     ["0077","test0077","100","XL:L:M:S","N","0008"],
//     ["0078","test0078","100","XL:L:M:S","M","0008"],
//     ["0079","test0079","100","XL:L:M:S","F","0008"],

//     ["0080","test0080","100","XL:L:M:S","F","0009"],
//     ["0081","test0081","100","XL:L:M:S","N","0009"],
//     ["0082","test0082","100","XL:L:M:S","M","0009"],
//     ["0083","test0083","100","XL:L:M:S","F","0009"],
//     ["0084","test0084","100","XL:L:M:S","N","0009"],
//     ["0085","test0085","100","XL:L:M:S","M","0009"],
//     ["0086","test0086","100","XL:L:M:S","F","0009"],
//     ["0087","test0087","100","XL:L:M:S","N","0009"],
//     ["0088","test0088","100","XL:L:M:S","M","0009"],
//     ["0089","test0089","100","XL:L:M:S","F","0009"],

//     ["0090","test0090","100","XL:L:M:S","F","0010"],
//     ["0091","test0091","100","XL:L:M:S","N","0010"],
//     ["0092","test0092","100","XL:L:M:S","M","0010"],
//     ["0093","test0093","100","XL:L:M:S","F","0010"],
//     ["0094","test0094","100","XL:L:M:S","N","0010"],
//     ["0095","test0095","100","XL:L:M:S","M","0010"],
//     ["0096","test0096","100","XL:L:M:S","F","0010"],
//     ["0097","test0097","100","XL:L:M:S","N","0010"],
//     ["0098","test0098","100","XL:L:M:S","M","0010"],
//     ["0099","test0099","100","XL:L:M:S","F","0010"],

//     ["0100","test0100","100","XL:L:M:S","F","0000"],
//     ["0101","test0101","100","XL:L:M:S","N","0000"],
//     ["0102","test0102","100","XL:L:M:S","M","0000"],
//     ["0103","test0103","100","XL:L:M:S","F","0000"],
//     ["0104","test0104","100","XL:L:M:S","N","0000"],
//     ["0105","test0105","100","XL:L:M:S","M","0000"],
//     ["0106","test0106","100","XL:L:M:S","F","0000"],
//     ["0107","test0107","100","XL:L:M:S","N","0000"],
//     ["0108","test0108","100","XL:L:M:S","M","0000"],
//     ["0109","test0109","100","XL:L:M:S","F","0000"],
//    ];