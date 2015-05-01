<?php namespace BuildNigeria;

use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract {

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
    protected $hidden = ['password', 'remember_token', 'user_token', 'user_token_expires_at',
        'fb_id', 'fb_token'];

    public function ideas() {
        return $this->hasMany('BuildNigeria\Idea');
    }

    public function comments() {
        return $this->hasMany('BuildNigeria\Comment');
    }

    public function  signUpOrLogin(array $data) {

        if (array_key_exists('email', $data)) {
            $user = $this->where('email', $data['email'])->first();
            if ($user) {
                return $user;
            } else {
                $validator = Validator::make($data, [
                    'name' => 'required|max:255',
                    'email' => 'required|email|max:255|unique:users',
                ]);
                if ($validator->passes()) {
                    return $this->create($data);
                }
            }
        }
        return null;
    }

    public function getNoOfDrafts() {
        return Issue::where('user_id', $this->id)
            ->where('status', Issue::DRAFT)->count() +
        Solution::where('user_id', $this->id)
            ->where('status', Solution::DRAFT)->count();
    }

    public function drafts() {
        return [
            'issues' => $this->issueDrafts(),
            'solutions' => $this->solutionDrafts()
        ];
    }

    public function issueDrafts() {
        return Issue::where('user_id', $this->id)
            ->where('status', Issue::DRAFT)
            ->paginate(15);
    }

    public function solutionDrafts() {
        return Solution::where('user_id', $this->id)
            ->where('status', Solution::DRAFT)
            ->paginate(15);

    }

}
