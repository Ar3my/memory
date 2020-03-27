<?php

namespace App\Http\Controllers;

use App\Score;
use Illuminate\Http\Request;


class ScoreController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function index()
    {

     $scores = Score::all();

     return response()->json($scores);

    }

     public function create(Request $request)
     {
       $score = new Score;

       $score->name = $request->name;
       $score->fails = $request->fails;
       $score->time = $request->time;

       $score->save();

       return response()->json($score);
     }

     public function show($id)
     {
        $score = Score::find($id);

        return response()->json($score);
     }

     public function update(Request $request, $id)
     {
        $score = Score::find($id);

        $score->name = $request->input('name');
        $score->fails = $request->input('fails');
        $score->time = $request->input('time');
        $score->save();
        return response()->json($score);
     }

     public function destroy($id)
     {
        $score = Score::find($id);
        $score->delete();

         return response()->json('Score removed successfully');
     }


    }
