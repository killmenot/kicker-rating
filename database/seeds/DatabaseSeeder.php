<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        DB::table('users')->insert([
            'name' => 'Test',
            'email' => 'test@test.com',
            'password' => bcrypt('123456'),
        ]);

        Model::reguard();
    }
}
