<?php
/**
 * @author: eanjorin
 * @date: 4/19/15
 */

namespace BuildNigeria\Services;


use BuildNigeria\Http\Controllers\Auth\SocialLoginHandler;
use BuildNigeria\Traits\ErrorTrait;
use BuildNigeria\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Mockery\CountValidator\Exception;

class UserService
{

    use ErrorTrait;

    protected $user;
    protected $securityService;

    public function __construct(User $user, SecurityService $securityService)
    {
        $this->user = $user;
        $this->securityService = $securityService;
    }

    public function getUser($userToken)
    {
        return $this->user->where('user_token', $userToken)
            ->whereRaw('user_token_expires_at >= now()')
            ->first();
    }

    public function  signUpOrLogin(array $data)
    {
        if (array_key_exists('email', $data)) {
            $user = $this->user->where('email', $data['email'])->first();
            if ($user) {
                return $user;
            } else {
                $validator = Validator::make($data, [
                    'name' => 'required|max:255',
                    'email' => 'required|email|max:255|unique:users',
                ]);
                if ($validator->passes()) {
                    $user = $this->user->create($data);
                    $this->sendWelcomeMail($user);
                    return $user;
                }
            }
        }
        return null;
    }

    public function signUpWithFacebook($data, SocialLoginHandler $loginHandler)
    {
        $user = $this->signUpOrLogin($data);
        if ($user) {
            $this->securityService->issueUserToken($user);
            return $loginHandler->socialSuccessLoginRedirect($user->user_token);
        } else {
            return $loginHandler->socialFailureLoginRedirect();
        }
    }

    public function sendWelcomeMail(User $user)
    {
        if(empty($user)) return;

        try {
            Mail::send('emails.welcome', ['name' => $user->name], function ($message) use ($user) {
                $message->to($user->email, $user->name)->subject('Welcome to BuildNigeria!');
            });
        } catch (Exception $ex) {
            //too bad

        }

    }

    public function createUser($data)
    {
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
            $this->sendWelcomeMail($this->user);
            return $this->user;
        }
        $this->setError($validator->messages()->all());
    }

    public function login($email, $password)
    {
        $user = $this->user->where('email', $email)
            ->where('password', md5(trim($password)))
            ->first();
        if ($user) {
            $this->issueToken($user);
            return $user;
        }
        return null;
    }

    private function issueToken($user)
    {
        $this->securityService->issueUserToken($user);
    }

}