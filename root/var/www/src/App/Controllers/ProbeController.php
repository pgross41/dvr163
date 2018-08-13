<?php

/**
* Look for valid endpoints in cgi-bin
*/

namespace App\Controllers;

class ProbeController extends BaseController {
    
    const START = 'a';
    const END = 'zz';
    
    public function __construct() {
        
        $string = self::START;
        $this->strings = [];
        while ($string < self::END) {
            $this->strings[] = $string++;
        }
        $this->strings[] = $string;
        
    }
    
    public function probe(){
        
        $start = time();
        $output = '';
        foreach($this->strings as $string){
            $output .= $this->check_url($string);
            usleep(500000);
        }
        $elapsed = time() - $start;
        $output .= "\nTotal time: $elapsed seconds";
        return("<pre>$output</pre>");
    }

    private function check_url($path){

        $url = $this->get_cgi_url($path, [
            'chn' => 1,
            'q' => 0]
        );
        
        $response = $this->get($url);

        if($response->code == 404){
            return;
        }

        return "$path: $response->code \n";

    }
    
    private function get($url){
        
        try{
            $response = \Httpful\Request::get($url)->timeout(2)->send();
        } catch(\Exception $e) {
            return (object)['code' => $e->getMessage()];
        }
        
        return $response;
        
    }
    
}