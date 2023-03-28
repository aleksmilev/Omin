<?php
include 'connection.php';

$sql = "SELECT * FROM users;";
$result = mysqli_query($admin_conn, $sql);

$users = [];

while($row = mysqli_fetch_assoc($result)){
    $id = $row["id"];
    $username = query_decoder($row["username"]);
    $permission_level  = "";

    if($row["permission_level"] == "2"){
        $permission_level = "Root";
    }else{
        $permission_level = "Admin";
    }

    array_push($users, (object)[
        'id' => $id,
        'username' => $username,
        'permission_level' => $permission_level
    ]);
}

mysqli_close($admin_conn);
mysqli_close($user_conn);

echo json_encode($users);
?>