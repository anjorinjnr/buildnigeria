<?php
/**
 * @author: eanjorin
 * @date: 4/19/15
 */

namespace BuildNigeria\Services;


use BuildNigeria\Http\Controllers\Auth\SocialLoginHandler;
use BuildNigeria\Traits\ErrorTrait;
use BuildNigeria\User;
use Illuminate\Support\Facades\Validator;

class UserService {

    use ErrorTrait;

    protected $user;
    protected $securityService;

    public function __construct(User $user, SecurityService $securityService) {
        $this->user = $user;
        $this->securityService = $securityService;
    }

    public function getUser($userToken) {
        return $this->user->where('user_token', $userToken)
            ->whereRaw('user_token_expires_at >= now()')
            ->first();
    }

    public function signUpWithFacebook($data, SocialLoginHandler $loginHandler) {

        $user = $this->user->signUpOrLogin($data);
        if ($user) {
            $this->securityService->issueUserToken($user);
            return $loginHandler->socialSuccessLoginRedirect($user->user_token);
        } else {
            return $loginHandler->socialFailureLoginRedirect();
        }
    }

    public function createUser($data) {
        $validator = Validator::make($data, [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6'
        ]);
        if ($validator->passes()) {
            $this->user->name = $data['name'];
            $this->user->email = $data['email'];
            $this->user->password = md5(trim($data['password']));
            $this->user->save();
            $this->issueToken($this->user);
            return $this->user;
        }
        $this->setError($validator->messages()->all());
    }

    public function login($email, $password) {
        $user = $this->user->where('email', $email)
            ->where('password', md5(trim($password)))
            ->first();
        if ($user) {
            $this->issueToken($user);
            return $user;
        }
        return null;
    }

    private function issueToken($user) {
        $this->securityService->issueUserToken($user);
    }

}