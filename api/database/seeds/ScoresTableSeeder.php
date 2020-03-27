<?php

use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Score;

class ScoresTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $scores = [[
          'name' => 'Michel Memory',
          'fails' => 8,
          'time' => '00 Minutes et 35 Secondes',
      ],
      [
          'name' => 'Baron Coubertin',
          'fails' => 5,
          'time' => '00 Minutes et 55 Secondes',
      ],
      [
          'name' => 'Agathe Mousse',
          'fails' => 3,
          'time' => '00 Minutes et 25 Secondes',
      ],
      [
          'name' => 'Jean Valgent',
          'fails' => 12,
          'time' => '00 Minutes et 53 Secondes',
      ]];

      foreach($scores as $score) {
          Score::create($score);
      }
    }
}
