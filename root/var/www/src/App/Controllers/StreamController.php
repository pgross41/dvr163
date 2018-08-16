<?php

namespace App\Controllers;

class StreamController extends BaseController {

    public function stream_rtsp(){
        // Flash version???
    }
    
    public function stream_mjpeg($channel_number){
        
        header("Pragma: no-cache");
        header("Cache-Control: no-cache");
        header("Cache-Control: private");
        
        // set no time limit and disable compression:
        set_time_limit(0);
        @ini_set('zlib.output_compression', 0);
        
        // Get the stream handle
        try {
            $fp = $this->nvr_service->get_mjpeg_stream($channel_number);
        } catch (Exception $e){
            $this->stream_error_image();
        }
        
        // Peek at the contents to see if it's disconnected
        // if(fread($fp, 10) != '--ipcamera')
        if(fread($fp, 22) == 'HTTP/1.1 404 Not Found'){
            fclose($fp);
            $this->stream_error_image(true);
        }
        
        // Stream the stream
        header("Content-type: multipart/x-mixed-replace; boundary=ipcamera");
        header("Content-Encoding: identity");
        fpassthru($fp);
        fclose($fp);
        
    }
    
    // Return error image 
    private function stream_error_image($disconnected=false){
        $filepath = '/var/www/public/images/camera-' . ($disconnected ? 'disconnected' : 'error') . '.png';
        $fp = fopen($filepath, 'rb');
        header("Content-Type: image/png");
        header("Content-Length: " . filesize($filepath));
        fpassthru($fp);
        fclose($fp);
        exit();
    }
}