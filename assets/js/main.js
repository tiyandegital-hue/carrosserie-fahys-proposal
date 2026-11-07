/* Carrosserie des Fahys — single swappable constant */
const BUSINESS_NAME = "Carrosserie des Fahys";
document.querySelectorAll("[data-biz]").forEach(function (el) { el.textContent = BUSINESS_NAME; });
document.title = document.title.replace("{{BUSINESS_NAME}}", BUSINESS_NAME);

/* Mobile nav */
var burger = document.querySelector(".burger");
var mnav = document.querySelector(".mobilenav");
if (burger && mnav) {
  burger.addEventListener("click", function () {
    var open = mnav.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

/* Before / after sliders (pointer + range input, one handler for all) */
document.querySelectorAll(".ba").forEach(function (box) {
  var range = box.querySelector("input[type=range]");
  var set = function (v) { box.style.setProperty("--pos", v + "%"); };
  if (range) range.addEventListener("input", function () { set(range.value); });
  var drag = false;
  var move = function (e) {
    var r = box.getBoundingClientRect();
    var x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
    var v = Math.max(2, Math.min(98, (x / r.width) * 100));
    set(v.toFixed(1));
    if (range) range.value = v.toFixed(1);
  };
  box.addEventListener("pointerdown", function (e) { drag = true; move(e); });
  window.addEventListener("pointermove", function (e) { if (drag) move(e); });
  window.addEventListener("pointerup", function () { drag = false; });
});

/* Gallery filters */
document.querySelectorAll(".filters button").forEach(function (btn) {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".filters button").forEach(function (b) { b.classList.remove("on"); });
    btn.classList.add("on");
    var f = btn.getAttribute("data-filter");
    document.querySelectorAll(".gal figure").forEach(function (fig) {
      fig.style.display = (f === "all" || fig.getAttribute("data-cat") === f) ? "" : "none";
    });
  });
});
