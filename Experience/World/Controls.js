import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.room = this.experience.world.room.actualRoom;
    this.room.children.forEach((child) => {
      if (child.type === "PointLight") {
        this.light = child;
      }
    });
    GSAP.registerPlugin(ScrollTrigger);

    this.setScrollTrigger();
  }

  setScrollTrigger() {
    ScrollTrigger.matchMedia({
      //Desktop
      "(min-width: 969px)": () => {
        this.room.scale.set(0.35, 0.35, 0.35);
        // First Section--------------------------------------------
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        this.firstMoveTimeline.to(this.room.position, {
          x: () => {
            return this.sizes.width * 0.0016;
          },
        });

        // Second Section--------------------------------------------
        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        this.secondMoveTimeline.to(
          this.room.position,
          {
            x: () => {
              return 1.2;
            },
            z: () => {
              return this.sizes.height * 0.007;
            },
          },
          "same"
        );
        this.secondMoveTimeline.to(
          this.room.scale,
          {
            x: 1.1,
            y: 1.1,
            z: 1.1,
          },
          "same"
        );
        this.secondMoveTimeline.to(
          this.light,
          {
            width: 1 * 30,
            height: 1 * 30,
          },
          "same"
        );

        // Third Section--------------------------------------------
        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        this.thirdMoveTimeline.to(
          this.camera.orthographicCamera.position,
          {
            y: 5,
            x: 2.5,
            z: 5,
          },
          "same"
        );

        // this.thirdMoveTimeline.to(
        //   this.camera.orthographicCamera.rotate(),

        //   "same"
        // );
        this.thirdMoveTimeline.to(
          this.camera.orthographicCamera.scale,
          {
            y: 0.5,
            x: 0.5,
          },
          "same"
        );
      },

      //Mobile
      "(max-width: 968px)": () => {
        //Resets
        this.room.scale.set(0.15, 0.15, 0.15);
        this.room.position.set(0, 0, 0);
        // First Section--------------------------------------------
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        this.firstMoveTimeline.to(this.room.scale, {
          x: 0.25,
          y: 0.25,
          z: 0.25,
        }),
          // Second Section--------------------------------------------
          (this.secondMoveTimeline = new GSAP.timeline(
            {
              scrollTrigger: {
                trigger: ".second-move",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            },
            "same"
          ));
        this.secondMoveTimeline.to(
          this.room.scale,
          {
            x: 1,
            y: 1,
            z: 1,
          },
          "same"
        );
        this.secondMoveTimeline.to(
          this.room.position,
          {
            x: 3.5,
            z: 4.5,
          },
          "same"
        );
        // Third Section--------------------------------------------
        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        this.thirdMoveTimeline.to(
          this.room.scale,
          {
            x: 2,
            y: 2,
            z: 2,
          },
          "same"
        );
        this.thirdMoveTimeline.to(
          this.room.position,
          {
            x: -4.25,
            z: 21,
          },
          "same"
        );
      },
      all: function () {},
    });
  }

  resize() {}

  update() {}
}
