/// <reference path="babylon.2.1.d.ts" />

var BjsApp = BjsApp || {};

BjsApp.init = function(){
  //get the canvas
  var canvas = document.getElementById('renderCanvas');

  //create a BabylonJS engine object, true for antialias
  var engine = new BABYLON.Engine(canvas, true);

  //create a scene
  var scene = new BABYLON.Scene(engine);

  //create a camera
  var camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 15, BABYLON.Vector3.Zero(), scene);
  
  //let the user move the camera
  camera.attachControl(canvas);
  
  //light
  var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
  light.intensity = 0.5;
  light.groundColor = new BABYLON.Color3(0, 0, 1);
  
  scene.clearColor = new BABYLON.Color3(0,0,0);
  
  var sun = BABYLON.Mesh.CreateSphere('sun', 16, 4, scene);
  
  //planets
  var planetMaterial = new BABYLON.StandardMaterial('planetMat', scene);
  planetMaterial.diffuseTexture = new BABYLON.Texture('assets/images/sand.jpg', scene);
  planetMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  
  var planet1 = BABYLON.Mesh.CreateSphere('planet1', 16, 1, scene);
  planet1.position.x = 4;
  planet1.material = planetMaterial;
 
  
  engine.runRenderLoop(function () {
    scene.render();
  });

  // the canvas/window resize event handler
  window.addEventListener('resize', function(){
    engine.resize();
  });
};
