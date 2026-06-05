import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

// ---------- core setup ----------
const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
scene.background = new THREE.Color("#14161a");

const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 5000);
camera.position.set(3, 2, 4);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.08;

const pmrem = new THREE.PMREMGenerator(renderer);

// lights
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);

const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
dirLight.position.set(5, 8, 6);
dirLight.castShadow = true;
dirLight.shadow.mapSize.set(2048, 2048);
dirLight.shadow.camera.near = 0.1;
dirLight.shadow.camera.far = 100;
dirLight.shadow.bias = -0.0005;
scene.add(dirLight);

const fill = new THREE.DirectionalLight(0xffffff, 0.5);
fill.position.set(-6, 3, -4);
scene.add(fill);

// grid + ground for shadows
const grid = new THREE.GridHelper(20, 20, 0x3a4049, 0x23272f);
grid.material.opacity = 0.6;
grid.material.transparent = true;
scene.add(grid);

const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(200, 200),
  new THREE.ShadowMaterial({ opacity: 0.25 })
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// selection highlight box
const selectionBox = new THREE.BoxHelper(undefined, 0x00c566);
selectionBox.visible = false;
scene.add(selectionBox);

// ---------- state ----------
let model = null;          // currently loaded root object
let selected = null;       // selected Object3D
const initialState = new Map(); // object -> snapshot for reset

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

// ---------- environments ----------
function setEnvironment(preset) {
  if (preset === "none") {
    scene.environment = null;
    return;
  }
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = env;
}
setEnvironment("studio");

// ---------- loading ----------
const loadingEl = document.getElementById("loading");
const loadingText = document.getElementById("loadingText");
const loadingBar = document.getElementById("loadingBar");
const loader = new GLTFLoader();

function showLoading(text) {
  loadingText.textContent = text || "加载中…";
  loadingBar.style.width = "0%";
  loadingEl.style.display = "flex";
}
function hideLoading() { loadingEl.style.display = "none"; }

function clearModel() {
  if (model) {
    scene.remove(model);
    model.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) {
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        mats.forEach((m) => m.dispose());
      }
    });
  }
  model = null;
  selected = null;
  initialState.clear();
}

function loadFromURL(url) {
  showLoading("正在加载 " + url.split("/").pop() + " …");
  loader.load(
    url,
    (gltf) => { onModelLoaded(gltf.scene || gltf.scenes[0]); hideLoading(); },
    (e) => { if (e.lengthComputable) loadingBar.style.width = (e.loaded / e.total * 100).toFixed(0) + "%"; },
    (err) => {
      console.error(err);
      loadingText.textContent = "无法加载 usdd.glb，请点击「打开 GLB」手动选择文件。";
      loadingBar.parentElement.style.display = "none";
    }
  );
}

function loadFromArrayBuffer(buffer, name) {
  showLoading("正在解析 " + name + " …");
  loader.parse(buffer, "", (gltf) => {
    onModelLoaded(gltf.scene || gltf.scenes[0]);
    hideLoading();
  }, (err) => {
    console.error(err);
    loadingText.textContent = "解析失败：" + name;
  });
}

function onModelLoaded(root) {
  clearModel();
  model = root;
  model.traverse((o) => {
    if (o.isMesh) {
      o.castShadow = true;
      o.receiveShadow = true;
    }
    // snapshot for reset
    initialState.set(o, {
      position: o.position.clone(),
      rotation: o.rotation.clone(),
      scale: o.scale.clone(),
      visible: o.visible,
    });
  });
  scene.add(model);
  buildTree();
  fitView();
}

// ---------- fit / focus ----------
function fitView(object) {
  const target = object || model;
  if (!target) return;
  const box = new THREE.Box3().setFromObject(target);
  if (box.isEmpty()) return;
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = camera.fov * (Math.PI / 180);
  let dist = maxDim / (2 * Math.tan(fov / 2));
  dist *= 1.6;
  const dir = new THREE.Vector3(1, 0.7, 1).normalize();
  camera.position.copy(center).addScaledVector(dir, dist);
  camera.near = Math.max(0.01, dist / 100);
  camera.far = dist * 100;
  camera.updateProjectionMatrix();
  controls.target.copy(center);
  controls.update();

  // position ground at bottom of model
  ground.position.y = box.min.y;
  grid.position.y = box.min.y;
  // adjust shadow camera
  const r = maxDim * 1.5;
  dirLight.shadow.camera.left = -r;
  dirLight.shadow.camera.right = r;
  dirLight.shadow.camera.top = r;
  dirLight.shadow.camera.bottom = -r;
  dirLight.shadow.camera.far = dist * 10;
  dirLight.shadow.camera.updateProjectionMatrix();
  dirLight.position.copy(center).add(new THREE.Vector3(maxDim, maxDim * 1.5, maxDim));
  dirLight.target.position.copy(center);
  dirLight.target.updateMatrixWorld();
  scene.add(dirLight.target);
}

