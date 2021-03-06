<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix'=>'api'], function() use($router){
  $router->get('/scores', 'ScoreController@index');
  $router->post('/score', 'ScoreController@create');
  $router->get('/score/{id}', 'ScoreController@show');
  // $app->put('/score/{id}', 'ScoreController@update'); // Comment edit endpoint because no edit avaible on memory-game
  // $app->delete('/score/{id}', 'ScoreController@destroy'); // Comment delete endpoint because no delete avaible on memory-game
});
