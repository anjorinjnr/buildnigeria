<?php
use BuildNigeria\Issue;
use BuildNigeria\Vote;
use Laracasts\TestDummy\DbTestCase;
use Laracasts\TestDummy\Factory;

/**
 * @author: eanjorin
 * @date: 4/26/15
 */
class IdeaServiceTest extends DbTestCase
{

    public function setUp()
    {
        //@session_start();
        parent::setUp();
        $this->faker = Faker\Factory::create();
    }

    public function tearDown()
    {
        Mockery::close();
    }

    public function test_issue_is_not_created()
    {
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

    public function test_issue_is_created()
    {
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

    public function test_issue_is_created_as_draft()
    {
        $user = Factory::create('BuildNigeria\User');
        $issue = Factory::build('BuildNigeria\Issue');
        $ideaService = $this->app->make('BuildNigeria\Services\IdeaService');
        $response = $ideaService->createIssue([
            'user_id' => $user->id,
            'detail' => $issue->detail,
            'status' => Issue::DRAFT
        ]);
        //var_dump($response->status);
        $this->assertInstanceOf('BuildNigeria\Issue', $response);
        $this->assertEquals($issue->detail, $response->detail);
        $this->assertSame(Issue::DRAFT, $response->status);
    }

    public function test_issue_draft_is_updated_and_not_created()
    {
        $user = Factory::create('BuildNigeria\User');
        $issue = Factory::build('BuildNigeria\Issue');
        $ideaService = $this->app->make('BuildNigeria\Services\IdeaService');
        $response = $ideaService->createIssue([
            'user_id' => $user->id,
            'detail' => $issue->detail,
            'status' => Issue::DRAFT
        ]);
        $this->assertInstanceOf('BuildNigeria\Issue', $response);
        $response->detail = $response->detail . ' more content';
        $response2 = $ideaService->createIssue($response->toArray());
        $this->assertEquals($response->id, $response2->id);
        $this->assertEquals($response2->detail, $response->detail);
    }

    public function test_issue_draft__solution_is_updated_and_not_created()
    {
        $user = Factory::create('BuildNigeria\User');
        $issue = Factory::build('BuildNigeria\Issue');
        $ideaService = $this->app->make('BuildNigeria\Services\IdeaService');
        //create issue
        $response = $ideaService->createIssue([
            'user_id' => $user->id,
            'detail' => $issue->detail,
            'status' => Issue::DRAFT,
            'solution' => ['detail' => $this->faker->text()]
        ]);
        $this->assertInstanceOf('BuildNigeria\Issue', $response);
        //update solution
        $response->solution->detail = $response->solution->detail . ' more content';
        $data = $response->toArray();
        $data['solution'] = $data['solution']->toArray();
        //save issue
        $response2 = $ideaService->createIssue($data);

        $this->assertEquals($response->id, $response2->id);
        $this->assertEquals($response->solution->detail, $response2->solution->detail);
    }

    public function test_issue_draft__solution__category_is_updated()
    {
        $category = Factory::create('BuildNigeria\Category');
        $user = Factory::create('BuildNigeria\User');
        $issue = Factory::build('BuildNigeria\Issue');
        $ideaService = $this->app->make('BuildNigeria\Services\IdeaService');
        $data = [
            'user_id' => $user->id,
            'detail' => $issue->detail,
            'categories' => [$category->category]
        ];
        //create issue
        $response = $ideaService->createIssue($data);
        $this->assertInstanceOf('BuildNigeria\Issue', $response);
        $this->assertEquals(count($data['categories']), $response->categories->count());
        //update categories
        $data = $response->toArray();
        $data['categories'] = ['Another'];
        //save issue
        $response = $ideaService->createIssue($data);
        $this->assertEquals(count($data['categories']), $response->categories->count());
        $this->assertEquals($data['categories'][0], $response->categories->first()->category);

    }

    public function test_issue_is_created_and_assigned_categories()
    {
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

    public function test_issue_is_created_with_solution()
    {
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

    public function test_create_new_solution()
    {
        $user = Factory::create('BuildNigeria\User');
        $issue = Factory::create('BuildNigeria\Issue');
        $ideaService = $this->app->make('BuildNigeria\Services\IdeaService');
        $data = [
            'user_id' => $user->id,
            'issue_id' => $issue->id,
            'detail' => $this->faker->text()
        ];
        $response = $ideaService->createSolution($data);
        $this->assertInstanceOf('BuildNigeria\Solution', $response);
        foreach ($data as $key => $value) {
            $this->assertEquals($value, $response->$key);
        }
    }

    public function test_edit_solution()
    {
        $user = Factory::create('BuildNigeria\User');
        $issue = Factory::create('BuildNigeria\Issue');
        $ideaService = $this->app->make('BuildNigeria\Services\IdeaService');
        $data = [
            'user_id' => $user->id,
            'issue_id' => $issue->id,
            'detail' => $this->faker->text()
        ];
        $response = $ideaService->createSolution($data);
        $this->assertInstanceOf('BuildNigeria\Solution', $response);
        $data['detail'] = $this->faker->text();
        $response2 = $ideaService->createSolution($data);
        foreach ($data as $key => $value) {
            $this->assertEquals($value, $response->$key);
        }
        $this->assertEquals($response2->id, $response->id);
    }
    
    public function test_get_issue()
    {
        $issue = Factory::create('BuildNigeria\Issue');
        $ideaService = $this->app->make('BuildNigeria\Services\IdeaService');
        $response = $ideaService->getIssue($issue->id);
        $this->assertInstanceOf('BuildNigeria\Issue', $response);
        $this->assertEquals($issue->id, $response->id);
    }
    
    public function test_get_solution() 
    {
        $solution = Factory::create('BuildNigeria\Solution');
        $ideaService = $this->app->make('BuildNigeria\Services\IdeaService');
        $response = $ideaService->getSolution($solution->id);
        $this->assertInstanceOf('BuildNigeria\Solution', $response);
        $this->assertEquals($solution->id, $response->id);
    }

    public function test_issue_up_vote()
    {
        $issue = Factory::create('BuildNigeria\Issue');
        $user = Factory::create('BuildNigeria\User');
        $this->assertEquals(0, $issue->upVotes());

        //test initiate vote is set
        $ideaService = $this->app->make('BuildNigeria\Services\IdeaService');
        $result = $ideaService->vote($user->id, $issue->id, Vote::ITEM_TYPE_ISSUE, Vote::VOTE_TYPE_UP);
        $this->assertTrue($result);
        //print_r(Vote::all()->toArray());
        $this->assertEquals(1, $issue->upVotes());

        //test vote is remove, if same vote request is made
        $result = $ideaService->vote($user->id, $issue->id, Vote::ITEM_TYPE_ISSUE, Vote::VOTE_TYPE_UP);
        $this->assertTrue($result);
        $this->assertEquals(0, $issue->upVotes());

        //test different user votes reflect appropriate count
        $user = Factory::create('BuildNigeria\User');
        $result = $ideaService->vote($user->id, $issue->id, Vote::ITEM_TYPE_ISSUE, Vote::VOTE_TYPE_UP);
        $this->assertTrue($result);
        $this->assertEquals(1, $issue->upVotes());

        //test downvote removes upvote for user
        $result = $ideaService->vote($user->id, $issue->id, Vote::ITEM_TYPE_ISSUE, Vote::VOTE_TYPE_DOWN);
        $this->assertTrue($result);
        $this->assertEquals(0, $issue->upVotes());
        $this->assertEquals(1, $issue->downVotes());

        //test validation
        $result = $ideaService->vote(0, $issue->id, Vote::ITEM_TYPE_SOLUTION, 'wrong_type');
        $this->assertFalse($result);
        $this->assertEquals(3, count($ideaService->errors()));
    }
}