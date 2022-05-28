let scene, camera, renderer;

const init = () => {
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xD3D3D3);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0xd3df56, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Camera
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(60, aspect, 0.001, 5000)
    camera.rotation.y = (90 / 180) * Math.PI;
    camera.position.set(0, 1.5, 0);

    // Camera Controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();

    // Light
    ambientLight = new THREE.AmbientLight(0xaaaaaa, 20);
    scene.add(ambientLight);

    // Loader
    const loader = new THREE.GLTFLoader();
    loader.load('scene.gltf',function (obj) {
        console.log(obj);
        scene.add(obj.scene);
        obj.scene.position.set(0, -2, 0);
        animate();
    },function (xhr) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },(error) => {
        console.error(error)
    })
}

// Recursive Loop for Render Scene
const animate = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

init();