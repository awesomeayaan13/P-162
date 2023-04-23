AFRAME.registerComponent("bowlingball", {
    init: function () {
      this.shootBall();
    },
    shootBall: function () {
      window.addEventListener("keydown", (e) => {
        if (e.key === "z") {
          var ball = document.createElement("a-entity");
  
          ball.setAttribute("geometry", {
            primitive: "sphere",
            radius: 0.5,
          });
  
          ball.setAttribute("material", "color", "black");
  
          var cam = document.querySelector("#camera");
  
          pos = cam.getAttribute("position");
  
          ball.setAttribute("position", {
            x: pos.x,
            y: pos.y,
            z: pos.z,
          });
  
          var camera = document.querySelector("#camera").object3D;
  
          //get the camera direction as Three.js Vector
          var direction = new THREE.Vector3();
          camera.getWorldDirection(direction);
  
          //set the velocity and it's direction
          ball.setAttribute("velocity", direction.multiplyScalar(-10));
          ball.setAttribute("dynamic-body",{shape:"sphere",mass:"0"})
          ball.addEventListener("collide",this.removeBall)
          var scene = document.querySelector("#scene");
  
          scene.appendChild(ball);
        }
      });
    },
    removeBall: function (e) {
   
      console.log(e.detail.target.el);
  
      
      console.log(e.detail.body.el);
  
      
      var element=e.detail.target.el
  
  
      
      var elementHit=e.detail.body.el
  
      if (elementHit.id.includes("pin")) 
        {
          
          elementHit.setAttribute("material",{opacity:1,transparent:true})
  
          //impulse and point vector
          var impulse=new CANNON.Vec3(0,1,-15)
          var worldPoint=new CANNON.Vec3().copy(elementHit.getAttribute("position"))
          elementHit.body.applyImpulse(impulse,worldPoint)
  
          //remove event listener
          element.removeEventListener("collide", this.removeball)
          
          //remove the bullets from the scene
          var scene=document.querySelector("#scene")
          scene.removeChild(element)
      }
    },
  });
  
  