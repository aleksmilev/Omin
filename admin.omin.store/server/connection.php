<?php
$server_name = "localhost";

$username = "root";
$password = "";

$main_database = "omin_main";
$admin_database = "omin_admin";

$user_conn = mysqli_connect($server_name, $username, $password, $main_database);
$admin_conn = mysqli_connect($server_name, $username, $password, $admin_database);

function query_encoder($word){
    $new_word = "";
    $key = [
        "0" => "?-0",
        "1" => "?-1",
        "2" => "?-2",
        "3" => "?-3",
        "4" => "?-4",
        "5" => "?-5",
        "6" => "?-6",
        "7" => "?-7",
        "8" => "?-8",
        "9" => "?-9",
    ];

    foreach(str_split($word) as $letter){
        $temp = str_split(ord($letter));
    
        switch(count($temp)){
            case 2:
                $new_word .= "?-10";
                break;
        }

        foreach($temp as $temp_2){
            $new_word .= $key[$temp_2];
        }
    }

    return $new_word;
}
function query_decoder($word){
    $new_word = "";
    $key = [
    "q" => "0",
    "w" => "1",
    "e" => "2",
    "r" => "3",
    "t" => "4",
    "y" => "5",
    "u" => "6",
    "i" => "7",
    "o" => "8",
    "p" => "9"
    ];
     
    foreach(str_split($word, 3) as $letter){
        $enc_letter = "";
        
        if($letter[0] != "a") $enc_letter .= $key[$letter[0]];
        if($letter[1] != "a") $enc_letter .= $key[$letter[1]];
        if($letter[2] != "a") $enc_letter .= $key[$letter[2]];
        
        $new_word .= chr($enc_letter);
    }
     
    return $new_word;
}

function new_activity($activity,$admin_conn){
    $id = $_COOKIE["user_id"];

    $sql = "INSERT INTO activities (activities.user_id, activities.activity_info) VALUES ('$id', '$activity')";
    mysqli_query($admin_conn, $sql);
}
?> 