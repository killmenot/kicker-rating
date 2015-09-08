<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\View;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function getAdmin()
    {
        return View::make('dashboard.admin.index');
    }
}