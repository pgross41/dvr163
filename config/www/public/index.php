<?php

// Composer autoloader
require dirname(__FILE__) . '/../vendor/autoload.php';

// Load .env file
$dotenv = new \Dotenv\Dotenv(dirname(__FILE__) . '/..');
$dotenv->load();

// Route request
(new App\Router())->route(); 