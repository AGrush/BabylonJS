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
  
  //dont let camera go further than 50 radius (can set lower limit too)
  camera.upperRadiusLimit = 50;
  
  //light
  var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
  light.intensity = 0.5;
  light.groundColor = new BABYLON.Color3(0, 0, 1);
  
  scene.clearColor = new BABYLON.Color3(0,0,0);
  
  //sun
  var sun = BABYLON.Mesh.CreateSphere('sun', 16, 4, scene);
  var sunMaterial = new BABYLON.StandardMaterial('sunMaterial', scene);
  sunMaterial.emissiveTexture = new BABYLON.Texture('assets/images/sun.jpg', scene);
  sunMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  sunMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  
  sun.material = sunMaterial;
  
  //sun light
  var sunLight = new BABYLON.PointLight('sunLight', BABYLON.Vector3.Zero(), scene);
  sunLight.intensity = 2;
  
  
  //planets
  var planetMaterial = new BABYLON.StandardMaterial('planetMat', scene);
  planetMaterial.diffuseTexture = new BABYLON.Texture('assets/images/sand.jpg', scene);
  planetMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  
  var planet1 = BABYLON.Mesh.CreateSphere('planet1', 16, 1, scene);
  planet1.position.x = 4;
  planet1.material = planetMaterial;
 
  //skybox
  var skybox = BABYLON.Mesh.CreateBox('skybox', 1000, scene);
  var skyboxMaterial = new BABYLON.StandardMaterial('skyboxMat', scene);
  
  //dont render what we cant see
  skyboxMaterial.backFaceCulling = false;
  
  //move skybox with camera
  skybox.infiniteDistance = true;
  
  skybox.material = skyboxMaterial;
  
  //remove reflection in skybox
  skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  
  //texture of 6 sides of the cube
  skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('assets/images/skybox', scene);
  skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
  
  engine.runRenderLoop(function () {
    scene.render();
  });

  // the canvas/window resize event handler
  window.addEventListener('resize', function(){
    engine.resize();
  });
};
