import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

declare global {
  type GLTFResult = GLTF & {
    materials: {
      ["Material.001"]: THREE.MeshStandardMaterial;
    };
    nodes: Record<string, THREE.Mesh>;
  };
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      water: any;
    }
  }
}
