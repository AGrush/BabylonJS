/// <reference path="../../dist/babylon.d.ts" />

var BjsApp = BjsApp || {};

BjsApp.init = function () {
    //get the canvas
    var canvas = document.getElementById('renderCanvas');

    //create a BabylonJS engine object, true for antialias
    var engine = new BABYLON.Engine(canvas, true);

    engine.runRenderLoop(function () {
        scene.render();
    });

    // the canvas/window resize event handler
    window.addEventListener('resize', function () {
        engine.resize();
    });

    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // Need a free camera for collisions
    var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 4, -15), scene);
    camera.attachControl(canvas, true);
    // camera
    // var camera = new BABYLON.ArcRotateCamera("Camera", - Math.PI / 3.0, Math.PI / 3.1, 20, BABYLON.Vector3.Zero(), scene);
    // camera.attachControl(canvas, true);
    //dont let camera go further than 50 radius  (can set min max limit too)
    camera.upperRadiusLimit = 50;
    camera.lowerRadiusLimit = 8;

    //var light1 = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 1), scene);
    var light2 = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);
    var light3 = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(-1, 0, -2), scene);
    //light1.intensity =0.75;
    light2.intensity = 0.5;
    light3.intensity = 0.5;

    // Lights
    // var light0 = new BABYLON.DirectionalLight("Omni", new BABYLON.Vector3(-2, -5, 2), scene);
    // var light1 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(2, -5, -2), scene);

    //create door
    var box = BABYLON.MeshBuilder.CreateBox("box", { height: 5, width: 2, depth: 0.15 }, scene);
    box.material = new BABYLON.StandardMaterial("Mat", scene);
    box.material.diffuseTexture = new BABYLON.Texture("assets/images/planks.jpg", scene);
    box.material.diffuseTexture.hasAlpha = true;
    box.position.x = 2;
    box.position.y = 2.5;

    //create ground
	var ground = BABYLON.Mesh.CreateGround('ground1', 50, 50, 2, scene);
	var grass = new BABYLON.StandardMaterial('grass', scene);
	grass.diffuseTexture = new BABYLON.Texture('assets/images/grass.jpg', scene);
	grass.diffuseTexture.uScale = 3;
    grass.diffuseTexture.vScale = 5;
    ground.material = grass;

    //stop grass from reflecting light
	grass.specularColor = new BABYLON.Color3(0, 0, 0);

	//Set gravity for the scene (G force like, on Y-axis)
    scene.gravity = new BABYLON.Vector3(0, -0.9, 0);

    // Enable Collisions
    scene.collisionsEnabled = true;
    
    //Then apply collisions and gravity to the active camera
    camera.checkCollisions = true;
    camera.applyGravity = true;

    //Set the ellipsoid around the camera (e.g. your player's size)
    camera.ellipsoid = new BABYLON.Vector3(1, 1, 2);

    // /You can define the collision radius with this code
    camera.collisionRadius = new BABYLON.Vector3(6, 6, 0.5)

    //finally, say which mesh will be collisionable
    ground.checkCollisions = true;
    box.checkCollisions = true;

    //Position Animation
    var frameRate = 10;
    var xSlide = new BABYLON.Animation("xSlide", "position.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    var keyFramesP = [];

    keyFramesP.push({
        frame: 0,
        value: 2
    });

    keyFramesP.push({
        frame: 2 * frameRate,
        value: -2
    });

    keyFramesP.push({
        frame: 4 * frameRate,
        value: 2
    });

    xSlide.setKeys(keyFramesP);

    var oscillations = 4;
    var springiness = 8;
    // Creating an easing function
    var easingFunction = new BABYLON.ElasticEase(oscillations, springiness)

    // For each easing function, you can choose between EASEIN (default), EASEOUT, EASEINOUT
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);

    // Adding the easing function to the animation
    xSlide.setEasingFunction(easingFunction);

    //Rotation Animation
    var yRot = new BABYLON.Animation("yRot", "rotation.y", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    var keyFramesR = [];

    keyFramesR.push({
        frame: 0 * frameRate,
        value: 0
    });

    keyFramesR.push({
        frame: 2 * frameRate,
        value: 0
    });

    keyFramesR.push({
        frame: 4 * frameRate,
        value: Math.PI
    });

    keyFramesR.push({
        frame: 5 * frameRate,
        value: -4 * Math.PI
    });

    yRot.setKeys(keyFramesR);

    // Create the animation group
    var animationGroup = new BABYLON.AnimationGroup("my group");
    animationGroup.addTargetedAnimation(xSlide, box);
    animationGroup.addTargetedAnimation(yRot, box);

    // Make sure to normalize animations to the same timeline
    //animationGroup.normalize(0, 100);

    animationGroup.play(true);

    scene.onPointerObservable.add((pointerInfo) => {
        switch (pointerInfo.type) {
            case BABYLON.PointerEventTypes.POINTERDOWN:
                //light2.intensity = 0.95;
                animationGroup.pause();
                //box.scaling = new BABYLON.Vector3(4, 1, -1)
                console.log("POINTER DOWN");
                break;
            case BABYLON.PointerEventTypes.POINTERUP:
                //light2.intensity = 0.15;
                animationGroup.play(true);
                //box.scaling = new BABYLON.Vector3(1, 1, 1)
                console.log("POINTER UP");
                break;
            case BABYLON.PointerEventTypes.POINTERMOVE:
                console.log("POINTER MOVE");
                break;
            case BABYLON.PointerEventTypes.POINTERWHEEL:
                console.log("POINTER WHEEL");
                break;
            case BABYLON.PointerEventTypes.POINTERPICK:
                console.log("POINTER PICK");
                break;
            case BABYLON.PointerEventTypes.POINTERTAP:
                console.log("POINTER TAP");
                break;
            case BABYLON.PointerEventTypes.POINTERDOUBLETAP:
                console.log("POINTER DOUBLE-TAP");
                break;
        }
    });

    return scene;
};
