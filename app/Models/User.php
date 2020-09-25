<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'screen_name',
        'name',
        'profile_iamge',
        'email',
        'password',
        'description'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function follows()
    {
        return $this->belongsToMany(self::class, 'followers', 'following_id', 'followed_id');
    }

    public function followers()
    {
        return $this->belongsToMany(self::class, 'followers', 'followed_id', 'following_id');
    }

    public function getAllUsers(Int $user_id)
    {
        return $this->where('id', '<>', $user_id);
    }

    // フォローする
    public function follow(Int $user_id)
    {
        return $this->follows()->attach($user_id);
    }

    // フォロー解除する
    public function unfollow(Int $user_id)
    {
        return $this->follows()->detach($user_id);
    }

    // フォローしているか
    public function isFollowing(Int $user_id)
    {
        return (boolean) $this->follows()
        ->where('followed_id', $user_id)
        ->first(['id']);
    }

    // フォローされているか
    public function isFollowed(Int $user_id)
    {
        return (boolean) $this->followers()
        ->where('following_id', $user_id)
        ->first(['id']);
    }

    public function updateProfile(Array $params)
    {
        if (isset($params['profile_image'])) {
            $file_name = $params['profile_image']->store('public/profile_image/');

            $this::where('id', $this->id)
            ->update([
                'screen_name'   => $params['screen_name'],
                'name'          => $params['name'],
                'profile_image' => basename($file_name),
                'email'         => $params['email'],
                'description'   => $params['description']
                ]);
            } else {
                $this::where('id', $this->id)
                ->update([
                    'screen_name'   => $params['screen_name'],
                    'name'          => $params['name'],
                    'email'         => $params['email'],
                    'description'   => $params['description']
                    ]);
                }

                return;
    }

    // フォローしているユーザーを取得
    public function getFollowingUsers(Int $id)
    {
        return $this->follows()->with('followers')->where('following_id', $id)->get();
    }

    // フォロワーを取得
    public function getFollowers(Int $user_id)
    {
        return $this->followers()->with('followers')->where('followed_id', $user_id)->get();
    }

    // 検索ワードに部分一致するユーザーを取得
    public function getSearchUsers($user_id, $search)
    {
        return User::where('id', '<>', $user_id)->where('name', 'like', '%'.$search.'%')->paginate(10);
    }

}
