<?php namespace BuildNigeria\Http\Controllers;

use BuildNigeria\Http\Requests;
use BuildNigeria\Services\UserService;
use BuildNigeria\User;
use Illuminate\Http\Request;

class UserController extends Controller {

    private $userService;

    public function __construct(UserService $userService) {

        $this->userService = $userService;
    }

    private function userDataResponse(User $user) {
        $data = $user->toArray();
        $data['drafts'] = $user->getNoOfDrafts();
        $data['user_token'] = $user->user_token;
        return $data;
    }

    public function getUserByToken(Request $request) {
        $userToken = $request->get('user_token');
        $user = $this->userService->getUser($userToken);
        if ($user) {
            return $this->userDataResponse($user);
        }
        //return [];

    }

    public function login(Request $request) {
        if ($request->has('email') && $request->has('password')) {
            $data = $request->all();
            $user = $this->userService->login($data['email'], $data['password']);
            if ($user) {
                return $this->userDataResponse($user);
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

    public function getDrafts(User $user, $type) {
        if ($type === 'issue') {
            return $user->issueDrafts()->toJson();
        } else {
            return $user->solutionDrafts()->toJson();
        }
    }

    public function deleteDrafts(User $user, $type, Request $request) {
        if ($user->deleteDrafts($type, $request->get('ids'))) {
            return $this->successResponse();
        }
        return $this->errorResponse();

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
