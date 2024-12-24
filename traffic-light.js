const lightsConfig = [
  {
    light: "red",
    time: 4000,
    className: "bg-danger",
  },
  {
    light: "yellow",
    time: 2000,
    className: "bg-warning",
  },
  {
    light: "green",
    time: 3000,
    className: "bg-success",
  },
];

const timers = [];

function animate(config, idx) {
  const { light, time, className } = config[idx];
  lightsConfig.forEach(
    ({ light }) =>
      (document.getElementById(light).className = "light bg-secondary")
  );
  document.getElementById(light).className = `light ${className}`;
  timers.push(
    setTimeout(
      () => animate(lightsConfig, (idx + 1) % lightsConfig.length),
      time
    )
  );
}
window.addEventListener("DOMContentLoaded", () => {
  animate(lightsConfig, 0);
});

window.addEventListener("unload", () => {
  timers.forEach((timer) => clearTimeout(timer));
});
