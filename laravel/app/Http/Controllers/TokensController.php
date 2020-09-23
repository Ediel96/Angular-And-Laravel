<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use PhpParser\Node\Stmt\Return_;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class TokensController extends Controller
{
    public function login(Request $request){

        $credentials = $request->only('email' , 'password');

        $validator = Validator::make($credentials, [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Wrong validation',
                'erros' => $validator->errors()
            ], 422);
        }

        $token = JWTAuth::attempt($credentials);//M@iloLPLP

        if($token){
            return response()->json([
                'success' => true,
                'token' => $token,
                'user' => User::where('email', $credentials['email'])->get()->first(),
            ], 200);
        }else{
            return response()->json([
                'token'=>$token,
                'success' => false,
                'message' => 'Wrong validation',
                'erros' => $validator->errors()
            ], 401);
        }
        return null;
    }

    public function refreshToken(){

        $token = JWTAuth::getToken();

        try{
            $token = JWTAuth::refresh($token);
            return response()->json([
                'success' => true,
                'token' =>$token
            ], 200);
        }
        catch(TokenExpiredException $ex){
            return response()->json([
                'success' => false,
                'message' => 'Need to login again plaese (expired)'
            ], 422);
        }
        catch(TokenBlacklistedException $ex){
            return response()->json([
                'success' => false,
                'message' => 'Need to login again plaese (blacklisted)'
            ], 422);
        }

    }

    public function logout(){

        $token = JWTAuth::getToken();

        try{
            JWTAuth::invalidate($token);

            return response()->json([
                'success' => true,
                'message' => 'logout successful',
            ], 200);
        }catch(JWTException $ex){
            return response()->json([
                'success' => false,
                'message' => 'Failed logout successful'
            ], 422);
        }

        return null;
    }


    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:6',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = User::create(array_merge(
                    $validator->validated(),
                    ['password' => bcrypt($request->password)]
                ));

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);
    }

}
