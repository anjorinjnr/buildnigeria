<?php
use Laracasts\TestDummy\DbTestCase;
use Laracasts\TestDummy\Factory;

/**
 * @author: eanjorin
 * @date: 4/19/15
 */
class UserServiceTest extends DbTestCase
{

    public function tearDown()
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_user_account_is_created_and_user_is_redirect_to_app()
    {
        $user = Factory::build('BuildNigeria\User');
        $userService = $this->app->make('BuildNigeria\Services\UserService');
        $loginHandler = Mockery::mock('BuildNigeria\Http\Controllers\Auth\SocialLoginHandler');
        $loginHandler->shouldReceive('socialSuccessLoginRedirect')
            ->once()
            ->getMock();
        $userService->signUpWithFacebook($user->toArray(), $loginHandler);

    }
}