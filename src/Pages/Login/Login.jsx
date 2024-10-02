import React, { useRef, useEffect, useState, useContext } from 'react';
import sb from '../../assets/images/starry.svg';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Providers/AuthProviders';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import gif from '../../assets/images/ezgif-7-6b93fbef20-unscreen.gif'
import Swal from 'sweetalert2';
// Vector utility for smooth animation
function vec2(x = 0, y = 0) {
    return { x, y, set(nx, ny) { this.x = nx; this.y = ny; }, lerp(target, amount) { this.x += (target.x - this.x) * amount; this.y += (target.y - this.y) * amount; } };
}

const Login = () => {
    const cardRef = useRef(null);
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        const card = cardRef.current;
        if (!card) {
            console.error("Card element not found");
            return;
        }

        console.log("Card element:", card);

        const rotDeg = { current: vec2(), target: vec2() };
        const bgPos = { current: vec2(), target: vec2() };
        let lerpAmount = 0.06;

        const onMouseMove = ({ offsetX, offsetY }) => {
            lerpAmount = 0.1;
            const ox = -(offsetX + card.clientWidth * 0.5) / (Math.PI * 8);
            const oy = (offsetY - card.clientHeight * 0.5) / (Math.PI * 8);

            rotDeg.target.set(ox, oy);
            bgPos.target.set(ox * 0.3, oy * 0.3);
        };

        const onMouseLeave = () => {
            lerpAmount = 0.06;
            rotDeg.target.set(0, 0);
            bgPos.target.set(0, 0);
        };

        const updateStyle = () => {
            rotDeg.current.lerp(rotDeg.target, lerpAmount);
            bgPos.current.lerp(bgPos.target, lerpAmount);

            card.style.setProperty('--rotX', `${rotDeg.current.y.toFixed(2)}deg`);
            card.style.setProperty('--rotY', `${rotDeg.current.x.toFixed(2)}deg`);
            card.style.setProperty('--bgPosX', `${bgPos.current.x.toFixed(2)}%`);
            card.style.setProperty('--bgPosY', `${bgPos.current.y.toFixed(2)}%`);
            requestAnimationFrame(updateStyle);
        };

        card.addEventListener('mousemove', onMouseMove);
        card.addEventListener('mouseleave', onMouseLeave);

        updateStyle();

        return () => {
            card.removeEventListener('mousemove', onMouseMove);
            card.removeEventListener('mouseleave', onMouseLeave);
        };
    }, []);


    const handleLogin = event => {
        event.preventDefault();
        console.log("Form submitted!"); // Check if the function is called
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
            .then(result => {
                const user = result.user;
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Logging successful",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true });

            })
        console.log(email, password);
    };
    return (
        <div className="bg-no-repeat bg-cover bg-center min-h-screen" style={{ backgroundImage: `url(${sb})` }}>
            <div className='md:flex flex-1 '>

                <div className='md:py-12 md:ml-52 mt-10' data-aos="fade-right">
                    <div ref={cardRef} className="m-auto w-[22.5rem] shrink-0 shadow-2xl relative rounded-lg "
                        style={{
                            transform: "rotateX(var(--rotX)) rotateY(var(--rotY))",
                            backgroundPosition: "var(--bgPosX) var(--bgPosY)",
                            transition: 'transform 0.1s ease'
                        }}>
                        <div className="">
                            <form onSubmit={handleLogin} className="card-body bg-transparent relative z-10">
                                <h3 className='text-3xl font-bold'>Login</h3>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name='email' placeholder="email" className="input input-bordered bg-transparent border-2 border-blue-900" required />
                                </div>
                                <div className="form-control ">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" name='password' placeholder="password" className="input input-bordered bg-transparent border-2 border-blue-900" required />

                                </div>


                                <button type="submit" className='logbutton mt-5 '>
                                    <span className='text-black font-bold'>Login </span>
                                    <div class="top"></div>
                                    <div class="left"></div>
                                    <div class="bottom"></div>
                                    <div class="right"></div>
                                </button>
                            </form>
                            <p className="text-center mt-0 text-black py-5 ">
                                <small> Don't have an account?</small> <Link to='/signUp'><span className='text-blue-600  font-bold'>Sign Up</span></Link>
                            </p>



                            <span className="absolute top-0 left-0 w-[15px] h-[2px] bg-white"></span>
                            <span className="absolute top-0 left-0 w-[2px] h-[15px] bg-white"></span>
                            <span className="absolute top-0 right-0 w-[15px] h-[2px] bg-white"></span>
                            <span className="absolute top-0 right-0 w-[2px] h-[15px] bg-white"></span>
                            <span className="absolute bottom-0 right-0 w-[15px] h-[2px] bg-blue-600"></span>
                            <span className="absolute bottom-0 right-0 w-[2px] h-[15px] bg-blue-600"></span>
                            <span className="absolute bottom-0 left-0 w-[15px] h-[2px] bg-blue-600"></span>
                            <span className="absolute bottom-0 left-0 w-[2px] h-[15px] bg-blue-600"></span>

                        </div>


                    </div>

                </div>

                <div className='m-auto'>
                    <img className='md:mt-20 md:mr-40' src={gif} alt="" />

                </div>

            </div>

        </div>
    );
};

export default Login;
