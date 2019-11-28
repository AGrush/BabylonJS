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
  //arbitrary object for planet
  planet1.orbit = {
    radius: planet1.position.x,
    speed: 0.01,
    angle: 0
  };
  
  var planet2 = BABYLON.Mesh.CreateSphere('planet2', 16, 1, scene);
  planet2.position.x = 6;
  planet2.material = planetMaterial;
  planet2.orbit = {
    radius: planet2.position.x,
    speed: -0.01,
    angle: 0
  };
  
  var planet3 = BABYLON.Mesh.CreateSphere('planet3', 16, 1, scene);
  planet3.position.x = 8;
  planet3.material = planetMaterial;
  planet3.orbit = {
    radius: planet3.position.x,
    speed: 0.02,
    angle: 0
  };
 
  //skybox
  var skybox = BABYLON.Mesh.CreateBox('skybox', 1000, scene);
  var skyboxMaterial = new BABYLON.StandardMaterial('skyboxMat', scene);
  
  //dont render what we cant see
  skyboxMaterial.backFaceCulling = false;
  
  //move with camera
  skybox.infiniteDistance = true;
  
  skybox.material = skyboxMaterial;
  
  //remove reflection in skybox
  skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  
  //texture of 6 sides of the cube
  skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('assets/images/skybox', scene);
  skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
  
  //thing method allows you to animate / move things
  scene.beforeRender = function() {
    planet1.position.x = planet1.orbit.radius * Math.sin(planet1.orbit.angle);
    planet1.position.z = planet1.orbit.radius * Math.cos(planet1.orbit.angle);
    planet1.orbit.angle += planet1.orbit.speed;
    
    planet2.position.x = planet2.orbit.radius * Math.sin(planet2.orbit.angle);
    planet2.position.z = planet2.orbit.radius * Math.cos(planet2.orbit.angle);
    planet2.orbit.angle += planet2.orbit.speed;
    
    planet3.position.x = planet3.orbit.radius * Math.sin(planet3.orbit.angle);
    planet3.position.z = planet3.orbit.radius * Math.cos(planet3.orbit.angle);
    planet3.orbit.angle += planet3.orbit.speed;
  };
  
  engine.runRenderLoop(function () {
    scene.render();
  });

  // the canvas/window resize event handler
  window.addEventListener('resize', function(){
    engine.resize();
  });
};
