<?php namespace BuildNigeria;

use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract
{

    use Authenticatable, CanResetPassword;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [];

    protected $guarded = ['user_token', 'user_token_expires_at'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token', 'user_token', 'user_token_expires_at', 'deleted_at',
        'fb_id', 'fb_token'];

    const PAGE_SIZE = 10;

    public function issues()
    {
        return $this->hasMany('BuildNigeria\Issue');
    }

    public function solutions()
    {
        return $this->hasMany('BuildNigeria\Solution');
    }

    public function comments()
    {
        return $this->hasMany('BuildNigeria\Comment');
    }



    public function getIssues()
    {
        return $this->issues()->with(['solutions', 'categories' => function ($q) {
            $q->select('category');

        }])->paginate(self::PAGE_SIZE);
    }

    public function getSolutions()
    {
        return $this->solutions()->with(
            [
                'issue',
                'votes' => function ($q) {
                    $q->where('item_type', Vote::ITEM_TYPE_SOLUTION);
                }
            ])->orderBy('updated_at', 'desc')->paginate(self::PAGE_SIZE);

    }

    public function getNoOfDrafts()
    {
        return Issue::where('user_id', $this->id)
            ->where('status', Issue::DRAFT)->count() +
        Solution::where('user_id', $this->id)
            ->where('status', Solution::DRAFT)->count();
    }

    public function drafts()
    {
        return [
            'issues' => $this->issueDrafts(),
            'solutions' => $this->solutionDrafts()
        ];
    }

    public function issueDrafts()
    {
        return Issue::where('user_id', $this->id)
            ->where('status', Issue::DRAFT)
            ->paginate(self::PAGE_SIZE);
    }

    public function solutionDrafts()
    {
        return Solution::where('user_id', $this->id)
            ->where('status', Solution::DRAFT)
            ->paginate(self::PAGE_SIZE);

    }

    public function deleteDrafts($type, array $ids)
    {
        switch ($type) {
            case 'issue':
                return Issue::where('user_id', $this->id)
                    ->where('status', Issue::DRAFT)
                    ->whereIn('id', $ids)->delete();
            case 'solution':
                return Solution::where('user_id', $this->id)
                    ->where('status', Solution::DRAFT)
                    ->whereIn('id', $ids)->delete();
        }
        return 0;
    }
}
