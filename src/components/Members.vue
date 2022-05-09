<template>
  <div class="w-full p-2 md:p-10 montserrat text-3xl">
    <h3 class="mb-6">Our {{ members.length }} Members</h3>
    <carousel :items-to-show="5" class="cursor-pointer mt-12" :autoplay="1500">
      <div
        v-for="member in members"
        :key="member.name"
        class="flex justify-center items-center flex-col min-w-20 lg:min-w-28"
      >
        <img class="rounded-full w-1/2" :src="member.icon" />
        <p class="mt-2 text-xxs sm:text-xs">{{ member.name }}</p>
      </div>
    </carousel>
  </div>
</template>

<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel } from "vue3-carousel";
import { onMounted, ref, inject } from "vue";

const members = ref([]);
const http = inject("http");

onMounted(async () => await getHiscoresJson());
const getHiscoresJson = async () => {
  const res = await http.get("highscores/highscores.json");
  if (res.status !== 200) {
    return;
  }

  for (const member of res.data.UUID) {
    if (members.value.length > 20) {
      setTimeout(
        () =>
          members.value.push({
            icon: `https://crafatar.com/avatars/${member.UUID}?overlay=true?size=160`,
            name: member.lastKnownName,
          }),
        500
      );
    } else {
      members.value.push({
        icon: `https://crafatar.com/avatars/${member.UUID}?overlay=true?size=160`,
        name: member.lastKnownName,
      });
    }
  }
};
</script>

<style scoped>
@responsive {
  .min-w-28 {
    min-width: 7.5rem;
  }

  .min-w-20 {
    min-width: 6rem;
  }
}

/* purgecss ignore */
.carousel__viewport {
  overflow: hidden;
}

/* purgecss ignore */
.carousel__track {
  display: flex;
  margin: 0;
  padding: 0;
  position: relative;
}
</style>
