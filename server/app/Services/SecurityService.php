<?php
/**
 * @author: eanjorin
 * @date: 4/19/15
 */

namespace BuildNigeria\Services;

use BuildNigeria\User;
use Carbon\Carbon;

class SecurityService {


    const INVALID_USER_TOKEN_CODE = 5001;
    const INVALID_ACCESS_TOKEN_CODE = 5002;
    const TOKEN_LENGTH = 40;

    private $oauthClient;
    private $accessToken;
    private $user;
    private $carbon;


    function __construct(User $user) {
         $this->user = $user;
    }




    private function generateToken() {
        return substr(str_shuffle(MD5(microtime() . rand())), 0, self::TOKEN_LENGTH);
    }



    /**
     * Assign a new user token.
     * @param User $user
     */
    public function issueUserToken(User $user) {
        $user->user_token = $this->generateToken();
        $user->user_token_expires_at = Carbon::now()->addDays(1);
        //echo($user->user_token);
        $user->save();
    }

    /**
     * Validate that the user_token provided belongs to the user_id
     * and the user_token hasn't expired. otherwise throw an UnauthorizedAccessException
     * @param $user_id
     * @param $user_token
     */
    public function validateUser($user_id, $user_token) {
        $user = $this->user->where('id', $user_id)
            ->where('user_token', $user_token)
            ->whereRaw('user_token_expires_at >= now()')
            ->remember(120)
            ->first();
        if (!is_null($user)) {
            return true;
        } else {
            throw new UnauthorizedAccessException("Unauthorized request, invalid user token.", self::INVALID_USER_TOKEN_CODE);
        }
    }

}
