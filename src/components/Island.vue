<template>
  <div class="relative block">
    <img
      :src="leftIsland"
      alt="logoLeftIsland"
      ref="left"
      class="relative left-island leftislandfloat"
    />
    <img
      :src="rightIsland"
      alt="logoRightIsland"
      ref="right"
      class="absolute right-island rightislandfloat"
    />
    <img
      :src="middleIsland"
      alt="logoMiddleIsland"
      ref="center"
      class="absolute center-island centerislandfloat"
    />
    <img
      :src="text"
      alt="logoText"
      ref="logo"
      class="absolute logo opacity-0"
    />
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import leftIsland from "@/assets/img/island/leftIsland.webp"
import rightIsland from "@/assets/img/island/rightIsland.webp"
import middleIsland from "@/assets/img/island/middleIslandsWithClouds.webp"
import text from "@/assets/img/island/NVText2.webp"

const loaded = ref(0);
watch(loaded, () => {
  logo.value.style.opacity = 1;
  setTimeout(() => {
    logo.value.classList.add("logofontglow");
  }, 1000);
  right.value.style.opacity = 1;
  left.value.style.opacity = 1;
  center.value.style.opacity = 1;
});

const logo = ref(null);
const right = ref(null);
const left = ref(null);
const center = ref(null);

onMounted(() => {
  logo.value.addEventListener("load", () => (loaded.value += 1));
  right.value.addEventListener("load", () => (loaded.value += 1));
  left.value.addEventListener("load", () => (loaded.value += 1));
  center.value.addEventListener("load", () => (loaded.value += 1));
});

onBeforeUnmount(() => {
  logo.value.removeEventListener("load", () => {});
  right.value.removeEventListener("load", () => {});
  left.value.removeEventListener("load", () => {});
  center.value.removeEventListener("load", () => {});
});
</script>

<style scoped>
.left-island {
  z-index: 2;
  top: 0;
  left: 50px;
  opacity: 0;
  transition: opacity 1.3s ease-in-out;
}

.right-island {
  z-index: 3;
  top: -40px;
  right: 60px;
  opacity: 0;
  transition: opacity 0.9s ease-in-out;
}

.center-island {
  z-index: 1;
  left: 290px;
  top: 80px;
  opacity: 0;
  transition: opacity 1.7s ease-in-out;
}

.logo {
  z-index: 4;
  left: 150px;
  top: 220px;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.rightislandfloat {
  animation: float 6s ease-in-out infinite;
}

.centerislandfloat {
  animation: float 8s ease-in-out infinite;
}

.leftislandfloat {
  animation: float 7s ease-in-out infinite;
}

.logofontglow {
  animation: glower 8s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translatey(0px);
  }
  50% {
    transform: translatey(-15px);
  }
  100% {
    transform: translatey(0px);
  }
}

@keyframes glower {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.9;
  }
  100% {
    opacity: 1;
  }
}
</style>
