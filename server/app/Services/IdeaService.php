<?php
/**
 * @author: eanjorin
 * @date: 4/19/15
 */

namespace BuildNigeria\Services;


use BuildNigeria\Category;
use BuildNigeria\Idea;
use BuildNigeria\Issue;
use BuildNigeria\Solution;
use BuildNigeria\Traits\ErrorTrait;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class IdeaService {

    use ErrorTrait;

    protected $securityService;
    private $solution;
    private $issue;
    private $category;

    public function __construct(Issue $issue, Category $category, Solution $solution, SecurityService $securityService) {
        $this->securityService = $securityService;
        $this->solution = $solution;
        $this->issue = $issue;
        $this->category = $category;
    }

    /**
     * Creates or updates an issue
     * @param $data
     * @return bool|Issue
     */
    public function createIssue($data) {

        $validator = Validator::make($data, ['user_id' => 'required|exists:users,id']);
        $validator->sometimes('detail', 'required|min:150', function ($input) {
            if ($input->status === Issue::DRAFT) {
                return false;
            }
            return true;
        });
        if ($validator->passes()) {
            //issue already exist, retrieve issue and update
            if (array_key_exists('id', $data)) {
                $this->issue = $this->issue->findOrFail($data['id']);
            }
            $this->saveIssue($data);
            $this->updateIssueCategory($data);
            //update user solution if exist, or add new solution
            if (array_key_exists('solution', $data) && array_key_exists('id', $data['solution'])) {
                $this->solution = $this->solution->findOrFail($data['solution']['id']);
                $solution = $this->saveSolution($data['solution']);
            } else {
                $solution = $this->addSolutionToIssue($data);
            }
            //add user specific to solution to issue
            if ($solution) {
                $this->issue->solution = $solution;
            }
            $this->issue->load('categories');
            return $this->issue;
        } else {
            $this->clearErrors()->addError($validator->messages()->all());
            return false;
        }
    }

    public function categories() {
        return $this->category->leftJoin('issues_categories as ic', 'categories.id', '=', 'ic.category_id')
            ->select(DB::raw('count(ic.id) as issue_count'), 'categories.id', 'category')
            ->groupBy('id', 'category')
            ->get();
    }

    /**
     * @param $data
     */
    private function updateIssueCategory($data) {

        DB::commit(); //commit to release lock on issues_categories
        $this->issue->categories()->detach();
        //associate category
        if (array_key_exists('categories', $data) && is_array($data['categories']) && count($data['categories']) > 0) {
            $categories = [];
            foreach ($data['categories'] as $category) {
                $categoryModel = $this->category->where('category', $category)->first();
                if ($categoryModel) {
                    $categories[] = $categoryModel->id;
                } else if (is_string($category)) {
                    $categories[] = $this->category->create(['category' => $category])->id;
                }
            }
            if (count($categories) > 0) {
                $this->issue->categories()->attach($categories);
            }

        }
    }

    private function saveSolution($data) {
        if ($this->solution->issue_id && $this->solution->user_id) {
            $this->solution->detail = $data['detail'];
            $this->solution->status = (array_key_exists('status', $data) &&
                $data['status'] == Solution::DRAFT) ? Solution::DRAFT : Solution::PUBLISH;
            $this->solution->save();
            return $this->solution;
        }
    }


    private function addSolutionToIssue($data) {
        if (array_key_exists('solution', $data) && array_key_exists('detail', $data['solution'])) {
            //create new solution
            $this->solution->issue_id = $this->issue->id;
            $this->solution->user_id = $this->issue->user_id;
            return $this->saveSolution($data['solution']);
        }
    }


    /**
     * @param $data
     */
    private function saveIssue($data) {
        $this->issue->user_id = $data['user_id'];
        $this->issue->detail = $data['detail'];
        $this->issue->status = (array_key_exists('status', $data) &&
            $data['status'] == Issue::DRAFT) ? Issue::DRAFT : Issue::PUBLISH;
        $this->issue->save();
    }

    public function issues() {
        return $this->issue->with(['user', 'solutions', 'categories'])
            ->where('status', Issue::PUBLISH)
            ->orderBy('updated_at', 'desc')->get();
    }
}