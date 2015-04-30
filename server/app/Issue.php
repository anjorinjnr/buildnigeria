<?php namespace BuildNigeria;

use Illuminate\Database\Eloquent\Model;

class Issue extends Model {

    protected $fillable = [];
    const DRAFT = 0;
    const PUBLISH = 1;

    public function votes() {
        return $this->hasMany('BuildNigeria\Vote', 'item_id', 'id');
    }

    public function categories() {
        return $this->belongsToMany('BuildNigeria\Category', 'issues_categories', 'issue_id', 'category_id');
    }

    public function solutions() {
        return $this->hasMany('BuildNigeria\Solution');
    }


    public function user() {
        return $this->belongsTo('BuildNigeria\User');
    }

    public function upVotes() {
        return Vote::where('item_id', $this->id)
            ->where('vote_type', Vote::VOTE_TYPE_UP)
            ->where('item_type', Vote::ITEM_TYPE_ISSUE)
            ->count();
    }

    public function downVotes() {
        return Vote::where('item_id', $this->id)
            ->where('vote_type', Vote::VOTE_TYPE_DOWN)
            ->where('item_type', Vote::ITEM_TYPE_ISSUE)
            ->count();
    }
}
