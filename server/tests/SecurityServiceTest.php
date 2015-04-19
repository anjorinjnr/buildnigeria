<?php
use Laracasts\TestDummy\DbTestCase;
use Laracasts\TestDummy\Factory;

/**
 * @author: eanjorin
 * @date: 4/19/15
 */

class SecurityServiceTest extends DbTestCase {

    public function test_user_gets_token() {
        $user = Factory::create('BuildNigeria\User');
        $securityService = $this->app->make('BuildNigeria\Services\SecurityService');
        $this->assertNull($user->user_token);
        $securityService->issueUserToken($user);
        //echo $user->user_token;
        $this->assertNotNull($user->user_token);
    }
}