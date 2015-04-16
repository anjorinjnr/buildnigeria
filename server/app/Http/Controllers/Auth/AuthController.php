<?php namespace BuildNigeria\Http\Controllers\Auth;

use BuildNigeria\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\Registrar;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use Illuminate\Http\RedirectResponse;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller {

    /*
    |--------------------------------------------------------------------------
    | Registration & Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users, as well as the
    | authentication of existing users. By default, this controller uses
    | a simple trait to add these behaviors. Why don't you explore it?
    |
    */

    use AuthenticatesAndRegistersUsers;

    /**
     * Create a new authentication controller instance.
     *
     * @param  \Illuminate\Contracts\Auth\Guard $auth
     * @param  \Illuminate\Contracts\Auth\Registrar $registrar
     * @return void
     */
    public function __construct(Guard $auth, Registrar $registrar) {
        $this->auth = $auth;
        $this->registrar = $registrar;

        $this->middleware('guest', ['except' => 'getLogout']);
    }
    public function getLoginWithFacebook() {
        $redirect = Socialite::with('facebook')->redirect();
        //all this madness of reaching into the ResponseBag object to get the headers
        //is to add &display=popup to the redirect url.
        $headers = $redirect->headers->all();
        $headers['location'][0] = $headers['location'][0] . '&display=popup';
        return new RedirectResponse( $headers['location'][0]);
    }

    public function getFacebookCallback() {
        dd(Socialite::with('facebook')->user());
    }


}
