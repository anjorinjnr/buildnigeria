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
Route::get('user/{user}/drafts/{item_type}', 'UserController@getDrafts')->where('type', 'issue|solution');
Route::post('user/{user}/drafts/{item_type}/delete', 'UserController@deleteDrafts')->where('type', 'issue|solution');
Route::get('user/{user}/solutions', 'UserController@getSolutions');
Route::get('user/{user}/issues', 'UserController@getIssues');
Route::delete('user/{user}/solution/{solution_id}', 'UserController@deleteSolution');
Route::delete('user/{user}/issue/{issue_id}', 'UserController@deleteIssue');
Route::post('user', 'UserController@create');
Route::post('user/login', 'UserController@login');
Route::post('issue', 'IdeaController@createIssue');
Route::post('solution', 'IdeaController@createSolution');
Route::get('issue/{issue}', 'IdeaController@getIssue');
Route::get('solution/{solution}', 'IdeaController@getSolution');
Route::get('issues', 'IdeaController@getIssues');
Route::get('categories', 'IdeaController@getCategories');
Route::get('search', 'IdeaController@search');

Route::post('vote/{item_type}/{vote_type}', 'IdeaController@vote')->where(['item_type' => 'issue|solution',
    'vote_type' => 'up|down']);

