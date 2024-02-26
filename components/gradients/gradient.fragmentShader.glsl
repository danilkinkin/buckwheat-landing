#ifdef GL_ES
precision mediump float;
#endif

const vec3 background = vec3(1.0);
const vec3 orange = vec3(0.98, 0.35, .0);
const vec3 green = vec3(0.95, 0.9, 0.0);

varying float vHeight;
varying float vColor;

void main() {
  float height = vHeight * 2.0 + 0.9;

  vec3 color = mix(orange, green, vColor * 3.0 + 0.5);

  gl_FragColor = vec4(mix(color, background, height), 1.0);
}
