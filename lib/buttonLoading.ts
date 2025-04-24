export function initButtonLoadingHandlers() {
  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const button = target.closest(".btn-primary");

    if (button && button.getAttribute("data-loading-state") === "false") {
      button.setAttribute("data-loading-state", "true");
      button.classList.add("opacity-70");

      const textElem = button.querySelector(".btn-text");
      const loadingElem = button.querySelector(".btn-loading");

      if (textElem) textElem.classList.add("hidden");
      if (loadingElem) loadingElem.classList.remove("hidden");
    }
  });

  window.addEventListener("beforeunload", resetAllButtonStates);

  observeNavigationChanges();
}

export function resetAllButtonStates() {
  document
    .querySelectorAll('.btn-primary[data-loading-state="true"]')
    .forEach((button) => {
      button.setAttribute("data-loading-state", "false");
      button.classList.remove("opacity-70");

      const textElem = button.querySelector(".btn-text");
      const loadingElem = button.querySelector(".btn-loading");

      if (textElem) textElem.classList.remove("hidden");
      if (loadingElem) loadingElem.classList.add("hidden");
    });
}

function observeNavigationChanges() {
  const observer = new MutationObserver((mutations) => {
    const navigationOccurred = mutations.some((mutation) => {
      return (
        (mutation.type === "childList" &&
          (mutation.target as Element).tagName === "MAIN") ||
        mutation.addedNodes.length > 0
      );
    });

    if (navigationOccurred) {
      resetAllButtonStates();
    }
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
