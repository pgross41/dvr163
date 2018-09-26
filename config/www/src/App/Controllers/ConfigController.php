<?php

namespace App\Controllers;

class ConfigController extends BaseController {
    
    public function get_config(){
        
        $devinfo = $this->nvr_service->get_devinfo();
        $cam_names = [];
        for ($i=0; $i < $devinfo['camcnt']; $i++) { 
            $cam_name = $this->nvr_service->get_envload_screen($i)['title'];
            $cam_names[] = $cam_name ?: 'Camera ' . ($i+1);
        }

        return [ 
            'cam_count' => $devinfo['camcnt'],
            'cam_names' => $cam_names,
            'sensor_count' => $devinfo['sensorcnt'],
            'root' => (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST']
        ];
        
    }
} 