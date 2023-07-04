<template>
  <div id="map" />
</template>

<script setup>
const props = defineProps({
  locations: Array,
});

import { ref, onMounted } from "vue";

const map = ref(null);

const prepareMap = () => {
  const script = document.createElement("script");
  script.src =
    "//dapi.kakao.com/v2/maps/sdk.js?appkey=2701d0491303d0eea69f2f2b5138d02f&autoload=false";

  script.onload = () => window.kakao.maps.load(drawMap);

  document.head.appendChild(script);
};

const drawMap = () => {
  const maps = window.kakao.maps;

  const container = document.getElementById("map");
  const options = {
    center: new maps.LatLng(0, 0),
    level: 6,
  };

  map.value = new maps.Map(container, options);

  const linePath = [];
  const Lats = [];
  const Lngs = [];

  props.locations.map((location) => {
    const position = new maps.LatLng(location.LOC_LAT, location.LOC_LNG);
    const marker = new maps.Marker({ position: position });
    const infoWindow = new maps.InfoWindow({
      position: position,
      content: `<div style="padding:5px;text-align:center;">${location.LOC_NAME}</div>`,
    });

    marker.setMap(map.value);
    infoWindow.open(map.value, marker);

    linePath.push(position);
    Lats.push(location.LOC_LAT);
    Lngs.push(location.LOC_LNG);
  });

  var polyline = new maps.Polyline({
    path: linePath,
    strokeWeight: 5,
    strokeColor: "blue",
    strokeOpacity: 0.7,
    strokeStyle: "solid",
  });

  polyline.setMap(map.value);

  const newCenter = new maps.LatLng(
    Lats.reduce((p, c) => p + c) / Lats.length,
    Lngs.reduce((p, c) => p + c) / Lngs.length
  );

  map.value.panTo(newCenter);
};

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    drawMap();
  } else {
    prepareMap();
  }
});
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
