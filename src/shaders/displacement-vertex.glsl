@import ./utils/classicnoise3D;

uniform float count; // same for all vertex on the same render loop

float freq = 2.0;
float speed = 0.1;
float ampl = 10.0;

void main() {
	float y = position.y + ampl * sin(speed * (position.z + count * freq));
	vec3 newPos = vec3(position.x, y, position.z);
	gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
}
