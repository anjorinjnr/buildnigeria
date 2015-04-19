<?php namespace BuildNigeria\Http\Controllers\Auth;

use BuildNigeria\Http\Controllers\Controller;
use BuildNigeria\Services\UserService;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Redirector;
use Laravel\Socialite\SocialiteManager;

class AuthController extends Controller implements SocialLoginHandler {


    protected $userService;
    protected $socialite;
    protected $redirector;

    public function __construct(UserService $userService, SocialiteManager $socialite, Redirector $redirector) {
        $this->userService = $userService;
        $this->socialite = $socialite;
        $this->redirector = $redirector;
    }

    public function getLoginWithFacebook() {
        $redirect = $this->socialite->with('facebook')->redirect();
        //all this madness of reaching into the ResponseBag object to get the headers
        //is to add &display=popup to the redirect url.
        $headers = $redirect->headers->all();
        $headers['location'][0] = $headers['location'][0] . '&display=popup';
        return new RedirectResponse($headers['location'][0]);
    }

    public function socialSuccessLoginRedirect($userToken) {
        return $this->redirector->away(getenv('APP_LOGIN_REDIRECT') . "?ut=$userToken");
    }

    public function socialFailureLoginRedirect() {
        return $this->redirector->away(getenv('APP_LOGIN_REDIRECT'));
    }

    public function getFacebookCallback() {
        try {
            $fbUser = $this->socialite->with('facebook')->user();
            $data = [
                'email' => $fbUser->email,
                'name' => $fbUser->name,
                'avatar' => $fbUser->avatar,
                'fb_token' => $fbUser->token,
                'fb_id' => $fbUser->id
            ];
            return $this->userService->signUpWithFacebook($data, $this);

        } catch (Exception $ex) {
            return $this->socialFailureLoginRedirect();
        }

    }

}
