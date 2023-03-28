<?php
include 'connection.php';

$sql = "SELECT * FROM feedback;";
$result = mysqli_query($user_conn, $sql);

$orders = [];

while($row = mysqli_fetch_assoc($result)){
    $id = $row["id"];
    $name = query_decoder($row["f_name"]) . "-" . query_decoder($row["l_name"]);
    $email = query_decoder($row["email"]);
    $message = query_decoder($row["message"]);

    array_push($orders, (object)[
        'id' => $id,
        'name' => $name,
        'email' => $email,
        'message' => $message,
    ]);
}

mysqli_close($admin_conn);
mysqli_close($user_conn);

echo json_encode($orders);
?>