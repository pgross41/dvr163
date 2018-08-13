<?php

namespace App\Controllers;

class HomeController extends BaseController {

    public function __construct(){
        $this->cam_count = getenv('CAM_COUNT');
        $this->host = getenv('HOST');
    }
    
    public function show(){

        $this->body = "<h4>$this->host - $this->cam_count streams</h4>";
        
        $i = -1;
        while(++$i < $this->cam_count){
            $this->body .= $this->get_img_tag($i);
        }

        ob_start();
        include(dirname(__FILE__) . '/../../home.php');
        return ob_get_clean();
        
    }

    private function get_img_tag($channel){

        $src = $url = $this->get_cgi_url('sp', [
            'chn' => $channel,
            'q' => 2] // No idea what this does
        );

        return "<img src='$src'>\n";

    }
}