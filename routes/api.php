<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth'], function () {

    // ログインユーザー
    Route::get('/login_user', 'Api\LoginUserController');

    // 書籍検索
    Route::get('/search_items', 'Api\SearchItemsController')->name('search_items');

    // 投稿
    Route::get('/reviews', 'Api\ReviewController@index');
    Route::get('/reviews/{review}', 'Api\ReviewController@show');

    // コメント
    Route::post('comments', 'Api\CommentController@store');
    Route::post('comments', 'Api\CommentController@destroy');

    // ユーザー
    Route::get('/users', 'Api\UserController@index');
    Route::get('/users/{user}', 'Api\UserController@show');

    // いいね
    Route::post('/add_favorite/{id}', 'Api\FavoriteController@addFavorite')->where('id', '[0-9]+');
    Route::post('/remove_favorite/{id}', 'Api\FavoriteController@removeFavorite')->where('id', '[0-9]+');

    // フォロー
    Route::post('/follow/{id}', 'Api\FollowController@follow')->where('id', '[0-9]+');
    Route::post('/unfollow/{id}', 'Api\FollowController@unfollow')->where('id', '[0-9]+');
});
