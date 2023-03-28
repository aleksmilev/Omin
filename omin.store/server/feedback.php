<?php
include 'connection.php';

$feedback_info = file_get_contents('php://input');
$object = json_decode($feedback_info);
$stdClass = new stdClass();

$stdClass->feedback_info = $object;

$f_name = query_encoder($stdClass->feedback_info->f_name);
$l_name = query_encoder($stdClass->feedback_info->l_name);
$email = query_encoder($stdClass->feedback_info->email);
$message = query_encoder($stdClass->feedback_info->message);

$sql = "INSERT INTO feedback (feedback.f_name, feedback.l_name, feedback.email, feedback.message) 
        VALUES ('$f_name', '$l_name', '$email', '$message');";

if(mysqli_query($conn,$sql)){
    echo "1";
}else{
    echo "0";
}


mysqli_close($conn);