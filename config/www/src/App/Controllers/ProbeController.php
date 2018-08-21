<?php

/**
* Look for valid endpoints in cgi-bin
*/

namespace App\Controllers;

class ProbeController extends BaseController {
    
    const START = 'sp';
    const END = 'sp';
    
    public function __construct() {
        
        parent::__construct();
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

        echo('<pre>');
        echo "$url\n";
        print_r($response);
        die(); // TESTING TESTING TESTING TESTING TESTING 

        if($response->code == 404){
            return;
        }

        return "$path: $response->code \n";

    }
    
    private function get($url){
        
        try{
            $response = \Httpful\Request::get($url)->send();
        } catch(\Exception $e) {
            return (object)['code' => $e->getMessage()];
        }
        
        return $response;
        
    }
    
}