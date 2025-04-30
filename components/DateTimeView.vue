<script setup lang="ts">
import  {type Weather} from "~/types/weather";

const latitude = ref(0);
const longitude = ref(0);
const weatherData: Ref<Weather> = ref({} as Weather);

onMounted(() => {
  const geoLocation = navigator.geolocation;
  geoLocation.getCurrentPosition((position) => {
    latitude.value = position.coords.latitude;
    longitude.value = position.coords.longitude;
    getWeather();
  })
})

function getWeather() {
  console.log(latitude.value, longitude.value);
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude.value}&longitude=${longitude.value}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`)
      .then(response => response.json())
      .then((data: Weather)  => weatherData.value = data)
      .catch(error => console.error(error));
}
</script>

<template>
    <h1 class="text-2xl text-center mt-3 font-bold w-full">{{new Date().toDateString()}}</h1>
  <span v-if="weatherData?.current">
    {{ weatherData.current.temperature_2m }} °C
  </span>
</template>

<style scoped>

</style>