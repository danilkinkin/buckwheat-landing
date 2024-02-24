import grainFragmentShader from './grain.fragmentShader.glsl?raw';

/**
 * Full-screen textured quad shader
 */

const GrainShader = {
  name: 'GrainShader',

  uniforms: {
    tDiffuse: { value: null },
    opacity: { value: 1.0 },
    uTime: { value: 0 },
  },

  vertexShader: /* glsl */ `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

  fragmentShader: grainFragmentShader,
};

export { GrainShader };
