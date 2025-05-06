import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { MoveDirection, OutMode } from "@tsparticles/engine";

const ParticlesBackground: React.FC = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "#282828",
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true, 
            mode: "push",
          },
          onHover: {
            enable: true, 
            mode: "grab",
          },
        },
        modes: {
          push: {
            quantity: 4, 
          },
          repulse: {
            distance: 200, 
            duration: 0.4, 
          },
        },
      },
      particles: {
        color: {
          value: ["#94d255", "#1c73fa"],
        },
        links: {
          color: "#d4d4d4", 
          distance: 150, 
          enable: true, 
          opacity: 0.5, 
          width: 1, 
        },
        move: {
          direction: MoveDirection.none, 
          enable: true, 
          outModes: {
            default: OutMode.bounce, 
          },
          random: false, 
          speed: 2, 
          straight: false, 
        },
        number: {
          density: {
            enable: true, 
            area: 800, 
          },
          value: 180, 
        },
        opacity: {
          value: 1,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 }, 
        },
      },
      detectRetina: true,
    }),
    []
  );

  return init ? (
    <Particles id="tsparticles" options={particlesOptions} />
  ) : null;
};

export default React.memo(ParticlesBackground);
