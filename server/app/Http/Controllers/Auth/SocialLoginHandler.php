<?php
/**
 * @author: eanjorin
 * @date: 4/19/15
 */
namespace BuildNigeria\Http\Controllers\Auth;

interface SocialLoginHandler {
    public function socialSuccessLoginRedirect($userToken);

    public function socialFailureLoginRedirect();
}