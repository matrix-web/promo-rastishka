import { computed, onMounted, onUnmounted, ref } from "vue";

export const useBreakpoints = () => {
  let windowWidth = ref(window.innerWidth);

  const onWidthChange = () => (windowWidth.value = window.innerWidth);
  onMounted(() => window.addEventListener("resize", onWidthChange));
  onUnmounted(() => window.removeEventListener("resize", onWidthChange));

  const type = computed(() => {
    if (windowWidth.value < 768) return "mobile";
    if (windowWidth.value >= 768 && windowWidth.value < 1024) return "tablet";
    if (windowWidth.value >= 1024 && windowWidth.value < 1440) return "laptop";
    if (windowWidth.value >= 1440) return "desktop";
    else return "desktop";
  });

  const width = computed(() => windowWidth.value);

  return { width, type };
};
