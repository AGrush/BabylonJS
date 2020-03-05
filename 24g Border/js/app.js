/// <reference path="/Users/freelancer/Desktop/BABYLON/BabylonJS/dist/previous releases/3.2/viewer/babylon.d.ts" />


var BjsApp = BjsApp || {};

BjsApp.init = function () {
    //get the canvas
    var canvas = document.getElementById('AgCanvas');

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

     //SEETHROUGH
    //scene.clearColor = new BABYLON.Color4(250,250,250,1);

     // This creates and positions a free camera (non-mesh)
     var camera1 = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
     
     // Configure ortho
     camera1.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
     camera1.orthoTop = 4;
     camera1.orthoBottom = -4;
     camera1.orthoLeft = -4;
     camera1.orthoRight = 4;
 
     // This targets the camera to scene origin
     camera1.setTarget(BABYLON.Vector3.Zero());
    
     // This attaches the camera to the canvas
     camera1.attachControl(canvas, true);
    
     //GLOW ON BORDERS
     var gl = new BABYLON.GlowLayer("glow", scene);
     gl.customEmissiveColorSelector = function(mesh, subMesh, material, result) {
         if (mesh.name === "bt" || mesh.name === "bl" || mesh.name === "br" || mesh.name === "bb") {
             result.set(0, 0, 1, 1);
         } else {
             result.set(0, 0, 0, 0);
         }
     }
     gl.intensity = 0.5;

     var btop = BABYLON.MeshBuilder.CreateBox("bt", {width:7.9, height:.1, depth:.1}, scene);
     btop.parent = camera1;
     btop.position = new BABYLON.Vector3(0, 3.9, 25)

     var bbot = BABYLON.MeshBuilder.CreateBox("bb", {width:7.9, height:.1, depth:.1}, scene);
     bbot.parent = camera1;
     bbot.position = new BABYLON.Vector3(0, -3.9, 25)
 
     var blef = BABYLON.MeshBuilder.CreateBox("bl", {width:.1, height:7.9, depth:.1}, scene);
     blef.parent = camera1;
     blef.position = new BABYLON.Vector3(-3.9, 0, 25)
 
     var brit = BABYLON.MeshBuilder.CreateBox("br", {width:.1, height:7.9, depth:.1}, scene);
     brit.parent = camera1;
     brit.position = new BABYLON.Vector3(3.9, 0, 25)
 
     var camera2 = new BABYLON.FreeCamera("camera2", new BABYLON.Vector3(0, 5, -11), scene);
     // camera1.parent = camera2;
     // console.log(scene.activeCamera, scene.activeCameras);
     // scene.activeCamera = camera2;
     // camera2.attachControl(canvas, true);
 
     // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
     var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
 
     // Default intensity is 1. Let's dim the light a small amount
     light.intensity = 0.7;
 
     // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
     var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
 
     // Move the sphere upward 1/2 its height
     sphere.position.y = 1;
 
     // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
     var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
 
 
     // Create particleSystem ps1, with max rendered particles 100000
     var ps1 = new BABYLON.ParticleSystem("ps1", 50000, scene);
     var ps2 = new BABYLON.ParticleSystem("ps2", 50000, scene);

 
     // ok, ps1 is now existing. Func names established/defined, above. 
     // Time to install the 3 custom funcs... into ps1. (do the customization)
 
     // ps1.startDirectionFunction = my_startDirectionFunction;
     // ps1.startPositionFunction = my_startPositionFunction;
     // ps1.updateFunction = my_updateFunction;
 
     // ok, we're wedged-in. Remember that all three funcs can/will run constantly and quick.
 
     // 1 TOP BAR
     // Now set more ps1 adjustments, many of-which will be used by our 3 custom funcs, above.
     var url = "https://cdn.rawgit.com/wingnutt/misc/master/star.jpg";
     ps1.particleTexture = new BABYLON.Texture(url, scene);
     
     ps1.minSize = 0.1;
     ps1.maxSize = 0.8;
 
     ps1.minLifeTime = .1;
     ps1.maxLifeTime = .5;
 
     ps1.minEmitPower = 1;
     ps1.maxEmitPower = 3;
 
     // ps1.minAngularSpeed = 0;
     // ps1.maxAngularSpeed = Math.PI;
 
     ps1.emitter = btop;
     // ps1.manualEmitCount = 500;
     ps1.emitRate = 4500;
 
     ps1.updateSpeed = 0.01;
     ps1.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
 
     ps1.color1 = new BABYLON.Color4(0.05, 0.05, 0.05, .5);
     ps1.color2 = new BABYLON.Color4(0.05, 0.05, 0.05, .25);
     ps1.colorDead = new BABYLON.Color4(0, 0, 0.0, 0);
 
     ps1.direction1 = new BABYLON.Vector3(0, -1, 0);
     ps1.direction2 = new BABYLON.Vector3(0, -1, 0);

     ps1.minEmitBox = btop.getBoundingInfo().boundingBox.minimum;
     ps1.maxEmitBox = btop.getBoundingInfo().boundingBox.maximum;
     // turn the key! vrooom!
     ps1.start();


     
     ////2 BOTTOM BAR
     ps2.particleTexture = new BABYLON.Texture(url, scene);
     
     ps2.minSize = 0.1;
     ps2.maxSize = 0.8;
 
     ps2.minLifeTime = .1;
     ps2.maxLifeTime = .5;
 
     ps2.minEmitPower = 1;
     ps2.maxEmitPower = 3;
 
     // ps2.minAngularSpeed = 0;
     // ps2.maxAngularSpeed = Math.PI;
 
     ps2.emitter = bbot;
     // ps2.manualEmitCount = 500;
     ps2.emitRate = 4500;
 
     ps2.updateSpeed = 0.01;
     ps2.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
 
     ps2.color1 = new BABYLON.Color4(0.05, 0.05, 0.05, .5);
     ps2.color2 = new BABYLON.Color4(0.05, 0.05, 0.05, .25);
     ps2.colorDead = new BABYLON.Color4(0, 0, 0.0, 0);
 
     ps2.direction1 = new BABYLON.Vector3(0, 1, 0);
     ps2.direction2 = new BABYLON.Vector3(0, 1, 0);

     ps2.minEmitBox = bbot.getBoundingInfo().boundingBox.minimum;
     ps2.maxEmitBox = bbot.getBoundingInfo().boundingBox.maximum;
     ps2.start();

     ps3 = ps1.clone("ps3", brit);
     ps3.direction1 = new BABYLON.Vector3(-1, 0, 0);
     ps3.direction2 = new BABYLON.Vector3(-1, 0, 0);
     ps3.minEmitBox = brit.getBoundingInfo().boundingBox.minimum;
     ps3.maxEmitBox = brit.getBoundingInfo().boundingBox.maximum;
     ps3.start();
     
 
     ps4 = ps3.clone("ps4", blef);
     ps4.direction1 = new BABYLON.Vector3(1, 0, 0);
     ps4.direction2 = new BABYLON.Vector3(1, 0, 0);
     // ps4.minEmitBox = bbot.getBoundingInfo().boundingBox.minimum;
     // ps4.maxEmitBox = bbot.getBoundingInfo().boundingBox.maximum;
     ps4.start();
 
    


     ///    ++++++ EVENT LISTENERS +++++++     ///
     ///    ++++++ EVENT LISTENERS +++++++     ///
     ///    ++++++ EVENT LISTENERS +++++++     ///

     //todo throttling
     window.addEventListener("mousemove", function (event) {
        //console.log(scene.pointerX, scene.pointerY, event);
        const mouseY = scene.pointerY/canvas.height
        const mouseX = scene.pointerX/canvas.width

        //top particles
        ps1.direction1 = new BABYLON.Vector3(2*(mouseX-0.5), -mouseY, 0);
        ps1.direction2 = new BABYLON.Vector3(2*(mouseX-0.5), -mouseY, 0);
        //bottom particles
        ps2.direction1 = new BABYLON.Vector3(2*(mouseX-0.5), 1-mouseY, 0);
        ps2.direction2 = new BABYLON.Vector3(2*(mouseX-0.5), 1-mouseY, 0);
        //right particles
        ps3.direction1 = new BABYLON.Vector3(2*(mouseX-1), 1-mouseY, 0);
        ps3.direction2 = new BABYLON.Vector3(2*(mouseX-1), 1-mouseY, 0);
        //left particles
        ps4.direction1 = new BABYLON.Vector3(2*(mouseX), 1-mouseY, 0);
        ps4.direction2 = new BABYLON.Vector3(2*(mouseX), 1-mouseY, 0);
        
		// We try to pick an object
   		// var pickResult = scene.pick(scene.pointerX, scene.pointerY);
    });
    
    ///    ++++++ EVENT LISTENERS +++++++     ///
    ///    ++++++ EVENT LISTENERS +++++++     ///
    ///    ++++++ EVENT LISTENERS +++++++     ///
 
     
   
 
    //  scene.registerBeforeRender(function(){
    //      // camera.rotation.z += BABYLON.Angle.FromDegrees(2).radians();
    //  });
 
     return scene;
 
};
