<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('v1/login', function (){

    $input = request() -> all();

    $user = DB::table('users')
        -> where('email',$input['email'])
        -> first();

    if($user -> password != $input['password'])
        return error(1);
    else if ($user -> enabled == 0)
        return error(2);
    else{
        $email = hash('sha256', $user -> email);
        return $response = response() -> json(['success' => true, 'message' => '', 'data' => $email])
            -> withHeaders(['Content-Type' => 'application/json', 'X-User-Token' => $email]);
    }
});

Route::post('v1/logout', function (){

    $token = request() -> header('X-User-Token');
    if(!$token) return error(3);

    return $response = response() -> json(['success' => true, 'message' => '', 'data' => '']);
});

//!!
Route::get('v1/video/hot', function (){});

Route::get('v1/video/public/', function (){

    $input = request() -> all();

    if(@$input['page']) $page = $input['page'];
    else $page = 0;
    $page = $page * 10;

    $video = DB::table('videos')
        -> where ('visibility','PUBLIC')
        -> whereRaw('MATCH(title, description) AGAINST(?)', $input['q'])
        ->get();

    $result = [];
    foreach ($video as $x => $x_value){

        $category = DB::table('categories') -> where('id', $x_value -> category_id) -> first() -> title;
        $user_id = DB::table('users') -> where('id', $x_value -> user_id) -> first() -> nickname;

        array_push($result,[
            'id' => $x_value -> id,
            'title' => $x_value -> title,
            'description' => $x_value -> description,
            'duration' => $x_value -> duration,
            'created_at' => $x_value -> created_at,
            'category' => $category,
            'user' => $user_id,
        ]);

    }

    return $response = response() -> json(['success' => true, 'message' => '','data' => ['total_count' => count($result), 'results' => $result]]);

});
Route::get('v1/video/{video_id}', function ($video_id){
    $video = DB::table('videos')
        -> where ('id',$video_id)
        -> get();

    $result = [];
    foreach ($video as $x => $x_value){

        $category = DB::table('categories') -> where('id', $x_value -> category_id) -> first() -> title;
        $user_id = DB::table('users') -> where('id', $x_value -> user_id) -> first() -> nickname;
        $likes = DB::table('likes') -> where('video_id', $x_value -> id) -> get() -> count();
        $plays = DB::table('video_play_history') -> where('video_id',$video_id) -> get() -> count();

        $episodes = DB::table('episodes') ->select('program_id') -> where('video_id',$video_id) -> get();
        $program = [];
        foreach ($episodes as $y => $y_value){
            array_push($program, $y_value -> program_id);
        }

        $token = request() -> header('X-User-Token');
        if(!$token)
            $liked = false;
        else{
            $user = DB::table("users") -> where('token',$token) -> first() -> id;
            $isliked = DB::table('likes') -> where('video_id', $x_value -> id) -> where('user_id', $user) -> get() -> count() ;
            ($isliked > 0) ? $liked = true : $liked = false;
        }


        array_push($result,[
            'id' => $x_value -> id,
            'title' => $x_value -> title,
            'description' => $x_value -> description,
            'duration' => $x_value -> duration,
            'created_at' => $x_value -> created_at,
            'category' => $category,
            'user' => $user_id,
            'plays' => $plays,
            'likes' => $likes,
            'liked' => $liked,
            'program_id' => $program,
        ]);

    }

    return $response = response() -> json(['success' => true, 'message' => '','data' => ['total_count' => count($result), 'results' => $result]]);

});
Route::get('v1/video/{video_id}/playurl', function ($video_id){

    $video = DB::table('video_files') -> where('video_id', $video_id) -> get();
    if(!count($video) > 0) return $response = response() -> json(['success' => false, 'message' => 'VIDEO_NOT_EXISTS', 'data' => ''],404);

    $result = DB::table('video_files') -> where('video_id', $video_id) -> where('width', request() -> q) -> get();
    if(!count($result) > 0) return $response = response() -> json(['success' => false, 'message' => 'QUALITY_NOT_EXISTS', 'data' => '']);

    return $result;

});
Route::put('v1/video/{video_id}/like', function ($video_id){
    $input = request() -> all();

    $token = request() -> header('X-User-Token');
    if(!$token) return $response = response() -> json(['success' => false, 'message' => 'MSG_INVALID_TOKEN', ' data' => ''], 401);
    else $user_id = DB::table('users') -> where('token',$token) -> first() -> id;


    if(request() -> like == true){
        $liked = DB::table('likes') -> where('video_id', $video_id) -> where('user_id', $user_id) -> get() -> count();
        if($liked == 0) DB::table('likes') -> insert([
            'video_id' => $video_id,
            'user_id' => $user_id,
        ]);
    }else{
        DB::table('likes') -> where('video_id', $video_id) -> where('user_id', $user_id) -> delete();
    }

  return $response = response() -> json(['success' => true, 'message' => '', 'data' => '']);


});
Route::post('v1/video/{video_id}/danmu', function ($video_id){
    $token = request() -> header('X-User-Token');
    if(!$token) return $response = response() -> json(['success' => false, 'message' => 'MSG_INVALID_TOKEN', ' data' => ''], 401);
    else $user_id = DB::table('users') -> where('token',$token) -> first() -> id;

    if(!request() -> text) return $response = response() -> json(['success' => false, 'message' => 'MSG_MISSING_FIELD', ' data' => ''], 400);
    if(!request() -> position) return $response = response() -> json(['success' => false, 'message' => 'MSG_MISSING_FIELD', ' data' => ''], 400);
    if(!is_numeric(request() -> position)) return $response = response() -> json(['success' => false, 'message' => 'MSG_WRONG_DATA_TYPE', ' data' => ''], 400);

    DB::table('danmu') -> insert([
        'video_id' => $video_id,
        'user_id' => $user_id,
        'text' => request() -> text,
        'position' => request() -> position,
    ]);

    return $response = response() -> json(['success' => true, 'message' => '', 'data' => '']);
});
Route::get('v1/video/{video_id}/danmu', function ($video_id){

    $token = request() -> header('X-User-Token');
    if(!$token) return $response = response() -> json(['success' => false, 'message' => 'MSG_INVALID_TOKEN', ' data' => ''], 401);
    else $user_id = DB::table('users') -> where('token',$token) -> first() -> id;

    $danmu = DB::table('danmu') -> select('text','position') -> where('video_id', $video_id) -> get();
    return $response = response() -> json(['success' => true, 'message' => '', 'data' => $danmu]);
});
Route::post('v1/video/{video_id}/comment', function ($video_id){
    $token = request() -> header('X-User-Token');
    if(!$token) return $response = response() -> json(['success' => false, 'message' => 'MSG_INVALID_TOKEN', ' data' => ''], 400);
    else $user_id = DB::table('users') -> where('token',$token) -> first() -> id;

    if(!request() -> text) return error(4);
    if(!is_string(request() -> text)) return error(5);
    DB::table('comments') -> insert([
        'video_id' => $video_id,
        'user_id' => $user_id,
        'reply_comment_id' => null,
        'text' => request() -> text,
    ]);

    return $response = response() -> json(['success' => true, 'message' => '', 'data' => '']);
});
Route::get('v1/video/{video_id}/comment', function ($video_id){

    $token = request() -> header('X-User-Token');
    if(!$token) return error(2);

    $video = DB::table('videos') -> where('id', $video_id) -> get() -> count();
    if($video == 0) return error(6);

    $comment = DB::table('comments')-> where('video_id', $video_id) -> where('reply_comment_id', null) -> get();
    foreach ($comment as $x => $x_value){   $x_value -> replies = [];   }

    $comments = DB::table('comments') -> where('video_id', $video_id) -> get();
    foreach ($comments as $x => $x_value){
        foreach ($comment as $y => $y_value){
            if($y_value -> id == $x_value -> reply_comment_id)
                array_push($y_value -> replies, [
                    'user' => DB::table('users') -> where('id', $x_value -> user_id) -> first() -> nickname,
                    'text' => $x_value -> text,
                    'created_at' => $x_value -> created_at,
                    'allow_delete' => '',
                    'allow_block' => '',
                ]);
        }
    }

    $result = [];
    foreach ($comment as $x => $x_value){
        array_push($result,[
            'user' => DB::table('users') -> where('id', $x_value -> user_id) -> first() -> nickname,
            'text' => $x_value -> text,
            'created_at' => $x_value -> created_at,
            'allow_delete' => '',
            'allow_block' => '',
            'replies' => $x_value -> replies
        ]);
    }


    return $response = response() -> json(['success' => true, 'message' => '', 'data' => [
        'total_count' => count($comments),
        'result' => $result
    ]]);
});
Route::post('v1/comment/{comment_id}/reply', function ($comment_id){

    $token = request() -> header('X-User-Token');
    if(!$token) return $response = response() -> json(['success' => false, 'message' => 'MSG_INVALID_TOKEN', ' data' => ''], 400);
    else $user_id = DB::table('users') -> where('token',$token) -> first() -> id;

    $video_id = DB::table('comments') -> where('id', $comment_id) -> first() -> video_id;

    if(!request() -> text) return error(4);
    if(!is_string(request() -> text)) return error(5);
    DB::table('comments') -> insert([
        'video_id' => $video_id,
        'user_id' => $user_id,
        'reply_comment_id' => $comment_id,
        'text' => request() -> text,
    ]);

    return $response = response() -> json(['success' => true, 'message' => '', 'data' => '']);

});
Route::delete('v1/comment/{comment_id}', function ($comment_id){

    $token = request() -> header('X-User-Token');
    if(!$token) return $response = response() -> json(['success' => false, 'message' => 'MSG_INVALID_TOKEN', ' data' => ''], 400);
    else $user_id = DB::table('users') -> where('token',$token) -> first() -> id;

    DB::table('comments') -> where('id', $comment_id) -> delete();

    return $response = response() -> json(['success' => true, 'message' => '', 'data' => '']);
});
Route::get('v1/playlist', function (){

    $token = request() -> header('X-User-Token');
    if(!$token) return $response = response() -> json(['success' => false, 'message' => 'MSG_INVALID_TOKEN', ' data' => ''], 400);
    else $user_id = DB::table('users') -> where('token',$token) -> first() -> id;

    $playlist = DB::table('playlists') -> select('id', 'title') -> get();

    return $response = response() -> json(['success' => true, 'message' => '', 'data' => $playlist]);

});
Route::post('v1/playlist', function (){

    $token = request() -> header('X-User-Token');
    if(!$token) return $response = response() -> json(['success' => false, 'message' => 'MSG_INVALID_TOKEN', ' data' => ''], 400);
    else $user_id = DB::table('users') -> where('token',$token) -> first() -> id;

    if(!request() -> title) return error(4);
    if(!is_string(request() -> title)) return error(5);

    $playlist = DB::table('playlists') -> where('title', request() -> title) -> get() -> count();
    if($playlist > 0) return error(9);

    DB::table('playlists') -> insert([
        'user_id' => $user_id,
        'title' => request() -> title
    ]);

    return $response = response() -> json(['success' => true, 'message' => '', 'data' => '']);

});
Route::get('v1/playlist/{playlist_id}', function ($playlist_id){

    $token = request() -> header('X-User-Token');
    if(!$token) return $response = response() -> json(['success' => false, 'message' => 'MSG_INVALID_TOKEN', ' data' => ''], 400);
    else $user_id = DB::table('users') -> where('token',$token) -> first() -> id;

    $playlist = DB::table('playlist_videos') -> where('playlist_id', $playlist_id) -> get();
    if(count($playlist) == 0) return error(10);

    $videos = [];
    foreach ($playlist as $x => $x_value){
        $video = DB::table('videos') -> where('id', $x_value -> video_id) -> first();
        $category = DB::table('categories') -> where('id', $video -> category_id) -> first() -> title;

        array_push($videos,[
           'id' => $video -> id,
           'title' => $video -> title,
           'description' => $video -> description,
           'duration' => $video -> duration,
           'created_at' => $video -> created_at,
           'category' => $category,
        ]);

    }

    return $response = response() -> json(['success' => true, 'message' => '', 'data' => $videos]);
});
Route::post('v1/playlist/{playlist_id}', function ($playlist_id){

    $token = request() -> header('X-User-Token');
    if(!$token) return error(2);
    else $user_id = DB::table('users') -> where('token',$token) -> first() -> id;

    if(!request() -> video_id) return error(4);
    if(!is_numeric(request() -> video_id)) return error(5);
    $checked = DB::table('playlist_videos') -> where('playlist_id', $playlist_id) -> where('video_id', request() -> video_id) -> get() -> count();
    if($checked > 0 ) return error(7);

    $playlist = DB::table('playlists') -> where('id', $playlist_id) -> get();
    if(count($playlist) == 0) return error(10);
    $count = DB::table('playlist_videos') -> where('playlist_id', $playlist_id) -> get() -> count();

    DB::table('playlist_videos') -> insert([
        'playlist_id' => $playlist_id,
        'video_id' => request() -> video_id,
        'order' => $count + 1
    ]);

    return $response = response() -> json(['success' => true, 'message' => '', 'data' => '']);
});
Route::put('v1/playlist/{playlist_id}/order', function ($playlist_id){

    $token = request() -> header('X-User-Token');
    if(!$token) return error(2);
    else $user_id = DB::table('users') -> where('token',$token) -> first() -> id;

    if(!request() -> video_ids) return error(4);
    if(!is_array(request() -> video_ids)) return error(5);

    $order = []; $count = 1;
    $playlist = DB::table('playlists') -> where('id', $playlist_id) -> get() -> count();
    if($playlist == 0 ) return error(10);
    $playlist = DB::table('playlist_videos') -> where('playlist_id', $playlist_id) -> get() -> count();
    if($playlist != count(request() -> video_ids)) return error(11);
    foreach (request() -> video_ids as $x => $x_value){

        $video = DB::table('videos') -> where('id', $x_value) -> get() -> count();
        if($video == 0) return error(6);

        DB::table('playlist_videos') -> where('playlist_id', $playlist_id) -> where('video_id', $x_value) -> update(['order'=> $count]) ;
        $count += 1;
    }

    return $response = response() -> json(['success' => true, 'message' => '', 'data' => $order]);

});
Route::delete('v1/playlist/{playlist_id}/video/{video_id}', function ($playlist_id, $video_id){

    $token = request() -> header('X-User-Token');
    if(!$token) return error(2);
    else $user_id = DB::table('users') -> where('token',$token) -> first() -> id;

    $playlist = DB::table('playlists') -> where('id', $playlist_id) -> get() -> count();
    if($playlist == 0 ) return error(10);
    $video = DB::table('videos') -> where('id', $video_id) -> get() -> count();
    if($video == 0 ) return error(6);
    $checked = DB::table('playlist_videos') -> where('playlist_id', $playlist_id) -> where('video_id', $video_id) -> get() -> count();
    if($checked == 0 ) return error(12);

    DB::table('playlist_videos') -> where('playlist_id', $playlist_id) -> where('video_id', $video_id) -> delete();

    return $response = response() -> json(['success' => true, 'message' => '', 'data' => '']);
});
Route::delete('v1/playlist/{playlist_id}', function ($playlist_id){

    $token = request() -> header('X-User-Token');
    if(!$token) return error(2);
    else $user_id = DB::table('users') -> where('token',$token) -> first() -> id;

    $playlist = DB::table('playlists') -> where('id', $playlist_id) -> get() -> count();
    if($playlist == 0 ) return error(10);

    DB::table('playlist_videos') -> where('playlist_id', $playlist_id) -> delete();
    DB::table('playlists') -> where('id', $playlist_id) -> delete();

    return $response = response() -> json(['success' => true, 'message' => '', 'data' => '']);
});
Route::get('v1/program/', function (){

    date_default_timezone_set('Asia/Taipei');
    $today = Date('Y-m-d h:i:s');
    $tomorrow = Date('Y-m-d', strtotime("+1 day"));

    $program = DB::table('programs')
        -> select('id', 'title', 'description', 'authorized_start_datetime', 'authorized_end_datetime', 'updated_at')
        -> whereRaw('MATCH(title, description) AGAINST(?)', request() -> q)
        -> where ('authorized_start_datetime' , '<=', Date($today))
        -> where ('authorized_end_datetime' , '>=', Date($today))
        -> offset(1)
        -> limit(1)
        -> get();

    foreach ($program as $x => $x_value){

        $episodes = DB::table('episodes') -> where('program_id', $x_value -> id) -> get();
        $x_value -> episodes =[];
        foreach ($episodes as $y => $y_value){

            $video = DB::table('videos') -> where('id', $y_value -> video_id) -> first();
            array_push($x_value -> episodes,[
                'video' => [
                    'id' => $video -> id,
                    'title' => $video -> title,
                    'duration' => $video -> duration,
                    'created_at' => $video -> created_at,
                    'category' => DB::table('categories') -> where('id', $video -> category_id) -> first() -> title,
                    'plays' => DB::table('video_play_history') -> where('video_id',$video -> id) -> get() -> count(),
                ],
                'episode' => [
                    'title' => $y_value -> title,
                    'order' => $y_value -> order,
                ]
            ]);

        }
    }



    return $response = response() ->json(['success' => true, 'message' => '', 'data' => $program, 'tommottoe' => $tomorrow]);

});
Route::get('v1/program/{program_id}', function ($program_id){

    $program = DB::table('programs') -> select('id', 'title', 'description', 'authorized_start_datetime', 'authorized_end_datetime', 'updated_at') -> where('id', $program_id) -> first();
    if(!$program) return error(13);

    $video = DB::table('episodes') -> where('program_id', $program_id) -> get();
    $episodes = [];
    foreach ($video as $x => $x_value){

        $current = DB::table('videos') -> where('id', $x_value -> video_id) -> first();

        $category = DB::table('categories') -> where('id', $current -> category_id) -> first() -> title;
        $user_id = DB::table('users') -> where('id', $current -> user_id) -> first() -> nickname;
        $likes = DB::table('likes') -> where('video_id', $current -> id) -> get() -> count();
        $plays = DB::table('video_play_history') -> where('video_id',$current -> id) -> get() -> count();

        $token = request() -> header('X-User-Token');
        if(!$token)
            $liked = false;
        else{
            $user = DB::table("users") -> where('token',$token) -> first() -> id;
            $isliked = DB::table('likes') -> where('video_id', $current -> id) -> where('user_id', $user) -> get() -> count() ;
            ($isliked > 0) ? $liked = true : $liked = false;
        }

        array_push($episodes,[
            'video' => [
                'id' => $current -> id,
                'title' => $current -> title,
                'description' => $current -> description,
                'duration' => $current -> duration,
                'created_at' => $current -> created_at,
                'category' => $category,
                'user' => $user_id,
                'plays' => $plays,
                'likes' => $likes,
                'liked' => $liked,
            ],
            'episode' => [
                'title' => $x_value -> title,
                'order' => $x_value -> order
            ]
        ]);
    }

    $program -> episodes = $episodes;

    return $response = response() -> json(['success' => true, 'message' => '', 'data' => $program]);

});

