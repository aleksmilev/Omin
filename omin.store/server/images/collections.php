<?php
$id = $_POST['id'];

$uploadDir = './collections/';
$uploadFile = $uploadDir . $id . ".webp";

if (move_uploaded_file($_FILES['collection_cover']['tmp_name'], $uploadFile)) {
  echo "Success";
} else {
  echo "Error";
}
?>