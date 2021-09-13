<template>
  <div>
    <div
      class="
        flex
        w-full
        md:w-3/4
        lg:w-1/2
        mb-10
        mx-auto
        justify-between
        montserrat
      "
    >
      <p
        class="cursor-pointer"
        :style="{ fontWeight: filter == 'all' ? '700' : '' }"
        @click="filter = 'all'"
      >
        ALL
      </p>
      <p
        class="cursor-pointer"
        :style="{ fontWeight: filter == 'core' ? '700' : '' }"
        @click="filter = 'core'"
      >
        CORE
      </p>
      <p
        class="cursor-pointer"
        :style="{ fontWeight: filter == 'administration' ? '700' : '' }"
        @click="filter = 'administration'"
      >
        ADMINISTRATION
      </p>
      <p
        class="cursor-pointer"
        :style="{ fontWeight: filter == 'custom' ? '700' : '' }"
        @click="filter = 'custom'"
      >
        CUSTOM
      </p>
    </div>

    <div
      class="
        grid grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        xl:grid-cols-4
        gap-12
      "
    >
      <div v-for="plugin in pluginsFiltered" :key="plugin.name" class="card">
        <div class="card-inner montserrat">
          <div
            class="
              front
              flex flex-col
              justify-between
              items-center
              p-6
              bg-gray-100
              rounded-md
              basis-0
            "
          >
            <img :src="getIconUrl(plugin.name)" class="w-1/3" />
            <h3 class="font-bold text-3xl">{{ plugin.name }}</h3>
            <p v-html="plugin.excerpt"></p>
          </div>
          <div
            class="
              back
              bg-gray-100
              rounded-md
              flex flex-col
              justify-between
              p-8
              items-center
              h-full
            "
          >
            <h3 class="font-bold text-green-900 text-2xl">
              {{ plugin.name }}
            </h3>
            <p v-html="plugin.info"></p>
            <img class="w-1/6" v-if="plugin.on" :src="getIconUrl(plugin.on)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { pluginsList } from "../plugins.js";

export default {
  data() {
    return {
      filter: "all",
      plugins: pluginsList,
    };
  },

  computed: {
    pluginsFiltered() {
      return this.plugins.filter(
        (x) => x.type == this.filter || this.filter == "all"
      );
    },
  },

  methods: {
    getIconUrl(str) {
      str = str.replace(/\s/g, "");
      str = str.toLowerCase();
      return `/img/pluginIcons/${str}.png`;
    },
  },
};
</script>

<style scoped>
.card {
  background-color: transparent;
  min-height: 312px;
  perspective: 1000px;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.card:hover .card-inner {
  transform: rotateY(180deg);
}

.front,
.back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.back {
  transform: rotateY(180deg);
}

.basis-0{
  flex-basis:0;
}
</style>
