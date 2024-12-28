const activeClassForTab =
  "btn tab rounded-0 border-bottom border-primary border-top-0 border-start-0 border-end-0 px-0";

function toggleTab(e) {
  resetDataElemsAndTabs();
  const tabId = e.target.getAttribute("data-tab-toggle");
  document.getElementById(tabId).classList.toggle("d-none");
  document.getElementById(tabId).classList.toggle("active");
  e.target.className = activeClassForTab;
}

function resetDataElemsAndTabs(setFirstElem) {
  const tabDataElems = document.getElementsByClassName("tab-data");
  const tabs = document.getElementsByClassName("tab");
  for (const elem of tabDataElems) {
    elem.classList.add("d-none");
    elem.classList.remove("active");
  }
  for (const tab of tabs) {
    tab.className = "btn tab border-0 px-0";
  }
  if (setFirstElem) {
    tabDataElems[0].classList.toggle("d-none");
    tabDataElems[0].classList.add("active");
    tabs[0].className = activeClassForTab;
  }
}

function init() {
  resetDataElemsAndTabs(true);
}

window.addEventListener("DOMContentLoaded", init);