function setView(name) {
  if (!model) return;
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const d = Math.max(size.x, size.y, size.z) * 2;
  const dirs = {
    front: [0, 0, 1], back: [0, 0, -1], left: [-1, 0, 0],
    right: [1, 0, 0], top: [0, 1, 0.001], iso: [1, 0.7, 1],
  };
  const v = new THREE.Vector3(...dirs[name]).normalize();
  camera.position.copy(center).addScaledVector(v, d);
  controls.target.copy(center);
  controls.update();
}

// ---------- scene tree ----------
const treeEl = document.getElementById("tree");
function iconFor(o) {
  if (o.isMesh) return "▦";
  if (o.isLight) return "☀";
  if (o.isCamera) return "🎥";
  if (o.isBone) return "•";
  return "▸";
}
function buildTree() {
  treeEl.innerHTML = "";
  if (!model) { treeEl.innerHTML = '<div class="empty">尚未加载模型</div>'; return; }
  treeEl.appendChild(renderNode(model, 0));
}
function renderNode(obj) {
  const wrap = document.createElement("div");
  const item = document.createElement("div");
  item.className = "tree-item" + (obj === selected ? " selected" : "");
  item.dataset.uuid = obj.uuid;

  const children = obj.children.filter((c) => c !== dirLight.target);
  const twisty = document.createElement("span");
  twisty.className = "twisty";
  twisty.textContent = children.length ? "▾" : "";
  item.appendChild(twisty);

  const ic = document.createElement("span");
  ic.className = "ic";
  ic.textContent = iconFor(obj);
  item.appendChild(ic);

  const nm = document.createElement("span");
  nm.className = "nm";
  nm.textContent = obj.name || obj.type;
  item.appendChild(nm);

  const vis = document.createElement("span");
  vis.className = "vis";
  vis.textContent = obj.visible ? "👁" : "🚫";
  vis.title = "切换可见";
  vis.onclick = (e) => { e.stopPropagation(); obj.visible = !obj.visible; vis.textContent = obj.visible ? "👁" : "🚫"; if (obj === selected) syncObjectPanel(); };
  item.appendChild(vis);

  item.onclick = () => selectObject(obj);

  const childWrap = document.createElement("div");
  childWrap.className = "tree-children";
  let collapsed = false;
  twisty.onclick = (e) => {
    e.stopPropagation();
    collapsed = !collapsed;
    childWrap.style.display = collapsed ? "none" : "block";
    twisty.textContent = collapsed ? "▸" : "▾";
  };
  children.forEach((c) => childWrap.appendChild(renderNode(c)));

  wrap.appendChild(item);
  wrap.appendChild(childWrap);
  return wrap;
}
function refreshTreeSelection() {
  treeEl.querySelectorAll(".tree-item").forEach((el) => {
    el.classList.toggle("selected", selected && el.dataset.uuid === selected.uuid);
  });
}

// ---------- selection + object panel ----------
const noSel = document.getElementById("noSelection");
const objProps = document.getElementById("objectProps");

function selectObject(obj) {
  selected = obj;
  refreshTreeSelection();
  if (obj && (obj.isMesh || obj.geometry)) {
    selectionBox.setFromObject(obj);
    selectionBox.visible = true;
  } else {
    selectionBox.visible = false;
  }
  syncObjectPanel();
  switchTab("object");
}

