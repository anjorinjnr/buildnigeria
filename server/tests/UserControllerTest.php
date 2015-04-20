<?php
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
}

