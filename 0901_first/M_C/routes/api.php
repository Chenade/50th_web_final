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

//API01
Route::post('/login',function (){

    $input = request() -> all();
    $row = DB::table('users') -> where('email',$input['email']) -> first();

    if(!$row || $row -> password != $input['pwd'])
        return $response = response()->json(['error' => 'MSG_INVALID_LOGIN'], 403);

    if($row -> enabled == 0)   return $response = response()->json(['error' => 'MSG_PERMISSION_DENY'], 403);

    $token = hash('sha256', $row -> email);

    return $response = response() -> json(['success' => 'true','message' => '','data' => $token], 200)
        -> withHeaders(['Content-Type' => 'application/json', 'X-User-Token' => $token]);
});

//API02
Route::post('/logout',function (){

    $token = request() -> header('X-User-Token');
    if($token == null){
        return $response = response() -> json(['error' => 'MSG_INVALID_TOKEN'],401);
    }

    return $response = response() -> json(['success' => 'true','message' => '','data' => ''], 200);

});

//API03
Route::get('/v1/video/hot', function(){
    date_default_timezone_set("Asia/Taipei");
    $today = date('Y-m-d h:i:s');
    $three_days_ago = (new DateTime('2020-09-17'))->modify('-3 day')->format('Y-m-d');
    $yesterday = (new DateTime('2020-09-17'))->modify('-1 day')->format('Y-m-d');

    $posts = DB::table('programs')
        -> where('authorized_start_datetime', '<=', $today)
        -> where('authorized_end_datetime', '>=', $today)
        -> orderBy('updated_at','desc')
        ->take(4)
        -> get();

    $category = DB::table('categories')
        ->get();

    $hot_videos=[];
    foreach ($category as $x => $x_value){
        $video = DB::table('videos')
            -> select('videos.id','videos.title','videos.description','videos.duration','videos.created_at','users.nickname')
            -> where('category_id', $x_value -> id)
            -> join('users', 'videos.user_id', '=', 'users.id')
            -> take(4)
            -> get();

        array_push($hot_videos,['category' => $x_value -> title, 'videos' => $video]);
    }


    return $response = response() -> json(['success' => true,'message' => '','today' => $today,
        'data' => [
            ['this_week_programs' => $posts],
            ['hot_programs'=>$posts],
            ['hot_programs'=>$hot_videos]
        ]], 200);

});

//API04
Route::get('/v1/video/public/',function(){

    //DB::statement('ALTER TABLE `videos` ADD FULLTEXT(`description`,`title`)');

    $input = request() -> all();
    $key = @$input['q'];

    $video = DB::table('videos')
        -> select('id','title','description','duration','created_at','user_id')
        -> whereRaw('MATCH (title, description) AGAINST (?)' , array($key))
        -> get();

    $result = [];
    foreach($video as $x => $x_value){

        $category = DB::table('categories')
            -> where ('id', $x_value -> user_id)
            -> first();
        $x_value -> category = $category -> title;

        $user = DB::table('users')
            -> where ('id', $x_value -> user_id)
            -> first();
        $x_value -> user = $user -> nickname;

        array_push($result,[
            'id' => $x_value -> id,
            'title' => $x_value -> title,
            'description' => $x_value -> description,
            'duration' => $x_value -> duration,
            'created_at' => $x_value -> created_at,
            'category' => $x_value -> category,
            'user' => $x_value -> user
        ]);

    }
    $page = @$input['page'];

    return $response = response() -> json(['success' => true, 'message' => '', 'data' => $result]);
});

