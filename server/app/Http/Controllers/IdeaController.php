<?php namespace BuildNigeria\Http\Controllers;

use BuildNigeria\Http\Requests;
use BuildNigeria\Issue;
use BuildNigeria\Services\IdeaService;
use BuildNigeria\Solution;
use Illuminate\Http\Request;

class IdeaController extends Controller
{


    private $ideaService;

    public function __construct(IdeaService $ideaService)
    {

        $this->ideaService = $ideaService;
    }

    public function search(Request $request)
    {
        $term = $request->get('term');
        $results = $this->ideaService->searchIssues($term);
        if ($results) {
            // $termWithBg = "<span style='background:yellow'>" . $term . '</span>';
            $results->each(function ($row) use ($term) {
                $row->detail = preg_replace_callback(
                    '/\b\w*' . $term . '\w*\b/i',
                    function ($matches) {
                        foreach ($matches as $match) {
                            return sprintf("<span style=\"background:yellow\">%s</span>", $match);
                        }
                    },
                    $row->detail
                );
            });
            return $results;
        }

    }

    public function getCategories()
    {
        return $this->ideaService->categories()->toJson();
    }

    public function getIssues(Request $request)
    {
        $category = ($request->has('category')) ? $request->get('category') : null;
        return $this->ideaService->issues($category)->toJson();
    }

    public function getIssue(Issue $issue)
    {
        $issue->load(['user', 'categories', 'solutions']);
        return $issue->toJson();
    }

    public function getSolution(Solution $solution)
    {
        $solution->load('issue');
        return $solution->toJson();
    }

    public function createIssue(Request $request)
    {
        if (($issue = $this->ideaService->createIssue($request->all()))) {
            return $this->successResponse($issue->toArray());
        } else {
            return $this->errorResponse($this->ideaService->errors());
        }
    }

    public function createSolution(Request $request)
    {
        if (($solution = $this->ideaService->createSolution($request->all()))) {
            return $this->successResponse($solution->toArray());
        } else {
            return $this->errorResponse($this->ideaService->errors());
        }
    }


    public function vote($itemType, $voteType, Request $request)
    {
        $voteType = $voteType . '_vote';
        $userId = $request->get('user_id');
        $itemId = $request->get('item_id');
        if ($this->ideaService->vote($userId, $itemId, $itemType, $voteType)) {
            return $this->successResponse();
        } else {
            return $this->errorResponse($this->ideaService->errors());
        };

    }


}
