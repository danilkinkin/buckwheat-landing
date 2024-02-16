
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

varying vec2 vUv;
varying float vHeight;
varying float vColor;
varying float vStrength;
uniform float uTime;
uniform sampler2D map;

// Random number generator
float rand(vec2 co){return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);}
float rand (vec2 co, float l) {return rand(vec2(rand(co), l));}
float rand (vec2 co, float l, float t) {return rand(vec2(rand(co, l), t));}

// Perlin noise
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

// Generate small noise waves
float snoiseFoam(vec3 pos) {
  float normal = perlin(vec2(pos.y * 0.1, pos.x * 0.1), 6.0, 0.0);
  float small = perlin(vec2(pos.y * 0.1, pos.x * 0.1), 12.0, 0.0);

  return normal * 0.3 + small * 0.7;
}

// Generate big noise waves
float snoiseWater(vec3 pos) {
  float huge = perlin(vec2(pos.y * 0.08, pos.x * 0.08), 4.0, 0.0);
  float big = perlin(vec2(pos.y * 0.08, pos.x * 0.08), 8.0, 0.0);

  return huge * 0.6 + big * 0.4;
}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

void main() {
  vUv = uv;// * rotate2d(PI * (-20.0 / 180.0));
  vec2 rTimeSpeed = vec2(uTime) * rotate2d(PI * ((70.0) / 180.0)) * 0.15;
  vec2 rTimeSlow = vec2(uTime) * rotate2d(PI * ((250.0) / 180.0)) * 0.1;
  vec2 rTimeMiddle = vec2(uTime + 100.0) * rotate2d(PI * ((300.0) / 180.0)) * 0.12;

  vec3 pos = position;
  float noiseFreq = 3.5;
  float noiseAmp = 0.3; 
  vec3 noisePosBig = vec3(pos.x * noiseFreq + rTimeSlow.x, pos.y * noiseFreq + rTimeSlow.y, pos.z);
  vec3 noisePosMiddle = vec3(pos.x * noiseFreq + rTimeMiddle.x, pos.y * noiseFreq + rTimeMiddle.y, pos.z);
  vec3 noisePosSmall = vec3(pos.x * noiseFreq + rTimeSpeed.x, pos.y * noiseFreq + rTimeSpeed.y, pos.z);

  float waveBig = (snoiseWater(noisePosBig) * 0.4);
  float waveMiddle = (snoiseFoam(noisePosMiddle) * 0.3);
  float waveSmall = (snoiseFoam(noisePosSmall) * 0.3);
  float displace = (waveBig + waveSmall + waveMiddle);

  vColor = waveBig;
  vStrength = waveMiddle;

  vHeight = displace * noiseAmp * 1.0;
  pos.z += vHeight;

  #include <begin_vertex>
  #include <project_vertex>

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}