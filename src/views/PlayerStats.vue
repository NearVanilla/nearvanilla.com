<template>
  <div class="w-screen scroll-container" id="page-top">
    <div
      class="w-full h-48 bg-cover bg-no-repeat bg-center bg-fixed"
      ref="landing"
    >
      <div
        class="absolute top-0 left-0 w-screen h-48 bg-cover bg-no-repeat bg-center bg-fixed fade"
        ref="blur"
        :style="{ backgroundImage: 'url(' + bgBlur + ')' }"
      >
        <div class="z-50 mt-28">
          <button
            class="hover:bg-yellow-600 text-white font-bold py-2 px-4 border-b-4 hover:border-yellow-700 rounded-l-md border-r border-solid border-gray-600"
            :class="
              page == 0
                ? ['bg-yellow-700 border-yellow-900 ']
                : ['bg-yellow-500 border-yellow-700 ']
            "
            @click="page = 0"
          >
            Awards
          </button>
          <button
            class="hover:bg-yellow-600 text-white font-bold py-2 px-4 border-b-4 hover:border-yellow-700 rounded-r-md"
            :class="
              page == 1
                ? ['bg-yellow-700 border-yellow-900']
                : ['bg-yellow-500 border-yellow-700']
            "
            @click="page = 1"
          >
            Highscores
          </button>
        </div>
      </div>
    </div>

    <iframe
      ref="frame"
      src="/awards/index.html"
      style="width: 100vw; min-height: 100vh"
      onload="this.height=this.contentWindow.document.body.scrollHeight;"
      v-if="page == 0"
    ></iframe>
    <iframe
      ref="frame"
      src="/highscores/index.html"
      style="width: 100vw; min-height: 100vh"
      onload="this.height=this.contentWindow.document.body.scrollHeight;"
      v-else-if="page == 1"
    ></iframe>
  </div>
</template>

<script setup>
import { ref } from "vue";
import bgImg from "../assets/img/bg-1.jpg";
import bgBlurImg from "../assets/img/bg-blur.jpg";

const bg = bgImg;
const bgBlur = bgBlurImg;
const page = ref(0);
const frame = ref(null);
</script>
