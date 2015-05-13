<?php
use Illuminate\Support\Facades\DB;
use Laracasts\TestDummy\DbTestCase;
use Laracasts\TestDummy\Factory;

/**
 * @author: eanjorin
 * @date: 4/26/15
 */
class IdeaControllerTest extends DbTestCase {

    public function setUp() {
       // @session_start();
        parent::setUp();
        $this->faker = Faker\Factory::create();
    }

    public function test_create_issue() {
        $user = Factory::create('BuildNigeria\User');
        $issue = Factory::build('BuildNigeria\Issue');
        $category = Factory::create('BuildNigeria\Category');
        $data = [
            'user_id' => $user->id,
            'detail' => $issue->detail,
            'categories' => [$category->category],
            'solution' => ['detail' => $this->faker->text()]
        ];
        $response = $this->action('POST', 'IdeaController@createIssue', $data);
        $jsonData = json_decode($response->getContent());
        $this->assertEquals('success', $jsonData->status);

    }
}

