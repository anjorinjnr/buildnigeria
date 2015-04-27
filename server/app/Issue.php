<?php namespace BuildNigeria;

use Illuminate\Database\Eloquent\Model;

class Issue extends Model {

    protected $fillable = [];

    public function categories() {
        return $this->belongsToMany('BuildNigeria\Category', 'issues_categories', 'issue_id', 'category_id');
    }

    public function solutions() {
        return $this->hasMany('BuildNigeria\Solution');
    }
}
