<?php namespace BuildNigeria;

use Illuminate\Database\Eloquent\Model;

class Category extends Model {

    protected $table = 'categories';
    protected $fillable = ['category'];

    public function issues() {
        return $this->belongsTo('BuildNigeria\Issue');
    }
}
