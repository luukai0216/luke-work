// Globe 渲染器 — 由「Globe 控制台」导出，可直接用于网页
//
// 用法（任意框架/原生均可）：
//   <canvas id="globe" style="width:600px;height:600px"></canvas>
//   <script type="module">
//     import { initGlobe } from "./globe.js";
//     const g = initGlobe(document.querySelector("#globe"));
//     // 运行时改配置： g.setConfig({ dot: "#3366ff", paused: true });
//     // 销毁：       g.destroy();
//   </script>

const DEFAULT_CONFIG = {
  "bg": "#181a1c",
  "sphere": "#181a1c",
  "dot": "#216c58",
  "marker": "#ff0000",
  "bgA": 1,
  "sphereA": 1,
  "dotA": 1,
  "markerA": 1,
  "enableBg": true,
  "enableSphere": true,
  "enableDot": true,
  "enableMarker": true,
  "dotShape": "circle",
  "dotSize": 1,
  "density": 30000,
  "brightness": 0.8,
  "diffuse": 1,
  "theta": 0.26,
  "speed": 0.007,
  "markerSize": 9,
  "markerCount": 8,
  "markerShape": "svg",
  "markerSvg": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzIiIGZpbGw9IiMyMTZDNTgiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0wIDMyQzAgMTQuMzMzMyAxNC4zMzMzIDAgMzIgMEM0OS42NjY3IDAgNjQgMTQuMzMzMyA2NCAzMkM2NCA0OS42NjY3IDQ5LjY2NjcgNjQgMzIgNjRDMTQuMzMzMyA2NCAwIDQ5LjY2NjcgMCAzMlpNMS42IDMyQzEuNiA0OC43ODY3IDE1LjIxMzMgNjIuNCAzMiA2Mi40QzQ4Ljc4NjcgNjIuNCA2Mi40IDQ4Ljc4NjcgNjIuNCAzMkM2Mi40IDE1LjIxMzMgNDguNzg2NyAxLjYgMzIgMS42QzE1LjIxMzMgMS42IDEuNiAxNS4yMTMzIDEuNiAzMlpNNTguMDI2MiAzNC4zNjAzQzU4LjA2NjIgMzMuOTMzNiA1OC40MTI4IDMzLjYwMDMgNTguODM5NSAzMy42MDAzQzU5LjMwNjIgMzMuNjAwMyA1OS42NjYyIDM0LjAwMDMgNTkuNjI2MiAzNC40NTM2QzU4LjM4NjIgNDguNjEzNiA0Ni40OTI4IDU5LjczMzYgMzEuOTk5NSA1OS43MzM2QzE3LjUwNjIgNTkuNzMzNiA1LjYxMjgzIDQ4LjYyNjkgNC4zNzI4MyAzNC40NTM2QzQuMzMyODMgMzMuOTg2OSA0LjY5MjgzIDMzLjYwMDMgNS4xNTk1IDMzLjYwMDNDNS41ODYxNiAzMy42MDAzIDUuOTMyODMgMzMuOTMzNiA1Ljk3MjgzIDM0LjM2MDNDNy4xNTk1IDQ3LjY4MDMgMTguMzU5NSA1OC4xMzM2IDMxLjk5OTUgNTguMTMzNkM0NS42Mzk1IDU4LjEzMzYgNTYuODM5NSA0Ny42OTM2IDU4LjAyNjIgMzQuMzYwM1pNNS4xNTk1IDMwLjQwMDNDNS41ODYxNiAzMC40MDAzIDUuOTMyODMgMzAuMDY2OSA1Ljk3MjgzIDI5LjY0MDNDNy4xNTk1IDE2LjMyMDMgMTguMzU5NSA1Ljg2NjkzIDMxLjk5OTUgNS44NjY5M0M0NS42Mzk1IDUuODY2OTMgNTYuODM5NSAxNi4zMjAzIDU4LjAyNjIgMjkuNjQwM0M1OC4wNjYyIDMwLjA2NjkgNTguNDEyOCAzMC40MDAzIDU4LjgzOTUgMzAuNDAwM0M1OS4zMDYyIDMwLjQwMDMgNTkuNjY2MiAzMC4wMTM2IDU5LjYyNjIgMjkuNTQ2OUM1OC4zODYyIDE1LjM3MzYgNDYuNDkyOCA0LjI2NjkzIDMxLjk5OTUgNC4yNjY5M0MxNy41MDYyIDQuMjY2OTMgNS42MTI4MyAxNS4zODY5IDQuMzcyODMgMjkuNTQ2OUM0LjMzMjgzIDMwLjAwMDMgNC42OTI4MyAzMC40MDAzIDUuMTU5NSAzMC40MDAzWk0yMi45MzM5IDEyLjI2NjlINDMuMjAwNUM0My43ODk2IDEyLjI2NjkgNDQuMjY3MiAxMi43NDQ1IDQ0LjI2NzIgMTMuMzMzNlYxMy44NjY5QzQ0LjI2NzIgMTQuNDU2IDQzLjc4OTYgMTQuOTMzNiA0My4yMDA1IDE0LjkzMzZIMjIuOTMzOUMyMi4zNDQ4IDE0LjkzMzYgMjEuODY3MiAxNC40NTYgMjEuODY3MiAxMy44NjY5VjEzLjMzMzZDMjEuODY3MiAxMi43NDQ1IDIyLjM0NDggMTIuMjY2OSAyMi45MzM5IDEyLjI2NjlaTTMyIDE3LjZWMTZIMjkuMzMzM1YxNy44MjY3QzMwLjE4NjcgMTcuNzA2NyAzMS4wNjY3IDE3LjYyNjcgMzIgMTcuNlpNMjkuMzMzMyAzNi4zODE1VjQzLjE3MzRDMjkuMzMzMyA0My4xNzM0IDI5LjM3MzMgNDMuMTg2NyAyOS40IDQzLjJDMzAuMTYgNDMuNDUzNCAzMS4wMjY3IDQzLjYxMzQgMzIgNDMuNjRWMzYuOTc5NEwzMi43NDYyIDM3LjE0NjdDMzMuMDExMiAzNy4xOTk3IDMzLjI0MjYgMzcuMjYxMSAzMy40ODA0IDM3LjMyNDNDMzMuNTQxNyAzNy4zNDA2IDMzLjYwMzQgMzcuMzU3IDMzLjY2NjIgMzcuMzczNFY0My42MjY3QzM0LjI5MjkgNDMuNTYgMzQuODUyOSA0My40NCAzNS4zMzI5IDQzLjI2NjdDMzUuNzE5NSA0My4xMiAzNi4wNTI5IDQyLjk3MzQgMzYuMzMyOSA0Mi44VjM4LjIyNjdDMzYuOTk5NSAzOC41MiAzNy41MzI5IDM4Ljg2NjcgMzcuOTA2MiAzOS4yNTM0QzM4LjM3MjkgMzkuNzMzNCAzOC41ODYyIDQwLjMwNjcgMzguNTg2MiA0MC45ODY3QzM4LjU4NjIgNDEuNzIgMzguMzMyOSA0Mi4zNzM0IDM3LjgyNjIgNDIuOTQ2N0MzNy4zMTk1IDQzLjUwNjcgMzYuNjEyOSA0My45NDY3IDM1LjcwNjIgNDQuMjhDMzQuNzk5NSA0NC42IDMzLjczMjkgNDQuNzYgMzIuNTA2MiA0NC43NkMzMS4yNzk1IDQ0Ljc2IDMwLjEzMjkgNDQuNiAyOS4xMzI5IDQ0LjI1MzRDMjguMTU5NSA0My45MDY3IDI3LjM1OTUgNDMuMzg2NyAyNi43NzI5IDQyLjcwNjdDMjYuMzg2MiA0Mi4yNCAyNi4xMTk1IDQxLjcyIDI1Ljk0NjIgNDEuMTA2N0MyNS43OTk1IDQwLjU2IDI1LjM0NjIgNDAuMTIgMjQuNzk5NSA0MC4xMkgxOS44NTI5QzE5LjI1MjkgNDAuMTIgMTguNzcyOSA0MC42MjY3IDE4LjgzOTUgNDEuMkMxOS4wMzk1IDQyLjkzMzQgMTkuNjEyOSA0NC40MTM0IDIwLjU1OTUgNDUuNjUzNEMyMS43MTk1IDQ3LjEzMzQgMjMuMzA2MiA0OC4yNjY3IDI1LjM1OTUgNDkuMDEzNEMyNi42OTI5IDQ5LjUwNjcgMjguMTk5NSA0OS44MjY3IDI5LjgzOTUgNTBDMjkuNzg2MSA0OS45OTQ3IDI5LjczMDUgNDkuOTkzNiAyOS42NzQ1IDQ5Ljk5MjZDMjkuNTkwOCA0OS45OTEgMjkuNTA2MSA0OS45ODkzIDI5LjQyNjIgNDkuOTczNFY1Mi4yOTM0QzI5LjQyNjIgNTIuODggMjkuOTA2MiA1My4zNiAzMC40OTI5IDUzLjM2SDMxLjAyNjJDMzEuNjEyOSA1My4zNiAzMi4wOTI5IDUyLjg4IDMyLjA5MjkgNTIuMjkzNFY1MC4xNkMzMi4wMTk1IDUwLjE2IDMxLjk0OTUgNTAuMTUzNCAzMS44Nzk1IDUwLjE0NjdDMzEuODA5NSA1MC4xNCAzMS43Mzk1IDUwLjEzMzQgMzEuNjY2MiA1MC4xMzM0QzMxLjgyNjIgNTAuMTMzNCAzMS45ODI5IDUwLjE0MzQgMzIuMTM5NSA1MC4xNTM0QzMyLjI5NjIgNTAuMTYzNCAzMi40NTI5IDUwLjE3MzQgMzIuNjEyOSA1MC4xNzM0QzMzLjA2OTUgNTAuMTczNCAzMy40OTE4IDUwLjE1MDUgMzMuOTIyMSA1MC4xMjZDMzMuOTAxIDUwLjEyODIgMzMuODgwMyA1MC4xMzA4IDMzLjg1OTUgNTAuMTMzNEMzMy44MDYyIDUwLjE0IDMzLjc1MjkgNTAuMTQ2NyAzMy42OTI5IDUwLjE0NjdWNTIuMjkzNEMzMy42OTI5IDUyLjg4IDM0LjE3MjkgNTMuMzYgMzQuNzU5NSA1My4zNkgzNS4yOTI5QzM1Ljg3OTUgNTMuMzYgMzYuMzU5NSA1Mi44OCAzNi4zNTk1IDUyLjI5MzRWNDkuOTA2N0MzNi4zMzcgNDkuOTA2NyAzNi4zMTM0IDQ5LjkwNjcgMzYuMjg5NCA0OS45MDczQzM3LjU2NTQgNDkuNzIwOSAzOC43NDIgNDkuNDQ3MyAzOS43NzI5IDQ5LjA0QzQxLjc3MjkgNDguMjggNDMuMjkyOSA0Ny4yMjY3IDQ0LjMzMjkgNDUuODUzNEw0NC4yNTI5IDQ1LjgyNjdDNDUuMzE5NSA0NC40NCA0NS44NTI5IDQyLjgyNjcgNDUuODY2MiA0MC45NDY3QzQ1Ljg2NjIgMzkuNjY2NyA0NS41ODYyIDM4LjU0NjcgNDUuMDc5NSAzNy41NkM0NC41NzI5IDM2LjU3MzQgNDMuODUyOSAzNS43MDY3IDQyLjk0NjIgMzQuOTg2N0M0Mi4wMjYyIDM0LjI2NjcgNDAuOTQ2MiAzMy42NTM0IDM5LjY5MjkgMzMuMTQ2N0MzOC40Mzk1IDMyLjY1MzQgMzcuMDY2MiAzMi4yNTM0IDM1LjU3MjkgMzEuOTQ2N0wzMi40OTI5IDMxLjI5MzRDMzEuNzQ2MiAzMS4xNDY3IDMxLjA1MjkgMzAuOTYgMzAuMzg2MiAzMC43NkMyOS43MzI5IDMwLjUzMzQgMjkuMTU5NSAzMC4yOCAyOC42NTI5IDMwQzI4LjE0NjIgMjkuNjkzNCAyNy43NDYyIDI5LjM0NjcgMjcuNDY2MiAyOC45NDY3VjI4LjkyQzI3LjE5OTUgMjguNTIgMjcuMDY2MiAyOC4wNTM0IDI3LjA5MjkgMjcuNTJDMjcuMDkyOSAyNi44NjY3IDI3LjMwNjIgMjYuMjUzNCAyNy43MzI5IDI1LjczMzRDMjguMTE5NSAyNS4yNjY3IDI4LjY3OTUgMjQuODkzNCAyOS4zODYyIDI0LjYxMzRWMjkuMTczNEMyOS43NzI5IDI5LjM4NjcgMzAuMjI2MiAyOS41NzM0IDMwLjc0NjIgMjkuNzQ2N0MzMS4xNTk1IDI5Ljg4IDMxLjU5OTUgMzAgMzIuMDUyOSAzMC4xMDY3VjI0LjEyQzMyLjEzNzkgMjQuMTIgMzIuMjI2MiAyNC4xMTY4IDMyLjMxNjEgMjQuMTEzNUMzMi40MDk0IDI0LjExMDIgMzIuNTA0NSAyNC4xMDY3IDMyLjU5OTUgMjQuMTA2N0MzMi45NzI5IDI0LjEwNjcgMzMuMzE5NSAyNC4xMzM0IDMzLjY1MjkgMjQuMTZWMzAuNDUzNEwzNS44MjYyIDMwLjkyQzM1LjkwNjIgMzAuOTQgMzUuOTg5NSAzMC45NTY3IDM2LjA3MjkgMzAuOTczNEMzNi4xNTYyIDMwLjk5IDM2LjIzOTUgMzEuMDA2NyAzNi4zMTk1IDMxLjAyNjdWMjQuODkzNEMzNi4zNzMxIDI0LjkyMjYgMzYuNDI2NiAyNC45NDgyIDM2LjQ3OTUgMjQuOTczNUMzNi41NzE1IDI1LjAxNzYgMzYuNjYxNSAyNS4wNjA4IDM2Ljc0NjIgMjUuMTJDMzcuNDkyOSAyNS42IDM3Ljk5OTUgMjYuMjI2NyAzOC4yNjYyIDI3QzM4LjQzOTUgMjcuNTA2NyAzOC44Nzk1IDI3LjkyIDM5LjQyNjIgMjcuOTJINDQuMzU5NUM0NC45NzI5IDI3LjkyIDQ1LjQ1MjkgMjcuNDI2NyA0NS4zNTk1IDI2LjgyNjdDNDUuMTcyOSAyNS40NCA0NC42NTI5IDI0LjIxMzQgNDMuNzk5NSAyMy4wOTM0QzQyLjczMjkgMjEuNzIgNDEuMjM5NSAyMC42MjY3IDM5LjMzMjkgMTkuODUzNEMzNy40MjYyIDE5LjA2NjcgMzUuMTk5NSAxOC42OTM0IDMyLjY1MjkgMTguNjkzNEMzMC4xMDYyIDE4LjY5MzQgMjcuOTA2MiAxOS4wOCAyNS45NDYyIDE5Ljg1MzRDMjMuOTcyOSAyMC42MjY3IDIyLjQyNjIgMjEuNzA2NyAyMS4yOTI5IDIzLjA5MzRDMjAuMTcyOSAyNC40NjY3IDE5LjYyNjIgMjYuMDkzNCAxOS42MjYyIDI3Ljk2QzE5LjYyNjIgMzAuMjI2NyAyMC40NTI5IDMyLjAyNjcgMjIuMTMyOSAzMy4zNkMyMy44MTI5IDM0LjY5MzQgMjYuMDkyOSAzNS42OCAyOC45OTk1IDM2LjMwNjdMMjkuMzMzMyAzNi4zODE1Wk0zNi4yNjU2IDE3Ljg4VjE2SDMzLjU5OVYxNy42MTMzQzM0LjUxOSAxNy42NTMzIDM1LjQxMjMgMTcuNzMzMyAzNi4yNjU2IDE3Ljg4WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==",
  "paused": false
};
const CITIES = [[39.9042,116.4074],[40.7128,-74.006],[51.5074,-0.1278],[1.3521,103.8198],[25.2048,55.2708]];
const LEVELS = 14;
const MARKER_MAX = 60;
const REPEL_EASE = 0.18;
const LIGHT = [-0.4854368932038835,0.4368932038834951,0.7572815533980582];
const MAP_SRC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAACAAQAAAADMzoqnAAAAAXNSR0IArs4c6QAABA5JREFUeNrV179uHEUAx/Hf3JpbF+E2VASBsmVKTBcpKJs3SMEDcDwBiVJAAewYEBUivIHT0uUBIt0YCovKD0CRjUC4QfHYh8hYXu+P25vZ2Zm9c66gMd/GJ/tz82d3bk8GN4SrByYF2366FNTACIAkivVAAazQdnf3MvAlbNUQfOPAdQDvSAimMWhwy4I2g4SU+Kp04ISLpPBAKLxPyic3O/CCi+Y7rUJbiodcpDOFY7CgxCEXmdYD2EYK2s5lApOx5pEDDYCUwM1XdJUwBV11QQMg59kePSCaPAASQMEL2hwo6TJFgxpg+TgC2ymXPbuvc40awr3D1QCFfbH9kcoqAOkZozpQo0aqAGQRKCog/+tjkgbNFEtg2FffBvBGlSxHoAaAa1u6X4PBAwDiR8FFsrQgeUhfJTSALaB9jy5NCybJPn1SVFiWk7ywN+KzhH1aKAuydhGkbEF4lWohLXDXavlyFgHY7LBnLRdlAP6BS5Cc8RfVDXbkwN/oIvmY+6obbNeBP0JwTuMGu9gTzy1Q4RS/cWpfzszeYwd+CAFrtBW/Hur0gLbJGlD+/OjVwe/drfBxkbbg63dndEDfiEBlAd7ac0BPe1D6Jd8dfbLH+RI0OzseFB5s01/M+gMdAeluLOCAuaUA9Lezo/vSgXoCX9rtEiXnp7Q1W/CNyWcd8DXoS6jH/YZ5vAJEWY2dXFQe2TUgaFaNejCzJ98g6HnlVrsE58sDcYqg+9XY75fPqdoh/kRQWiXKg8MWlJQxUFMPjqnyujhFBE7UxIMjyszk0QwQlFsezImsyvUYYYVED2pk6m0Tg8T04Fwjk2kdAwSACqlM6gRRt3vQYAFGX0Ah7Ebx1H+MDRI5ui0QldH4j7FGcm90XdxD2Jg1AOEAVAKhEFXSn4cKUELurIAKwJ3MArypPscQaLhJFICJ0ohjDySAdH8AhDtCiTuMycH8CXzhH9jUACAO5uMhoAwA5i+T6WAKmmAqnLy80wxHqIPFYpqCwxGaYLt4Dyievg5kEoVEUAhs6pqKgFtDQYOuaXypaWKQfIuwwoGSZgfLsu/XAtI8cGN+h7Cc1A5oLOMhwlIPXuhu48AIvsSBkvtV9wsJRKCyYLfq5lTrQMFd1a262oqBck9K1V0YjQg0iEYYgpS1A9GlXQV5cykwm4A7BzVsxQqo7E+zCegO7Ma7yKgsuOcfKbMBwLC8wvVNYDsANYalEpOAa6zpWjTeMKGwEwC1CiQewJc5EKfgy7GmRAZA4vUVGwE2dPM/g0xuAInE/yG5aZ8ISxWGfYigUVbdyBElTHh2uCwGdfCkOLGgQVBh3Ewp+/QK4CDlR5Ws/Zf7yhCf8pH7vinWAvoVCQ6zz0NX5V/6GkAVV+2/5qsJ/gU8bsxpM8IeAQAAAABJRU5ErkJggg==";

