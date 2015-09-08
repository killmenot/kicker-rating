<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class AuthorizationTest extends TestCase
{
    /**
     * User registration
     */
    public function testRegisterUser()
    {
        $this->visit('/auth/logout');

        $this->visit('/auth/register')
            ->type('Test', 'name')
            ->type('test@test.com', 'email')
            ->type('123456', 'password')
            ->type('123456', 'password_confirmation')
            ->press('Register')
            ->seePageIs('/dashboard');

        $this->seeInDatabase('users', ['email' => 'test@test.com']);
    }

    public function testLoginUser()
    {
        $this->visit('/auth/logout');

        $this->seed();

        $this->visit('/auth/login')
            ->type('test@test.com', 'email')
            ->type('123456', 'password')
            ->press('Login')
            ->seePageIs('/dashboard');
    }

    public function testDashboardIsClosedForUnauthorizedUsers()
    {
        $this->visit('/auth/logout');

        $this->visit('/dashboard')->seePageIs('/auth/login');
    }
}
