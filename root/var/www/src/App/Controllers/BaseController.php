<?php

namespace App\Controllers;

class BaseController {
    
    public function get_cgi_url($path, $params){
        $params = array_merge($params, [
            'u' => getenv('USERNAME'),
            'p' => getenv('PASSWORD'),
            'rand' => rand(0,10000)]
        );
        return 'http://' . getenv('HOST') . '/cgi-bin/' . $path . '.cgi?' . urldecode(http_build_query($params));
    }
    
}