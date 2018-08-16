<?php

namespace App\Controllers;

class ConfigController extends BaseController {
    
    public function get_config(){
        
        return $this->nvr_service->get_devinfo();
        
    }
} 