//!!
Route::get('v1/index/banner', function (){});

Route::get('v1/profile', function (){

    $token = request() -> header('X-User-Token');
    if(!$token) return error(2);
    else $user_id = DB::table('users') -> where('token',$token) -> first() -> id;

    $user = DB::table('users') -> select('id', 'email', 'nickname', 'enabled', 'verified', 'user_type', 'created_at', 'updated_at') -> where('id', $user_id) -> first();

    $user -> enabled = ($user -> enabled == 1) ? true : false;
    $user -> verified = ($user -> verified == 1) ? true : false;

    return $response = response() -> json(['success' => true, 'message' => '', 'data' => $user]);

});
Route::get('v1/user', function (){

    $token = request() -> header('X-User-Token');
    if(!$token) return error(2);
    else $user_id = DB::table('users') -> where('token',$token) -> first() -> id;

    $is_admin = DB::table('users') -> where('token',$token) -> first() -> user_type;
    if($is_admin != "ADMIN") return error(2);

    $user = DB::table('users') -> select('id', 'email', 'nickname', 'verified', 'user_type', 'created_at', 'updated_at') -> get();

    foreach ($user as $x => $x_value){
        $x_value -> verified = ($x_value -> verified == 1) ? true : false;
    }

    return $response = response() -> json(['success' => true, 'message' => '', 'data' => $user]);


});
Route::post('v1/program', function (){

    $token = request() -> header('X-User-Token');
    if(!$token) return error(2);
    else $user_id = DB::table('users') -> where('token',$token) -> first() -> id;

    $is_admin = DB::table('users') -> where('token',$token) -> first() -> user_type;
    if($is_admin != "ADMIN") return error(2);

    if(!request() -> title) return error(4);
    if(!request() -> description) return error(4);
    if(!request() -> authorized_start_datetime) return error(4);
    if(!request() -> authorized_end_datetime) return error(4);

    if(!is_string(request() -> title)) return error(5);
    if(!is_string(request() -> description)) return error(5);
    if(!is_string(request() -> authorized_start_datetime)) return error(5);
    if(!is_string(request() -> authorized_end_datetime)) return error(5);

    DB::table('programs') -> insert([
        'title' => request() -> title,
        'description' => request() -> description,
        'authorized_start_datetime' => request() -> authorized_start_datetime,
        'authorized_end_datetime' => request() -> authorized_end_datetime,
    ]);

    return $response = response() -> json(['success' => true, 'message' => '', 'data' => '']);
});
Route::put('v1/program/{program_id}', function ($program_id){

    $token = request() -> header('X-User-Token');
    if(!$token) return error(2);
    else $user_id = DB::table('users') -> where('token',$token) -> first() -> id;

    $is_admin = DB::table('users') -> where('token',$token) -> first() -> user_type;
    if($is_admin != "ADMIN") return error(2);

    if(!request() -> title) return error(4);
    if(!request() -> description) return error(4);
    if(!request() -> authorized_start_datetime) return error(4);
    if(!request() -> authorized_end_datetime) return error(4);

    if(!is_string(request() -> title)) return error(5);
    if(!is_string(request() -> description)) return error(5);
    if(!is_string(request() -> authorized_start_datetime)) return error(5);
    if(!is_string(request() -> authorized_end_datetime)) return error(5);

    $program = DB::table('programs') -> select('id', 'title', 'description', 'authorized_start_datetime', 'authorized_end_datetime', 'updated_at') -> where('id', $program_id) -> first();
    if(!$program) return error(13);

    DB::table('programs') -> where('id',$program_id) -> update([
        'title' => request() -> title,
        'description' => request() -> description,
        'authorized_start_datetime' => request() -> authorized_start_datetime,
        'authorized_end_datetime' => request() -> authorized_end_datetime,
    ]);

    return $response = response() -> json(['success' => true, 'message' => '', 'data' => '']);

});
Route::post('v1/program/{program_id}/video', function ($program_id){

    $token = request() -> header('X-User-Token');
    if(!$token) return error(2);
    else $user_id = DB::table('users') -> where('token',$token) -> first() -> id;

    $is_admin = DB::table('users') -> where('token',$token) -> first() -> user_type;
    if($is_admin != "ADMIN") return error(2);

    if(!request() -> video_id) return error(4);
    if(!is_numeric(request() -> video_id)) return error(5);

    $program = DB::table('programs') -> select('id', 'title', 'description', 'authorized_start_datetime', 'authorized_end_datetime', 'updated_at') -> where('id', $program_id) -> first();
    if(!$program) return error(13);
    $video = DB::table('videos') -> where('id', request() -> video_id) -> get() -> count();
    if($video == 0) return error(6);

    $count = DB::table('episodes') -> where('program_id', $program_id) -> get() -> count();

    DB::table('episodes') -> insert([
        'program_id' => $program_id,
        'video_id' => request() -> video_id,
        'title' => 'Program '.$program_id.' - Episode '.($count + 1),
        'order' => $count +1 ,
    ]);

    return $response = response() -> json(['success' => true, 'message' => '', 'data' => '']);
});
Route::delete('v1/program/{program_id}/video/{video_id}', function ($program_id, $video_id){

    $token = request() -> header('X-User-Token');
    if(!$token) return error(2);
    else $user_id = DB::table('users') -> where('token',$token) -> first() -> id;

    $is_admin = DB::table('users') -> where('token',$token) -> first() -> user_type;
    if($is_admin != "ADMIN") return error(2);

    $program = DB::table('programs') -> select('id', 'title', 'description', 'authorized_start_datetime', 'authorized_end_datetime', 'updated_at') -> where('id', $program_id) -> first();
    if(!$program) return error(13);
    $video = DB::table('videos') -> where('id', $video_id) -> get() -> count();
    if($video == 0) return error(6);

    $checked = DB::table('episodes') -> where('program_id', $program_id) -> where('video_id', $video_id) -> first();
    if(!$checked) return error(14);

    DB::table('episodes') -> where('program_id', $program_id) -> where('video_id', $video_id) -> delete();
    return $response = response() -> json(['success' => true, 'message' => '', 'data' => '']);

});
Route::delete('v1/program/{program_id}', function ($program_id){

    $token = request() -> header('X-User-Token');
    if(!$token) return error(2);
    else $user_id = DB::table('users') -> where('token',$token) -> first() -> id;

    $is_admin = DB::table('users') -> where('token',$token) -> first() -> user_type;
    if($is_admin != "ADMIN") return error(2);

    DB::table('episodes') -> where('program_id', $program_id) -> delete();
    DB::table('programs') -> where('id', $program_id) -> delete();
    return $response = response() -> json(['success' => true, 'message' => '', 'data' => '']);

});

