@extends('layouts.app')

@section('content')
    <div class="mb-3 text-right">
        <a href="{{ url('users') }}">ユーザ一検索</a>
    </div>
    @if($user == $login_user)
        @include('components.login_user_profile')
    @else
        @include('components.user_profile')
    @endif
    <!-- React-tabs -->
    <div id="userPageTab"></div>
@endsection
