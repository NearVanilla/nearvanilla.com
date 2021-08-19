<template>
  <nav
    ref="nav"
    :class="{ shrunk: shrunk }"
    class="
      fixed
      top-0
      left-0
      right-0
      z-10
      h-auto
      bg-transparent
      py-6
      transition-padding
      flex flex-nowrap
      justify-start
      px-4
    "
    v-if="!isMobile"
  >
    <div
      class="bg-gray-222 py-0 fade-bar absolute w-full h-full"
      :style="{ top: -(100 - scrollPos) + '%' }"
      :class="{ hidden: scrollPos >= 105 }"
    ></div>
    <div
      class="
        flex
        items-center
        justify-between
        mx-auto
        px-4
        w-full w-540
        md:w-960
        lg:w-960
        xl:w-1140
        relative
      "
    >
      <a
        href="#page-top"
        class="
          transition-all
          duration-300
          brand
          inline-block
          mr-4
          py-1.5
          text-xl
          md:text-2xl
          lg:text-5xl
          whitespace-nowrap
          leading-normal
        "
        :class="shrunk ? 'minimise' : ''"
        v-smooth-scroll
      >
        Near Vanilla
      </a>
      <div class="flex items-center text-center w-full">
        <div
          class="
            flex-row flex
            pl-0
            mb-0
            list-none
            ml-auto
            montserrat
            uppercase
            text-white text-xs
            lg:text-sm
            w-full
            justify-end
            tracking-1
            font-normal
            whitespace-nowrap
          "
        >
          <a class="link px-4 py-4" href="#About" v-smooth-scroll>About</a>
          <a class="link px-4 py-4" href="#Specifications" v-smooth-scroll
            >Server Info</a
          >
          <a class="link px-4 py-4" href="https://nearvanilla.com/apply"
            >Apply</a
          >
          <a class="link px-4 py-4" href="https://nearvanilla.com/highscores"
            >Highscores</a
          >
          <a class="link px-4 py-4" href="https://nearvanilla.com/awards"
            >Awards</a
          >
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
        class="
          transition-all
          duration-300
          brand
          inline-block
          mr-4
          py-1.5
          whitespace-nowrap
          text-xl
        "
        v-smooth-scroll
      >
        Near Vanilla
      </a>
      <div
        class="custom-yellow p-3 rounded text-xs leading-none cursor-pointer"
      >
        <font-awesome-icon class="text-gray-900" :icon="['fas', 'bars']" />
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  inject: ["mq"],

  props: {
    shrunk: {
      required: true,
      value: Boolean,
    },

    scrollPos: {
      required: true,
      value: Number,
    },
  },

  data() {
    return {
      showNav: false,
    };
  },

  computed: {
    isMobile() {
      return this.mq.current == "sm" || this.mq.current == "xs";
    },
  },
};
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
</style>
