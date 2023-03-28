<?php
include "../connection.php";

$id = (int)file_get_contents('php://input');

$sql = "DELETE FROM products WHERE products.id = $id;";
mysqli_query($user_conn, $sql);

new_activity("New deleted product:" . $id, $admin_conn);

mysqli_close($admin_conn);
mysqli_close($user_conn);
?>