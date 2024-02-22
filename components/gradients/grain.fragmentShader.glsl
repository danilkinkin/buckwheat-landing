uniform float uTime;
uniform sampler2D tDiffuse;

varying vec2 vUv;

#define SHOW_NOISE 0
#define SRGB 0
// 0: Addition, 1: Screen, 2: Overlay, 3: Soft Light, 4: Lighten-Only
#define BLEND_MODE 0

//0 to 1
#define SPEED 0.000001

#define INTENSITY 0.02
// What gray level noise should tend to.
#define MEAN 0.0

// Controls the contrast/variance of noise.
#define VARIANCE .3

float rand(vec2 co) {
  return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}
float rand(vec2 co, float l) {
  return rand(vec2(rand(co), l));
}
float rand(vec2 co, float l, float t) {
  return rand(vec2(rand(co, l), t));
}

vec3 channel_mix(vec3 a, vec3 b, vec3 w) {
  return vec3(mix(a.r, b.r, w.r), mix(a.g, b.g, w.g), mix(a.b, b.b, w.b));
}

float gaussian(float z, float u, float o) {
  return (1.0 / (o * sqrt(2.0 * 3.1415))) * exp(-(((z - u) * (z - u)) / (2.0 * (o * o))));
}

vec3 madd(vec3 a, vec3 b, float w) {
  return a + a * b * w;
}

vec3 screen(vec3 a, vec3 b, float w) {
  return mix(a, vec3(1.0) - (vec3(1.0) - a) * (vec3(1.0) - b), w);
}

vec3 overlay(vec3 a, vec3 b, float w) {
  return mix(a, channel_mix(2.0 * a * b, vec3(1.0) - 2.0 * (vec3(1.0) - a) * (vec3(1.0) - b), step(vec3(0.5), a)), w);
}

vec3 soft_light(vec3 a, vec3 b, float w) {
  return mix(a, pow(a, pow(vec3(2.0), 2.0 * (vec3(0.5) - b))), w);
}

void main() {
  float t = uTime * float(SPEED);

  vec2 coord = gl_FragCoord.xy;
  vec2 ps = vec2(1.0) / gl_FragCoord.xy;
  vec2 uv = coord * ps;
  vec4 color = texture2D(tDiffuse, vUv);
    #if SRGB
  color = pow(color, vec4(2.2));
    #endif

  float noise = gaussian(rand(ps, 1.0 / (color.r + color.g + color.b), t), float(MEAN), float(VARIANCE) * float(VARIANCE));

    #if SHOW_NOISE
  color = vec4(noise);
  gl_FragColor = vec4(vec3(0.0), color.r);
    #else
  float w = float(INTENSITY);

  vec3 grain = vec3(noise);//vec3(noise) * (1.0 - color.rgb);

      #if BLEND_MODE == 0
  color.rgb += grain * w;
      #elif BLEND_MODE == 1
  color.rgb = screen(color.rgb, grain, w);
      #elif BLEND_MODE == 2
  color.rgb = overlay(color.rgb, grain, w);
      #elif BLEND_MODE == 3
  color.rgb = soft_light(color.rgb, grain, w);
      #elif BLEND_MODE == 4
  color.rgb = max(color.rgb, grain * w);
      #endif

      #if SRGB
  color = pow(color, vec4(1.0 / 2.2));
      #endif

  gl_FragColor = color;
    #endif

}