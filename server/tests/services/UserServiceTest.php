<?php
use Illuminate\Support\Facades\Mail;
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

    public function test_signup_creates_account() {
        $userData = Factory::build('BuildNigeria\User');
        $userService = $this->app->make('BuildNigeria\Services\UserService');
        Mail::shouldReceive('send')->once()->with('emails.welcome', ['name' => $userData->name],
            Mockery::type('closure'));
        $data = $userData->toArray();
        $newUser = $userService->signUpOrLogin($data);
        foreach ($data as $key => $val) {
            //echo PHP_EOL. $key . ': ' . $val . ' == ' . $newUser->{$key};
            $this->assertEquals($val, $newUser->{$key});
        }
        $this->assertNotNull($newUser);
    }

    public function test_signup_doesnot_create_account() {
        $createdUser = Factory::create('BuildNigeria\User');
        $userService = $this->app->make('BuildNigeria\Services\UserService');
        $user2 = $userService->signUpOrLogin($createdUser->toArray());
        $this->assertEquals($createdUser->id, $user2->id);
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