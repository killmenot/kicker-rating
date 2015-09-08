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

        $this->call('UserTableSeeder');
        $this->command->info('User table seeded!');

        DB::table('users')->insert([
            'name' => 'Test',
            'email' => 'test@test.com',
            'password' => bcrypt('123456'),
        ]);

        Model::reguard();
    }
}

class UserTableSeeder extends Seeder 
{

    public function run()
    {
        DB::table('users')->delete();
        DB::table('users')->insert([
            'name' => 'Dima',
            'email' => 'dmitry@intspirit.com',
            'password' => bcrypt('123456')
        ]);
    }
}