const $ = (id) => document.getElementById(id);
function syncObjectPanel() {
  if (!selected) { noSel.style.display = "block"; objProps.style.display = "none"; return; }
  noSel.style.display = "none";
  objProps.style.display = "block";

  $("objName").value = selected.name || "";
  $("objType").textContent = selected.type;
  $("objVisible").checked = selected.visible;

  $("posX").value = round(selected.position.x);
  $("posY").value = round(selected.position.y);
  $("posZ").value = round(selected.position.z);
  $("rotX").value = round(THREE.MathUtils.radToDeg(selected.rotation.x), 1);
  $("rotY").value = round(THREE.MathUtils.radToDeg(selected.rotation.y), 1);
  $("rotZ").value = round(THREE.MathUtils.radToDeg(selected.rotation.z), 1);
  $("sclX").value = round(selected.scale.x);
  $("sclY").value = round(selected.scale.y);
  $("sclZ").value = round(selected.scale.z);

  const mat = getMaterial(selected);
  const matSec = $("materialSection");
  if (mat) {
    matSec.style.display = "block";
    if (mat.color) { $("matColor").value = "#" + mat.color.getHexString(); $("matColorHex").textContent = "#" + mat.color.getHexString(); }
    if (mat.emissive) $("matEmissive").value = "#" + mat.emissive.getHexString();
    $("matEmissiveInt").value = mat.emissiveIntensity ?? 1;
    setPair("matMetalness", mat.metalness ?? 0);
    setPair("matRoughness", mat.roughness ?? 1);
    setPair("matOpacity", mat.opacity ?? 1);
    $("matWireframe").checked = !!mat.wireframe;
    $("matFlat").checked = mat.flatShading ?? false;
  } else {
    matSec.style.display = "none";
  }
}
function getMaterial(obj) {
  if (!obj || !obj.material) return null;
  return Array.isArray(obj.material) ? obj.material[0] : obj.material;
}
function round(v, d = 3) { const p = Math.pow(10, d); return Math.round(v * p) / p; }
function setPair(base, v) { $(base).value = v; $(base + "N").value = round(v); }

// transform inputs
["posX","posY","posZ","rotX","rotY","rotZ","sclX","sclY","sclZ"].forEach((id) => {
  $(id).addEventListener("input", () => {
    if (!selected) return;
    const v = parseFloat($(id).value) || 0;
    if (id === "posX") selected.position.x = v;
    if (id === "posY") selected.position.y = v;
    if (id === "posZ") selected.position.z = v;
    if (id === "rotX") selected.rotation.x = THREE.MathUtils.degToRad(v);
    if (id === "rotY") selected.rotation.y = THREE.MathUtils.degToRad(v);
    if (id === "rotZ") selected.rotation.z = THREE.MathUtils.degToRad(v);
    if (id === "sclX") selected.scale.x = v;
    if (id === "sclY") selected.scale.y = v;
    if (id === "sclZ") selected.scale.z = v;
    if (selectionBox.visible) selectionBox.setFromObject(selected);
  });
});

$("objName").addEventListener("input", () => {
  if (!selected) return;
  selected.name = $("objName").value;
  buildTree();
});
$("objVisible").addEventListener("change", () => {
  if (!selected) return;
  selected.visible = $("objVisible").checked;
  buildTree();
});
$("btnResetTransform").addEventListener("click", () => {
  if (!selected) return;
  const s = initialState.get(selected);
  if (s) { selected.position.copy(s.position); selected.rotation.copy(s.rotation); selected.scale.copy(s.scale); }
  else { selected.position.set(0,0,0); selected.rotation.set(0,0,0); selected.scale.set(1,1,1); }
  if (selectionBox.visible) selectionBox.setFromObject(selected);
  syncObjectPanel();
});
$("btnFocus").addEventListener("click", () => { if (selected) fitView(selected); });

// material inputs
function eachMaterial(obj, fn) {
  if (!obj || !obj.material) return;
  const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
  mats.forEach(fn);
}
$("matColor").addEventListener("input", () => { eachMaterial(selected, (m) => m.color && m.color.set($("matColor").value)); $("matColorHex").textContent = $("matColor").value; });
$("matEmissive").addEventListener("input", () => eachMaterial(selected, (m) => m.emissive && m.emissive.set($("matEmissive").value)));
$("matEmissiveInt").addEventListener("input", () => eachMaterial(selected, (m) => { if ("emissiveIntensity" in m) m.emissiveIntensity = parseFloat($("matEmissiveInt").value) || 0; }));
linkPair("matMetalness", (v) => eachMaterial(selected, (m) => { if ("metalness" in m) m.metalness = v; }));
linkPair("matRoughness", (v) => eachMaterial(selected, (m) => { if ("roughness" in m) m.roughness = v; }));
linkPair("matOpacity", (v) => eachMaterial(selected, (m) => { m.opacity = v; m.transparent = v < 1; }));
$("matWireframe").addEventListener("change", () => eachMaterial(selected, (m) => { if ("wireframe" in m) m.wireframe = $("matWireframe").checked; }));
$("matFlat").addEventListener("change", () => eachMaterial(selected, (m) => { if ("flatShading" in m) { m.flatShading = $("matFlat").checked; m.needsUpdate = true; } }));

