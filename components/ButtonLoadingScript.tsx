"use client";

// This component injects a script to handle button loading states
import { useEffect, useState } from "react";

export default function ButtonLoadingScript() {
  // Using useState to ensure consistent rendering between server and client
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    // Set isClient to true once on the client side
    setIsClient(true);
    
    function initButtonLoadingHandlers() {
      // Handle clicks on all buttons with the btn-primary class
      document.addEventListener("click", function (event) {
        const target = event.target as HTMLElement;
        // Find the button element that was clicked or contains the clicked element
        const button = target.closest(".btn-primary");

        if (button && button.getAttribute("data-loading-state") === "false") {
          // Set loading state
          button.setAttribute("data-loading-state", "true");
          button.classList.add("opacity-70");

          // Find and toggle text/loading elements if they exist
          const textElem = button.querySelector(".btn-text");
          const loadingElem = button.querySelector(".btn-loading");

          if (textElem) textElem.classList.add("hidden");
          if (loadingElem) loadingElem.classList.remove("hidden");
        }
      });

      // Reset all button states when page unloads (navigation)
      window.addEventListener("beforeunload", resetAllButtonStates);

      // Create a MutationObserver to watch for navigation events in SPA
      const observer = new MutationObserver(function (mutations) {
        // Check if relevant DOM changes indicate a navigation
        const navigationOccurred = mutations.some(function (mutation) {
          // Look for changes that might indicate navigation
          return (
            (mutation.type === "childList" &&
              (mutation.target as Element).nodeName === "MAIN") ||
            mutation.addedNodes.length > 0
          );
        });

        if (navigationOccurred) {
          resetAllButtonStates();
        }
      });

      // Start observing the document body with the configured parameters
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    function resetAllButtonStates() {
      document
        .querySelectorAll('.btn-primary[data-loading-state="true"]')
        .forEach(function (button) {
          button.setAttribute("data-loading-state", "false");
          button.classList.remove("opacity-70");

          const textElem = button.querySelector(".btn-text");
          const loadingElem = button.querySelector(".btn-loading");

          if (textElem) textElem.classList.remove("hidden");
          if (loadingElem) loadingElem.classList.add("hidden");
        });
    }

    // Initialize once when component mounts (only on client side)
    if (isClient) {
      initButtonLoadingHandlers();
    }

    // Cleanup on unmount
    return () => {
      window.removeEventListener("beforeunload", resetAllButtonStates);
    };
  }, [isClient]);

  // Return an empty script tag - this ensures consistent DOM structure between server and client
  return <script id="button-loading-script" type="text/javascript" />;
}
