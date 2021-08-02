<template>
  <div class="w-screen scroll-container" id="page-top">
    <navbar :shrunk="shrunkNav" />
    <div>
      <div
        class="w-full h-screen bg-cover bg-no-repeat bg-center bg-fixed"
        :style="{ backgroundImage: 'url(' + bg + ')' }"
      >
        <div class="flex flex-wrap justify-center items-center w-full h-full">
          <island style="width: 900px" />
          <!-- <div class="row justify-content-center">
          <div class="logo">
            <img src="../assets/img/logo.png" alt="logo" width="70%" />
          </div>
        </div> -->
          <a href="#About" class="scroll-down block" v-smooth-scroll></a>
        </div>
      </div>
      <div id="About" class="min-h-93 w-screen">
        <p>Test</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Island, Navbar } from "../components";
import { ref } from "vue";
import bgImg from "../assets/img/bg-1.jpg";

export default {
  name: "Home",

  components: {
    Navbar,
    Island,
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
.scroll-down {
  opacity: 1;
  -webkit-transition: all 0.5s ease-in 3s;
  transition: all 0.5s ease-in 3s;
}

.scroll-down {
  position: absolute;
  bottom: 30px;
  left: 50%;
  margin-left: -16px;
  width: 50px;
  height: 50px;
  border: 2px solid #fff;
  background-size: 14px auto;
  border-radius: 50%;
  z-index: 2;
  -webkit-animation: bounce 2s infinite 2s;
  animation: bounce 2s infinite 2s;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
  transform: scale(1);
  z-index: 9;
}

.scroll-down:before {
  position: absolute;
  top: calc(50% - 8px);
  left: calc(50% - 6px);
  transform: rotate(-45deg);
  display: block;
  width: 12px;
  height: 12px;
  content: "";
  border: 2px solid white;
  border-width: 0px 0 2px 2px;
}

@keyframes bounce {
  0%,
  100%,
  20%,
  50%,
  80% {
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
  }
  40% {
    -webkit-transform: translateY(-10px);
    -ms-transform: translateY(-10px);
    transform: translateY(-10px);
  }
  60% {
    -webkit-transform: translateY(-5px);
    -ms-transform: translateY(-5px);
    transform: translateY(-5px);
  }
}

.min-h-93 {
  min-height: 93.5vh;
}
</style>
