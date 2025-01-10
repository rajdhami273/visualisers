const inputs = 6;
const otpContainer = document.getElementById("otp-container");
const values = Array.from({ length: inputs }).fill(undefined);
const submitBtn = document.getElementById("submitBtn");

const valuesProxy = new Proxy(values, {
  set: function (target, key, value) {
    Reflect.set(target, key, value);
    if (values.filter((val) => val === undefined).length) {
      submitBtn.disabled = true;
    } else {
      submitBtn.disabled = false;
    }
    return true;
  },
});

function getNextFocusInput(val) {
  if (val <= 0) {
    return 0;
  }
  if (val >= inputs - 1) {
    return inputs - 1;
  }
  return val;
}

function getElem(currInputNum) {
  return document.querySelector(
    `[input-num="${getNextFocusInput(currInputNum)}"]`
  );
}

function onKeyPress(e) {
  const currInputNum = Number(e.target.getAttribute("input-num"));
  switch (e.key) {
    case "ArrowLeft":
      e.preventDefault();
      getElem(currInputNum - 1).focus();
      return;
    case "ArrowRight":
      e.preventDefault();
      getElem(currInputNum + 1).focus();
      return;
    case "Backspace":
      if (valuesProxy[currInputNum]) {
        valuesProxy[currInputNum] = undefined;
        return;
      }
      const previousInput = getElem(currInputNum - 1);
      e.preventDefault();
      previousInput.focus();
      return;
    default:
      return;
  }
}

function onInput(e) {
  const currInputNum = Number(e.target.getAttribute("input-num"));
  if (e.target.value) {
    valuesProxy[currInputNum] = e.target.value;
    document
      .querySelector(`[input-num="${getNextFocusInput(currInputNum + 1)}"]`)
      .focus();
  }
}

function addInputs() {
  otpContainer.innerHTML = "";
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < inputs; i++) {
    const input = document.createElement("input");
    input.minLength = 1;
    input.maxLength = 1;
    input.classList.add("form-control");
    input.setAttribute("input-num", i);
    input.oninput = onInput;
    input.onkeydown = onKeyPress;
    input.onfocus = () => {
      const valueLength = input.value.length;
      input.setSelectionRange(0, valueLength);
    };
    fragment.appendChild(input);
  }
  otpContainer.appendChild(fragment);
  valuesProxy.forEach((_, idx) => (valuesProxy[idx] = undefined));
}

addInputs();
