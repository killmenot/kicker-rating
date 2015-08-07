<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class AuthorizationTests extends TestCase
{
    /**
     * User registration
     */
    public function testRegisterUser()
    {
        $this->visit('/auth/register')
            ->type('Test', 'name')
            ->type('test@test.com', 'email')
            ->type('123456', 'password')
            ->type('123456', 'confirm_password')
            ->press('Register')
            ->seePageIs('/dashboard')
            ->press('Dropdown')
            ->press('Logout');
    }

    public function testLoginUser()
    {
        $this->visit('/auth/login')
            ->type('test@test.com', 'email')
            ->type('123456', 'password')
            ->press('Login')
            ->seePageIs('/dashboard');
    }
}
