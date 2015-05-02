<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'WelcomeController@index');

Route::get('home', 'HomeController@index');

Route::controllers([
    'auth' => 'Auth\AuthController'
]);

Route::get('user', 'UserController@getUserByToken');
Route::get('user/{user}/drafts/{item_type}', 'UserController@getDrafts')
    ->where('type', 'issue|solution');
Route::post('user/{user}/drafts/{item_type}/delete', 'UserController@deleteDrafts')
    ->where('type', 'issue|solution');
Route::get('user/solutions', 'UserController@getUserIssues');
Route::post('user', 'UserController@create');
Route::post('user/login', 'UserController@login');
Route::post('issue', 'IdeaController@createIssue');
Route::get('issues', 'IdeaController@getIssues');
Route::get('categories', 'IdeaController@getCategories');

Route::post('vote/{item_type}/{vote_type}', 'IdeaController@vote')
    ->where(['item_type' => 'issue|solution', 'vote_type' => 'up|down']);