//API05
Route::get('/v1/video/{video_id}',function($video_id){

    $token = request() -> header('X-User-Token');
    if($token == null)  return $response = response() -> json(['error' => "MSG_PERMISSION_DENY"],403);

    $user_id = DB::table('users')
        -> where ('token', $token)
        -> first()
        -> id;

    $video = DB::table('videos')
        -> where('id',$video_id)
        -> get();

    if(count($video) < 1) return $response = response() -> json(['error'=>"MSG_VIDEO_NOT_EXISTS"],404);

    $result = [];
    foreach($video as $x => $x_value){

        $category = DB::table('categories')
            -> where ('id', $x_value -> user_id)
            -> first();
        $x_value -> category = $category -> title;

        $user = DB::table('users')
            -> where ('id', $x_value -> user_id)
            -> first();
        $x_value -> user = $user -> nickname;

        $likes = DB::table('likes')
            -> where ('video_id', $x_value -> id)
            -> get();
        $x_value -> likes = $likes -> count($likes);

        $liked = false;
        foreach($likes as $y => $y_value){
            if($y_value -> user_id == $user_id){
                $liked = true;
            }
        }
        $x_value -> liked = $liked;


        array_push($result,[
            'id' => $x_value -> id,
            'title' => $x_value -> title,
            'description' => $x_value -> description,
            'visibility' => $x_value -> visibility,
            'duration' => $x_value -> duration,
            'created_at' => $x_value -> created_at,
            'category' => $x_value -> category,
            'user' => $x_value -> user,
            'likes' => $x_value -> likes,
            'liked' => $x_value -> liked,
        ]);
    }

    $count = count($video);
    if($count < 1)  return $response = response() -> json(['error' => "MAG_VIDEO_NOT_EXISTS"],404);

    return $response = response() -> json(['success' => true, 'message' => '', 'data' => $result]);
});

//API06
Route::get('v1/video/{video_id}/playurl',function($video_id){

    $input = request() -> all();
    $video = DB::table('video_files') -> where('video_id',$video_id) -> get();
    if(count($video) < 1) return $response = response() -> json(['error'=>"MSG_VIDEO_NOT_EXISTS"],404);

    $quality = DB::table('video_files') -> where('video_id',$video_id) -> where('width',$input['q']) -> get();
    if(count($quality) < 1)
        return $response = response() -> json(['success' => false, 'message' => 'QUALITY_NOT_EXISTS', 'data' => '']);

    return $response = response() -> json(['data' => $quality]);
});

//API07
Route::put('v1/video/{video_id}/like', function($video_id){

    $token = request() -> header('X-User-Token');
    if($token == null)  return $response = response() -> json(['error' => "MSG_INVALID_TOKEN"],401);
    $user_id = DB::table('users')
        -> where ('token',$token)
        -> first()
        -> id;

    $video = DB::table('video_files') -> where('video_id',$video_id) -> get();
    if(count($video) < 1) return $response = response() -> json(['error'=>"MSG_VIDEO_NOT_EXISTS"],404);


    $data = request() -> all();
    $exists = DB::table('likes')
        -> where ('user_id',$user_id)
        -> where ('video_id',$video_id)
        -> get();

    if(count($exists) > 0){
        $update = DB::table('likes')
            -> where ('user_id',$user_id)
            -> where ('video_id',$video_id)
            -> delete();
    }else{
        $update = DB::table('likes') -> insert([
            'user_id' => $user_id,
            'video_id' => $video_id
        ]);
    }


    return $response = response() -> json(['success' => true, 'message' => '', 'data' => '']);
});

//API08
Route::post('v1/video/{video_id}/danmu', function($video_id){

    $token = request() -> header('X-User-Token');
    if($token == null)  return $response = response() -> json(['error' => "MSG_INVALID_TOKEN"],401);
    $user = DB::table('users') -> where('token', $token) -> first('id');

    $input = request() -> all();

    $update = DB::table('danmu') -> insert([
        'video_id' => $video_id,
        'user_id' => $user -> id,
        'text' => $input['text'],
        'position' => $input['position']
    ]);

    return $response = response() -> json(['success' => true, 'message' => '', 'data' => '']);
});

//API09
Route::get('v1/video/{video_id}/danmu',function($video_id){

    $token = request() -> header('X-User-Token');
    if($token == null) return $response = response() -> json(['error' => 'MSG_INVALID_TOKEN'],401);

    $video = DB::table('video_files') -> where('video_id',$video_id) -> get();
    if(count($video) < 1)
        return $response = response() -> json(['error' => "VIDEO_NOT_EXISTS"],404);

    $danmu = DB::table('danmu') -> select('text','position') -> where('video_id',$video_id) -> get();
    return $response = response() -> json(['success' => true, 'message' => '', 'data'=>$danmu]);
});

