"use client";
import React from "react";

const ButtonLoadingScript = () => {
  React.useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const buttonOrLink = target.closest<
        HTMLAnchorElement | HTMLButtonElement
      >("[data-loading-button]");

      if (buttonOrLink) {
        const originalTextSpan = buttonOrLink.querySelector(".btn-text");
        if (originalTextSpan) {
          originalTextSpan.textContent = "Loading...";
        }
        buttonOrLink.setAttribute("disabled", "true");
        buttonOrLink.style.pointerEvents = "none";
        buttonOrLink.style.opacity = "0.5";
        buttonOrLink.classList.add("loading");
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      document
        .querySelectorAll<HTMLAnchorElement | HTMLButtonElement>(
          "[data-loading-button].loading"
        )
        .forEach((btn) => {
          const originalTextSpan = btn.querySelector(".btn-text");
          if (originalTextSpan) {
          }
          btn.removeAttribute("disabled");
          btn.style.pointerEvents = "";
          btn.classList.remove("loading");
        });
    };
  }, []);

  return null;
};

export default ButtonLoadingScript;
