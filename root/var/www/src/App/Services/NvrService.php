<?php

namespace App\Services;

class NvrService extends BaseService {
    
    /**
     * Return a handle to the mjpeg stream 
     */
    public function get_mjpeg_stream($channel_number){
        
        // Get URL
        $mjpeg_url = $this->get_cgi_url('sp', [
            'chn' => $channel_number,
            'q' => 0]
        );
        
        // Prepare HTTP context:
        $context = stream_context_create(['http'=>[
            'method'=>"GET",
            'header'=>"Accept-language: en\r\n"
            ]]
        );
        
        // Send request
        if (!($fp = fopen($mjpeg_url, 'r', false, $context))) {
            throw new \Exception('No stream handle');
        }
        
        return $fp;
        
    }

    /**
     *  Use gw to get devinfo 
     */
    public function get_devinfo(){
        return $this->get_gw('devinfo', ['camcnt', 'sensorcnt', 'httpport']);
    }
    
    private function get_gw($name, $attrs = []) {
        
        // Build XML request
        $juan = new \SimpleXMLElement('<juan/>');
        $juan->addAttribute('ver', 0); // Why?
        $juan->addAttribute('squ', 'abcdef'); // Why?
        $juan->addAttribute('dir', 0); // Why?
        $juan->addAttribute('enc', 1); // Why?
        $child = $juan->addChild($name);
        foreach($attrs as $attr){
            $child->addAttribute($attr, '');
        }
        $dom = dom_import_simplexml($juan);
        $xml_string =$dom->ownerDocument->saveXML($dom->ownerDocument->documentElement);
        $url = $this->get_cgi_url('gw', [
            'xml' => urlencode($xml_string),
            '_' => time()]
        );

        // Send request
        try{
            $response = \Httpful\Request::get($url)->send();
        } catch(\Exception $e) {
            return (object)['code' => $e->getMessage()];
        }

        // Parse XML response
        $data = [];
        $juan = new \SimpleXMLElement($response->body);
        foreach($juan->$name->attributes() as $key => $value){
            $data[$key] = (string) $value;
        }
        return $data;
        
    }
    
    public function get_cgi_url($path, $params = []){
        
        if($params === false){
            $params = [];
        } else {
            $params = array_merge($params, [
                'u' => $this->username,
                'p' => $this->password,
                'rand' => rand(0,10000)]
            );
        }
        return 'http://' . $this->host . '/cgi-bin/' . $path . '.cgi?' . urldecode(http_build_query($params));

    }
    
}