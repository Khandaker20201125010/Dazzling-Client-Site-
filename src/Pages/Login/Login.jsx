import React, { useRef, useEffect, useState } from 'react';
import sb from '../../assets/images/starry.svg';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';

// Vector utility for smooth animation
function vec2(x = 0, y = 0) {
    return { x, y, set(nx, ny) { this.x = nx; this.y = ny; }, lerp(target, amount) { this.x += (target.x - this.x) * amount; this.y += (target.y - this.y) * amount; } };
}

const Login = () => {
    const cardRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;

        if (card) {
            const rotDeg = { current: vec2(), target: vec2() };
            const bgPos = { current: vec2(), target: vec2() };
            let lerpAmount = 0.06;

            const onMouseMove = ({ offsetX, offsetY }) => {
                lerpAmount = 0.1;
                const ox = (offsetX + card.clientWidth * 0.5) / (Math.PI * 8);
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
        }
    }, []);

    const handleLogin = event => {
        event.preventDefault();
        console.log("Form submitted!"); // Check if the function is called
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
    };
    useEffect(()=>{
        loadCaptchaEnginge(6)
    },[])
    const captchaRef = useRef(null);
    const [disabled,setDisabled] = useState(true);
    const handleValidateCaptcha = c => {
      const user_captcha_value = captchaRef.current.value;
      if (validateCaptcha(user_captcha_value)) {
        setDisabled(false);
    }

    else {
       setDisabled(true)
    }

    }

    return (
        <div className="bg-no-repeat bg-cover bg-center min-h-screen" style={{ backgroundImage: `url(${sb})` }}>
            <div className='md:p-28 py-24'>
                <div ref={cardRef} className="m-auto w-[22.5rem] shrink-0 shadow-2xl relative rounded-lg"
                    style={{
                        transform: "rotateX(var(--rotX)) rotateY(var(--rotY))",
                        backgroundPosition: "var(--bgPosX) var(--bgPosY)",
                        transition: 'transform 0.1s ease'
                    }}>
                    <div className="relative">
                        <form onSubmit={handleLogin} className="card-body bg-transparent relative z-10">
                            <h3 className='text-3xl font-bold'>Login</h3>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                               
                            </div>
                            <div className="form-control ">
                            <label className="label">
                                <LoadCanvasTemplate   />
                                </label>
                                <input type="text" ref={captchaRef} name='captcha' placeholder="Type the Captcha" className="input input-bordered" required />
                                <button onClick={handleValidateCaptcha} className='w-24  mt-5 bg-black mb-2 h-8'>Validate</button>
                            </div>
                            <div>
                                
                             <input disabled={disabled} type="submit" className='btn bg-sky-900 rounded-md    w-40 btn-primary text-white text-xl font-bold' value='login' />
                            </div>
                        </form>

                        <span className="absolute top-0 left-0 w-[15px] h-[2px] bg-white"></span>
                        <span className="absolute top-0 left-0 w-[2px] h-[15px] bg-white"></span>
                        <span className="absolute top-0 right-0 w-[15px] h-[2px] bg-white"></span>
                        <span className="absolute top-0 right-0 w-[2px] h-[15px] bg-white"></span>
                        <span className="absolute bottom-0 right-0 w-[15px] h-[2px] bg-white"></span>
                        <span className="absolute bottom-0 right-0 w-[2px] h-[15px] bg-white"></span>
                        <span className="absolute bottom-0 left-0 w-[15px] h-[2px] bg-white"></span>
                        <span className="absolute bottom-0 left-0 w-[2px] h-[15px] bg-white"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
