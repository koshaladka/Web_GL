import * as THREE from './../node_modules/three/build/three.module.js';

// Настройки сцены
const scene = new THREE.Scene();
const spaceTexture = new THREE.TextureLoader().load('images/space.jpg');
scene.background = spaceTexture;

// Настройка камеры
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

// Настройка renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xffffff, 0);
document.body.appendChild( renderer.domElement );
window.addEventListener('resize', () => {
    renderer.setSize( window.innerWidth, window.innerHeight);
    scene.add(earth);
});

// Глобальное освещение
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

/* // Настройки куба
const cubeTexture = new THREE.TextureLoader().load('images/cube.jpg');
const cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial({ map: cubeTexture }));
cube.position.z = -2;
cube.rotation.y = 10;
cube.rotation.x = 10;
scene.add(cube); */


// Настройки Венеры
const veneraTexture = new THREE.TextureLoader().load('images/venera.jpg');
const venera = new THREE.Mesh(
	new THREE.SphereGeometry(1, 64, 64),
	new THREE.MeshStandardMaterial({
		map: veneraTexture,
	})
);
venera.position.z = -3;
scene.add(venera);

// Настройки земли
const earthTexture = new THREE.TextureLoader().load('images/01-3.jpg');
const earth = new THREE.Mesh(
	new THREE.SphereGeometry(1, 64, 64),
	new THREE.MeshStandardMaterial({
		map: earthTexture,
	})
);
earth.position.z = -5;
scene.add(earth);

// Настройки Марса
const marsTexture = new THREE.TextureLoader().load('images/mars.png');
const mars = new THREE.Mesh(
	new THREE.SphereGeometry(1, 64, 64),
	new THREE.MeshStandardMaterial({
		map: marsTexture,
	})
);
mars.position.z = -8;
scene.add(mars);

// Добавление звезд на фоне
function addStar() {
	const geometry = new THREE.SphereGeometry(0.1, 16, 16);
	const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
	const star = new THREE.Mesh(geometry, material);

	const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(90));

	star.position.set(x, y, z);
	scene.add(star);
}
Array(400).fill().forEach(addStar);

// Анимация | каждый кадр
function animate() {
	requestAnimationFrame(animate);

	earth.rotation.y += 0.003;
	earth.rotation.x += 0.002;
	earth.rotation.z += 0.002;

    venera.rotation.y += 0.004;
	venera.rotation.x += 0.001;
	venera.rotation.z += 0.001;

    mars.rotation.y += 0.003;
	mars.rotation.x += 0.002;
	mars.rotation.z += 0.003;

	renderer.render(scene, camera);
}
// Запуск анимации
animate();

// Событие для прокрутки
document.body.onscroll = handlerScroll;
function handlerScroll() {
	const t = document.body.getBoundingClientRect().top;

	if(venera.rotation.y > 0 && venera.rotation.x > 0) {
		venera.rotation.y -= 0.01;
		venera.rotation.x -= 0.01;
	}


	if ( camera.position.z < -1.4 ) {
		venera.rotation.y = 0;
		venera.rotation.x = 0;
		if( earth.position.x > -0.8 ) {
			earth.position.x -= 0.02;
            mars.position.x += 0.02;
            mars.position.y += 0.01;
		}
	} else {
		earth.position.x = 0;
	}

	camera.position.z = t * 0.001;
}