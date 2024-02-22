#include <packing>
#include <common>

#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vUv;
varying float vHeight;
varying float vColor;
varying float vStrength;
uniform float uTime;

void main() {
  vec2 uv = vUv;
  float height = vHeight * 2.0 + 0.9;

  float time = uTime * 0.001;

  vec3 background = vec3(1.0);
  vec3 orange = vec3(0.98, 0.35, .0);
  vec3 green = vec3(0.95, 0.9, 0.0);

  vec3 color = mix(orange, green, vColor * 3.0 + 0.5);

  gl_FragColor = vec4(mix(color, background, height), 1.0);
}