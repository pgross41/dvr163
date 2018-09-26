<?php

/**
 * Proxy for the NVR's cgi-bin endpoint 
 */

namespace App\Controllers;

class SnapshotController extends BaseController {

    
    public function get_snapshot($channel_number){
        
        header("Content-type: image/jpeg");
        return file_get_contents($this->nvr_service->get_cgi_url('snapshot', ['chn' => $channel_number]));
        
    }
}