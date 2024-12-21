import {  Link, useForm } from '@inertiajs/react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (

<div>
        <div className="jumbotron jumbotron-fluid bg-gray-400">
        <div className="container">
            <div className="row">
                <div className="col-12 col-sm-8 col-md-6 col-lg-4 offset-sm-2 offset-md-3 offset-lg-4">

                <h1 className="mb-3 text-center">Login to your account</h1>
                    <form onSubmit={submit} className="mb-3 ">
                    <div className="form-group">
                            <label for="email">Email:</label>
                            <input className="form-control"
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            />
                        </div>
                        <div className="form-group">
                            <label for="password">Password:</label>
                            <input className="form-control"
                            id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required/>
                        </div>
                        <div className="text-center">

                            <button disabled={processing} className="btn btn-primary btn-block ">Login</button>
                        </div>
                    </form>
                    <div className="text-center">
                        <p>or</p>
                        <a href={route('register')}  className="mb-3 btn btn-success">Create Account</a>
                        <p className="small">{canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="small"
                                >
                                    Forgot your password?
                                </Link>
                            )}</p>

                    </div>
                  </div>
                </div>
            </div>

        </div>
            <div className="text-center">
                <p className="text-primary">CV Lingkar Rasio Teknologi </p>
                <p className="text-primary">Bandung, Jawa Barat </p>
                </div>
                </div>

    );
}