//API10
Route::post('v1/video/{video_id}/comment',function($video_id){

    $token = request() -> header('X-User-Token');
    if($token == null) return $response = response() -> json(['error' => 'MSG_INVALID_TOKEN'],401);
    $user = DB::table('users') -> where('token', $token) -> first('id');

    $video = DB::table('video_files') -> where('video_id',$video_id) -> get();
    if(count($video) < 1) return $response = response() -> json(['error'=>"MSG_VIDEO_NOT_EXISTS"],404);

    $input = request() -> all();
    if(!$input['text']) return $response = response() -> json(['error' => 'MSG_MISSING_FIELD'],400);
    //if(is_numeric($input['text'])) return $response = response() -> json(['error' => 'MSG_WRONG_DATA_TYPE'],400);

    $update = DB::table('comments') -> insert([
        'video_id' => $video_id,
        'user_id' => $user -> id,
        'text' => $input['text']
    ]);
    return $response = response() -> json(['success' => true, 'message' => '', 'data'=>'']);
});

//API11
Route::get('/v1/video/{video_id}/comment',function($video_id){

    $token = request() -> header('X-User-Token');
    if($token == null)  return $response = response() -> json(['error' => "MSG_PERMISSION_DENY"],403);

    $data = request() -> all();
    $comment = DB::table('comments')
        -> where('video_id',$video_id)
        -> get();
    if(count($comment) < 1) return $response = response() -> json(['error'=>"MSG_VIDEO_NOT_EXISTS"],404);


    foreach ($comment as $x => $x_value){

        $user = DB::table('users')
            -> where('id', $x_value -> user_id)
            -> first()
            -> nickname;
        $x_value -> user = $user;

        if($x_value -> reply_comment_id == NULL){
            $x_value -> replies = [];
        }else{
            foreach ($comment as $y => $y_value){

                if($y_value -> id == $x_value -> reply_comment_id){
                    array_push($y_value -> replies,[
                        'user' => $user,
                        'text' => $x_value -> text,
                        'created_at' => $x_value -> created_at
                    ]);
                }
            }
        }
    }

    $result = [];
    foreach ($comment as $x => $x_value){
        if( $x_value -> reply_comment_id == null){
            array_push($result,[
                'user' => $user,
                'text' => $x_value -> text,
                'created_at' => $x_value -> created_at,
                'replies' => $x_value -> replies,
            ]);
        }
    }

    $count = count($comment);
    //$page = $data['page'];




    return $response = response() -> json(['success' => true, 'message' => '', 'data' => ['total_counts' => $count, 'results' => $result]]);

});

//API12
Route::post('/v1/comment/{comment_id}/reply',function($comment_id){

    $token = request() -> header('X-User-Token');
    if($token == null) return $response = response() -> json(['error' => 'MSG_INVALID_TOKEN'],401);

    $user = DB::table('users') -> where('token', $token) -> first('id');
    $video = DB::table('comments') -> where('id',$comment_id) -> first();

    $input = request() -> all();
    if(!$input['text']) return $response = response() -> json(['error' => 'MSG_MISSING_FIELD'],400);

    $comment_check = DB::table('comments')
        -> where ('id',$comment_id)
        -> get();
    if(count($comment_check) < 1) return $response = response() -> json(['error' => 'MSG_COMMENT_NOT_EXISTS'],404);

    $update = DB::table('comments') -> insert([
        'user_id' => $user -> id,
        'video_id' => $video -> video_id,
        'reply_comment_id' => $comment_id,
        'text' => $input['text']
    ]);

    return $response = response() -> json(['success' => true, 'message' => '', 'data' => '']);
});

//API13
Route::delete('/v1/comment/{comment_id}', function ($comment_id){

    $token = request() -> header('X-User-Token');
    if($token == null)  return $response = response() -> json(['error' => "MSG_PERMISSION_DENY"],403);

    $comment_check = DB::table('comments')
        -> where ('id',$comment_id)
        -> get();
    if(count($comment_check) < 1) return $response = response() -> json(['error' => 'MSG_COMMENT_NOT_EXISTS'],404);

    $update = DB::table('comments') -> where('id',$comment_id) -> delete();
    return $response = response() -> json(['success' => true, 'message' => '', 'data' => '']);
});

