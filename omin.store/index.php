<?php

class Route{
    private static $uriList = array();
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
            http_response_code(404);
            require __DIR__ . '/404.html';
        }
    }
}


Route::add('/', function() {
    require __DIR__ . '/home.html';
});
Route::add('/home', function() {
    require __DIR__ . '/home.html';
});
Route::add('/account', function() {
    require __DIR__ . '/account.html';
});
Route::add('/checkout', function() {
    require __DIR__ . '/checkout.html';
});
Route::add('/collections', function() {
    require __DIR__ . '/collections.html';
});
Route::add('/info', function() {
    require __DIR__ . '/info.html';
});
Route::add('/item', function() {
    require __DIR__ . '/item.html';
});
Route::add('/shop', function() {
    require __DIR__ . '/shop.html';
});

Route::submit();
?>