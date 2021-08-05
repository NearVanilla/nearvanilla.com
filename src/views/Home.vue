<template>
  <div class="w-screen scroll-container" id="page-top">
    <navbar :shrunk="shrunkNav" />
    <div>
      <div
        class="w-full h-screen bg-cover bg-no-repeat bg-center bg-fixed"
        :style="{ backgroundImage: 'url(' + bg + ')' }"
      >
        <div class="flex flex-wrap justify-center items-center w-full h-full">
          <island style="width: 900px; margin-top: -100px" v-if="!isMobile" />
          <div v-else class="flex items-center justify-center mt-20 h-4/5">
            <img src="/img/logo.png" alt="logo" class="h-full" />
          </div>
          <a href="#About" class="scroll-down block" v-smooth-scroll></a>
        </div>
      </div>
      <section
        id="About"
        class="min-h-93 w-screen p-12 open-sans"
        style="background-color: #f0f0f0"
      >
        <h2 class="text-center text-46 font-bold" style="color: #312f2b">
          Who we are
        </h2>
        <div
          class="flex flex-col md:flex-row items-center justify-center mx-20"
        >
          <div
            class="
              flex flex-col
              w-full
              text-center
              md:text-left md:w-1/2
              lg:w-1/3
              text-left
            "
          >
            <h3 class="montserrat text-3xl leading-tight mb-6">
              We live with the <span class="font-bold">community</span>
            </h3>
            <p class="leading-relaxed">
              We promote a low stress community atmosphere, where we can take
              our time, think before we act, and have fun together! We respect
              each other and our differences. We act and communicate responsibly
              and take responsibility for our actions in game. It is a server
              free from griefing, thieving and moderators.

              <br /><br />

              We aim for a simple yet enjoyable server. If there are suggestions
              made by any player we will take a look at them and maybe they
              might be implemented!
            </p>
          </div>
          <div
            class="
              w-full
              md:w-1/2
              flex
              items-center
              justify-center
              md:justify-end
            "
          >
            <img src="/img/creativity.png" class="rounded-full w-4/5" />
          </div>
        </div>
        <members />
      </section>
      <section id="Specifications" class="w-screen min-h-93 bg-grad"></section>
    </div>
  </div>
</template>

<script>
import { Island, Navbar, Members } from "../components";
import { ref } from "vue";
import bgImg from "../assets/img/bg-1.jpg";

export default {
  name: "Home",

  inject: ["mq"],

  components: {
    Navbar,
    Island,
    Members,
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

  destroyed() {
    window.removeEventListener("scroll", () => {});
  },

  computed: {
    isMobile() {
      return (
        this.mq.current == "md" ||
        this.mq.current == "sm" ||
        this.mq.current == "xs"
      );
    },
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

.text-46 {
  font-size: 46px;
}

.bg-grad {
  background: rgb(116, 235, 213);
  background: linear-gradient(
    90deg,
    rgba(116, 235, 213, 1) 0%,
    rgba(172, 182, 229, 1) 100%
  );
}
</style>
