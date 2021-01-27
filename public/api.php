<?php

include_once("../vendor/autoload.php");
include_once("../lib/Api.class.php");
include_once("../lib/common.php");
include_once("../config.php");

use \RedBeanPHP\R as R;
use Datto\JsonRpc\Client;
use Datto\JsonRpc\Server;

R::setup("mysql:host={$config['db_host']};dbname={$config['db_name']}", $config['db_user'], $config['db_pass']);
// uncomment next line for production
R::freeze( true );

$api = new Api();
$server = new Server($api);
$request = file_get_contents("php://input");
$reply = $server->reply($request);
echo($reply);
