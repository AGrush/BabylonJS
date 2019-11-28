/// <reference path="../../dist/babylon.d.ts" />

var BjsApp = BjsApp || {};

BjsApp.init = function(){
  //get the canvas
  var canvas = document.getElementById('renderCanvas');

  //create a BabylonJS engine object, true for antialias
  var engine = new BABYLON.Engine(canvas, true);

  engine.runRenderLoop(function () {
    scene.render();
  });

  // the canvas/window resize event handler
  window.addEventListener('resize', function(){
    engine.resize();
  });

  // This creates a basic Babylon Scene object (non-mesh)
  var scene = new BABYLON.Scene(engine);

  var camera = new BABYLON.ArcRotateCamera("Camera", - Math.PI / 2, Math.PI / 4, 10, BABYLON.Vector3.Zero(), scene);

  camera.attachControl(canvas, true);

  var light1 = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 1), scene);
  var light2 = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);   
  light1.intensity =0.75;
  light2.intensity =0.5;

  var box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
  box.position.x = 2;

  var frameRate = 10;

  //Position Animation
  var xSlide = new BABYLON.Animation("xSlide", "position.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
  
  var keyFramesP = []; 

  keyFramesP.push({
      frame: 0,
      value: 2
  });

  keyFramesP.push({
      frame: frameRate,
      value: -2
  });

  keyFramesP.push({
      frame: 2 * frameRate,
      value: 2
  });


  xSlide.setKeys(keyFramesP);

  //Rotation Animation
  var yRot = new BABYLON.Animation("yRot", "rotation.y", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

  var keyFramesR = []; 

  keyFramesR.push({
      frame: 0,
      value: 0
  });

  keyFramesR.push({
      frame: frameRate,
      value: Math.PI
  });

  keyFramesR.push({
      frame: 2 * frameRate,
      value: 2 * Math.PI
  });


  yRot.setKeys(keyFramesR);

  scene.beginDirectAnimation(box, [xSlide, yRot], 0, 2 * frameRate, true);

  return scene;
};
