<?php namespace BuildNigeria;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model {

    public function user() {
        return $this->belongsTo('BuildNigeria\User');
    }
    public function idea() {
        return $this->belongTo('BuildNigeria\Idea');
    }

}
