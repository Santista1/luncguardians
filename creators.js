const fontLoader = new THREE.FontLoader();
const Montserrat = './Montserrat.json'
const point = (x, y, z) => { return { x: x, y: y, z: z }; };

var beepbeep = new Audio('https://www.soundjay.com/buttons/sounds/beep-027.mp3');
function playSound () { beepbeep.play() };
function openUrl (URL) { window.open(URL, '_blank') };
function refresh () { location.reload() };
function remap(v, l1, h1, l2, h2) { return l2 + (h2 - l2) * (v - l1) / (h1 - l1); };

var buttons = [];

const button = (font, string, size, point, textColor, buttonColor, clickFunction, position, s, url) => {

	fontLoader.load(font, function(font) {
		const textSetting = { font: font, size: size, height: 0, curveSegments: 12};

		const geometry = new THREE.TextGeometry( string, textSetting );
		const material = new THREE.MeshBasicMaterial( { color: textColor } );
		const text = new THREE.Mesh( geometry,material );

		geometry.computeBoundingBox();
		const offset = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
		text.position.set( offset , size / -2 , 0 );

		const capsuleGeometry = new THREE.CapsuleGeometry( size, - offset * 2 , 10 , 20 );
		const capsuleMaterial = new THREE.MeshBasicMaterial( { color: buttonColor, transparent: true, opacity: 0.1 } );
		const capsule = new THREE.Mesh( capsuleGeometry, capsuleMaterial );
		capsule.rotation.z = Math.PI / 2;

		capsule.on("mouseover", (event) => {
			capsule.material = new THREE.MeshBasicMaterial({ color: "blue", transparent: true, opacity: 0.3});
		});
		capsule.on("mouseout", (event) => { capsule.material = capsuleMaterial; });

		capsule.on("click", (event) => { clickFunction(); if (url){ openUrl(url); }; });

		const group = new THREE.Group();

		group.add( text );
		group.add( capsule );

		group.position.x = point.x;
		group.position.y = point.y;
		group.position.z = point.z;

    buttons.push( group );

    s.add(group);

	});
};
