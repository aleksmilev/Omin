<?php
$id = $_POST['id'];

$url = "./products/" . $id . "/";

if(unlink($url . "1.webp") && unlink($url . "2.webp")){
    if (rmdir($url)) {
        echo "Success";
      } else {
        echo "Error";
      }
}
?>