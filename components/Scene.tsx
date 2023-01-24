import { OrbitControls, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import React from "react";

import { WaterSurface } from "@/components/index";

export type SceneProps = any;

export const Scene = React.forwardRef<HTMLCanvasElement, SceneProps>(
  (props, ref) => {
    const handleAnimateUniform = React.useCallback(
      (delta: number) => delta / 7,
      [],
    );

    return (
      <Canvas
        camera={{ position: [0, 10, 10] }}
        className="h-full w-full"
        ref={ref}
      >
        <Sky
          azimuth={0.55}
          distance={450000}
          inclination={0}
          sunPosition={[0, 1, 3]}
        />
        <WaterSurface animateUniform={handleAnimateUniform} />
        <OrbitControls />
      </Canvas>
    );
  },
);
