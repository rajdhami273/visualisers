const data = [
  {
    id: 1,
    name: "Emily Chen",
    age: 28,
    occupation: "Software Engineer",
  },
  {
    id: 2,
    name: "Ryan Thompson",
    age: 32,
    occupation: "Marketing Manager",
  },
  {
    id: 3,
    name: "Sophia Patel",
    age: 25,
    occupation: "Data Analyst",
  },
  {
    id: 4,
    name: "Michael Lee",
    age: 41,
    occupation: "CEO",
  },
  {
    id: 5,
    name: "Olivia Brown",
    age: 29,
    occupation: "Graphic Designer",
  },
  {
    id: 6,
    name: "Alexander Hall",
    age: 38,
    occupation: "Sales Representative",
  },
  {
    id: 7,
    name: "Isabella Davis",
    age: 26,
    occupation: "Teacher",
  },
  {
    id: 8,
    name: "Ethan White",
    age: 35,
    occupation: "Lawyer",
  },
  {
    id: 9,
    name: "Lily Tran",
    age: 30,
    occupation: "Nurse",
  },
  {
    id: 10,
    name: "Julian Sanchez",
    age: 39,
    occupation: "Engineer",
  },
  {
    id: 11,
    name: "Ava Martin",
    age: 27,
    occupation: "Journalist",
  },
  {
    id: 12,
    name: "Benjamin Walker",
    age: 42,
    occupation: "Doctor",
  },
  {
    id: 13,
    name: "Charlotte Brooks",
    age: 31,
    occupation: "HR Manager",
  },
  {
    id: 14,
    name: "Gabriel Harris",
    age: 36,
    occupation: "IT Consultant",
  },
  {
    id: 15,
    name: "Hannah Taylor",
    age: 24,
    occupation: "Student",
  },
  {
    id: 16,
    name: "Jackson Brown",
    age: 40,
    occupation: "Business Owner",
  },
  {
    id: 17,
    name: "Kayla Lewis",
    age: 33,
    occupation: "Event Planner",
  },
  {
    id: 18,
    name: "Logan Mitchell",
    age: 37,
    occupation: "Architect",
  },
  {
    id: 19,
    name: "Mia Garcia",
    age: 29,
    occupation: "Artist",
  },
  {
    id: 20,
    name: "Natalie Hall",
    age: 34,
    occupation: "Teacher",
  },
  {
    id: 21,
    name: "Oliver Patel",
    age: 38,
    occupation: "Software Developer",
  },
  {
    id: 22,
    name: "Penelope Martin",
    age: 26,
    occupation: "Writer",
  },
  {
    id: 23,
    name: "Quinn Lee",
    age: 35,
    occupation: "Entrepreneur",
  },
  {
    id: 24,
    name: "Rachel Kim",
    age: 30,
    occupation: "Dentist",
  },
  {
    id: 25,
    name: "Samuel Jackson",
    age: 42,
    occupation: "Lawyer",
  },
  {
    id: 26,
    name: "Tessa Hall",
    age: 28,
    occupation: "Graphic Designer",
  },
  {
    id: 27,
    name: "Uma Patel",
    age: 39,
    occupation: "Marketing Manager",
  },
  {
    id: 28,
    name: "Vincent Brooks",
    age: 36,
    occupation: "IT Consultant",
  },
  {
    id: 29,
    name: "Walter White",
    age: 41,
    occupation: "Engineer",
  },
  {
    id: 30,
    name: "Xavier Sanchez",
    age: 33,
    occupation: "Sales Representative",
  },
  {
    id: 31,
    name: "Yvonne Martin",
    age: 29,
    occupation: "Teacher",
  },
  {
    id: 32,
    name: "Zoe Lee",
    age: 27,
    occupation: "Data Analyst",
  },
  {
    id: 33,
    name: "Abigail Brown",
    age: 34,
    occupation: "Nurse",
  },
  {
    id: 34,
    name: "Caleb Harris",
    age: 38,
    occupation: "Business Owner",
  },
  {
    id: 35,
    name: "Diana Taylor",
    age: 31,
    occupation: "Event Planner",
  },
  {
    id: 36,
    name: "Eleanor Walker",
    age: 40,
    occupation: "CEO",
  },
];
const headings = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "age",
    label: "Age",
  },
  {
    key: "occupation",
    label: "Occupation",
  },
];

