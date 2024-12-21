import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { usePage,  useForm, router } from '@inertiajs/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';

export default function Dashboard(flash) {
    const user = usePage().props.auth.user;
    const { data, setData, processing } = useForm({
            report_name: '',
            number_recipients: '',
            dist_date: '',
            proof: '',
            note: '',
            user_id: user.id,
        });

        const submit = (e) => {
            e.preventDefault();
            router.post('/submit_report', data);
        };
    return (<div>
        <AuthenticatedLayout>
        <ToastContainer />
                <div className="jumbotron jumbotron-fluid bg-gray-400">
        <div className="container">
            <div className="row">
                <div className="col-12 col-sm-8 col-md-6 col-lg-4 offset-sm-2 offset-md-3 offset-lg-4">

                <h1 className="mb-3 text-center">Submit a report</h1>

                    <form onSubmit={submit} className="mb-3 ">


                    <div className="form-group">
                            <label for="report_name">Report Name:</label>
                            <input className="form-control"
                            id="report_name"
                            type="text"
                            name="report_name"
                            value={data.report_name}
                            isFocused={true}
                            onChange={(e) => setData('report_name', e.target.value)}
                            required
                            />
                    </div>

                    <div className="form-group">
                            <label for="number_recipients">number_recipients:</label>
                            <input className="form-control"
                            id="number_recipients"
                            type="number"
                            name="number_recipients"
                            value={data.number_recipients}
                            isFocused={true}
                            onChange={(e) => setData('number_recipients', e.target.value)}
                            required
                            />
                    </div>

                    <div className="form-group">
                            <label for="dist_date">dist_date:</label>
                            <input className="form-control"
                            id="dist_date"
                            type="date"
                            name="dist_date"
                            value={data.dist_date}
                            isFocused={true}
                            onChange={(e) => setData('dist_date', e.target.value)}
                            required
                            />
                    </div>

                    <div className="form-group">
                        <label htmlFor="proof">Proof:</label>
                        <input
                            className="form-control"
                            id="proof"
                            type="file"
                            name="proof"
                            accept=".jpg,.png,.pdf"
                            onChange={(e) => setData('proof', e.target.files[0])}
                            required
                        />
                    </div>

                    <div className="form-group">
                            <label for="note">note:</label>
                            <input className="form-control"
                            id="note"
                            type="textarea"
                            name="note"
                            value={data.note}
                            isFocused={true}
                            onChange={(e) => setData('note', e.target.value)}
                            />
                    </div>

                        <div className="text-center">
                            <button disabled={processing} className="btn btn-primary btn-block ">Submit Report</button>
                        </div>
                    </form>

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
