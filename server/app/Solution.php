<?php namespace BuildNigeria;

use Illuminate\Database\Eloquent\Model;

class Solution extends Model {

    const DRAFT = 0;
    const PUBLISH = 1;
    protected $fillable = [];

}
