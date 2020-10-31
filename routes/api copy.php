<?php

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Review;

Route::group(['middleware' => 'auth'], function() {

    Route::get('/reviews/{review}', function (Review $review, User $user) {

        $loginUser = auth()->user();
        $review = $review
            ->with('favorites')
            ->where('id', $review->id)
            ->first();

        return
            [
                'loginUser' => $loginUser,
                'review' => $review
            ];
    });

    Route::get('/reviews',function (Review $review, User $user) {

        $loginUser = auth()->user();
        $timelines = $review->with('user')
            ->with(['comments','favorites'])
            ->orderBy('created_at', 'DESC')
            ->paginate(10);
        $favoritest = $review->with('user')
            ->with(['comments', 'favorites'])
            ->withCount('favorites')
            ->orderBy('favorites_count', 'DESC')
            ->paginate(10);

        return
            [
            'timelines' => $timelines,
            'loginUser' => $loginUser,
            'favoritest' => $favoritest
            ];
    });

    Route::get('/users/{user}',function (Request $request, Review $review, User $user) {

        $profileUserId = $request->user->id;
        $profileUser = $user->with('followers')->find($profileUserId);
        $loginUserId = auth()->user()->id;
        $loginUser = $user->with('followers')->find($loginUserId);
        // 投稿
        $userReviews = $review->where('user_id', $user->id)
            ->with(['user', 'comments', 'favorites'])
            ->orderBy('created_at', 'DESC')
            ->get();
        // いいねした投稿
        $favoriteReviews = $review->getFavoriteReviews($user->id);
        // フォローしているユーザー
        $followingUsers = $user->getFollowingUsers($user->id);
        // フォロワー
        $followedUsers = $user->getFollowers($user->id);

        return
            [
                'profileUser' => $profileUser,
                'loginUser' => $loginUser,
                'userReviews' => $userReviews,
                'favoriteReviews' => $favoriteReviews,
                'followingUsers' => $followingUsers,
                'followedUsers' => $followedUsers
            ];
    });

    Route::get('/users', function (User $user, Review $review) {

        $loginUserId = auth()->user()->id;
        $loginUser = $user->with('followers')->find($loginUserId);
        $users = $user->getAllUsers($loginUserId)
            ->with('followers')
            ->orderBy('id', 'DESC')
            ->paginate(10);
        $populars = $user->getAllUsers($loginUserId)
            ->with('followers')
            ->withCount('followers')
            ->orderBy('followers_count', 'DESC')
            ->paginate(10);

        return
            [
                'loginUser' => $loginUser,
                'users' => $users,
                'populars' => $populars
            ];
    });

    // いいね機能
    Route::post('favorites', 'Api\FavoriteController@store');
    Route::delete('favorites/{id}', 'Api\FavoriteController@destroy');

    // フォロー/フォロー解除
    Route::post('users/{user}/follow', 'Api\UsersController@follow');
    Route::post('users/{id}/unfollow', 'Api\UsersController@unfollow');

});