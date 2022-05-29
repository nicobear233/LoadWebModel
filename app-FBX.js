let scene, camera, renderer;
var loadingFBX = 0;

const init = () => {
    // Scene
    scene = new THREE.Scene();
    //scene.background = new THREE.Color(0xD3D3D3);
    scene.background = new THREE.Color(0xf0f0f0);
    scene.fog = new THREE.Fog(scene.background, 3000, 5000);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0xd3df56, 1);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Camera
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(45, aspect, 0.0001, 4000)
    camera.rotation.y = (90 / 180) * Math.PI;
    //camera.position.set(0, -0.4, 0.1);
    camera.position.set(-0.1, -0.4, 0);

    // Camera Controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
// How far you can orbit vertically, upper and lower limits.
    //controls.minPolarAngle = -2*Math.PI; 
    //controls.maxPolarAngle = Math.PI; 
    //controls.maxPolarAngle = 2*Math.PI; 
// How far you can orbit horizontally, upper and lower limits.
    controls.minAzimuthAngle = -Math.PI/2;
    controls.maxAzimuthAngle = -Math.PI/2.4;
// How far you can dolly in and out ( PerspectiveCamera only )
    controls.minDistance = 0.1;
    controls.maxDistance = 1;

    //controls.target.set(-5, -30, 0);

    controls.enablePan = false;
    controls.update();

    // Light
/*
    ambientLight = new THREE.AmbientLight(0Xeeeeee, 5);
    scene.add(ambientLight);
*/
    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.3); //模拟远处类似太阳的光源
    directionalLight.color.setHSL(0.1, 1, 0.95);
    directionalLight.position.set(0, 200, 0).normalize();
    scene.add(directionalLight);

    var ambient = new THREE.AmbientLight(0xffffff, 3.5); //AmbientLight,影响整个场景的光源
    ambient.position.set(0, 0, 0);
    scene.add(ambient);

/*
    // Grid
    const axes = new THREE.AxesHelper(300);
    axes.material.opacity = 0
    axes.material.transparent = true
    scene.add(axes);

    const gridHelper = new THREE.GridHelper( 4000, 30, 0x323246, 0x323246 );
    scene.add(gridHelper);
*/

    // Ground
    let textureLoader = new THREE.TextureLoader()
    let texture = textureLoader.load("base3.png")
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
    texture.repeat.set(10, 10);

    let geometry = new THREE.PlaneGeometry(1000, 1000);
    let material = new THREE.MeshBasicMaterial({
    	map: texture,
        side: THREE.DoubleSide
    });
    let plane = new THREE.Mesh(geometry, material);
    plane.position.z = -14;
    //plane.rotateZ(Math.PI / 2)
    scene.add(plane);

    // Loader
    const loader = new THREE.FBXLoader();
    loader.load('0511-1.fbx',function (obj) {
        console.log(obj);
        scene.add(obj);
        //scene.scale.set(0.0015, 0.0015, 0.0015);
        scene.scale.set(0.0020, 0.0020, 0.0020);
        //obj.position.set(10, -80, 0);
        obj.position.set(-5, -30, 0);
        animate();
    },function (xhr) {
        loadingFBX = Math.floor(xhr.loaded / xhr.total * 100)+'%';
        //document.write(loadingFBX);
        document.getElementById("g-progress").width = loadingFBX;
        $(".g-progress").width(loadingFBX);
        //$(".g-progress").load(location.href + " .g-progress");
        if (document.getElementById("g-progress").width == "100%") {
            document.getElementById("g-container").style.display = "none";
            document.getElementById("blkb").style.display = "none";
        }
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