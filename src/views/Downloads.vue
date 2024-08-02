<template>
  <div class="bg-gray-222 min-h-screen w-screen">
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-28 px-12 gap-4"
    >
      <download-card
        version="1.12"
        date="6th of June 2017 - 3th of June 2018"
        :season="1"
        size="2.3"
        filename="NearVanillaS1.zip"
      />
      <download-card
        version="1.13"
        date="28th of June 2018 - 23rd of July 2018"
        season="2"
        size="4.8"
        filename="NearVanillaS2.zip"
      />
      <download-card
        version="1.13.2"
        date="28th of October 2018 - 25th of May 2019"
        season="3"
        size="7.4"
        filename="NearVanillaS3.zip"
      />
      <download-card
        version="1.15.2"
        date="1st of June 2019 - 3rd of July 2020"
        season="4"
        size="9.7"
        filename="NearVanillaS4.zip"
      />
      <download-card
        version="1.17.1"
        date="4th of July 2020 - 3th of January 2022"
        season="5"
        size="18.4"
        filename="NearVanillaS5.zip"
      />
      <download-card
        version="1.20.6"
        date="8th of January 2022 - 22nd of July 2024"
        season="6"
        size="45.1"
        filename="NearVanillaS6.7z"
      />
      <download-card
        version="1.20.6"
        date="8th of January 2022 - 22nd of July 2024"
        season="6 Creative"
        size="1"
        filename="NearVanillaS6Creative.7z"
      />
    </div>
  </div>
</template>

<script setup>
import { DownloadCard } from "../components";
</script>