//API14
Route::get('v1/playlist',function (){

    $token = request() -> header('X-User-Token');
    if($token == null) return $response = response() -> json(['error' => 'MSG_INVALID_TOKEN'],401);

    $user_id = DB::table('users') -> where('token', $token) -> first() -> id;

    $playlist = DB::table('playlists')
        -> where('user_id',$user_id)
        -> get();

    return $response = response() -> json(['success' => true, 'message' => '', 'data' => $playlist]);
});

//API15
Route::post('v1/playlist',function (){

    $token = request() -> header('X-User-Token');
    if($token == null) return $response = response() -> json(['error' => 'MSG_INVALID_TOKEN'],401);

    $user_id = DB::table('users') -> where('token', $token) -> first() -> id;

    $input = request() -> all();
    if(!$input['title']) return $response = response() -> json(['error' => 'MSG_MISSING_FIELD'],400);

    $playlist_check = DB::table('comments')
        -> where ('title',$input['title'])
        -> get();
    if(count($playlist_check) > 1) return $response = response() -> json(['error' => 'MSG_DUPLICATED_PLAYLIST'],409);

    $insert = DB::table('playlists') -> insert([
        'user_id' => $user_id,
        'title' => $input['title']
    ]);



    return $response = response() -> json(['success' => true, 'message' => '', 'data' => 1]);
});

//API16
Route::get('v1/playlist/{playlist_id}',function ($playlist_id){

    $token = request() -> header('X-User-Token');
    if($token == null) return $response = response() -> json(['error' => 'MSG_INVALID_TOKEN'],401);
    $user_id = DB::table('users') -> where('token', $token) -> first() -> id;


    $playlist = DB::table('playlists')
        -> where('id',$playlist_id)
        -> first();
    if(count($playlist_id) < 1) return $response = response() -> json(['error' => 'MSG_PLAYLIST_NOT_EXISTS'],404);

    $playlist_video = DB::table('playlist_videos')
        -> where('playlist_id',$playlist_id)
        -> orderBy('order','asc')
        -> get();

    $user = DB::table('users') -> where('id',$playlist -> user_id) ->first() ->nickname;

    $result =[];
    array_push($result , [
        'id' => $playlist_id,
        'title' => $playlist -> title,
        'user' => $user,
    ]);

    $Q =[];
    foreach ($playlist_video as $x => $x_value){

        $video = DB::table('videos')
            -> where('id',$x_value -> video_id)
            -> first();

        $category = DB::table('categories')
            -> where ('id', $video -> category_id)
            -> first() -> title;

        array_push($Q,[
            'id' => $video -> id,
            'title' => $video -> title,
            'description' => $video -> description,
            'duration' => $video -> duration,
            'created_at' => $video -> created_at,
            'category' => $category
        ]);
    }

    array_push($result,['videos' => $Q]);


    return $response = response() -> json(['success' => true, 'message' => '', 'data' => $result]);
});


//API17
Route::post('v1/playlist/{playlist_id}',function ($playlist_id){

    $token = request() -> header('X-User-Token');
    if($token == null) return $response = response() -> json(['error' => 'MSG_INVALID_TOKEN'],401);

    $user_id = DB::table('users') -> where('token', $token) -> first() -> id;

    $input = request() -> all();
    if(!$input['video_id']) return $response = response() -> json(['error' => 'MSG_MISSING_FIELD'],400);
    if(!$playlist_id) return $response = response() -> json(['error' => 'MSG_MISSING_FIELD'],400);

    $playlist_video = DB::table('playlist_videos')
        -> where('playlist_id',$playlist_id)
        -> orderBy('order','asc')
        -> get();
    if(count($playlist_video) < 1) return $response = response() -> json(['error' => 'MSG_PLAYLIST_NOT_EXISTS'],404);

    $playlist_check = DB::table('playlist_videos')
        -> where ('playlist_id',$playlist_id)
        -> where ('video_id',$input['video_id'])
        -> get();
    if(count($playlist_check)>1) return $response = response() -> json(['error' => 'MSG_VIDEO_ALREADY_IN_PLAYLIST'],409);

    $insert = DB::table('playlist_videos') -> insert([
        'playlist_id' => $playlist_id,
        'video_id' => $input['video_id'],
        'order' => count($playlist_video) +1
    ]);

    return $response = response() -> json(['success' => true, 'message' => '', 'data' => '']);
});