export function initGlobe(canvas, userConfig = {}) {
  const config = { ...DEFAULT_CONFIG, ...userConfig };
  const ctx = canvas.getContext("2d");
  let dpr = 1, cssSize = 600, phi = 0;
  let pointerInteracting = null, pointerMovement = 0, dragDelta = 0;
  let mouseX = null, mouseY = null;
  let mapData = null, mapW = 0, mapH = 0;
  let landPoints = [], offX = new Float32Array(0), offY = new Float32Array(0);
  let markerPool = [];
  const markerOffX = new Float32Array(MARKER_MAX);
  const markerOffY = new Float32Array(MARKER_MAX);
  let dotColors = [];
  let markerImg = null, markerImgReady = false;
  function loadMarkerSvg(uri) {
    markerImgReady = false;
    if (!uri) { markerImg = null; return; }
    const im = new Image();
    im.onload = () => { markerImg = im; markerImgReady = true; };
    im.src = uri;
  }

  function hexToRgb(hex) {
          const v = hex.replace("#", "");
          return [
            parseInt(v.slice(0, 2), 16),
            parseInt(v.slice(2, 4), 16),
            parseInt(v.slice(4, 6), 16),
          ];
        }
  
  function latLonToVec(latDeg, lonDeg) {
          const lat = (latDeg * Math.PI) / 180;
          const lon = (lonDeg * Math.PI) / 180;
          const cl = Math.cos(lat);
          return [cl * Math.sin(lon), Math.sin(lat), cl * Math.cos(lon)];
        }
  
  function isLand(vec) {
          // vec: 单位向量 -> 经纬度 -> 等距柱状 uv -> 采样
          const lat = Math.asin(Math.max(-1, Math.min(1, vec[1])));
          const lon = Math.atan2(vec[0], vec[2]);
          const u = (lon + Math.PI) / (2 * Math.PI);
          const v = (Math.PI / 2 - lat) / Math.PI;
          const sx = Math.min(mapW - 1, Math.max(0, Math.floor(u * mapW)));
          const sy = Math.min(mapH - 1, Math.max(0, Math.floor(v * mapH)));
          return mapData[(sy * mapW + sx) * 4] > 128;
        }
  
  function buildPoints() {
          const n = config.density;
          const pts = [];
          const golden = Math.PI * (3 - Math.sqrt(5));
          for (let i = 0; i < n; i++) {
            const y = 1 - (i / (n - 1)) * 2;
            const r = Math.sqrt(Math.max(0, 1 - y * y));
            const th = golden * i;
            const x = Math.cos(th) * r;
            const z = Math.sin(th) * r;
            const v = [x, y, z];
            if (isLand(v)) pts.push(v);
          }
          landPoints = pts;
          offX = new Float32Array(pts.length);
          offY = new Float32Array(pts.length);
        }
  
  function buildMarkers() {
          markerPool = CITIES.map((c) => latLonToVec(c[0], c[1]));
          const n = landPoints.length;
          if (!n) return;
          const extra = MARKER_MAX - markerPool.length;
          for (let j = 0; j < extra; j++) {
            const idx = Math.floor(((j + 0.5) / extra) * n);
            markerPool.push(landPoints[idx]);
          }
        }
  
  function buildDotColors() {
          const [r, g, b] = hexToRgb(config.dot);
          dotColors = [];
          for (let k = 0; k < LEVELS; k++) {
            // 点阵始终用所选原色，亮度/光照用透明度表现
            // （这样在浅色背景下也能清晰看到颜色，调色立即生效）
            // 再乘以用户设置的点阵透明度
            const a = (k / (LEVELS - 1)) * config.dotA;
            dotColors.push(`rgba(${r},${g},${b},${a})`);
          }
        }
  
  function repelTarget(sx, sy, radius, push) {
          if (mouseX === null) return [0, 0];
          const ddx = sx - mouseX;
          const ddy = sy - mouseY;
          const dist = Math.hypot(ddx, ddy);
          if (dist >= radius) return [0, 0];
          const f = 0.5 * (1 + Math.cos((Math.PI * dist) / radius));
          const inv = dist > 0.001 ? 1 / dist : 0;
          return [ddx * inv * f * push, ddy * inv * f * push];
        }
  
  function addShape(ctx, shape, x, y, s) {
          switch (shape) {
            case "square":
              ctx.rect(x - s, y - s, s * 2, s * 2);
              break;
            case "diamond":
              ctx.moveTo(x, y - s);
              ctx.lineTo(x + s, y);
              ctx.lineTo(x, y + s);
              ctx.lineTo(x - s, y);
              ctx.closePath();
              break;
            case "triangle":
              ctx.moveTo(x, y - s);
              ctx.lineTo(x + s * 0.87, y + s * 0.5);
              ctx.lineTo(x - s * 0.87, y + s * 0.5);
              ctx.closePath();
              break;
            case "hexagon":
              ctx.moveTo(x, y - s);
              ctx.lineTo(x + s * 0.87, y - s * 0.5);
              ctx.lineTo(x + s * 0.87, y + s * 0.5);
              ctx.lineTo(x, y + s);
              ctx.lineTo(x - s * 0.87, y + s * 0.5);
              ctx.lineTo(x - s * 0.87, y - s * 0.5);
              ctx.closePath();
              break;
            default: // circle / ring
              ctx.moveTo(x + s, y);
              ctx.arc(x, y, s, 0, Math.PI * 2);
          }
        }
  
  function draw() {
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          ctx.clearRect(0, 0, cssSize, cssSize);
  
          const cx = cssSize / 2;
          const cy = cssSize / 2;
          const R = cssSize * 0.45;
  
          const cp = Math.cos(phi + dragDelta);
          const sp = Math.sin(phi + dragDelta);
          const ct = Math.cos(config.theta);
          const st = Math.sin(config.theta);
  
          // 球体本体（纯色实心圆，颜色独立于点阵）
          if (config.enableSphere) {
            const [pr, pg, pb] = hexToRgb(config.sphere);
            ctx.fillStyle = `rgba(${pr},${pg},${pb},${config.sphereA})`;
            ctx.beginPath();
            ctx.arc(cx, cy, R, 0, Math.PI * 2);
            ctx.fill();
          }
  
          // 点阵（陆地点）
          if (config.enableDot && landPoints.length) {
            const buckets = Array.from({ length: LEVELS }, () => []);
            const diff = config.diffuse;
            const bright = config.brightness;
            // 躲避作用范围与最大位移（按球体尺寸自适应，柔和小范围）
            const repelR = cssSize * 0.13;
            const repelPush = cssSize * 0.035;
            for (let i = 0; i < landPoints.length; i++) {
              const p = landPoints[i];
              // 绕 Y 自转
              const xr = p[0] * cp + p[2] * sp;
              const zr = -p[0] * sp + p[2] * cp;
              const yr = p[1];
              // 绕 X 倾斜
              const yt = yr * ct - zr * st;
              const zt = yr * st + zr * ct;
              const xt = xr;
              if (zt <= 0) {
                // 背面：偏移缓动归零，避免转回正面时突跳
                offX[i] += -offX[i] * REPEL_EASE;
                offY[i] += -offY[i] * REPEL_EASE;
                continue;
              }
              // 光照
              let lambert = xt * LIGHT[0] + yt * LIGHT[1] + zt * LIGHT[2];
              lambert = lambert < 0 ? 0 : lambert;
              let b = (0.35 + 0.65 * Math.pow(lambert, diff)) * bright;
              b = b < 0 ? 0 : b > 1 ? 1 : b;
              const lvl = (b * (LEVELS - 1)) | 0;
              const sx = cx + xt * R;
              const sy = cy - yt * R;
              // 鼠标躲避：柔和气泡式位移
              const [tx, ty] = repelTarget(sx, sy, repelR, repelPush);
              offX[i] += (tx - offX[i]) * REPEL_EASE;
              offY[i] += (ty - offY[i]) * REPEL_EASE;
              buckets[lvl].push(sx + offX[i], sy + offY[i]);
            }
            const s = config.dotSize;
            const ring = config.dotShape === "ring";
            if (ring) {
              ctx.lineWidth = Math.max(0.6, s * 0.45);
              ctx.lineJoin = "round";
            }
            for (let k = 1; k < LEVELS; k++) {
              const arr = buckets[k];
              if (!arr.length) continue;
              ctx.beginPath();
              for (let j = 0; j < arr.length; j += 2)
                addShape(ctx, config.dotShape, arr[j], arr[j + 1], s);
              if (ring) {
                ctx.strokeStyle = dotColors[k];
                ctx.stroke();
              } else {
                ctx.fillStyle = dotColors[k];
                ctx.fill();
              }
            }
          }
  
          // 标记（城市）
          if (config.enableMarker) {
            const [mr, mg, mb] = hexToRgb(config.marker);
            ctx.fillStyle = `rgba(${mr},${mg},${mb},${config.markerA})`;
            // 呼吸动效：标记大小在 80%~100% 之间循环（约 4 秒一次，较慢）
            const breath = config.paused
              ? 1
              : 0.9 + 0.1 * Math.sin(performance.now() * 0.0016);
            const ms = config.markerSize * breath;
            const count = Math.min(config.markerCount, markerPool.length);
            // 是否使用上传的 SVG 图形（未就绪时回退为内置形状）
            const useSvg =
              config.markerShape === "svg" && markerImgReady && markerImg;
            // 标记躲避：范围/位移略大于点阵，配合体积更明显
            const mRepelR = cssSize * 0.16;
            const mRepelPush = cssSize * 0.06;
            for (let i = 0; i < count; i++) {
              const p = markerPool[i];
              const xr = p[0] * cp + p[2] * sp;
              const zr = -p[0] * sp + p[2] * cp;
              const yr = p[1];
              const yt = yr * ct - zr * st;
              const zt = yr * st + zr * ct;
              const xt = xr;
              if (zt <= 0.02) {
                markerOffX[i] += -markerOffX[i] * REPEL_EASE;
                markerOffY[i] += -markerOffY[i] * REPEL_EASE;
                continue;
              }
              const sx = cx + xt * R;
              const sy = cy - yt * R;
              const [tx, ty] = repelTarget(sx, sy, mRepelR, mRepelPush);
              markerOffX[i] += (tx - markerOffX[i]) * REPEL_EASE;
              markerOffY[i] += (ty - markerOffY[i]) * REPEL_EASE;
              const dx = sx + markerOffX[i];
              const dy = sy + markerOffY[i];
              if (useSvg) {
                // 上传的 SVG：保留原始配色，按标记大小缩放，透明度沿用标记透明度
                ctx.globalAlpha = config.markerA;
                ctx.drawImage(markerImg, dx - ms, dy - ms, ms * 2, ms * 2);
                ctx.globalAlpha = 1;
              } else {
                // 内置形状（圆/方/菱/三角/六边形），使用标记颜色
                ctx.beginPath();
                addShape(ctx, config.markerShape, dx, dy, ms);
                ctx.fill();
              }
            }
          }
        }

  function resize() {
    dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    cssSize = Math.max(1, Math.round(rect.width || 600));
    canvas.width = Math.round(cssSize * dpr);
    canvas.height = Math.round(cssSize * dpr);
  }

  let raf = 0;
  function loop() {
    if (pointerInteracting === null && !config.paused) phi += config.speed;
    draw();
    raf = requestAnimationFrame(loop);
  }

  canvas.style.cursor = "grab";
  canvas.addEventListener("pointerdown", (e) => {
    pointerInteracting = e.clientX - pointerMovement;
    canvas.style.cursor = "grabbing";
  });
  const endDrag = () => {
    if (pointerInteracting !== null) {
      phi += dragDelta;
      dragDelta = 0;
      pointerMovement = 0;
    }
    pointerInteracting = null;
    canvas.style.cursor = "grab";
  };
  canvas.addEventListener("pointerup", endDrag);
  canvas.addEventListener("pointerout", endDrag);
  canvas.addEventListener("pointermove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    if (pointerInteracting === null) return;
    const delta = e.clientX - pointerInteracting;
    pointerMovement = delta;
    dragDelta = delta / 200;
  });
  canvas.addEventListener("pointerleave", () => {
    mouseX = null;
    mouseY = null;
  });
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  buildDotColors();
  loadMarkerSvg(config.markerSvg);
  const img = new Image();
  img.onload = () => {
    const off = document.createElement("canvas");
    off.width = img.width;
    off.height = img.height;
    const octx = off.getContext("2d");
    octx.drawImage(img, 0, 0);
    mapData = octx.getImageData(0, 0, img.width, img.height).data;
    mapW = img.width;
    mapH = img.height;
    resize();
    buildPoints();
    buildMarkers();
    loop();
  };
  img.src = MAP_SRC;

  return {
    setConfig(patch = {}) {
      const rebuild = "density" in patch;
      const reloadSvg = "markerSvg" in patch;
      Object.assign(config, patch);
      buildDotColors();
      if (reloadSvg) loadMarkerSvg(config.markerSvg);
      if (rebuild) {
        buildPoints();
        buildMarkers();
      }
    },
    getConfig() {
      return { ...config };
    },
    destroy() {
      cancelAnimationFrame(raf);
      ro.disconnect();
    },
  };
}
