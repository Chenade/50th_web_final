<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

//user
Route::get('user/auth/login', function(){
    $blinding = ['title' => '登入','content' => 'content'];
    return view('auth.signUp',$blinding);
});

Route::get('/manager',function(){
    $blinding = ['title' => 'manager','content' => 'content'];
    return view('auth.manager',$blinding);
});

Route::post('user/auth/sign-up', 'UserAuthController@signUpProcess');
Route::get('user/auth/sign-in', 'UserAuthController@signInPage');
Route::post('user/auth/sign-in', 'UserAuthController@signInProcess');
Route::post('user/auth/sign-out', 'UserAuthController@signOut');


//merchandise
Route::get('user/merchandise', 'MerchandiseController@merchandiseListPage');
Route::get('user/merchandise/create', 'MerchandiseController@merchandiseCreateProcess');
Route::get('user/merchandise/manage', 'MerchandiseController@merchandiseCreateProcess');

Route::get('user/merchandise/{merchandise_id}', 'MerchandiseController@merchandiseItemPage');
Route::get('user/merchandise/{merchandise_id}/edit', 'MerchandiseController@merchandiseItemEditPage');
Route::put('user/merchandise/{merchandise_id}', 'MerchandiseController@merchandiseItemProcess');
Route::post('user/merchandise/{merchandise_id}/buy', 'MerchandiseController@merchandiseItemBuyProcess');


//transaction
Route::get('/transaction', 'TransactionController@transactionListPage');
