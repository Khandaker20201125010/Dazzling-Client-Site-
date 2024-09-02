import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SparklesText = ({
  colors = { first: "#fae703", second: "#fa9503" },
  className,
  sparklesCount = 10,
  children,
  ...props
}) => {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const generateSparkle = () => {
      const x = `${Math.random() * 100}%`;
      const y = `${Math.random() * 100}%`;
      const color = Math.random() > 0.5 ? colors.first : colors.second;
      const delay = Math.random() * 2;
      const scale = Math.random() * 1 + 0.3;
      const lifespan = Math.random() * 10 + 5;
      const id = `${x}-${y}-${Date.now()}`;
      return { id, x, y, color, delay, scale, lifespan };
    };

    const initializeSparkles = () => {
      const newSparkles = Array.from({ length: sparklesCount }, generateSparkle);
      setSparkles(newSparkles);
    };

    const updateSparkles = () => {
      setSparkles((currentSparkles) =>
        currentSparkles.map((sparkle) => {
          if (sparkle.lifespan <= 0) {
            return generateSparkle();
          } else {
            return { ...sparkle, lifespan: sparkle.lifespan - 0.1 };
          }
        }),
      );
    };

    initializeSparkles();
    const interval = setInterval(updateSparkles, 100);

    return () => clearInterval(interval);
  }, [colors.first, colors.second, sparklesCount]);

  return (
    <div
      className={`font-bold relative ${className}`}
      {...props}
      style={{
        "--sparkles-first-color": colors.first,
        "--sparkles-second-color": colors.second,
      }}
    >
      <span className="relative inline-block">
        {sparkles.map((sparkle) => (
          <Sparkle key={sparkle.id} {...sparkle} />
        ))}
        <span className="relative z-10 ">{children}</span> {/* Ensure text is on top */}
      </span>
    </div>
  );
};

const Sparkle = ({ id, x, y, color, delay, scale }) => {
  return (
    <motion.svg
      key={id}
      className="absolute pointer-events-none"
      initial={{ opacity: 0, x, y }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, scale, 0],
        rotate: [0, 360],
      }}
      transition={{ duration: 1, repeat: Infinity, delay }}
      width="21"
      height="21"
      viewBox="0 0 21 21"
      style={{
        left: `calc(${x} - 10.5px)`,
        top: `calc(${y} - 10.5px)`,
      }}
    >
      <path
        d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z"
        fill={color}
      />
    </motion.svg>
  );
};

export default SparklesText;
