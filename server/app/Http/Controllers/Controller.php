<?php namespace BuildNigeria\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesCommands;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

abstract class Controller extends BaseController {

    use DispatchesCommands, ValidatesRequests;

    public function successResponse() {
        return ['status' => 'success'];
    }

    public function errorResponse($errors) {
        return ['status' => 'error', 'errors' => $errors];
    }
}
