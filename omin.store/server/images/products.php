<?php
$id = $_POST['id'];

$uploadDir = './products/' . $id . '/';
$uploadFile_first = $uploadDir . "1.webp";
$uploadFile_second = $uploadDir . "2.webp";

mkdir($uploadDir);

if (move_uploaded_file($_FILES['product_first']['tmp_name'], $uploadFile_first) && move_uploaded_file($_FILES['product_second']['tmp_name'], $uploadFile_second)) {
  echo "Success";
} else {
  echo "Error";
}
?>