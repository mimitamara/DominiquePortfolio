import "./style.css";
import Experience from "./Experience/Experience.js";

// document.addEventListener('DOMContentLoaded', function () {
//     var lastScrollTime = 0;
//     var scrollSpeed = 0.1; // Adjust this value to change the scroll speed
//     
//     function throttle(callback, limit) {
//         var wait = false;
//         return function () {
//             if (!wait) {
//                 callback.apply(null, arguments);
//                 wait = true;
//                 setTimeout(function () {
//                     wait = false;
//                 }, limit);
//             }
//         };
//     }
//
//     // Wheel event listener
//     window.addEventListener('wheel', throttle(function (event) {
//         event.preventDefault();
//         var now = new Date().getTime();
//         var scrollDelta = event.deltaY;
//         var adjustedDelta = scrollDelta * scrollSpeed;
//         window.scrollBy(0, adjustedDelta);
//         lastScrollTime = now;
//     }, 20), { passive: false }); // Set passive to false to prevent the warning
//
//     // Touch event listener
//     window.addEventListener('touchmove', throttle(function (event) {
//         event.preventDefault();
//         var now = new Date().getTime();
//         var touchDelta = event.changedTouches[0].clientY;
//         var adjustedDelta = touchDelta * scrollSpeed;
//         window.scrollBy(0, adjustedDelta);
//         lastScrollTime = now;
//     }, 20), { passive: false }); // Set passive to false to prevent the warning
//
//     // Scrollbar drag event listener (for browsers that support non-passive scroll events)
//     // window.addEventListener('scroll', throttle(function (event) {
//     //     event.preventDefault();
//     //     var now = new Date().getTime();
//     //     var scrollDelta = window.scrollY - lastScrollTime;
//     //     var adjustedDelta = scrollDelta * scrollSpeed;
//     //     window.scrollBy(0, adjustedDelta);
//     //     lastScrollTime = now;
//     // }, 20));
// });

const experience = new Experience(document.querySelector(".experience-canvas"));
