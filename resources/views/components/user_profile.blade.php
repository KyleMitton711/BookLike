<div class="col-md-8 mb-3">
    <div class="card shadow-sm">
        <div class="d-inline-flex">
            <div class="p-3 d-flex flex-column">
            @if($user->profile_image == null)
                <img src="{{ $default_image }}" class="rounded-circle shadow-sm" width=100 height="100">
            @else
                <img src="{{ asset('storage/profile_image/'.$user->profile_image) }}" class="rounded-circle shadow-sm" width="100" height="100">
            @endif
<<<<<<< HEAD
                <div class="mt-3 d-flex flex-column">
=======
            <div class="mt-3 d-flex flex-column">
>>>>>>> 5bf089e80c267f1748e9a7e161d6b6cc5f54173d
                    <h4 class="mb-0 font-weight-bold">{{ $user->name }}</h4>
                    <span class="text-secondary">{{ $user->screen_name }}</span>
                </div>
            </div>
            <div class="p-3 d-flex flex-column justify-content-between">
                <div class="d-flex">
                    <div class="d-flex">
                            @if ($is_following)
                            <form action="{{ route('unfollow', $user->id) }}" method="POST">
                                @csrf
                                @method('DELETE')

                                <button type="submit" class="btn btn-danger shadow-sm">フォロー中</button>
                            </form>
                            @else
                            <form action="{{ route('follow', $user->id) }}" method="POST">
                                @csrf
                                <button type="submit" class="btn btn-primary shadow-sm">フォローする</button>
                            </form>
                            @endif

                            @if ($is_followed)
                            <span class="mt-2 px-1 bg-secondary text-light">フォローされています</span>
                            @endif
                    </div>
                </div>

                <div class="d-flex">
                    <p>{{ $user->description }}</p>
                </div>

                <div class="d-flex justify-content-end">
                    <div class="p-2 d-flex flex-column align-items-center">
                        <p class="font-weight-bold">レビュー</p>
                        <a class="btn bg-light" href="{{ url('users/' .$user->id) }}">{{ $review_count }}</a>
                    </div>
                    <div class="p-2 d-flex flex-column align-items-center">
                        <p class="font-weight-bold">フォロー</p>
                        <a class="btn bg-light" href="{{ url('/users/' .$user->id .'/following') }}">{{ $follow_count }}</a>
                    </div>
                    <div class="p-2 d-flex flex-column align-items-center">
                        <p class="font-weight-bold">フォロワー</p>
                        <a class="btn bg-light" href="{{ url('/users/' .$user->id .'/followers') }}">{{ $follower_count }}</a>
                    </div>
                    <div class="p-2 d-flex flex-column align-items-center">
                        <p class="font-weight-bold">いいねしたレビュー</p>
                        <a class="btn bg-light" href="{{ url('/users/' .$user->id .'/favorite') }}">{{ $favorite_reviews_count }}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
