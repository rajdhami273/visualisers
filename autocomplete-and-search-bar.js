const searchResultsContainer = document.getElementById(
  "search-result-container"
);

let searchResults = [];
let showResults = false;
const cache = {};

function toggleShowResults() {
  showResults = !showResults;
  if (showResults) {
    setSearchResults(searchResults);
  } else {
    setSearchResults([]);
  }
}

function debounce(func, time) {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
    timer = setTimeout(() => {
      func.bind(this)(...args);
      clearTimeout(timer);
      timer = undefined;
    }, time);
  };
}

function setSearchResults(results) {
  searchResultsContainer.innerHTML = "";
  const fragment = document.createDocumentFragment();
  for (let res of results) {
    const li = document.createElement("li");
    li.className =
      "list-group-item border list-group-item-action border-top-0 cursor-pointer pe-auto";
    li.innerHTML = res.title || res;
    li.role = "button";
    fragment.appendChild(li);
  }
  searchResultsContainer.appendChild(fragment);
}

async function search(text) {
  if (cache[text]) {
    return setSearchResults(cache[text]);
  }
  try {
    const res = await fetch(
      `https://www.google.com/complete/search?client=firefox&q=` + text
    );
    const data = await res.json();
    searchResults = data[1];
    cache[text] = searchResults;
    setSearchResults(searchResults);
  } catch (error) {
    console.error(error);
  }
}

const debounceSearch = debounce(search, 200);

function callSearchAPI(e) {
  const searchText = e.target.value;
  debounceSearch(searchText);
}
