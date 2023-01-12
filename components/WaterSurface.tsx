import { extend, useFrame, useLoader } from "@react-three/fiber";

import React from "react";
import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water.js";

import type { MeshProps } from "@react-three/fiber";
import type { WaterOptions } from "three/examples/jsm/objects/Water.js";

const DEFAULT_OPTIONS = {
  distortionScale: 1,
  fog: false,
  sunColor: 0xeb8934,
  sunDirection: new THREE.Vector3(),
  textureHeight: 512,
  textureWidth: 512,
  waterColor: "#00A3FF",
};

type Props = MeshProps & {
  animateUniform: (delta: number) => void;
  waterOptions?: WaterOptions;
};

const WaterSurface: React.FC<Props> = ({
  animateUniform,
  waterOptions = {},
}) => {
  const ref =
    React.useRef<THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>>();

  const waterNormals = useLoader(
    THREE.TextureLoader,
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg",
  );

  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

  const geometry = React.useMemo(
    () => new THREE.PlaneGeometry(30000, 30000),
    [],
  );

  const options = React.useMemo<WaterOptions>(
    () => ({
      ...DEFAULT_OPTIONS,
      ...waterOptions,
      waterNormals,
    }),
    [waterNormals, waterOptions],
  );

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.material.uniforms.time.value += animateUniform(delta);
    }
  });

  return (
    <water args={[geometry, options]} ref={ref} rotation-x={-Math.PI / 2} />
  );
};

extend({ Water });

export default WaterSurface;
