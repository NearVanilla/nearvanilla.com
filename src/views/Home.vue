<template>
  <div class="w-screen scroll-container" id="page-top">
    <navbar :shrunk="shrunkNav" />
    <div>
      <div
        class="w-full h-screen bg-cover bg-no-repeat bg-center bg-fixed"
        :style="{ backgroundImage: 'url(' + bg + ')' }"
      >
        <div class="flex flex-wrap">
          <!-- <div class="row justify-content-center">
          <div class="logo">
            <img src="../assets/img/logo.png" alt="logo" width="70%" />
          </div>
        </div> -->
          <div class="row" id="mainNav">
            <a href="#About" class="scroll-down js-scroll-trigger"></a>
          </div>
        </div>
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
.pos-left {
  top: 19vh;
  left: 50px;
  z-index: 1;
}
</style>
