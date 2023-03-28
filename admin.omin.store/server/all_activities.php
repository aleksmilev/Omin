<?php
include 'connection.php';

$sql = "SELECT * FROM activities;";
$result = mysqli_query($admin_conn, $sql);

$activities = [];

while($row = mysqli_fetch_assoc($result)){
    $id = $row["id"];
    $user_id = $row["user_id"];
    $activity_info = $row["activity_info"];

    array_push($activities, (object)[
        'id' => $id,
        'user_id' => $user_id,
        'activity_info' => $activity_info
    ]);
}

mysqli_close($admin_conn);
mysqli_close($user_conn);

echo json_encode($activities);