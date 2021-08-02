<template>
  <div class="w-screen scroll-container" id="page-top">
    <navbar :shrunk="shrunkNav" />
    <div>
      <div class="w-full h-screen bg-img" :style="{backgroundImage: 'url(' + bg + ')' }"></div>
      <div class="h-screen">
        <p class="p-0 text-5xl font-bold">{{ mq.current }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Navbar } from "../components";
import { ref } from "vue";
import bgImg from '../assets/img/bg-1.jpg'

export default {
  name: "Home",

  components: {
    Navbar,
  },

  inject: ["mq"],

  setup(props, context) {
    const shrunkNav = ref(false);
    const bg = bgImg;
    
    const handleScroll = (e) => {
      if (window.scrollY > 100) {
        shrunkNav.value = true;
      } else shrunkNav.value = false;
    };

    return { shrunkNav, bg, handleScroll };
  },

  created() {
    window.addEventListener("scroll", this.handleScroll);
  },

  mounted() {},

  destroyed() {
    window.removeEventListener("scroll", () => {});
  },
};
</script>

<style scoped>
.bg-img {
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center center;
}
</style>
