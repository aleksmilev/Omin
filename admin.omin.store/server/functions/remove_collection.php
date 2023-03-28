<?php
include "../connection.php";

$id = (int)file_get_contents('php://input');

$sql = "DELETE FROM collections WHERE collections.id = $id;";
mysqli_query($user_conn,$sql);

new_activity("New deleted collection:" . $id, $admin_conn);

mysqli_close($admin_conn);
mysqli_close($user_conn);
?>