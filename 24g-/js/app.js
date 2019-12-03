/// <reference path="../../dist/babylon.d.ts" />

var BjsApp = BjsApp || {};

BjsApp.init = function () {
    //get the canvas
    var canvas = document.getElementById('renderCanvas');

    //create a BabylonJS engine object, true for antialias
    var engine = new BABYLON.Engine(canvas, true);

    var scene = new BABYLON.Scene(engine);



    //create ground
	// var ground = BABYLON.Mesh.CreateGround('ground1', 50, 50, 2, scene);
	// var grass = new BABYLON.StandardMaterial('grass', scene);
	// grass.diffuseTexture = new BABYLON.Texture('assets/images/grass.jpg', scene);
	// grass.diffuseTexture.uScale = 3;
    // grass.diffuseTexture.vScale = 5;
    // ground.material = grass; 

    //stop stuff from reflecting light
    //grass.specularColor = new BABYLON.Color3(0, 0, 0);


    // ????


    var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, false);

    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);

    var ground = BABYLON.Mesh.CreateGround('ground1', 100, 100, 2, scene);
    var materyGr=new BABYLON.StandardMaterial("texture1",scene);
    materyGr.diffuseColor=new BABYLON.Color3(0.1,0.2,0.3);
    ground.material=materyGr;

    var boxes=[]
    var size=2;
    var materyBox1=new BABYLON.StandardMaterial("texture1",scene);
    materyBox1.diffuseTexture=new BABYLON.Texture("assets/images/grass.jpg",scene);
    boxes[0]=BABYLON.Mesh.CreateBox("i0", size, scene);
    boxes[0].material=materyBox1;
    boxes[0].position.y=1;
    boxes[0].checkCollisions=true;
    var x=2;
    var y=1;
    var z=0;

    var m=5;
    var n=5;
    var h=5;
    var neibs=[]

    for(var i=1;i<m*n*h;i++){
        var newBox=boxes[0].clone("i"+i);
        newBox.material=materyBox1;
        if(x==m*size){
            x=0;
            z+=size;
        }
        if(z==n*size){
            z=0;
            y+=size;
        }
        newBox.position=new BABYLON.Vector3(x,y,z);
        newBox.checkCollisions=true;
        x+=size;
        boxes[i]=newBox;
    }

    function ban(){
    for(var i=0;i<boxes.length;i++){
            neibs[i]=[];
            neibs[i][4]=0;
            neibs[i][5]=false;
            if(boxes[i].position.y==1){
                neibs[i][5]=true;
            }
            for(var x=0;x<boxes.length;x++){
                if(neibs[i][4]==4 && neibs[i][5]){
                    break;
                }
                if(x!=i && boxes[i].intersectsMesh(boxes[x],true)){
                    var pointF=new BABYLON.Vector3(boxes[i].position.x,boxes[i].position.y,boxes[i].position.z+2);
                    var pointB=new BABYLON.Vector3(boxes[i].position.x,boxes[i].position.y,boxes[i].position.z-2);
                    var pointL=new BABYLON.Vector3(boxes[i].position.x-2,boxes[i].position.y,boxes[i].position.z);
                    var pointR=new BABYLON.Vector3(boxes[i].position.x+2,boxes[i].position.y,boxes[i].position.z);
                    var pointFD=new BABYLON.Vector3(boxes[i].position.x,boxes[i].position.y-2,boxes[i].position.z+2);
                    var pointBD=new BABYLON.Vector3(boxes[i].position.x,boxes[i].position.y-2,boxes[i].position.z-2);
                    var pointLD=new BABYLON.Vector3(boxes[i].position.x-2,boxes[i].position.y-2,boxes[i].position.z);
                    var pointRD=new BABYLON.Vector3(boxes[i].position.x+2,boxes[i].position.y-2,boxes[i].position.z);
                    var pointU=new BABYLON.Vector3(boxes[i].position.x,boxes[i].position.y-2,boxes[i].position.z);
                    if (boxes[x].intersectsPoint(pointF)){
                        neibs[i][0]=boxes[x];
                        neibs[i][4]++;
                    }
                    else if (boxes[x].intersectsPoint(pointB)){
                        neibs[i][1]=boxes[x];
                        neibs[i][4]++;
                    }
                    else if (boxes[x].intersectsPoint(pointL)){
                        neibs[i][2]=boxes[x];
                        neibs[i][4]++;
                    }
                    else if (boxes[x].intersectsPoint(pointR)){
                        neibs[i][3]=boxes[x];
                        neibs[i][4]++;
                    }
                    else if (!neibs[i][5] && (boxes[x].intersectsPoint(pointFD) || boxes[x].intersectsPoint(pointBD) ||boxes[x].intersectsPoint(pointLD) || boxes[x].intersectsPoint(pointRD) || boxes[x].intersectsPoint(pointU))){
                        neibs[i][5]=true;
                    }
    /*				else if (boxes[x].intersectsPoint(pointBD)){
                        neibs[i][10]=true;
                    }
                    else if (boxes[x].intersectsPoint(pointLD)){
                        neibs[i][10]=true;
                    }
                    else if (boxes[x].intersectsPoint(pointRD)){
                        neibs[i][10]=true;
                    }
                    else if (boxes[x].intersectsPoint(pointU)){
                        neibs[i][10]=true;
                    }
    */
                }
            }
        }
    }                    
    function moves(mesh,indic){
        var ind=boxes.indexOf(mesh);
        var vel;
        switch(indic){
               case 0:vel=new BABYLON.Vector3(0,0,-2);
                       if(neibs[ind][1]!=undefined){
                           moves(neibs[ind][1],indic);
                       }
                       break;
               case 4:vel=new BABYLON.Vector3(0,0,2);
                       if(neibs[ind][0]!=undefined){
                           moves(neibs[ind][0],indic);
                       }
                       break;
               case 8:vel=new BABYLON.Vector3(-2,0,0);
                       if(neibs[ind][2]!=undefined){
                           moves(neibs[ind][2],indic);
                       }
                       break;
               case 12:vel=new BABYLON.Vector3(2,0,0);
                       if(neibs[ind][3]!=undefined){
                           moves(neibs[ind][3],indic);
                       }
                       break;
               default:vel=new BABYLON.Vector3(0,0,0);
                       break;
                       
        }
        boxes[ind].translate(vel,1,BABYLON.Space.GLOBAL);	
        ban();
        falls(ind);
    }
    
    function falls(ind){
            if(boxes[ind].position.y!=1 && !neibs[ind][5] ){
                boxes[ind].translate(new BABYLON.Vector3(0,-2,0),1,BABYLON.Space.GLOBAL);
                ban();
                console.log(neibs[ind]);
                falls(ind);
        }
    }
    window.addEventListener("click", function () {
       // We try to pick an object
       var pickResult = scene.pick(scene.pointerX, scene.pointerY);
    
           if(pickResult.hit && pickResult.pickedMesh!=ground){
               ban();
               var indi=pickResult.pickedMesh.getIndices();
               moves(pickResult.pickedMesh,indi[pickResult.faceId*3]);
    
        }
    });

    scene.gravity = new BABYLON.Vector3(0, -0.981, 0);
    //camera.applyGravity = true;
    camera.ellipsoid = new BABYLON.Vector3(0.5, 0.5, 0.5);
    scene.collisionsEnabled = true;
    camera.checkCollisions = true;
    ground.checkCollisions = true;
    return scene;
    
};