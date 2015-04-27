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

    public function createIssue($data) {

        $validator = Validator::make($data,
            [
                'user_id' => 'required|exists:users,id',
                'detail' => 'required|min:150'
            ]);
        if ($validator->passes()) {
            //save issue
            $this->issue->user_id = $data['user_id'];
            $this->issue->detail = $data['detail'];
            $this->issue->save();
            //associate category
            if (array_key_exists('categories', $data) && is_array($data['categories']) && count($data['categories']) > 0) {
                $categories = [];
                foreach ($data['categories'] as $category) {
                    $categoryModel = $this->category->where('category', $category)->first();
                    if ($categoryModel) {
                        $categories[] = $categoryModel->id;
                    } else if (is_string($category)){
                        $categories[] = $this->category->create(['category' => $category])->id;
                    }
                }
                if (count($categories) > 0) {
                    $this->issue->categories()->attach($categories);
                }

            }
            //associate solution
            if (array_key_exists('solution', $data) && array_key_exists('detail', $data['solution'])) {
                $this->solution->issue_id = $this->issue->id;
                $this->solution->user_id = $this->issue->user_id;
                $this->solution->detail = $data['solution']['detail'];
                $this->solution->status = (array_key_exists('status', $data['solution']) &&
                    $data['solution']['status'] == Solution::DRAFT) ? Solution::DRAFT : Solution::PUBLISH;
                $this->solution->save();
            }
            return $this->issue;
        } else {
            $this->clearErrors()->addError($validator->messages()->all());
            return false;
        }
    }

    public function categories() {
        return $this->category->select('id', 'category')->get();
    }
}