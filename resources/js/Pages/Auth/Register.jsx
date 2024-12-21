
import {  useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (

<div>
            <><div className="jumbotron jumbotron-fluid  bg-gray-400">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-8 col-md-6 col-lg-4 offset-sm-2 offset-md-3 offset-lg-4 font-semibold">

                        <h1 className="mb-3 text-center ">Register a new account</h1>

                        <form onSubmit={submit} className="mb-3 ">
                            <div className="form-group fw-bold">
                                <label for="name">Name:</label>
                                <input className="form-control"
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required />
                            </div>

                            <div className="form-group">
                                <label for="email">Email:</label>
                                <input className="form-control"
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required />
                            </div>

                            <div className="form-group">
                                <label for="password">Password:</label>
                                <input className="form-control"
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required />
                            </div>

                            <div className="mt-4">

                                <div className="form-group">
                                    <label for="password_confirmation">Confirm Password:</label>
                                    <input className="form-control"
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required />
                                </div>
                            </div>


                            <div className="text-center">
                                <button disabled={processing} className="btn btn-primary btn-block ">Register</button>
                            </div>
                        </form>

                        <div className="text-center">
                            <p>or</p>
                            <a href={route('login')} className="mb-3 btn btn-success">Already registered?</a>


                        </div>

                    </div>
                </div>
            </div>
        </div><div className="text-center font-semibold">
                <p className="text-primary">CV Lingkar Rasio Teknologi </p>
                <p className="text-primary">Bandung, Jawa Barat </p>
            </div></>



            </div>
    );
}
