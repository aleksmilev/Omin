<?php
setcookie("test123", "test1234", time() + (86400 * 30), "/");

class Route{
    public static $uriList = array();
    private static $uriCallback = array();

    static public function add($uri, $function)
    {
        self::$uriList[] = $uri;
        self::$uriCallback[$uri] = $function;
    }

    static public function submit()
    {
        $uri = explode('?', $_SERVER['REQUEST_URI'])[0];
        $doesUriMatch = false;

        foreach(self::$uriList as $u)
        {
            if($u == $uri) {
                $doesUriMatch = true;
                break;
            }
        }

        if($doesUriMatch) {
            call_user_func(self::$uriCallback[$uri]);
        } else {
            if(user_check(1) == "true"){
                http_response_code(404);
                require __DIR__ . '/header.php';
                require __DIR__ . '/home.html';
            }else{
                http_response_code(404);
                require __DIR__ . '/login.html';
            }
        }
    }
}   

function user_check($permission_level){
    if(isset($_COOKIE["permission_level"])){
        if((int)$_COOKIE["permission_level"] >= (int)$permission_level){
            return "true";
        }
    }
    return "false";
}

function redirecting_dir($access_level, $requested_dir,$else){
    if(user_check($access_level) == "true"){
        require __DIR__ . '/header.php';
        require __DIR__ . $requested_dir;  
    }else{
        switch($else){
            case "access_denied":
                echo '<script>alert("Access denied");window.open("./", "_self");</script>';
                break;
            
            case "log_out":
                require __DIR__ . '/login.html';
                break;
            
            default:
                require __DIR__ . '/login.html';
                break;
        }
    }
}

Route::add('/', function () {
    redirecting_dir(1, '/home.html', "log_out");
});

Route::add('/create_user', function () {
    redirecting_dir(2, '/create_user.html', "access_denied");
});
Route::add('/view_users', function () {
    redirecting_dir(2, '/view_users.html', "access_denied");
});
Route::add('/view_activities', function () {
    redirecting_dir(2, '/view_activities.html', "access_denied");
});

Route::add('/view_orders', function () {
    redirecting_dir(1, '/view_orders.html', "log_out");
});
Route::add('/view_feedbacks', function () {
    redirecting_dir(1, '/view_feedbacks.html', "log_out");
});
Route::add('/create_collection', function () {
    redirecting_dir(1, '/create_collection.html', "log_out");
});
Route::add('/view_collections', function () {
    redirecting_dir(1, '/view_collections.html', "log_out");
});
Route::add('/create_product', function () {
    redirecting_dir(1, '/create_product.html', "log_out");
});
Route::add('/view_products', function () {
    redirecting_dir(1, '/view_products.html', "log_out");
});

Route::submit();
?>