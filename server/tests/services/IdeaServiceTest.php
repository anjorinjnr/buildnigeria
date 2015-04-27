<?php
use BuildNigeria\Issue;
use Laracasts\TestDummy\DbTestCase;
use Laracasts\TestDummy\Factory;

/**
 * @author: eanjorin
 * @date: 4/26/15
 */
class IdeaServiceTest extends DbTestCase {

    public function setUp() {
        @session_start();
        parent::setUp();
        $this->faker = Faker\Factory::create();
    }

    public function tearDown() {
        Mockery::close();
    }

    public function test_issue_is_not_created() {
        $user = Factory::create('BuildNigeria\User');
        $issue = Factory::build('BuildNigeria\Issue');
        $ideaService = $this->app->make('BuildNigeria\Services\IdeaService');
        $response = $ideaService->createIssue([
            'user_id' => 0,
            'detail' => $issue->detail
        ]);
        $this->assertFalse($response);
        $this->assertEquals('The selected user id is invalid.', $ideaService->errors()[0]);

        $response = $ideaService->createIssue([
            'user_id' => $user->id,
            'detail' => 'issue less than 150 characters'
        ]);
        $this->assertFalse($response);
        $this->assertEquals('The detail must be at least 150 characters.', $ideaService->errors()[0]);

    }

    public function test_issue_is_created() {
        $user = Factory::create('BuildNigeria\User');
        $issue = Factory::build('BuildNigeria\Issue');
        $ideaService = $this->app->make('BuildNigeria\Services\IdeaService');
        $response = $ideaService->createIssue([
            'user_id' => $user->id,
            'detail' => $issue->detail
        ]);
        $this->assertInstanceOf('BuildNigeria\Issue', $response);
        $this->assertEquals($issue->detail, $response->detail);
    }

    public function test_issue_is_created_and_assigned_categories() {
        $category = Factory::create('BuildNigeria\Category');
        $user = Factory::create('BuildNigeria\User');
        $issue = Factory::build('BuildNigeria\Issue');
        $ideaService = $this->app->make('BuildNigeria\Services\IdeaService');
        $data = [
            'user_id' => $user->id,
            'detail' => $issue->detail,
            'categories' => [$category->category]
        ];
        $response = $ideaService->createIssue($data);
        $this->assertInstanceOf('BuildNigeria\Issue', $response);
        $this->assertEquals(count($data['categories']), $response->categories->count());



    }

    public function test_issue_is_created_with_solution() {
        $category = Factory::create('BuildNigeria\Category');
        $user = Factory::create('BuildNigeria\User');
        $issue = Factory::build('BuildNigeria\Issue');
        $ideaService = $this->app->make('BuildNigeria\Services\IdeaService');
        $data = [
            'user_id' => $user->id,
            'detail' => $issue->detail,
            'categories' => [$category->category],
            'solution' => ['detail' => $this->faker->text()]
        ];
        $response = $ideaService->createIssue($data);
        $this->assertInstanceOf('BuildNigeria\Issue', $response);
        $this->assertEquals(1, $response->solutions->count());


    }
}