"use client";

import { useEffect } from "react";
import { tsParticles } from "@tsparticles/engine";
import { loadStarsPreset } from "@tsparticles/preset-stars";

const ParticlesBackground = () => {
  useEffect(() => {
    const loadParticles = async () => {
      await loadStarsPreset(tsParticles);
      await tsParticles.load({
        id: "tsparticles",
        options: {
          background: {
            color: { value: "transparent" },
          },
          particles: {
            color: {
              value: "#8ea8ff",
              // animation: {
              //   enable: true,
              //   speed: 20,
              //   sync: true,
              // },
            },
            move: {
              enable: true,
              outModes: "bounce",
              speed: { min: 0.5, max: 1 },
            },
            number: {
              value: 200,
            },
            opacity: {
              animation: {
                enable: true,
                speed: 2,
                sync: false,
              },
              value: { min: 0.05, max: 1 },
            },
            shape: {
              type: "circle",
            },
            size: {
              animation: {
                enable: false,
                speed: 40,
                sync: false,
              },
              value: { min: 0.2, max: 3 },
            },
          },
          polygon: {
            draw: {
              enable: true,
              stroke: {
                color: "#fff",
                width: 0.3,
                opacity: 0.2,
              },
            },
            move: {
              radius: 10,
            },
            inline: {
              arrangement: "equidistant",
            },

            scale: 1,

            type: "inline",
          },
          preset: "stars",
        },
      });
    };

    loadParticles();
  }, []);

  return (
    <div
      id="tsparticles"
      className="absolute top-0 left-0 w-full h-full z-[-1]"
    />
  );
};

export default ParticlesBackground;
