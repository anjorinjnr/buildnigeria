<?php namespace BuildNigeria;

use Illuminate\Database\Eloquent\Model;

class Category extends Model {

    protected $table = 'categories';

    public function ideas() {
        return $this->belongsTo('BuildNigeria\Idea');
    }

}
