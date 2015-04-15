<?php namespace BuildNigeria;

use Illuminate\Database\Eloquent\Model;

class Idea extends Model {

    //

    public function comments() {
        return $this->hasMany('BuildNigeria\Comment');
    }

    public function user() {
        $this->belongsTo('BuildNigeria\User');
    }

    public function categories() {
        $this->belongsToMany('BuildNigeria\Category');
    }

}
