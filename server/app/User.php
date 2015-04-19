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
    protected $fillable = ['name', 'email', 'password'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

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
                  return  $this->create($data);
                }
            }
        }
        return null;
    }

}
