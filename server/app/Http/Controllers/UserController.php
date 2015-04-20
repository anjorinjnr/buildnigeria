<?php namespace BuildNigeria\Http\Controllers;

use BuildNigeria\Http\Requests;
use BuildNigeria\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller {

    private $userService;

    public function __construct(UserService $userService) {

        $this->userService = $userService;
    }

    public function getUserByToken(Request $request) {
        $userToken = $request->get('user_token');
        $user = $this->userService->getUser($userToken);
        if ($user) {
            return $user->toJson();
        }
        return [];

    }


    public function all() {

    }

    public function create() {

    }

    public function update() {

    }
}
