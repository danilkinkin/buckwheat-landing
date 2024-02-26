#ifdef GL_ES
precision mediump float;
#endif

const float PI = 3.14159265359;
const float SCALE = 0.0002;
const float SPEED = 0.5;
const float NOISE_FREQ = 3.5;
const float NOISE_AMP = 0.3;

varying vec2 vUv;
varying float vHeight;
varying float vColor;
uniform float uTime;
uniform sampler2D map;

float rand(vec2 co, float l, float t) {
    return fract(sin(dot(co.xy + vec2(l, t), vec2(12.9898, 78.233))) * 43758.5453);
}

float perlin(vec2 p, float dim, float time) {
    vec2 pos = floor(p * dim);
    vec2 posx = pos + vec2(1.0, 0.0);
    vec2 posy = pos + vec2(0.0, 1.0);
    vec2 posxy = pos + vec2(1.0);

    float c = rand(pos, dim, time);
    float cx = rand(posx, dim, time);
    float cy = rand(posy, dim, time);
    float cxy = rand(posxy, dim, time);

    vec2 d = fract(p * dim);
    d = -0.5 * cos(d * PI) + 0.5;

    float ccx = mix(c, cx, d.x);
    float cycxy = mix(cy, cxy, d.x);
    float center = mix(ccx, cycxy, d.y);

    return center * 2.0 - 1.0;
}

float snoiseFoam(vec2 pos, const float freq) {
    return perlin(vec2(pos.y * freq, pos.x * freq), 9.0, 0.0);
}

float snoiseWater(vec2 pos, const float freq) {
    return perlin(vec2(pos.y * freq, pos.x * freq), 6.0, 0.0);
}

mat2 rotate2d(float _angle) {
    return mat2(cos(_angle), -sin(_angle), sin(_angle), cos(_angle));
}

void main() {
    vUv = uv;

    vec2 rTimeSpeed = vec2(uTime) * rotate2d(PI * (70.0 / 180.0)) * 0.15 * SPEED;
    vec2 rTimeSlow = vec2(uTime) * rotate2d(PI * (250.0 / 180.0)) * 0.1 * SPEED;
    vec2 rTimeMiddle = vec2(uTime + 100.0) * rotate2d(PI * (300.0 / 180.0)) * 0.12 * SPEED;

    vec2 freqPos = position.xy * SCALE * NOISE_FREQ;

    float waveBig = snoiseWater(freqPos + rTimeSlow, 0.08) * 0.4;
    float waveMiddle = snoiseFoam(freqPos + rTimeMiddle, 0.1) * 0.3;
    float waveSmall = snoiseFoam(freqPos + rTimeSpeed, 0.1) * 0.3;

    vColor = waveMiddle;

    vHeight = (waveBig + waveSmall + waveMiddle) * NOISE_AMP;

    vec3 pos = position;
    pos.z += vHeight / SCALE;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
