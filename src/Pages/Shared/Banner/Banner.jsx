import React, { useEffect } from 'react';

const Banner = () => {

  useEffect(() => {
    const loadImagesLoaded = async () => {
      const { default: imagesLoaded } = await import('https://esm.sh/imagesloaded');
      setup(imagesLoaded);
    };

    loadImagesLoaded();
  }, []);

  console.clear();

  // Utilities...

  const wrap = (n, max) => (n + max) % max;
  const lerp = (a, b, t) => a + (b - a) * t;

  const isHTMLElement = (el) => el instanceof HTMLElement;

  const genId = (() => {
    let count = 0;
    return () => {
      return (count++).toString();
    };
  })();

  class Raf {
    constructor() {
      this.rafId = 0;
      this.raf = this.raf.bind(this);
      this.callbacks = [];

      this.start();
    }

    start() {
      this.raf();
    }

    stop() {
      cancelAnimationFrame(this.rafId);
    }

    raf() {
      this.callbacks.forEach(({ callback, id }) => callback({ id }));
      this.rafId = requestAnimationFrame(this.raf);
    }

    add(callback, id) {
      this.callbacks.push({ callback, id: id || genId() });
    }

    remove(id) {
      this.callbacks = this.callbacks.filter((callback) => callback.id !== id);
    }
  }

  class Vec2 {
    constructor(x = 0, y = 0) {
      this.x = x;
      this.y = y;
    }

    set(x, y) {
      this.x = x;
      this.y = y;
    }

    lerp(v, t) {
      this.x = lerp(this.x, v.x, t);
      this.y = lerp(this.y, v.y, t);
    }
  }

  const vec2 = (x = 0, y = 0) => new Vec2(x, y);

  function tilt(node, options) {
    let { trigger, target } = resolveOptions(node, options);

    let lerpAmount = 0.06;

    const rotDeg = { current: vec2(), target: vec2() };
    const bgPos = { current: vec2(), target: vec2() };

    const update = (newOptions) => {
      destroy();
      ({ trigger, target } = resolveOptions(node, newOptions));
      init();
    };

    let rafId;

    function ticker({ id }) {
      rafId = id;

      rotDeg.current.lerp(rotDeg.target, lerpAmount);
      bgPos.current.lerp(bgPos.target, lerpAmount);

      for (const el of target) {
        el.style.setProperty("--rotX", rotDeg.current.y.toFixed(2) + "deg");
        el.style.setProperty("--rotY", rotDeg.current.x.toFixed(2) + "deg");

        el.style.setProperty("--bgPosX", bgPos.current.x.toFixed(2) + "%");
        el.style.setProperty("--bgPosY", bgPos.current.y.toFixed(2) + "%");
      }
    }

    const onMouseMove = ({ offsetX, offsetY }) => {
      lerpAmount = 0.1;

      for (const el of target) {
        const ox = (offsetX - el.clientWidth * 0.5) / (Math.PI * 3);
        const oy = -(offsetY - el.clientHeight * 0.5) / (Math.PI * 4);

        rotDeg.target.set(ox, oy);
        bgPos.target.set(-ox * 0.3, oy * 0.3);
      }
    };

    const onMouseLeave = () => {
      lerpAmount = 0.06;

      rotDeg.target.set(0, 0);
      bgPos.target.set(0, 0);
    };

    const addListeners = () => {
      trigger.addEventListener("mousemove", onMouseMove);
      trigger.addEventListener("mouseleave", onMouseLeave);
    };

    const removeListeners = () => {
      trigger.removeEventListener("mousemove", onMouseMove);
      trigger.removeEventListener("mouseleave", onMouseLeave);
    };

    const init = () => {
      addListeners();
      raf.add(ticker);
    };

    const destroy = () => {
      removeListeners();
      raf.remove(rafId);
    };

    init();

    return { destroy, update };
  }

  function resolveOptions(node, options) {
    return {
      trigger: options?.trigger ?? node,
      target: options?.target
        ? Array.isArray(options.target)
          ? options.target
          : [options.target]
        : [node]
    };
  }

  const raf = new Raf();

  function init() {
    const loader = document.querySelector(".loader");

    const slides = [...document.querySelectorAll(".slide")];
    const slidesInfo = [...document.querySelectorAll(".slide-info")];

    const buttons = {
      prev: document.querySelector(".slider--btn__prev"),
      next: document.querySelector(".slider--btn__next")
    };

    loader.style.opacity = 0;
    loader.style.pointerEvents = "none";

    slides.forEach((slide, i) => {
      const slideInner = slide.querySelector(".slide__inner");
      const slideInfoInner = slidesInfo[i].querySelector(".slide-info__inner");

      tilt(slide, { target: [slideInner, slideInfoInner] });
    });

    buttons.prev.addEventListener("click", change(-1));
    buttons.next.addEventListener("click", change(1));
  }

  function setup(imagesLoaded) {
    const loaderText = document.querySelector(".loader__text");

    const images = [...document.querySelectorAll("img")];
    const totalImages = images.length;
    let loadedImages = 0;
    let progress = {
      current: 0,
      target: 0
    };

    images.forEach((image) => {
      imagesLoaded(image, (instance) => {
        if (instance.isComplete) {
          loadedImages++;
          progress.target = loadedImages / totalImages;
        }
      });
    });

    raf.add(({ id }) => {
      progress.current = lerp(progress.current, progress.target, 0.06);

      const progressPercent = Math.round(progress.current * 100);
      loaderText.textContent = `${progressPercent}%`;

      if (progressPercent === 100) {
        init();
        raf.remove(id);
      }
    });
  }

  function change(direction) {
    return () => {
      let current = {
        slide: document.querySelector(".slide[data-current]"),
        slideInfo: document.querySelector(".slide-info[data-current]"),
        slideBg: document.querySelector(".slide__bg[data-current]")
      };
      let previous = {
        slide: document.querySelector(".slide[data-previous]"),
        slideInfo: document.querySelector(".slide-info[data-previous]"),
        slideBg: document.querySelector(".slide__bg[data-previous]")
      };
      let next = {
        slide: document.querySelector(".slide[data-next]"),
        slideInfo: document.querySelector(".slide-info[data-next]"),
        slideBg: document.querySelector(".slide__bg[data-next]")
      };

      Object.values(current).map((el) => el.removeAttribute("data-current"));
      Object.values(previous).map((el) => el.removeAttribute("data-previous"));
      Object.values(next).map((el) => el.removeAttribute("data-next"));

      if (direction === 1) {
        let temp = current;
        current = next;
        next = previous;
        previous = temp;

        current.slide.style.zIndex = "20";
        previous.slide.style.zIndex = "30";
        next.slide.style.zIndex = "10";
      } else if (direction === -1) {
        let temp = current;
        current = previous;
        previous = next;
        next = temp;

        current.slide.style.zIndex = "20";
        previous.slide.style.zIndex = "10";
        next.slide.style.zIndex = "30";
      }

      Object.values(current).map((el) => el.setAttribute("data-current", ""));
      Object.values(previous).map((el) => el.setAttribute("data-previous", ""));
      Object.values(next).map((el) => el.setAttribute("data-next", ""));
    };
  }

  return (
    <div className=''>
      <div className=' items-center text-center flex justify-center '>
        <div className="slider">
          <button className="slider--btn slider--btn__prev">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <div className="slides__wrapper z-[-1]">
            <div className="slides">
              <div className="slide" data-current>
                <div className="slide__inner">
                  <div className="slide--image__wrapper">
                    <img className="slide--image" src="https://i.ibb.co/dQzChy8/eb0ed7037fbca6158b3e8818d69e2198.jpg" alt="Image 1" />
                  </div>
                </div>
              </div>
              <div className="slide__bg" style={{ "--bg": "url(https://i.ibb.co/dQzChy8/eb0ed7037fbca6158b3e8818d69e2198.jpg)", "--dir": 0 }} data-current></div>

              <div className="slide" data-next>
                <div className="slide__inner">
                  <div className="slide--image__wrapper">
                    <img className="slide--image" src="https://i.ibb.co/cCq3XL0/cf2a7bddd0e3-mens-watches-t.jpg" alt="Image 2" />
                  </div>
                </div>
              </div>
              <div className="slide__bg" style={{ "--bg": "url(https://i.ibb.co/cCq3XL0/cf2a7bddd0e3-mens-watches-t.jpg)", "--dir": 1 }} data-next></div>

              <div className="slide" data-previous>
                <div className="slide__inner">
                  <div className="slide--image__wrapper">
                    <img className="slide--image" src="https://i.ibb.co/x5fpZrV/70509a9876117db4ff5d04dc88aff473.jpg" alt="Image 3" />
                  </div>
                </div>
              </div>
              <div className="slide__bg" style={{ "--bg": "url(https://i.ibb.co/x5fpZrV/70509a9876117db4ff5d04dc88aff473.jpg)", "--dir": -1 }} data-previous></div>
            </div>
            <div className="slides--infos">
              <div className="slide-info" data-current>
                <div className="slide-info__inner">
                  <div className="slide-info--text__wrapper">
                    <div data-title className="slide-info--text">
                      <span>Dazzling</span>
                    </div>
                    <div data-subtitle className="slide-info--text">
                      <span>Jewellery</span>
                    </div>
                    <div data-description className="slide-info--text">
                      <span>Best place to buy luxury Jewellery</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="slide-info" data-next>
                <div className="slide-info__inner">
                  <div className="slide-info--text__wrapper">
                    <div data-title className="slide-info--text">
                      <span>Dazzling</span>
                    </div>
                    <div data-subtitle className="slide-info--text">
                      <span>Watch</span>
                    </div>
                    <div data-description className="slide-info--text">
                      <span>Best place to buy luxury Watch</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="slide-info" data-previous>
                <div className="slide-info__inner">
                  <div className="slide-info--text__wrapper">
                    <div data-title className="slide-info--text">
                      <span>Dazzling</span>
                    </div>
                    <div data-subtitle className="slide-info--text">
                      <span>Cloth</span>
                    </div>
                    <div data-description className="slide-info--text">
                      <span>Perfect place for to get women and men dress</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button className="slider--btn slider--btn__next">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="loader">
          <span className="loader__text">0%</span>
        </div>

      
      </div>

    </div>
  );
};

export default Banner;
