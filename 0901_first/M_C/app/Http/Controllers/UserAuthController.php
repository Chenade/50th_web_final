<?php

	namespace App\Http\Controllers;

	use App\Http\Request;

	class UserAuthController extend Controller {


		public function signUpPage(){

			$blinding = ['title' => '註冊',];

			return view('auth.signUp',$blinding);
		}

		public function signUpProcess(){

			$input = request() -> all();
			var_dump($input);
			exit;

		}

		public function signInPage(){

		}

		public function signInProcess(){

		}

		public function signOut(){

		}
	}



?>
