<?php
$id = $_POST['id'];

$url = "./collections/" . $id . ".webp";

if (unlink($url)) {
  echo "Success";
} else {
  echo "Error";
}
?>