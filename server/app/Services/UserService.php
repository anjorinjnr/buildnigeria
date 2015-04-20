<?php
/**
 * @author: eanjorin
 * @date: 4/19/15
 */

namespace BuildNigeria\Services;


use BuildNigeria\Http\Controllers\Auth\SocialLoginHandler;
use BuildNigeria\User;

class UserService {

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
}