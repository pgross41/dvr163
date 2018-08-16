<?php

namespace App\Services;

class BaseService {
    
    public function __construct(){
        $this->host = getenv('HOST');
        $this->username = getenv('USERNAME');
        $this->password = getenv('PASSWORD');
    }
    
}