//API18
Route::post('v1/playlist/{playlist_id}',function ($playlist_id){

    $token = request() -> header('X-User-Token');
    if($token == null) return $response = response() -> json(['error' => 'MSG_INVALID_TOKEN'],401);

    $user_id = DB::table('users') -> where('token', $token) -> first() -> id;

    $input = request() -> all();
    if(!$input['video_ids']) return $response = response() -> json(['error' => 'MSG_MISSING_FIELD'],400);
    if(!$playlist_id) return $response = response() -> json(['error' => 'MSG_MISSING_FIELD'],400);

    $playlist_video = DB::table('playlist_videos')
        -> where('playlist_id',$playlist_id)
        -> get();
    if(count($playlist_video) < 1) return $response = response() -> json(['error' => 'MSG_PLAYLIST_NOT_EXISTS'],404);

    $order = explode(',',trim($input['video_ids'],'[]'));
    $count = 1;

    $video_length = DB::table('playlist_videos')
        -> where('playlist_id', $playlist_id)
        -> get();
    if($video_length != count($order)) return $response = response() -> json(['error' => 'MSG_WRONG_VIDEOS_LENGTH'],400);

    foreach ($order as $x => $x_value) {
        $video = DB::table('video_files') -> where('video_id',$x_value) -> get();
        if(count($video) < 1) return $response = response() -> json(['error'=>"MSG_VIDEO_NOT_EXISTS"],404);

        $update = DB::table('playlist_videos')
            -> where('playlist_id', $playlist_id)
            -> where('video_id',$x_value)
            -> update(['order' => $count]);

        $count += 1;
    }

    return $response = response() -> json(['success' => true, 'message' => '', 'data' => '']);
});

//API19
Route::delete('v1/playlist/{playlist_id}/video/{video_id}',function ($playlist_id,$video_id){

    $token = request() -> header('X-User-Token');
    if($token == null) return $response = response() -> json(['error' => 'MSG_INVALID_TOKEN'],401);

    $user_id = DB::table('users') -> where('token', $token) -> first() -> id;

    $video = DB::table('video_files') -> where('video_id',$video_id) -> get();
    if(count($video) < 1) return $response = response() -> json(['error'=>"MSG_VIDEO_NOT_EXISTS"],404);

    $playlist_video = DB::table('playlist_videos')
        -> where('playlist_id',$playlist_id)
        -> get();
    if(count($playlist_video) < 1) return $response = response() -> json(['error' => 'MSG_PLAYLIST_NOT_EXISTS'],404);

    $playlist_check = DB::table('playlist_videos')
        -> where('playlist_id',$playlist_id)
        -> where('video',$video_id)
        ->get();
    if(count($playlist_video) < 1) return $response = response() -> json(['error' => 'MSG_VIDEO_NOT_IN_PLAYLIST'],404);

    $delete = DB::table('playlist_videos')
        -> where('playlist_id',$playlist_id)
        -> where('video',$video_id)
        ->delete();

    return $response = response() -> json(['success' => true, 'message' => '', 'data' => '']);
});

//API20
Route::delete('v1/playlist/{playlist_id}',function ($playlist_id){

    $token = request() -> header('X-User-Token');
    if($token == null) return $response = response() -> json(['error' => 'MSG_INVALID_TOKEN'],401);

    $user_id = DB::table('users') -> where('token', $token) -> first() -> id;

    $playlist_video = DB::table('playlist_videos')
        -> where('playlist_id',$playlist_id)
        -> get();
    if(count($playlist_video) < 1) return $response = response() -> json(['error' => 'MSG_PLAYLIST_NOT_EXISTS'],404);

    $delete = DB::table('playlist_videos')
        -> where('playlist_id',$playlist_id)
        ->delete();

    return $response = response() -> json(['success' => true, 'message' => '', 'data' => '']);
});

