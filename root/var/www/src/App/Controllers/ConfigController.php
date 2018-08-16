<?php

namespace App\Controllers;

class ConfigController extends BaseController {
    
    public function get_config(){
        
        $devinfo = $this->nvr_service->get_devinfo();
        $cam_names = [];
        for ($i=0; $i < $devinfo['camcnt']; $i++) { 
            $cam_names[] = getenv('CAM_' . $i . '_NAME');
        }
        
        return [ 
            'cam_count' => $devinfo['camcnt'],
            'cam_names' => $cam_names,
            'sensor_count' => $devinfo['sensorcnt'],
        ];
        
    }
} 