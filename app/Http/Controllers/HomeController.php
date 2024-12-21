<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index(Request $request){
        $query = $request->input('search');
        $reports = Report::with('user')
            ->when($query, function ($queryBuilder) use ($query) {
                $queryBuilder->where('report_name', 'like', '%' . $query . '%')
                             ->orWhere('note', 'like', '%' . $query . '%')
                             ->orWhere('number_recipients', 'like', '%' . $query . '%')
                             ->orWhere('dist_date', 'like', '%' . $query . '%')
                             ->orWhere('status', 'like', '%' . $query . '%');
            })
            ->paginate(5);

        return Inertia::render('Admin', [
            'reports' => $reports,
            'search' => $query,
        ]);
    }

    public function submit_report(Request $request){

        $report = new Report;
        $filename = time() . '_' . $request->file('proof')->getClientOriginalName();
        $filePath = $request->file('proof')->storeAs('proofs', $filename, 'local');

        $report->report_name = $request->report_name;
        $report->number_recipients = $request->number_recipients;
        $report->dist_date = $request->dist_date;
        $report->proof = $filePath;
        $report->note = $request->note;
        $report->user_id = $request->user_id;

        $report->save();

        return redirect('/dashboard')->with(['success'=>'Report have been submitted']);

    }


public function update_status(Request $request, $id)
{
    $request->validate([
        'status' => 'required|in:approved,rejected',
    ]);

    $report = Report::findOrFail($id);
    $report->status = $request->status;
    $report->save();


    return redirect()->back();
}

public function view_reports(){

    $user = Auth::user();

    $reports = Report::with('user')
        ->where('user_id', $user->id)
        ->paginate(5);

    return Inertia::render('view_reports', [
        'reports' => $reports
    ]);
}
public function user(){
    return $this.(User::class);
}

public function delete_report($id)
{
    $report = Report::find($id);
    $report->delete();

    return redirect()->back();
}

public function edit_report($id)
{
    $report = Report::find($id);



    return Inertia::render('edit_report', [
        'report' => $report,
    ]);
}

public function update_report(Request $request, $id)
{

    $report = Report::find($id);

    $report->report_name = $request->report_name;
    $report->number_recipients = $request->number_recipients;
    $report->dist_date = $request->dist_date;
    $report->note = $request->note;
    $report->user_id = $request->user_id;


    if ($request->hasFile('proof')) {
        $filename = time() . '_' . $request->file('proof')->getClientOriginalName();
        $filePath = $request->file('proof')->storeAs('proofs', $filename, 'local');
        $report->proof = $filePath;
    }

    $report->save();

    return redirect()->route('view_reports')->with('success', 'Report updated successfully.');
}


}
