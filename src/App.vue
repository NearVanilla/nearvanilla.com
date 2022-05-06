<template>
  <div>
    <navbar :shrunk="shrunkNav" :scrollPos="scrollPos" />
    <router-view />
  </div>
</template>

<script setup>
import { ref, onUnmounted } from "vue";
import { useMq } from "vue3-mq";
import { Navbar } from "./components";
const mq = useMq();

const shrunkNav = ref(false);
const scrollPos = ref(0);

const handleScroll = (e) => {
  shrunkNav.value = window.scrollY > 100;
  scrollPos.value = window.scrollY;
};
window.addEventListener("scroll", handleScroll);
onUnmounted(() => window.removeEventListener("scroll", () => {}));
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #444;
  width: 100vw;
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  -webkit-tap-highlight-color: #fed136;
}

@responsive {
  .w-1140 {
    max-width: 1140px;
  }

  .w-960 {
    max-width: 960px;
  }

  .w-720 {
    max-width: 720px;
  }

  .w-540 {
    max-width: 540px;
  }
}

.montserrat {
  font-family: Montserrat, "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.open-sans {
  font-family: "Open Sans", Arial, sans-serif;
}

.bg-yellow {
  background-color: #fed136;
}

.border-yellow {
  border-color: #fed136;
}

.text-xxs {
  font-size: 0.5rem;
  line-height: 0.9rem;
}
</style>
