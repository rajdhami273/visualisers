let openOneAtATime = false;
let lastOpenedId;

function toggleOpenOneAtATime(e) {
  openOneAtATime = e.target.checked;
  maybeCloseAllAccordions();
}

function maybeCloseAllAccordions() {
  if (openOneAtATime) {
    // getAll buttons and close them
    const allButtons = document.querySelectorAll(".accordion-button");
    allButtons.forEach((btn) => {
      if (btn.id !== lastOpenedId) {
        !btn.classList.contains("collapsed") && btn.classList.add("collapsed");
        const contentParentId = btn.getAttribute("data-accordion-target");
        document.getElementById(contentParentId).classList.add("d-none");
      }
    });
    // getAll items and close them
  }
}

function toggleAccordion(e) {
  const id = e.target.getAttribute("data-accordion-target");
  e.target.classList.toggle("collapsed");
  document.getElementById(id).classList.toggle("d-none");
  lastOpenedId = e.target.id;
  maybeCloseAllAccordions();
}

const accordionContainer = document.getElementById("accordion-container");
function init() {
  const fragment = document.createDocumentFragment();
  new Array(6).fill(undefined).forEach((_, idx) => {
    const accordionItem = new DOMParser().parseFromString(
      `<div class="accordion-item">
            <button
              class="accordion-button collapsed"
              onclick="toggleAccordion(event)"
              id="accordion-btn-${idx}"
              data-accordion-target="accordion-${idx}"
            >
              Click me to open ${idx + 1}
            </button>
            <div id="accordion-${idx}" class="accordion-collapse d-none">
              <div class="accordion-body">
                <strong>This is the ${
                  idx + 1
                } item's accordion body.</strong> It is
                shown by default, until the collapse plugin adds the appropriate
                classes that we use to style each element. These classes control
                the overall appearance, as well as the showing and hiding via
                CSS transitions. You can modify any of this with custom CSS or
                overriding our default variables. It's also worth noting that
                just about any HTML can go within the
                <code>.accordion-body</code>, though the transition does limit
                overflow.
              </div>
            </div>
          </div>`,
      "text/html"
    );
    fragment.append(accordionItem.body.firstChild);
  });

  accordionContainer.append(fragment);
}

init();
