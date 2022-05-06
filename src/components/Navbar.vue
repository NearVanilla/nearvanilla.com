<template>
  <nav
    ref="nav"
    :class="{ shrunk: shrunk }"
    class="fixed top-0 left-0 right-0 z-10 h-auto bg-transparent py-6 transition-padding flex flex-nowrap justify-start px-4"
    v-if="!isMobile"
  >
    <div
      class="bg-gray-222 py-0 fade-bar absolute w-full h-full"
      :style="{ top: -(100 - scrollPos) + '%' }"
      :class="{ hidden: scrollPos >= 105 }"
    ></div>
    <div
      class="flex items-center justify-between mx-auto px-4 w-full w-540 md:w-960 lg:w-960 xl:w-1140 relative"
    >
      <router-link
        to="/home#page-top"
        class="transition-all duration-300 brand inline-block mr-4 py-1.5 text-xl md:text-2xl lg:text-5xl whitespace-nowrap leading-normal"
        :class="shrunk ? 'minimise' : ''"
        v-smooth-scroll
      >
        Near Vanilla
      </router-link>
      <div class="flex items-center text-center w-full">
        <div
          class="flex-row flex pl-0 mb-0 list-none ml-auto montserrat uppercase text-white text-xs lg:text-sm w-full justify-end tracking-1 font-normal whitespace-nowrap"
        >
          <router-link class="link px-4 py-4" to="/home#About" v-smooth-scroll>About</router-link>
          <router-link class="link px-4 py-4" to="/home#Specifications" v-smooth-scroll
            >Server Info</router-link
          >
          <a class="link px-4 py-4" href="https://discord.com/invite/KHAuj5F"
            >Apply</a
          >
          <router-link class="link px-4 py-4" to="/stats">Player Stats</router-link>
           <router-link class="link px-4 py-4" to="/downloads">Downloads</router-link>
        </div>
      </div>
    </div>
  </nav>
  <nav
    class="fixed top-0 left-0 right-0 z-10 h-auto py-2 px-4 bg-gray-222"
    v-else
  >
    <div class="mx-10 flex items-center justify-between">
      <a
        href="#page-top"
        class="transition-all duration-300 brand inline-block mr-4 py-1.5 whitespace-nowrap text-xl relative"
        v-smooth-scroll
      >
        Near Vanilla
      </a>
      <div
        class="custom-yellow p-3 rounded text-xs leading-none cursor-pointer"
        @click="showNav = !showNav"
      >
        <font-awesome-icon class="text-gray-900" :icon="['fas', 'bars']" />
      </div>
    </div>
    <transition name="drop-down">
      <div
        v-if="showNav"
        class="z--1 absolute flex flex-col text-white tracking-wide montserrat text-sm bg-gray-222 w-screen left-0"
      >
        <a class="py-3" href="#About" v-smooth-scroll>ABOUT</a>
        <a class="py-3" href="#Specifications" v-smooth-scroll>SERVER INFO</a>
        <a class="py-3" href="https://nearvanilla.com/apply">APPLY</a>
        <a class="py-3" href="https://nearvanilla.com/highscores">HIGHSCORES</a>
        <a class="py-3" href="https://nearvanilla.com/awards">AWARDS</a>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { inject, ref, computed } from "vue";
const mq = inject("mq");
defineProps({
  shrunk: {
    required: true,
    value: Boolean,
  },
  scrollPos: {
    required: true,
    value: Number,
  },
});

const showNav = ref(false);
const isMobile = computed(() => mq.current == "sm" || mq.current == "xs");
</script>

<style scoped>
.bg-gray-222 {
  background-color: #222;
}

.shrunk {
  @apply bg-gray-222 py-0;
}

.brand {
  color: #fed136;
  font-family: "Kaushan Script", "Helvetica Neue", Helvetica, Arial, cursive;
}

.transition-padding {
  -webkit-transition: padding-top 0.3s, padding-bottom 0.3s;
  -moz-transition: padding-top 0.3s, padding-bottom 0.3s;
  transition: padding-top 0.3s, padding-bottom 0.3s;
}

.flex-basis-100 {
  flex-basis: 100%;
}

.custom-yellow {
  background-color: #fed136;
}

.link:hover {
  color: #fed136;
}

.tracking-1 {
  letter-spacing: 1px;
}

.minimise {
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.fade-bar {
  left: 0;
}

.drop-down-enter-active {
  animation: drop-down 0.8s;
}

.drop-down-leave-active {
  animation: drop-down 0.8s reverse;
}

@keyframes drop-down {
  from {
    margin-top: -100%;
  }
  to {
    margin-top: 0;
  }
}

.z--1 {
  z-index: -1;
}
</style>