function linkPair(base, apply) {
  const r = $(base), n = $(base + "N");
  r.addEventListener("input", () => { n.value = round(parseFloat(r.value)); apply(parseFloat(r.value)); });
  n.addEventListener("input", () => { r.value = n.value; apply(parseFloat(n.value)); });
}

// ---------- render tab ----------
$("bgColor").addEventListener("input", () => {
  if (!$("bgTransparent").checked) scene.background = new THREE.Color($("bgColor").value);
  $("bgColorHex").textContent = $("bgColor").value;
});
$("bgTransparent").addEventListener("change", () => {
  scene.background = $("bgTransparent").checked ? null : new THREE.Color($("bgColor").value);
});
$("envPreset").addEventListener("change", () => setEnvironment($("envPreset").value));
$("showGrid").addEventListener("change", () => { grid.visible = $("showGrid").checked; });

$("ambColor").addEventListener("input", () => ambient.color.set($("ambColor").value));
linkPair("ambInt", (v) => ambient.intensity = v);
$("dirColor").addEventListener("input", () => dirLight.color.set($("dirColor").value));
linkPair("dirInt", (v) => dirLight.intensity = v);
$("dirShadow").addEventListener("change", () => { dirLight.castShadow = $("dirShadow").checked; });

linkPair("camFov", (v) => { camera.fov = v; camera.updateProjectionMatrix(); });
document.querySelectorAll("[data-view]").forEach((b) => b.addEventListener("click", () => setView(b.dataset.view)));

$("btnFit").addEventListener("click", () => fitView());
$("btnReset").addEventListener("click", () => {
  initialState.forEach((s, o) => { o.position.copy(s.position); o.rotation.copy(s.rotation); o.scale.copy(s.scale); o.visible = s.visible; });
  buildTree();
  if (selected) syncObjectPanel();
  if (selectionBox.visible && selected) selectionBox.setFromObject(selected);
});

// ---------- tabs ----------
function switchTab(name) {
  document.querySelectorAll(".panel-tabs button").forEach((b) => b.classList.toggle("active", b.dataset.tab === name));
  document.querySelectorAll(".tab-page").forEach((p) => p.classList.toggle("active", p.id === "tab-" + name));
}
document.querySelectorAll(".panel-tabs button").forEach((b) => b.addEventListener("click", () => switchTab(b.dataset.tab)));

// ---------- pick by click ----------
let downX = 0, downY = 0;
canvas.addEventListener("pointerdown", (e) => { downX = e.clientX; downY = e.clientY; });
canvas.addEventListener("pointerup", (e) => {
  if (Math.abs(e.clientX - downX) > 4 || Math.abs(e.clientY - downY) > 4) return; // was a drag
  if (!model) return;
  const rect = canvas.getBoundingClientRect();
  pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObject(model, true);
  if (hits.length) selectObject(hits[0].object);
});

// ---------- file open / export ----------
$("btnOpen").addEventListener("click", () => $("fileInput").click());
$("fileInput").addEventListener("change", (e) => {
  const f = e.target.files[0];
  if (!f) return;
  const reader = new FileReader();
  reader.onload = () => loadFromArrayBuffer(reader.result, f.name);
  reader.readAsArrayBuffer(f);
});

$("btnExport").addEventListener("click", () => {
  if (!model) return;
  const exporter = new GLTFExporter();
  exporter.parse(model, (result) => {
    const blob = new Blob([result], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "usdd-edited.glb";
    a.click();
    URL.revokeObjectURL(url);
  }, (err) => { console.error(err); alert("导出失败：" + err); }, { binary: true });
});

// keyboard
window.addEventListener("keydown", (e) => {
  if (e.target.tagName === "INPUT") return;
  if (e.key === "f" || e.key === "F") { if (selected) fitView(selected); else fitView(); }
  if (e.key === "Escape") { selected = null; selectionBox.visible = false; refreshTreeSelection(); syncObjectPanel(); }
});

// ---------- resize + loop ----------
function resize() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  if (canvas.width !== w || canvas.height !== h) {
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
}
function animate() {
  requestAnimationFrame(animate);
  resize();
  controls.update();
  if (selectionBox.visible && selected) selectionBox.update();
  renderer.render(scene, camera);
}
animate();

// ---------- kick off ----------
loadFromURL("./usdd.glb");
