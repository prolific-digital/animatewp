import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".has-animation").forEach((element) => {
    const duration =
      parseFloat(element.getAttribute("data-animation-duration")) || 1;
    const delay = parseFloat(element.getAttribute("data-animation-delay")) || 0;
    const ease = element.getAttribute("data-animation-ease") || "power1.inOut";
    const loop = element.getAttribute("data-loop-animation") === "true";
    const autoPlay =
      element.getAttribute("data-auto-play-animation") === "true";
    const x = parseFloat(element.getAttribute("data-animation-x")) || 0;
    const y = parseFloat(element.getAttribute("data-animation-y")) || 0;
    const xPercent =
      parseFloat(element.getAttribute("data-animation-x-percent")) || 0;
    const yPercent =
      parseFloat(element.getAttribute("data-animation-y-percent")) || 0;
    const scale = parseFloat(element.getAttribute("data-animation-scale")) || 1;
    const scaleX =
      parseFloat(element.getAttribute("data-animation-scale-x")) || 1;
    const scaleY =
      parseFloat(element.getAttribute("data-animation-scale-y")) || 1;
    const rotation =
      parseFloat(element.getAttribute("data-animation-rotation")) || 0;
    const skew = parseFloat(element.getAttribute("data-animation-skew")) || 0;
    const skewX =
      parseFloat(element.getAttribute("data-animation-skew-x")) || 0;
    const skewY =
      parseFloat(element.getAttribute("data-animation-skew-y")) || 0;
    const opacity =
      parseFloat(element.getAttribute("data-animation-opacity")) || 1;
    const autoAlpha =
      parseFloat(element.getAttribute("data-animation-auto-alpha")) ?? 1;
    const repeat =
      parseInt(element.getAttribute("data-animation-repeat"), 10) || 0;
    const yoYo = element.getAttribute("data-animation-yoyo") === "true";
    const enableScrollTrigger =
      element.getAttribute("data-scroll-trigger") === "true";
    const scrollTriggerStart =
      element.getAttribute("data-scroll-trigger-start") || "top center";
    const scrollTriggerEnd =
      element.getAttribute("data-scroll-trigger-end") || "bottom center";
    const scrollTriggerToggleActions =
      element.getAttribute("data-scroll-trigger-toggle-actions") ||
      "play none none none";
    const scrollTriggerStartOffset = parseFloat(
      element.getAttribute("data-scroll-trigger-start-offset")
    );

    const animationConfig = {
      duration: duration,
      delay: delay,
      ease: ease,
      x: x,
      y: y,
      xPercent: xPercent,
      yPercent: yPercent,
      scale: scale,
      // scaleX: scaleX,
      // scaleY: scaleY,
      rotation: rotation,
      // skew: skew,
      // skewX: skewX,
      // skewY: skewY,
      // opacity: opacity,
      autoAlpha: autoAlpha,
      repeat: repeat,
      yoyo: yoYo,
      paused: !autoPlay,
    };

    console.log(autoAlpha);

    if (enableScrollTrigger) {
      animationConfig.scrollTrigger = {
        trigger: element,
        start: `${scrollTriggerStart}+=${scrollTriggerStartOffset}`,
        end: scrollTriggerEnd,
        toggleActions: scrollTriggerToggleActions,
      };
    }

    const animation = gsap.from(element, animationConfig);

    if (autoPlay) {
      animation.play();
    }
  });
});
