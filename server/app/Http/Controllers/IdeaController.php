<?php namespace BuildNigeria\Http\Controllers;

use BuildNigeria\Http\Requests;
use BuildNigeria\Services\IdeaService;
use Illuminate\Http\Request;

class IdeaController extends Controller {


    private $ideaService;

    public function __construct(IdeaService $ideaService) {

        $this->ideaService = $ideaService;
    }

    public function getCategories(){
        return $this->ideaService->categories()->toJson();
    }
    public function getIssues(){
        return $this->ideaService->issues()->toJson();
    }
    public function createIssue(Request $request) {
        if (($issue = $this->ideaService->createIssue($request->all()))) {
            return $this->successResponse($issue);
        } else {
            return $this->errorResponse($this->ideaService->errors());
        }
    }

    public function all() {

    }


}
