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

  //dont let camera go further than 50 radius  (can set min max limit too)
  camera.upperRadiusLimit = 50;
  camera.lowerRadiusLimit = 8;

  //var light1 = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 1), scene);
  var light2 = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);   
  var light3 = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(-1, 0, -2), scene);   
  //light1.intensity =0.75;
  light2.intensity =0.5;
  light3.intensity =0.5;

  var box = BABYLON.MeshBuilder.CreateBox("box", {height: 5, width: 2, depth: 0.5}, scene);
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


  var animationSlideRotatescene = scene.beginDirectAnimation(box, [xSlide, yRot], 0, 2 * frameRate, true);

  scene.onPointerObservable.add((pointerInfo) => {
      switch (pointerInfo.type) {
          case BABYLON.PointerEventTypes.POINTERDOWN:
              light2.intensity =0.95;
              animationSlideRotatescene.pause();
              box.scaling = new BABYLON.Vector3(4, 1, -1)
              console.log("POINTER DOWN");
              break;
          case BABYLON.PointerEventTypes.POINTERUP:
              light2.intensity =0.15;
              animationSlideRotatescene.restart();
              box.scaling = new BABYLON.Vector3(1, 1, 1)
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
