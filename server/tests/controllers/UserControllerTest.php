<?php
use Illuminate\Support\Facades\Mail;
use Laracasts\TestDummy\DbTestCase;
use Laracasts\TestDummy\Factory;

/**
 * @author: eanjorin
 * @date: 4/19/15
 */
class UserControllerTest extends DbTestCase {

    public function setUp() {
        @session_start();
        parent::setUp();
        $this->faker = Faker\Factory::create();
    }

    public function tearDown() {
        Mockery::close();
        parent::tearDown();
    }

    public function test_get_user_by_token() {
        $user = Factory::create('BuildNigeria\User');
        $securityService = $this->app->make('BuildNigeria\Services\SecurityService');
        $securityService->issueUserToken($user);
        $response = $this->action('GET', 'UserController@getUserByToken', [
            'user_token' => $user->user_token
        ]);
        $data = json_decode($response->getContent());
        $this->assertEquals($data->id, $user->id);
    }

    public function test_user_email_signup() {
        $data = [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'password' => 'password'
        ];
        Mail::shouldReceive('send')->once()->with('emails.welcome',
            ['name' => $data['name']],
            Mockery::type('closure'));
        $response = $this->action('POST', 'UserController@create', $data);
        $user = json_decode($response->getContent());
        $this->assertNotNull($user);
        $this->assertEquals($data['name'], $user->name);
        $this->assertEquals($data['email'], $user->email);
    }

    public function test_user_can_login_with_email() {
        $password = md5('password1');
        $user = Factory::create('BuildNigeria\User', ['password' => $password]);
        $data = [
            'email' => $user->email,
            'password' => 'password1'
        ];
        $response = $this->action('POST', 'UserController@login', $data);
        $resp = json_decode($response->getContent());
        $this->assertAttributeEquals($user->email, 'email', $resp);
        $this->assertNotNull($resp->user_token);
    }
}

