import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function Admin() {
    const user = usePage().props.auth.user;
    const { reports, search } = usePage().props;
    const [query, setQuery] = useState(search || "");

    const handleSearch = (e) => {
        e.preventDefault();
        Inertia.get('/admin/dashboard', { search: query });
        };
        const handleUpdateStatus = (reportId, status) => {
            Inertia.post(`/admin/update-status/${reportId}`, { status } ,{
                onSuccess: () => {
                    alert('Status updated to ' + status);
                },
                onError: () => {
                    alert('Failed to update status');
                },
            });
        };

    return ( <div className="container-fluid">
        <div className="row g-0">
        <div className="col-md-2 bg-dark vh-100 d-flex flex-column text-white">

    <div className="py-4 px-3 text-yellow-300">
        <h2 className="mb-2">{user.name}</h2>
        <h3 className="mb-4">{user.email}</h3>
    </div>


    <div className="mt-auto my-5">
        <button className="btn btn-danger w-100">
            <Link href={route('logout')} method="post" className="text-white">
                Log Out
            </Link>
        </button>
    </div>
</div>

            <div className="col-md-10">

                <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
                    <div className="container justify-content-center">
                        <div className="col-md-8">
                            <form className="input-group" onSubmit={handleSearch}>
                                <input
                                    type="search"
                                    className="form-control"
                                    placeholder="Search reports"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <button className="btn btn-success" type="submit">
                                    Search
                                </button>
                            </form>
                        </div>
                    </div>
                </nav>


                <div className="card ">
                    <div className="card-body table-responsive">
                        <table className="table table-bordered text-center ">
                            <thead className="table-dark bg-dark ">
                                <tr>
                                    <th>Region</th>
                                    <th>Report Name</th>
                                    <th>Number of Recipients</th>
                                    <th>Distribution Date</th>
                                    <th>Proof</th>
                                    <th>Note</th>
                                    <th>Status</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
    {reports.data.length === 0 ? (
        <tr>
            <td colSpan="8" className="text-center">
                No Reports Found
            </td>
        </tr>
    ) : (
        reports.data.map((item, index) => (
            <tr key={index}>
                <td>{item.user.name}</td>
                <td className="text-sm  ">{item.report_name}</td>
                <td>{item.number_recipients}</td>
                <td>{item.dist_date}</td>
                <td>
                    <a
                        href={`/storage/app/private/${item.proof}`}
                        className="btn btn-primary btn-sm"
                        target="_blank"
                        download
                    >
                        Download
                    </a>
                </td>
                <td className="text-sm  ">{item.note}</td>
                <td>{item.status}</td>
                <td>
                    <div className="d-flex justify-content-center gap-2">
                        <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleUpdateStatus(item.id, 'approved')}
                        >
                            Accept
                        </button>
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleUpdateStatus(item.id, 'rejected')}
                        >
                            Reject
                        </button>
                    </div>
                </td>
            </tr>
        ))
    )}
</tbody>
                        </table>
                    </div>


                    <div className="card-footer bg-secondary">
                        <nav>
                            <ul className="pagination justify-content-center">
                                {reports.links.map((link, index) =>
                                    link.url ? (
                                        <li key={index} className={`page-item ${link.active ? "active" : ""}`}>
                                            <Link
                                                className="page-link"
                                                href={link.url + `&search=${query}`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        </li>
                                    ) : (
                                        <li key={index} className="page-item disabled">
                                            <span className="page-link" dangerouslySetInnerHTML={{ __html: link.label }} />
                                        </li>
                                    )
                                )}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}
