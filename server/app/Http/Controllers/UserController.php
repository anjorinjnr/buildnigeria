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

    public function Login(Request $request) {
        if ($request->has('email') && $request->has('password')) {
            $data = $request->all();
            $user = $this->userService->login($data['email'], $data['password']);
            if ($user) {
                return $user->toJson();
            }
            return [
                'status' => 'error',
                'errors' => ['Invalid email/password combination.']
            ];
        } else {
            return [
                'status' => 'error',
                'errors' => ['Email and password are required.']
            ];
        }
    }

    public function all() {

    }

    public function create(Request $request) {
        $data = $request->all();
        $user = $this->userService->createUser($data);
        if ($user) {
            return $user;
        }
        return ['status' => 'error', 'errors' => $this->userService->errors()];

    }

    public function update() {

    }
}
