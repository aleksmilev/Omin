<?php
include './connection.php';

$username = query_encoder($_POST['username']);
$password = query_encoder($_POST['password']);
$id = "";	
$permission_level = 0;


$sql = "SELECT * FROM users WHERE users.username = '$username' AND users.password = '$password';";
$result = mysqli_query($admin_conn,$sql);

while ($row = mysqli_fetch_assoc($result)) {
	$id = $row["id"];
    $permission_level = $row["permission_level"];
}

if($id != ""){
	setcookie("user_id", $id, time() + (86400), "/");
	setcookie("user_name", query_decoder($username), time() + (86400), "/");
	setcookie("user_password", query_decoder($password), time() + (86400), "/");
	setcookie("permission_level", $permission_level, time() + (86400), "/");

	$_COOKIE['user_id'] = $id;
	$_COOKIE['user_name'] = query_decoder($username);
	$_COOKIE['user_password'] = query_decoder($password);
	$_COOKIE['permission_level'] = $permission_level;

	if(isset($_COOKIE["user_id"])){
        $info = new stdClass();
        $info->user_id = $id;
        $info->username = query_decoder($username);
        $info->password = query_decoder($password);
        $info->permission_level = $permission_level;


		echo json_encode($info);
	}
}else{
	echo "0";
}

mysqli_close($admin_conn);
mysqli_close($user_conn);
?>