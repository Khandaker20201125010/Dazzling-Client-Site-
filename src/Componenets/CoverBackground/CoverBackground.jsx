import { Parallax } from "react-parallax";

const CoverBackground = ({ img, title, details }) => {
  return (
    <div>
      <Parallax
        blur={{ min: -50, max: 50 }}
        bgImage={img}
        bgImageAlt="the dog"
        strength={-200}
      >
        <div className="hero h-[650px]">
          <div className="hero-overlay bg-black  bg-opacity-25 "></div>
          <div className="hero-content text-neutral-content text-center ">
            <div className="max-w-xl bg-black p-10 bg-opacity-30 ">
              <h1 className="mb-5 text-5xl font-bold uppercase text-white">
                {title}
              </h1>
              <p className="mb-5 text-white">{details}</p>
            </div>
          </div>
        </div>
      </Parallax>
    </div>
  );
};

export default CoverBackground;
