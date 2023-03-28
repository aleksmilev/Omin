<?php
$servername = "localhost";

$username = "root";
$password = "";

$dbname = "omin_main";

$conn = mysqli_connect($servername, $username, $password, $dbname);

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
        "9" => "?-9"
    ];
    
    foreach(str_split($word) as $letter){
        $temp = str_split(ord($letter));

        switch(count($temp)) {
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
?> 