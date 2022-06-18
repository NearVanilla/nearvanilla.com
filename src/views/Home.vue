<template>
  <div class="w-screen scroll-container" id="page-top">
    <div>
      <div
        class="w-full h-screen bg-cover bg-no-repeat bg-center bg-fixed"
        ref="landing"
      >
        <div
          class="absolute top-0 left-0 w-screen h-screen bg-cover bg-no-repeat bg-center bg-fixed fade"
          ref="blur"
          :style="{ backgroundImage: 'url(' + bgBlur + ')' }"
        ></div>
        <div class="flex flex-wrap justify-center items-center w-full h-full">
          <island style="width: 900px; margin-top: -100px" v-if="!isMobile" />
          <div v-else class="flex items-center justify-center mt-20 h-4/5">
            <img :src="logo" alt="logo" class="h-full" />
          </div>
          <a href="#About" class="scroll-down block" v-smooth-scroll></a>
        </div>
      </div>
      <section
        id="About"
        class="min-h-93 w-screen p-12 open-sans"
        style="background-color: #f0f0f0"
      >
        <h2 class="text-center text-46 font-bold mt-8" style="color: #312f2b">
          Who we are
        </h2>
        <div
          class="flex flex-col md:flex-row items-center justify-center mx-4 xs:mx-10 sm:mx-20"
        >
          <div
            class="flex flex-col w-full text-center md:text-left md:w-1/2 lg:w-1/3"
          >
            <h3 class="montserrat text-3xl leading-tight mb-6">
              We live with the <span class="font-bold">community</span>
            </h3>
            <p class="leading-relaxed">
              We promote a low stress community atmosphere, where we can take
              our time, think before we act, and have fun together! We respect
              each other and our differences. We act and communicate responsibly
              and take responsibility for our actions in game. It is a server
              free from griefing and thieving, and we have moderators to ensure that.

              <br /><br />

              We aim for a simple yet enjoyable server. If there are suggestions
              made by any player we will take a look at them and maybe they
              might be implemented!
            </p>
          </div>
          <div
            class="w-full md:w-1/2 flex items-center justify-center md:justify-end"
          >
            <img :src="creativity" class="rounded-full w-4/5" />
          </div>
        </div>
        <members />
        <Map />
      </section>
      <section id="Specifications" class="w-screen min-h-screen bg-grad p-12">
        <h3
          class="text-center text-white text-46 font-bold mb-10 p-12 border-2 border-white border-solid border-l-0 border-r-0"
        >
          Server Info
        </h3>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-12 mt-12 montserrat line-height-1 text-gray-800"
        >
          <div class="server-stat mx-1 rounded-md p-6">
            <font-awesome-icon class="text-7xl" :icon="['fas', 'microchip']" />
            <p class="text-3xl font-bold my-4">Processor</p>
            <p>
              An octa-core processor reaching up to 5Ghz gives us seamless
              gameplay. Having a processor that can keep up with the server
              reduces the amount of lag spikes and rubber banding our players
              encounter.
            </p>
          </div>
          <div class="server-stat mx-1 rounded-md p-6">
            <font-awesome-icon class="text-7xl" :icon="['fas', 'hdd']" />
            <p class="text-3xl font-bold my-4">Storage</p>
            <p>
              Despite our quality specifications, the world of technology can be
              unpredictable. Although these unexpected occurrences are rare, we
              are still prepared with 1TB of SSD storage that allows bi-hourly
              back-ups of our world. Should any corruption occur, we can restore
              lost or corrupted data quickly and minimize the effect it could
              have on our players.
            </p>
          </div>
          <div class="server-stat mx-1 rounded-md p-6">
            <font-awesome-icon class="text-7xl" :icon="['fas', 'memory']" />
            <p class="text-3xl font-bold my-4">RAM</p>
            <p>
              With 8GB of dedicated RAM for the server, our players don't have
              to worry about random server crashes that could result in loss of
              data and can enjoy a hassle-free environment.
            </p>
          </div>
          <div class="server-stat mx-1 rounded-md p-6">
            <font-awesome-icon
              class="text-7xl"
              :icon="['fas', 'network-wired']"
            />
            <p class="text-3xl font-bold my-4">Network</p>
            <p>
              When running a multiplayer server like ours, speed and resources
              are everthing. The Near Vanilla server and website run on a
              dedicated, Linux based server that is equipped and designed to
              give players the best play experience possible on a butter-smooth
              server.
            </p>
            <div class="flex flex-nowrap flex-col justify-between m-6">
              <p><span class="font-bold text-xs">DOWN:</span> 988 Mbit/s</p>
              <p><span class="font-bold text-xs">UP:</span> 924 Mbit/s</p>
              <p><span class="font-bold text-xs">PING:</span> 1 ms</p>
            </div>
          </div>
        </div>
        <h3
          class="text-center text-white text-46 font-bold my-10 p-12 border-2 border-white border-solid border-l-0 border-r-0"
        >
          Our Plugins
        </h3>
        <Plugins />
      </section>
      <footer class="bg-2b m-0 p-6">
        <div>
          <p class="text-white mb-2">© Near Vanilla. All rights reserved.</p>
          <p class="text-gray-500">Play @ play.nearvanilla.com</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { Map, Island, Members, Plugins } from "../components";
import { ref, inject, onMounted, computed, watch } from "vue";

import bgImg from "../assets/img/bg-1.webp";
import bgBlurImg from "../assets/img/bg-blur.webp";
import logo from "../assets/img/logo.webp"
import creativity from "../assets/img/creativity.webp"

const bg = bgImg;
const bgBlur = bgBlurImg;
const landing = ref(null);
const blur = ref(null);

onMounted(() => {
  loadBg(bg).then(() => {
    landing.value.style.backgroundImage = "url(" + bg + ")";
    blur.value.classList.add("hide");
  });
});

const loadBg = (src) => {
  return new Promise(function (resolve, reject) {
    const image = new Image();
    image.addEventListener("load", resolve);
    image.addEventListener("error", reject);
    image.src = src;
  });
};

const mq = inject("mq");
const isMobile = computed(() => {
  return mq.current == "md" || mq.current == "sm" || mq.current == "xs";
});
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
    180deg,
    rgba(116, 235, 213, 1) 0%,
    rgba(172, 203, 229, 1) 100%
  );
  background-attachment: fixed;
}

.line-height-1 {
  line-height: 1.2;
}

.server-stat {
  background: rgba(255, 255, 255, 0.35);
  box-shadow: 0 2px 16px 0 rgba(61, 138, 148, 0.37);
  backdrop-filter: blur(6.5px);
  -webkit-backdrop-filter: blur(6.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.bg-2b {
  background-color: #2b2b2b;
}

.fade {
  -webkit-transition: opacity 1s ease-in-out;
  -moz-transition: opacity 1s ease-in-out;
  -o-transition: opacity 1s ease-in-out;
  transition: opacity 1s ease-in-out;
}

.hide {
  opacity: 0;
}
</style>
