import barba from "@barba/core";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const initAnimations = () => {
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
    const scale = parseFloat(element.getAttribute("data-animation-scale")) ?? 1;
    const rotation =
      parseFloat(element.getAttribute("data-animation-rotation")) || 0;
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
      rotation: rotation,
      autoAlpha: autoAlpha,
      repeat: repeat,
      yoyo: yoYo,
      paused: !autoPlay,
    };

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
};

document.addEventListener("DOMContentLoaded", () => {
  initAnimations();
});

document.addEventListener("DOMContentLoaded", function () {
  const transitionDuration = 1;
  const transitionEasing = "power1.inOut";

  const fetchHeadContent = async (url) => {
    const response = await fetch(url);
    const text = await response.text();
    const doc = new DOMParser().parseFromString(text, "text/html");
    return doc.head.innerHTML;
  };

  const updateHead = async (newHeadHTML) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = newHeadHTML;

    // Remove old head tags not present in new head
    document.head
      .querySelectorAll("script, link, meta, title")
      .forEach((oldTag) => {
        const newTag = tempDiv.querySelector(
          `[${oldTag.tagName.toLowerCase()}]`
        );
        if (!newTag) oldTag.remove();
      });

    // Add new head tags not present in old head
    tempDiv.querySelectorAll("script, link, meta, title").forEach((newTag) => {
      const oldTag = document.head.querySelector(
        `[${newTag.tagName.toLowerCase()}]`
      );
      if (!oldTag) document.head.appendChild(newTag);
    });
  };

  const initBarba = () => {
    const mainContent = document.querySelector('main[data-barba="container"]');
    if (mainContent) {
      // Initialize Barba
      barba.init({
        transitions: [
          {
            name: "height-transition",
            leave(data) {
              const done = this.async();

              // Animate the opacity of the current container
              gsap.to(data.current.container, {
                opacity: 0,
                duration: transitionDuration,
                ease: transitionEasing,
                onComplete: () => {
                  // Collapse the height immediately after the opacity transition
                  gsap.set(data.current.container, {
                    height: 0,
                    marginTop: 0,
                  });
                  done();
                },
              });
            },
            enter: async function (data) {
              const done = this.async();

              // Ensure the incoming container has no height initially
              gsap.set(data.next.container, {
                opacity: 0,
              });

              // Update the head content
              const newHeadHTML = await fetchHeadContent(data.next.url.href); // Correctly extracting the URL
              await updateHead(newHeadHTML);

              // Expand the height of the incoming container and animate its opacity
              gsap.to(data.next.container, {
                opacity: 1,
                duration: transitionDuration,
                ease: transitionEasing,
                onComplete: done,
              });

              initAnimations();
            },
          },
        ],
        debug: true, // Enable debugging to identify issues
      });
    } else {
      console.warn("Barba.js: No main content found, retrying...");
      setTimeout(initBarba, 100);
    }
  };

  initBarba();
});