//API21 FAILED
Route::get('/v1/program/',function(){

    //DB::statement('ALTER TABLE `programs` ADD FULLTEXT(`description`,`title`)');

    $input = request() -> all();
    $key = @$input['q'];

    date_default_timezone_set("Asia/Taipei");
    $today = date('Y-m-d h:i:s');

    $program = DB::table('programs')
        -> whereRaw('MATCH (title, description) AGAINST (?)' , array($key))
        -> get();

    $result = [];




    $page = @$input['page'];

    return $response = response() -> json(['success' => true, 'message' => '', 'data' => $key]);
});

//API22
Route::get('/v1/program/{program_id}',function($program_id){

    $program = DB::table('programs')
        -> where('id',$program_id)
        -> get();
    if(count($program) < 1) return $response = response() -> json(['error' => 'MSG_PROGRAM_NOT_EXISTS'],404);

    $result = [];
    foreach ($program as $x => $x_value){
        $episode_detail =[];
        $episode = DB::table('episodes')
            -> where('program_id',$program_id)
            -> get();

        foreach ($episode as $y => $y_value){

            $video_detail = [];
            $video = DB::table('videos')
                -> where('id',$y_value -> video_id)
                -> first();

            $category = DB::table('categories')
                -> where ('id', $video -> category_id)
                -> first() -> title;

            array_push($episode_detail,[
                'video' => [
                    'id' => $video -> id,
                    'title' => $video -> title,
                    'description' => $video -> description,
                    'duration' => $video -> duration,
                    'created_at' => $video -> created_at,
                    'category' => $category],
                'episode' => [
                    'title' => $y_value -> title,
                    'order' => $y_value -> order,
                ]]);
        }
        array_push($result,[
            'id' => $x_value -> id,
            'title' => $x_value -> title,
            'description' => $x_value -> description,
            'authorized_start_datetime' => $x_value -> authorized_start_datetime,
            'authorized_end_datetime' => $x_value -> authorized_end_datetime,
            'updated_at' => $x_value -> updated_at,
            'episodes' => $episode_detail
        ]);
    }


    return $response = response() -> json(['success' => true, 'message' => '', 'data' => $result]);
});

//API 23 lack sources

//API 24
Route::get('/v1/profile',function (){

    $token = request() -> header('X-User-Token');
    if($token == null) return $response = response() -> json(['error' => 'MSG_INVALID_TOKEN'],401);
    $user_id = DB::table('users') -> where('token', $token) -> first() -> id;

    $user = DB::table('users')
        ->select('id','email','nickname','enabled','verified','user_type','created_at','updated_at')
        -> where('id',$user_id)
        -> get();

    return $response = response() -> json(['success' => true, 'message' => '', 'data' => $user]);
});

//API 25
Route::get('/v1/user',function (){

    $token = request() -> header('X-User-Token');
    if($token == null) return $response = response() -> json(['error' => 'MSG_INVALID_TOKEN'],401);

    $user_id = DB::table('users') -> where('token', $token) -> first() -> id;

    $user = DB::table('users')
        ->select('id','email','nickname','enabled','verified','user_type','created_at','updated_at')
        -> get();

    return $response = response() -> json(['success' => true, 'message' => '', 'data' => $user]);
});

//API 26
Route::post('/v1/program',function (){

    $token = request() -> header('X-User-Token');
    if($token == null) return $response = response() -> json(['error' => 'MSG_INVALID_TOKEN'],401);
    $user_id = DB::table('users') -> where('token', $token) -> first() -> id;

    $input = request() -> all();
    if(!$input['title']) return $response = response() -> json(['error' => 'MSG_MISSING_FIELD'],400);
    if(!$input['description']) return $response = response() -> json(['error' => 'MSG_MISSING_FIELD'],400);
    if(!$input['authorized_start_datetime']) return $response = response() -> json(['error' => 'MSG_MISSING_FIELD'],400);
    if(!$input['authorized_end_datetime']) return $response = response() -> json(['error' => 'MSG_MISSING_FIELD'],400);

    $insert = DB::table('programs')->insert($input);

    return $response = response() -> json(['success' => true, 'message' => '', 'data' => 1]);
});

