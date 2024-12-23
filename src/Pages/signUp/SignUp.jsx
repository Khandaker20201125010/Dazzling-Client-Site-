import React, { useRef, useEffect, useState, useContext } from "react";
import sb from "../../assets/images/starry.svg";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";

import { Link, useNavigate } from "react-router-dom";
import gif from "../../assets/images/ezgif-7-6b93fbef20-unscreen.gif";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProviders";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { BsGoogle } from "react-icons/bs";
import { FaFacebook, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const image_hosting_token = import.meta.env.VITE_IMAGE_HOSTING_TOKEN;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;
function vec2(x = 0, y = 0) {
  return {
    x,
    y,
    set(nx, ny) {
      this.x = nx;
      this.y = ny;
    },
    lerp(target, amount) {
      this.x += (target.x - this.x) * amount;
      this.y += (target.y - this.y) * amount;
    },
  };
}

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const cardRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, updateUserProfile, googleSignIn, facebookSignIn } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const imageFile = { image: data.photoURL[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      updateUserProfile(data.name, res.data.data.display_url).then(() => {
        axiosPublic.post("/users", {
          name: data.name,
          email: data.email,
          photo: res.data.data.display_url,
          role: "Guest",
        });
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User created successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      });
    });
  };
  const handeleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        photo: result.user?.photoURL,
        role: "Guest",
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      });
    });
  };
  const handeleFacebookSignIn = () => {
    facebookSignIn().then((result) => {
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        photo: result.user?.photoURL,
        role: "user",
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      });
    });
  };
  useEffect(() => {
    const card = cardRef.current;

    if (card) {
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

        card.style.setProperty("--rotX", `${rotDeg.current.y.toFixed(2)}deg`);
        card.style.setProperty("--rotY", `${rotDeg.current.x.toFixed(2)}deg`);
        card.style.setProperty("--bgPosX", `${bgPos.current.x.toFixed(2)}%`);
        card.style.setProperty("--bgPosY", `${bgPos.current.y.toFixed(2)}%`);
        requestAnimationFrame(updateStyle);
      };

      card.addEventListener("mousemove", onMouseMove);
      card.addEventListener("mouseleave", onMouseLeave);

      updateStyle();

      return () => {
        card.removeEventListener("mousemove", onMouseMove);
        card.removeEventListener("mouseleave", onMouseLeave);
      };
    }
  }, []);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const [disabled, setDisabled] = useState(true);
  const handleValidateCaptcha = (c) => {
    const user_captcha_value = c.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <div
      className="bg-no-repeat bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${sb})` }}
    >
      <div className=" md:flex flex-1 flex-row-reverse ">
        <div className="md:px-44 md:py-5 ">
          <div data-aos="fade-left">
            <div
              ref={cardRef}
              className="m-auto  w-[22.5rem] shrink-0 shadow-2xl relative rounded-lg cursor-auto"
              style={{
                transform: "rotateX(var(--rotX)) rotateY(var(--rotY))",
                backgroundPosition: "var(--bgPosX) var(--bgPosY))",
                transition: "transform 0.1s ease",
              }}
            >
              <div className="">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="card-body bg-transparent relative z-10"
                >
                  <h3 className="text-3xl font-bold">Sign Up</h3>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      type="text"
                      {...register("name", { required: true })}
                      name="name"
                      placeholder="Name"
                      className="input input-bordered bg-transparent"
                      required
                    />
                    {errors.name && (
                      <span className="text-red-700 font-bold">
                        This Name is required
                      </span>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Upload Photo</span>
                    </label>

                    <input
                      type="file"
                      {...register("photoURL", { required: true })}
                      placeholder="Click to upload"
                      className="w-full file:bg-transparent file-input file-input-bordered bg-transparent"
                      required
                    />
                    {errors.photoURL && (
                      <span className="text-red-700 font-bold">
                        Photo URL is required
                      </span>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      {...register("email", { required: true })}
                      name="email"
                      placeholder="email"
                      className="input input-bordered bg-transparent"
                      required
                    />
                    {errors.email && (
                      <span className="text-red-700 font-bold">
                        This Email is required
                      </span>
                    )}
                  </div>
                  <div className="form-control relative">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: true,
                        maxLength: 20,
                        minLength: 6,
                        pattern:
                          /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                      })}
                      name="password"
                      placeholder="password"
                      className="input input-bordered bg-transparent pr-10"
                      required
                    />
                    <div
                      className="absolute inset-y-16 right-0 pr-3 flex items-center cursor-pointer text-blue-900"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaRegEyeSlash className="text-xl text-white" /> : <FaRegEye className="text-xl text-white" />}
                    </div>

                    {/* Error messages */}
                    {errors.password?.type === "minLength" && (
                      <p className="text-red-700">
                        Password must be at least 6 characters
                      </p>
                    )}
                    {errors.password?.type === "maxLength" && (
                      <p className="text-red-700">
                        Password can't exceed 20 characters
                      </p>
                    )}
                    {errors.password?.type === "pattern" && (
                      <p className="text-red-700">
                        Password must include uppercase, lowercase, number, and
                        special character
                      </p>
                    )}
                  </div>
                  <div className="form-control ">
                    <label className="label">
                      <LoadCanvasTemplate />
                    </label>
                    <input
                      onBlur={handleValidateCaptcha}
                      type="text"
                      name="captcha"
                      placeholder="Type the Captcha"
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <p className="text-black ">
                    Please clink on sign in Button after required fill{" "}
                  </p>
                  <div>
                    <input
                      disabled={disabled}
                      type="submit"
                      className="btn bg-sky-900 rounded-md w-40  btn-info text-white text-xl font-bold"
                      value="Sign In"
                    />
                  </div>
                </form>
                <h3 className="text-center text-xl mt-0 text-gray-500 py-5 font-bold">
                  Or
                </h3>
                <div className="flex animate-pulse m-auto gap-2 justify-center">
                  <button
                    onClick={handeleGoogleSignIn}
                    className="btn rounded-full btn-circle text-3xl bg-black text-blue-600 hover:bg-white hover:pl-4 flex p-2 hover:flex-1 items-center justify-center group transition-all duration-300"
                  >
                    <BsGoogle />
                    <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-2xl ">
                      Google
                    </span>
                  </button>
                  <button
                    onClick={handeleFacebookSignIn}
                    className="btn rounded-full btn-circle text-3xl bg-black text-blue-600 hover:bg-white hover:pl-4 flex p-2 hover:flex-1 items-center justify-center group transition-all duration-300"
                  >
                    <FaFacebook />{" "}
                    <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      FaceBook
                    </span>
                  </button>
                </div>
                <p className="text-center mt-10 text-gray-500 py-5 font-bold">
                  <small> Already have an account?</small>{" "}
                  <Link to="/login">
                    <span className="text-blue-600  font-bold">Login</span>
                  </Link>
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
        </div>
        <div className="m-auto ">
          <img className="md:ml-80 " src={gif} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