function error($status){
    switch ($status){
        case 1:
            return $response = response() -> json(['success' => false, 'message' => 'MSG_INVALID_LOGIN', ' data' => ''], 403);
            break;
        case 2:
            return $response = response() -> json(['success' => false, 'message' => 'MSG_PERMISSION_DENY', ' data' => ''], 403);
            break;
        case 3:
            return $response = response() -> json(['success' => false, 'message' => 'MSG_INVALID_TOKEN', ' data' => ''], 401);
            break;
        case 4:
            return $response = response() -> json(['success' => false, 'message' => 'MSG_MISSING_FIELD', ' data' => ''], 400);
            break;
        case 5:
            return $response = response() -> json(['success' => false, 'message' => 'MSG_WRONG_DATA_TYPE', ' data' => ''], 400);
            break;
        case 6:
            return $response = response() -> json(['success' => false, 'message' => 'MSG_VIDEO_NOT_EXISTS', ' data' => ''], 404);
            break;
        case 7:
            return $response = response() -> json(['success' => false, 'message' => 'MSG_VIDEO_ALREADY_IN_PLAYLIST', ' data' => ''], 409);
            break;
        case 8:
            return $response = response() -> json(['success' => false, 'message' => 'MSG_COMMENT_NOT_EXISTS', ' data' => ''], 404);
            break;
        case 9:
            return $response = response() -> json(['success' => false, 'message' => 'MSG_DUPLICATED_PLAYLIST', ' data' => ''], 409);
            break;
        case 10:
            return $response = response() -> json(['success' => false, 'message' => 'MSG_PLAYLIST_NOT_EXISTS', ' data' => ''], 404);
            break;
        case 11:
            return $response = response() -> json(['success' => false, 'message' => 'MSG_WRONG_VIDEOS_LENGTH', ' data' => ''], 400);
            break;
        case 12:
            return $response = response() -> json(['success' => false, 'message' => 'MSG_VIDEO_NOT_IN_PLAYLIST', ' data' => ''], 404);
            break;
        case 13:
            return $response = response() -> json(['success' => false, 'message' => 'MSG_PROGRAM_NOT_EXISTS', ' data' => ''], 404);
            break;
        case 14:
            return $response = response() -> json(['success' => false, 'message' => 'MSG_VIDEO_NOT_IN_PROGRAM', ' data' => ''], 404);
            break;

    }
}
