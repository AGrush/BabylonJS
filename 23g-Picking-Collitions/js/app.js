/// <reference path="../../dist/babylon.d.ts" />

var BjsApp = BjsApp || {};

BjsApp.init = function () {
    //get the canvas
    var canvas = document.getElementById('renderCanvas');

    //create a BabylonJS engine object, true for antialias
    var engine = new BABYLON.Engine(canvas, true);

    var scene = new BABYLON.Scene(engine);

    // setup environment
    var freeCamera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 5, -30), scene);
    
    freeCamera.attachControl(canvas, true);

    //create ground
	var ground = BABYLON.Mesh.CreateGround('ground1', 50, 50, 2, scene);
	var grass = new BABYLON.StandardMaterial('grass', scene);
	grass.diffuseTexture = new BABYLON.Texture('assets/images/grass.jpg', scene);
	grass.diffuseTexture.uScale = 3;
    grass.diffuseTexture.vScale = 5;
    ground.material = grass; 

    //stop stuff from reflecting light
    grass.specularColor = new BABYLON.Color3(0, 0, 0);

    //create door
    var box = BABYLON.MeshBuilder.CreateBox("box", { height: 5, width: 2, depth: 0.15 }, scene);
    box.material = new BABYLON.StandardMaterial("Mat", scene);
    box.material.diffuseTexture = new BABYLON.Texture("assets/images/planks.jpg", scene);
    box.material.diffuseTexture.hasAlpha = true;
    box.position.x = -0.04;
    box.position.y = 2.5; 
    box.rotation.y = 0.8;

    //var light1 = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 1), scene);
    var light2 = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);
    var light3 = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(-1, 0, -2), scene);
    //light1.intensity =0.75;
    light2.intensity = 0.5;
    light3.intensity = 0.5;

    
    // ?????????? //

    // Impact impostor
    // var impact = BABYLON.Mesh.CreatePlane("impact", 1, scene);
    // impact.material = new BABYLON.StandardMaterial("impactMat", scene);
    // impact.material.diffuseTexture = new BABYLON.Texture("assets/images/impact.png", scene);
    var impact = BABYLON.Mesh.CreateSphere("",10,1,scene);
    impact.material = new BABYLON.StandardMaterial("impactMat", scene);
    impact.material.diffuseColor= new BABYLON.Color3.Red;

    //impact.material.diffuseTexture.hasAlpha = true;
    impact.position = new BABYLON.Vector3(0, 0, -0.1);

    //Wall
    var wall = BABYLON.Mesh.CreatePlane("wall", 20.0, scene);
    wall.material = new BABYLON.StandardMaterial("wallMat", scene);
    wall.material.diffuseTexture = new BABYLON.Texture("assets/images/urbanconcrete.jpg", scene);
    //dont render what we cant see
    wall.backFaceCulling = true;

    wall.rotation.y = 0.8;
    impact.parent = wall;

    var grid = Array(
        { 
            startX: -10,
            startY: 0,
            endX: -5,
            endY: 10,
            value: "GRID CELL 1"
        },
        { 
            startX: -5,
            startY: 0,
            endX: 0,
            endY: 10,
            value: "GRID CELL 2"
        },
        { 
            startX: 0,
            startY: 0,
            endX: 5,
            endY: 10,
            value: "GRID CELL 3"
        },
        { 
            startX: 5,
            startY: 0,
            endX: 10,
            endY: 10,
            value: "GRID CELL 4"
        }
    )

    //When pointer down event is raised
    scene.onPointerDown = function (evt, pickResult) {
        // if the click hits the ground object, we change the impact position
        if (pickResult.hit) {

            var ry = wall.rotation.y;
           
            var factorX = Math.tan(ry)/Math.sin(ry);
            var factorY = 1; // only a single rotation using Y axis for testing

            if(!ry){ factorX = 1; }

            impact.position.x = pickResult.pickedPoint.x * factorX;
            impact.position.y = pickResult.pickedPoint.y * factorY;

            for(var p=0;p<grid.length;p++){

                if((impact.position.x >= grid[p].startX) && (impact.position.x <= grid[p].endX) && (impact.position.y >= grid[p].startY) && (impact.position.y <= grid[p].endY)){

                    console.log(grid[p].value);

                }

            }
           
        }
    };

    scene.registerBeforeRender(function(){

        //wall.rotation.y+= 0.01;
        //console.log("SIN:",Math.sin(wall.rotation.y));

        //impact.position.x = 10*Math.sin(wall.rotation.y);

        //console.log(impact.position.x);

    });

    engine.runRenderLoop(function () {
        scene.render();
    });

    return scene;
};