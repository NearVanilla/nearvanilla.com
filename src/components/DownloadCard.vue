<template>
  <div class="w-full bg-gray-900 rounded-lg border border-gray-200 shadow-md">
    <a :href="downloadUrl">
      <img class="rounded-t-lg" :src="imgUrl" alt="" />
    </a>
    <div class="p-2 text-left tracking-tight">
      <a :href="downloadUrl">
        <h5 class="mb-2 font-bold text-gray-100">Season {{ season }}</h5>
      </a>
      <p class="mb-2 font-normal text-gray-300">
        <span class="text-sm">Version: </span>
        <span class="font-bold">Minecraft {{ version }}</span>
      </p>
      <p class="mb-2 font-normal text-gray-300">
        <span class="text-sm">Size:</span>
        <span class="font-bold">{{ size }}GB</span>
      </p>
      <p class="font-normal text-gray-300">
        <span class="text-sm">Season length: </span>
        <span class="font-bold">{{ date }}</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps(["season", "size", "date", "version"]);
const imgUrl = computed(() => new URL(`/img/spawn/s${props.season}.png`, import.meta.url));
const downloadUrl = computed(() => new URL(`https://files.nearvanilla.com/worlds/NearVanillaS${props.season}.zip`, import.meta.url));
</script>
