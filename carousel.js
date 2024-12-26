const images = [
  {
    url: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
  },
  {
    url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
  },
  {
    url: "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
  },
  {
    url: "https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1673306778968-5aab577a7365?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFja2dyb3VuZCUyMGltYWdlfGVufDB8fDB8fHww",
  },
  {
    url: "https://cdn-lfs-us-1.hf.co/repos/ac/b3/acb3de135033956271456e8ab1bbe284964f74bf9fab49fb27002b798f18f382/0450e96b0141236216854cda9303da17e2096d48cc144bb12dbff4111d6f5ab2?response-content-disposition=inline%3B+filename*%3DUTF-8%27%27image-classification-input.jpeg%3B+filename%3D%22image-classification-input.jpeg%22%3B&response-content-type=image%2Fjpeg&Expires=1735478614&Policy=eyJTdGF0ZW1lbnQiOlt7IkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTczNTQ3ODYxNH19LCJSZXNvdXJjZSI6Imh0dHBzOi8vY2RuLWxmcy11cy0xLmhmLmNvL3JlcG9zL2FjL2IzL2FjYjNkZTEzNTAzMzk1NjI3MTQ1NmU4YWIxYmJlMjg0OTY0Zjc0YmY5ZmFiNDlmYjI3MDAyYjc5OGYxOGYzODIvMDQ1MGU5NmIwMTQxMjM2MjE2ODU0Y2RhOTMwM2RhMTdlMjA5NmQ0OGNjMTQ0YmIxMmRiZmY0MTExZDZmNWFiMj9yZXNwb25zZS1jb250ZW50LWRpc3Bvc2l0aW9uPSomcmVzcG9uc2UtY29udGVudC10eXBlPSoifV19&Signature=ja4tpPPnsM8mM5oPYmrz-oMmQx88UskoWQ7MmWby9ZjLnQPIBvK%7E0irVoHEdDXXEBtgxjgY1WRbvBdCO4a1RqK-GRnxh-XDs6sDmppl76IRnz2s0M0JvEFA6qwnUb6ohs3gNB9ydZAzy9n85FY0BVdn%7EPy31rIizArIdMRlAP3mk6YKxIasmeRkMZYEyecs2aaiBYx30fT7W8D8wTflnRWaV5saejrPx5s%7E-XghPd%7EcxM-Vm3eyQnNy1lRgfaRLQ5dRI%7Enk34MuBoNpjXn5ksUEgSnd-j52S2O3PHgmaYtylaVn0DKSf8hczRwB4crrlsgAMMnjkzzTpN3gCM1Kfyg__&Key-Pair-Id=K24J24Z295AEI9",
  },
  {
    url: "https://gratisography.com/wp-content/uploads/2024/10/gratisography-happy-cone-800x525.jpg",
  },
];

let counter = 0;
function previous() {
  counter = (counter - 1 + images.length) % images.length;
  init();
}
function next() {
  counter = (counter + 1) % images.length;
  init();
}
function onDrag(ev) {
  if (ev.offsetX < 0) {
    next();
  } else {
    previous();
  }
}
function setLeftAndRight() {
  setImages((counter - 1 + images.length) % images.length, "image-left");
  setImages((counter + 1) % images.length, "image-right");
}
function setImages(counterTemp, elemId) {
  const { url } = images[Math.abs(counterTemp) % images.length];
  document.getElementById(elemId).setAttribute("src", url);
}
function init() {
  setImages(counter, "image");
  setLeftAndRight();
}

window.addEventListener("DOMContentLoaded", init);
