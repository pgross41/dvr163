<?php

namespace App\Controllers;

class BaseController {
    
    public function __construct(){

        // Config
        $this->host = getenv('HOST');
        $this->username = getenv('USERNAME');
        $this->password = getenv('PASSWORD');

        // Services
        $this->nvr_service = new \App\Services\NvrService();
    }
    
}