<?php
/**
 * @author: eanjorin
 * @date: 4/29/15
 */

namespace BuildNigeria;


use Illuminate\Database\Eloquent\Model;

class Vote extends Model {

    const VOTE_TYPE_UP = 'up_vote';
    const VOTE_TYPE_DOWN = 'down_vote';
    const ITEM_TYPE_ISSUE = 'issue';
    const ITEM_TYPE_SOLUTION = 'solution';

    protected $guarded = [];
}