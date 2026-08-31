document.addEventListener("DOMContentLoaded", async () => {
  // await to create secitons before animating
  await handle_github();
  setup_gsap();
  document.getElementById("loader").classList.add("hidden");
  document.getElementById("scroll-content").classList.remove("hidden");
  animate_background();
});
