import { EventEmitter } from "events";
import Experience from "./Experience.js";
import GSAP from "gsap";
import convert from "./Utils/convertDivsToSpans.js";

export default class Preloader extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;
    this.world = this.experience.world;
    this.device = this.sizes.device;

    this.sizes.on("switchdevice", (device) => {
      this.device = device;
    });

    this.world.on("worldready", () => {
      this.setAssets();
      this.playIntro();
    });
  }

  setAssets() {
    convert(document.querySelector(".intro-text"));
    convert(document.querySelector(".hero-main-title"));
    convert(document.querySelector(".hero-main-description"));
    convert(document.querySelector(".hero-second-subheading"));

    this.room = this.experience.world.room.actualRoom;
    this.roomChildren = this.experience.world.room.roomChildren;
  }

  firstIntro() {
    return new Promise((resolve) => {
      this.timeline = new GSAP.timeline();
      this.timeline.set(".animatedis", { y: 0, yPercent: 100 });
      this.timeline.to(".preloader", {
        opacity: 0,
        delay: 1,
        onComplete: () => {
          document.querySelector(".preloader").classList.add("hidden");
        },
      });

      this.timeline
        .to(".intro-text .animatedis", {
          yPercent: 0,
          stagger: 0.05,
          ease: "back.out(1.7)",
        })
        .to(
          ".arrow-svg-wrapper",
          {
            opacity: 1,
          },
          "same"
        )
        .to(
          ".toggle-bar",
          {
            opacity: 1,
            onComplete: resolve,
          },
          "same"
        );
    });
  }

  secondIntro() {
    return new Promise((resolve) => {
      this.secondTimeline = new GSAP.timeline();

      this.secondTimeline
        .to(
          ".intro-text .animatedis",
          {
            yPercent: 100,
            stagger: 0.05,
            ease: "back.in(1.7)",
          },
          "fadeout"
        )
        .to(
          ".arrow-svg-wrapper",
          {
            opacity: 0,
          },
          "fadeout"
        )
        .to(
          this.room.position,
          {
            x: 5,
            y: 5,
            z: 5,
            ease: "power1.out",
          },
          "same"
        )

        //   //       .to(
        //   //         this.camera.orthographicCamera.position,
        //   //         {
        //   //           y: 2.5,
        //   //         },
        //   //         "same"
        //   //       )

        //   //       .set(this.roomChildren.body.scale, {
        //   //         x: 1,
        //   //         y: 1,
        //   //         z: 1,
        //   //       })

        //   //       .to(
        //   //         ".hero-main-title .animatedis",
        //   //         {
        //   //           yPercent: 0,
        //   //           stagger: 0.07,
        //   //           ease: "back.out(1.7)",
        //   //         },
        //   //         "introtext"
        //   //       )
        //   //       .to(
        //   //         ".hero-main-description .animatedis",
        //   //         {
        //   //           yPercent: 0,
        //   //           stagger: 0.07,
        //   //           ease: "back.out(1.7)",
        //   //         },
        //   //         "introtext"
        //   //       )
        //   //       .to(
        //   //         ".hero-second-description .animatedis",
        //   //         {
        //   //           yPercent: 0,
        //   //           stagger: 0.07,
        //   //           ease: "back.out(1.7)",
        //   //         },
        //   //         "introtext"
        //   //       )

        //   //       .to(
        //   //         this.roomChildren.pictureframes.scale,
        //   //         {
        //   //           x: 1,
        //   //           y: 1,
        //   //           z: 1,
        //   //           ease: "back.out(2.2)",
        //   //           duration: 0.5,
        //   //         },
        //   //         ">-0.4"
        //   //       )
        //   //       .to(
        //   //         this.roomChildren.desks.scale,
        //   //         {
        //   //           x: 1,
        //   //           y: 1,
        //   //           z: 1,
        //   //           ease: "back.out(2.2)",
        //   //           duration: 0.5,
        //   //         },
        //   //         ">-0.3"
        //   //       )
        //   //       .to(
        //   //         this.roomChildren.screens.scale,
        //   //         {
        //   //           x: 1,
        //   //           y: 1,
        //   //           z: 1,
        //   //           ease: "back.out(2.2)",
        //   //           duration: 0.5,
        //   //         },
        //   //         ">-0.2"
        //   //       )
        //   //       .to(
        //   //         this.roomChildren.beditems.scale,
        //   //         {
        //   //           x: 1,
        //   //           y: 1,
        //   //           z: 1,
        //   //           ease: "back.out(2.2)",
        //   //           duration: 0.5,
        //   //         },
        //   //         ">-0.1"
        //   //       )
        //   //       .to(
        //   //         this.roomChildren.carpetitems.scale,
        //   //         {
        //   //           x: 1,
        //   //           y: 1,
        //   //           z: 1,
        //   //           ease: "back.out(2.2)",
        //   //           duration: 0.5,
        //   //         },
        //   //         ">-0.1"
        //   //       )
        //   //       // // .to(
        //   //       // //   this.roomChildren.chair.scale,
        //   //       // //   {
        //   //       // //     x: 1,
        //   //       // //     y: 1,
        //   //       // //     z: 1,
        //   //       // //     ease: "back.out(2.2)",
        //   //       // //     duration: 0.5,
        //   //       // //   },
        //   //       // //   "chair"
        //   //       // )
        //   //       // .to(
        //   //       //   this.roomChildren.chair.rotation,
        //   //       //   {
        //   //       //     y: 4 * Math.PI + Math.PI / 4,
        //   //       //     ease: "power2.out",
        //   //       //     duration: 1,
        //   //       //   },
        //   //       //   "chair"
        //   //       // )
        .to(".arrow-svg-wrapper", {
          opacity: 1,
          onComplete: resolve,
        });
    });
  }

  onScroll(e) {
    if (e.deltaY > 0) {
      this.removeEventListeners();
      this.playSecondIntro();
    }
  }

  onTouch(e) {
    this.initalY = e.touches[0].clientY;
  }

  onTouchMove(e) {
    let currentY = e.touches[0].clientY;
    let difference = this.initalY - currentY;
    if (difference > 0) {
      console.log("swipped up");
      this.removeEventListeners();
      this.playSecondIntro();
    }
    this.intialY = null;
  }

  removeEventListeners() {
    window.removeEventListener("wheel", this.scrollOnceEvent);
    window.removeEventListener("touchstart", this.touchStart);
    window.removeEventListener("touchmove", this.touchMove);
  }

  async playIntro() {
    this.scaleFlag = true;
    await this.firstIntro();
    this.moveFlag = true;
    this.emit("enablecontrols");
  }
  async playSecondIntro() {
    this.moveFlag = false;
    await this.secondIntro();
    this.scaleFlag = false;
  }

  scale() {
    this.roomChildren.light.width = 0;
    this.roomChildren.light.height = 0;

    if (this.device === "desktop") {
      this.room.scale.set(0.35, 0.35, 0.35);
    } else {
      this.room.scale.set(0.11, 0.11, 0.11);
    }
  }

  update() {}
}
