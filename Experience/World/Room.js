import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;
    this.roomChildren = {};

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.setModel();
    this.onMouseMove();
  }

  setModel() {
    this.actualRoom.children.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;

      // console.log(child);

      if (child instanceof THREE.Group) {
        child.children.forEach((groupchild) => {
          groupchild.castShadow = true;
          groupchild.receiveShadow = true;

          this.roomChildren[groupchild.name.toLocaleLowerCase()] = groupchild;
        });
      }

      if (child.name === "Screens") {
        child.children[9].material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen,
        });
      }

      child.scale.set(0, 0, 0);
      if (child.name === "cube") {
        //child.scale.set(0.5, 0.5, 0.5);
        child.position.set(0, -0.29, 0);
        child.rotation.y = 4;
      }

      this.roomChildren[child.name.toLowerCase()] = child;
    });

    const light = new THREE.PointLight(0xffffff, 5, 1000);
    light.position.set(-0.038055, -3.84671, 1.63203);
    this.actualRoom.add(light);

    this.roomChildren["light"] = light;

    this.scene.add(this.actualRoom);
    this.actualRoom.scale.set(0.35, 0.35, 0.35);
    //this.actualRoom.rotation.y = Math.PI;
  }

  onMouseMove() {
    window.addEventListener("mousemove", (e) => {
      this.rotation =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerp.target = this.rotation * 0.1;
    });
  }

  resize() {}

  update() {
    // this.lerp.current = GSAP.utils.interpolate(
    //   this.lerp.current,
    //   this.lerp.target,
    //   this.lerp.ease
    // );
    // this.actualRoom.rotation.y = this.lerp.current;
  }
}
