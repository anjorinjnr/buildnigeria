<?php namespace BuildNigeria;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Solution extends Model
{

    const DRAFT = 0;
    const PUBLISH = 1;
    protected $fillable = [];

    use SoftDeletes;

    public function issue()
    {
        return $this->belongsTo('BuildNigeria\Issue');
    }

    public function votes()
    {
        return $this->hasMany('BuildNigeria\Vote', 'item_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo('BuildNigeria\User');
    }

    public function upVotes()
    {
        return Vote::where('item_id', $this->id)
            ->where('vote_type', Vote::VOTE_TYPE_UP)
            ->where('item_type', Vote::ITEM_TYPE_SOLUTION)
            ->count();
    }

    public function downVotes()
    {
        return Vote::where('item_id', $this->id)
            ->where('vote_type', Vote::VOTE_TYPE_DOWN)
            ->where('item_type', Vote::ITEM_TYPE_SOLUTION)
            ->count();
    }



}