let currPage = 1;
let recordsPerPage = 5;
let totalPages = calculateTotalPages();
let sortingOnKey = "id";
let sortingOrder = "asc";
const tbodyElem = document.getElementById("tbody");
const theadElem = document.getElementById("thead");

function calculateTotalPages() {
  return (
    parseInt(data.length / recordsPerPage) +
    (data.length % recordsPerPage ? 1 : 0)
  );
}

function onPrev() {
  if (currPage === 1) {
    return;
  }
  currPage--;
  initTable();
}
function onNext() {
  if (currPage === totalPages) {
    return;
  }
  currPage++;
  initTable();
}
function handlePrevNextBtnState() {
  if (currPage === 1) {
    prevBtn.classList.add("disabled");
  } else {
    prevBtn.classList.remove("disabled");
  }
  if (currPage === totalPages) {
    nextBtn.classList.add("disabled");
  } else {
    nextBtn.classList.remove("disabled");
  }
}
function onRecordsPerPageChange() {
  recordsPerPage = Number(recordsPerPageSelect.value);
  totalPages = calculateTotalPages();
  currPage = 1;
  initTable();
}
function sortArray(key) {
  if (sortingOnKey === key) {
    sortingOrder = sortingOrder === "asc" ? "desc" : "asc";
  } else {
    sortingOnKey = key;
    sortingOrder = "asc";
  }
  initTable();
}
function getSortedArray() {
  const clonedData = [...data];
  switch (sortingOnKey) {
    case "id":
    case "age":
      return clonedData.sort((record1, record2) => {
        if (sortingOrder === "asc") {
          return record1[sortingOnKey] - record2[sortingOnKey];
        }
        return record2[sortingOnKey] - record1[sortingOnKey];
      });
    case "name":
    case "occupation":
      return clonedData.sort((a, b) => {
        if (sortingOrder === "asc") {
          return a[sortingOnKey].localeCompare(b[sortingOnKey]);
        } else {
          return b[sortingOnKey].localeCompare(a[sortingOnKey]);
        }
      });
    default: {
      return clonedData;
    }
  }
}

function handleSortingDirUI() {
  const allDirsElems = document.querySelectorAll("th > span");
  allDirsElems.forEach((elem) => (elem.style.display = "none"));
  const currSortingSpan = document.querySelector(
    `#heading-${sortingOnKey} > span`
  );
  currSortingSpan.style.display = "inline-block";
  if (sortingOrder === "asc") {
    currSortingSpan.style.transform = "rotateX(180deg)";
  } else {
    currSortingSpan.style.transform = "rotateX(0deg)";
  }
}
function initTable() {
  theadElem.innerHTML = "";
  const tr = document.createElement("tr");
  for (const headingElem of headings) {
    const th = document.createElement("th");
    th.onclick = () => sortArray(headingElem.key);
    th.innerHTML = headingElem.label;
    th.id = `heading-${headingElem.key}`;
    const dir = document.createElement("span");
    dir.innerText = "^";
    dir.style.display = "inline-block";
    dir.style.transform = "rotateX(180deg)";
    th.appendChild(dir);
    th.role = "button";
    tr.appendChild(th);
  }
  theadElem.append(tr);
  tbodyElem.innerHTML = "";
  const newArr = getSortedArray().slice(
    (currPage - 1) * recordsPerPage,
    currPage * recordsPerPage
  );
  const fragment = document.createDocumentFragment();
  for (const entry of newArr) {
    const tr = document.createElement("tr");
    for (const heading of headings) {
      const td = document.createElement("td");
      td.innerText = entry[heading.key];
      tr.appendChild(td);
    }
    fragment.appendChild(tr);
  }
  tbodyElem.append(fragment);
  pageNum.innerText = `Page ${currPage} of ${totalPages}`;
  handlePrevNextBtnState();
  handleSortingDirUI();
}

initTable();
