<?php
use BuildNigeria\User;
use Laracasts\TestDummy\DbTestCase;
use Laracasts\TestDummy\Factory;

/**
 * @author: eanjorin
 * @date: 4/19/15
 */
class AuthControllerTest extends DbTestCase {

    public function setUp() {
        @session_start();
        parent::setUp();
        $this->faker = Faker\Factory::create();
    }

    public function tearDown() {
        Mockery::close();
    }

    public function test_facebook_callback_redirects() {
        $user = Factory::build('BuildNigeria\User');
        $fbProvider = Mockery::mock('Laravel\Socialite\Two\FacebookProvider');
        $fbProvider->shouldReceive('user')
            ->once()
            ->andReturn($user)
            ->getMock();
        $socialite = Mockery::mock('Laravel\Socialite\SocialiteManager');
        $socialite->shouldReceive('with')
            ->with('facebook')
            ->andReturn($fbProvider)
            ->getMock();
        $this->app->bind('Laravel\Socialite\SocialiteManager', function () use ($socialite) {
            return $socialite;
        });

        $this->action('GET', 'Auth\AuthController@getFacebookCallback');

        $userToken = User::where('email', $user->email)->first()->user_token;
        $this->assertResponseStatus(302);
        $this->assertRedirectedTo(getenv('APP_LOGIN_REDIRECT') . "?ut=$userToken");

    }


}

