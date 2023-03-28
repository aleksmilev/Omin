<?php
include "../connection.php";

$id = (int)file_get_contents('php://input');

$sql = "DELETE FROM orders WHERE orders.id = $id;";
mysqli_query($user_conn,$sql);

new_activity("New deleted order:" . $id, $admin_conn);

mysqli_close($admin_conn);
mysqli_close($user_conn);
?>