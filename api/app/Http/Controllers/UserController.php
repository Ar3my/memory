<?php

namespace App\Http\Controllers;
use Illuminate\Http\Response;

class UserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function showProfiles()
    {
        $results = app('db')->select("SELECT * FROM mytable");
        return response()->json($results);
    }

    //
}
