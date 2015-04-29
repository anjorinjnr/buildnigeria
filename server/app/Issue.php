<?php namespace BuildNigeria;

use Illuminate\Database\Eloquent\Model;

class Issue extends Model {

    protected $fillable = [];
    const DRAFT = 0;
    const PUBLISH = 1;

    public function categories() {
        return $this->belongsToMany('BuildNigeria\Category', 'issues_categories', 'issue_id', 'category_id');
    }

    public function solutions() {
        return $this->hasMany('BuildNigeria\Solution');
    }
    public function user() {
        return $this->belongsTo('BuildNigeria\User');
    }
}
