import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, usePage, router } from '@inertiajs/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';

export default function ViewReports() {
    const { reports } = usePage().props;
    const handleDeleteReport = (id) => {
        axios.delete(`/delete_report/${id}`);
    };

    return (
        <div>
            <AuthenticatedLayout>
                <ToastContainer />
                <div className="jumbotron jumbotron-fluid bg-gray-400">
                    <div className="container">
                        <div className="row">

                                <h1 className="mb-3 text-center">View Reports</h1>
                                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
                                <div className="container justify-content-center">
                                </div>
                            </nav>

                            <div className="card">
                                <div className="card-body table-responsive">
                                    <table className="table table-bordered text-center">
                                        <thead className="table-dark bg-dark">
                                            <tr>
                                                <th>Region</th>
                                                <th>Report Name</th>
                                                <th>Number of Recipients</th>
                                                <th>Distribution Date</th>
                                                <th>Note</th>
                                                <th>Status</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
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
                                                        <td className="text-sm">{item.report_name}</td>
                                                        <td>{item.number_recipients}</td>
                                                        <td>{item.dist_date}</td>
                                                        <td className="text-sm">{item.note}</td>
                                                        <td>{item.status}</td>
                                                        <td>
                                                            <div className="d-flex justify-content-center gap-2">
                                                                {item.status === 'pending' ? (
                                                                    <button
                                                                        className="btn btn-secondary btn-sm"
                                                                        onClick={() => router.get(`/edit_report/${item.id}`)}
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                ) : (
                                                                    <span className="text-muted">No Edit</span>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="d-flex justify-content-center gap-2">
                                                                {item.status === 'pending' ? (
                                                                    <button
                                                                        className="btn btn-danger btn-sm"
                                                                        onClick={() => handleDeleteReport(item.id)}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                ) : (
                                                                    <span className="text-muted">No Delete</span>
                                                                )}
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
                                                    <li key={index} className={`page-item ${link.active ? 'active' : ''}`}>
                                                        <Link
                                                            className="page-link"
                                                            href={link.url}
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

                        </div>
                    </div>
                </div>


                <div className="text-center">
                <p className="text-primary">CV Lingkar Rasio Teknologi </p>
                <p className="text-primary">Bandung, Jawa Barat </p>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}