//API 27
Route::put('/v1/program/{program_id}',function ($program_id){

    $token = request() -> header('X-User-Token');
    if($token == null) return $response = response() -> json(['error' => 'MSG_INVALID_TOKEN'],401);
    $user_id = DB::table('users') -> where('token', $token) -> first() -> id;

    $input = request() -> all();

    $program = DB::table('programs')
        -> where('id',$program_id)
        -> get();
    if(count($program) < 1) return $response = response() -> json(['error' => 'MSG_PROGRAM_NOT_EXISTS'],404);

    $insert = DB::table('programs')
        ->where('id',$program_id)
        ->update($input);

    return $response = response() -> json(['success' => true, 'message' => '', 'data' => '']);
});

//API28
Route::put('/v1/program/{program_id}/video',function ($program_id){

    $token = request() -> header('X-User-Token');
    if($token == null) return $response = response() -> json(['error' => 'MSG_INVALID_TOKEN'],401);

    $user_id = DB::table('users') -> where('token', $token) -> first() -> id;

    $input = request() -> all();
    if(!$input['video_id']) return $response = response() -> json(['error' => 'MSG_MISSING_FIELD'],400);
    $video = DB::table('video_files') -> where('video_id',$input['video_id']) -> get();
    if(count($video) < 1) return $response = response() -> json(['error'=>"MSG_VIDEO_NOT_EXISTS"],404);

    $count = DB::table('episodes') -> where('program_id',$program_id) ->get() -> count();

    $program = DB::table('programs')
        -> where('id',$program_id)
        -> get();
    if(count($program) < 1) return $response = response() -> json(['error' => 'MSG_PROGRAM_NOT_EXISTS'],404);

    $playlist_check = DB::table('episodes')
        -> where ('program_id',$program_id)
        -> where ('video_id',$input['video_id'])
        -> get();
    if(count($playlist_check)>1) return $response = response() -> json(['error' => 'MSG_VIDEO_ALREADY_IN_PLAYLIST'],409);

    $insert = DB::table('episodes') -> insert([
        'program_id' => $program_id,
        'video_id' => $input['video_id'],
        'title' => '',
        'order' => $count +1
    ]);


    return $response = response() -> json(['success' => true, 'message' => '', 'data' => '']);
});

//API29
Route::delete('/v1/program/{program_id}/video/{video_id}',function ($program_id,$video_id){

    $token = request() -> header('X-User-Token');
    if($token == null) return $response = response() -> json(['error' => 'MSG_INVALID_TOKEN'],401);
    $video = DB::table('video_files') -> where('video_id',$video_id) -> get();
    if(count($video) < 1) return $response = response() -> json(['error'=>"MSG_VIDEO_NOT_EXISTS"],404);

    $user_id = DB::table('users') -> where('token', $token) -> first() -> id;

    $program = DB::table('programs')
        -> where('id',$program_id)
        -> get();
    if(count($program) < 1) return $response = response() -> json(['error' => 'MSG_PROGRAM_NOT_EXISTS'],404);

    $delete_check = DB::table('episodes')
        ->where('program_id',$program_id)
        ->where('video_id',$video_id)
        -> get();
    if(count($delete_check) < 1) return $response = response() -> json(['error' => 'MSG_VIDEO_NOT_IN_PROGRAM'],404);

    $delete = DB::table('episodes')
        ->where('program_id',$program_id)
        ->where('video_id',$video_id)
        -> delete();

    return $response = response() -> json(['success' => true, 'message' => '', 'data' => '']);
});

//API30
Route::delete('/v1/program/{program_id}',function ($program_id){

    $token = request() -> header('X-User-Token');
    if($token == null) return $response = response() -> json(['error' => 'MSG_INVALID_TOKEN'],401);

    $program = DB::table('programs')
        -> where('id',$program_id)
        -> get();
    if(count($program) < 1) return $response = response() -> json(['error' => 'MSG_PROGRAM_NOT_EXISTS'],404);

    $user_id = DB::table('users') -> where('token', $token) -> first() -> id;

    $input = request() -> all();

    $delete2 = DB::table('episodes')
        -> where('program_id',$program_id)
        -> delete();



    $delete = DB::table('programs')
        -> where('id',$program_id)
        -> delete();

    return $response = response() -> json(['success' => true, 'message' => '', 'data' => '']);
});


