<?php

namespace App;

use Phroute\Phroute\RouteCollector;
use Phroute\Phroute\Dispatcher;

class Router {
    
    public function __construct(){
        $this->router = new RouteCollector();
    }
    
    public function route(){
        
        // Catch-all route for home controller
        $this->router->any('/{anything:(?!api).*}?', ['App\Controllers\HomeController', 'show']);
        
        // API Routes
        $this->router->group(['prefix' => 'api'], function($router){
            $router->any('/probe', ['App\Controllers\ProbeController', 'probe']);
        });
        
        
        // Execute the route and echo the output
        $dispatcher = new Dispatcher($this->router->getData());
        echo $dispatcher->dispatch($_SERVER['REQUEST_METHOD'], parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
    }
}