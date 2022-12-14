<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Review\IndexRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    /**
     * ユーザー一覧を取得する。
     *
     * @param IndexRequest $request
     * @return JsonResponse
     */
    public function index(IndexRequest $request)
    {
        $query = User::with(['follows', 'followers', 'reviews'])
            ->withCount(['follows', 'followers', 'reviews'])
            ->where('id', '!=', auth()->user()->id);
        $pagination = config('PAGINATION.USERS');

        // ソート
        $pagination = config('PAGINATION.REVIEWS');
        $users = $query->orderBy($request->getColumnForSort($request['sort']), 'DESC')->paginate($pagination);

        return UserResource::collection($users);
    }

    /**
     * ユーザー情報詳細を取得する。
     *
     * @param  Request $request
     * @return JsonResponse
     */
    public function show(Request $request)
    {
        $id = (int) $request->user;
        $query = User::with([
            'follows',
            'followers',
            'reviews' => function ($query) {
                return $query->withCount('favorites');
            }
        ])->withCount([
            'follows',
            'followers',
            'reviews'
        ]);

        $user = $query->findOrFail($id);

        return new UserResource($user);
    }
}
