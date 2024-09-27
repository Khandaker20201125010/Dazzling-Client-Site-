import React from 'react';
import sb from '../../assets/images/starry.svg';

const Login = () => {
    return (
        <div className="bg-no-repeat bg-cover bg-center min-h-screen"
            style={{ backgroundImage: `url(${sb})` }}>
            <div className='md:p-28 py-24'>
                <div className="m-auto w-[22.5rem] shrink-0 shadow-2xl">
                    <form className="card-body">
                        <h3 className='text-3xl font-bold'>Login</h3>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <button className='buton'>
                            <span className='text-white font-bold'>Login </span>
                            <div class="top"></div>
                            <div class="left"></div>
                            <div class="bottom"></div>
                            <div class="right"></div>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
