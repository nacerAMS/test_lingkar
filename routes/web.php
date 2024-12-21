<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;

Route::get('/', function () {
    return redirect('dashboard');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

Route::get('/admin/dashboard', [HomeController::class, 'index'])->middleware(['auth', 'admin']);


Route::post('/submit_report',[HomeController::class,'submit_report'])->middleware(['auth', 'verified']);

Route::post('/admin/update-status/{id}', [HomeController::class, 'update_status'])->middleware(['auth', 'admin']);


Route::get('/view_reports', [HomeController::class, 'view_reports'])->middleware(['auth', 'verified'])->name('view_reports');


Route::delete('/delete_report/{id}', [HomeController::class, 'delete_report'])->middleware(['auth', 'verified']);

Route::get('/edit_report/{id}', [HomeController::class, 'edit_report'])->middleware(['auth', 'verified']) ->name('edit_report');

Route::post('/update_report/{id}', [HomeController::class, 'update_report']) ->middleware(['auth', 'verified']);
