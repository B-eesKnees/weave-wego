<template>
  <div class="wrapper">
    <gnbBar />
    <div class="header">글 수정하기</div>
    <div class="page">
      <div class="filter">필터 구역</div>
      <!-- 필터 들어갈 곳 -->
      <div class="select">
        <input id="public" v-model="open" type="radio" :value="1" />
        <label for="public" style="margin-right: 1rem">공개</label>
        <input id="private" v-model="open" type="radio" :value="0" />
        <label for="private">비공개</label>
      </div>
      <div class="title">
        <div>제목</div>
        <input id="title" v-model="title" type="text" placeholder="제목 입력" />
      </div>
      <div class="map">
        <p>지도에서 검색 후 선택하기</p>
        <div class="map_wrap">
          <div
            id="map"
            style="
              width: 100%;
              height: 100%;
              position: relative;
              overflow: hidden;
            "
          />

          <div id="menu_wrap" class="bg_white">
            <div class="option">
              <div>
                <div>
                  키워드 :
                  <input id="keyword" v-model="keyword" type="text" size="15" />
                  <button type="button" @click="() => searchPlaces()">
                    검색하기
                  </button>
                </div>
              </div>
            </div>
            <hr />
            <ul id="placesList" />
            <div id="pagination" />
          </div>
        </div>
      </div>

      <div class="locations">
        <div
          v-for="(location, index) of locations"
          :key="index"
          class="location"
        >
          <div>
            <p>{{ `선택 ${index + 1}: ${location.title}` }}</p>
            <button @click="() => removeLocation(location.id)">x</button>
          </div>
          <textarea v-model="location.content" placeholder="코멘트 입력" />
        </div>
      </div>
      <hr />
      <!-- 장소와 코멘트 들어갈 곳 -->
      <div class="summary">
        <p>총 평</p>
        <textarea v-model="review" placeholder="코멘트 입력" />
      </div>
      <div>
        이미지 업로드
        <div class="images">
          <div v-for="image in images" class="image">
            <button type="button" @click="() => removeImage(image.id)">
              x
            </button>
            <img :src="image.preview" />
          </div>
          <label for="upload_btn">+</label>
          <input
            id="upload_btn"
            type="file"
            accept="image/*"
            @change="addImage"
          />
        </div>
      </div>
      <!-- 사진 첨부하는 버튼 들어갈 곳-->
      <div class="buttons">
        <button @click="updatePost">수정완료</button>
        <button>취소</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import gnbBar from "@/components/gnbBar.vue";
import axios from "axios";
import { ref, onMounted, onActivated } from "vue";
import { useRouter, useRoute } from "vue-router";
///
const route = useRoute();
const router = useRouter();
///
const open = ref(0);
const title = ref("");
const review = ref("");

///
const map = ref(null);
const infowindow = ref(null);
const keyword = ref("경복궁");
const markers = ref([]);
const locations = ref([]);
const locationRevData = ref([]);
const images = ref([]); // 이미지 업로드 하는 스크립트

const getBoard = () => {
  console.log("a");
  axios
    .get("http://127.0.0.1:3000/postdata/board", {
      params: {
        boardId: route.params.boardId, // router -> :boardId
      },
    })
    .then((result) => {
      const BRD_TEMP = result.data.board;
      title.value = BRD_TEMP.BRD_TITLE;
      review.value = BRD_TEMP.BRD_REV;
      open.value = BRD_TEMP.BRD_OPEN;
      locationRevData.value = [
        BRD_TEMP.BRD_LOC_REV1,
        BRD_TEMP.BRD_LOC_REV2,
        BRD_TEMP.BRD_LOC_REV3,
        BRD_TEMP.BRD_LOC_REV4,
        BRD_TEMP.BRD_LOC_REV5,
      ];
      console.log(locationRevData.value);
      getLocations();
      getImages();
    })
    .catch((error) => {
      console.log("board_error", error);
    });
};

const getLocations = () => {
  const maps = window.kakao.maps;

  axios
    .get("http://127.0.0.1:3000/postdata/locations", {
      params: {
        boardId: route.params.boardId, // router -> :boardId
      },
    })
    .then((result) => {
      const temp = result.data.locations;
      console.log("t", temp);
      for (let i = 0; i < JSON.parse(temp.LOC_ADD).length; i++) {
        locations.value.push({
          id: i,
          title: JSON.parse(temp.LOC_NAME)[i].name,
          address: JSON.parse(temp.LOC_ADD)[i].add,
          coord: new maps.LatLng(
            JSON.parse(temp.LOC_LAT)[i].lat,
            JSON.parse(temp.LOC_LNG)[i].lng
          ),
          content: locationRevData.value[i],
        });
      }
      console.log("l", locations.value);
    })
    .catch((error) => {
      console.log("locations_error", error);
    });
};

const getImages = () => {
  axios
    .get("http://127.0.0.1:3000/postdata/images", {
      params: {
        boardId: route.params.boardId, // router -> :boardId
      },
    })
    .then((result) => {
      images.value = result.data.images.map(
        (i) => `http://127.0.0.1:3000/postdata/image/${i.IMG_PATH}`
      );
    })
    .catch((error) => {
      console.log("images_error", error);
    });
};

const updatePost = () => {
  const formData = new FormData();
  formData.append(
    "postData",
    JSON.stringify({
      id: route.params.boardId,
      title: title.value,
      review: review.value,
      hashtag: "해시태그",
      open: open.value,
    })
  );
  formData.append("locationData", JSON.stringify(locations.value));
  images.value.map((i) => {
    formData.append("imageData", i.file);
  });
  axios({
    method: "put",
    url: "http://127.0.0.1:3000/postdata/updateboard",
    data: formData,
  })
    .then((result) => {
      router.push({
        path: `/detail/${result.data.boardId}`,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const addImage = (e) => {
  images.value.push({
    id: Math.max(...images.value.map((i) => i.id), 0) + 1,
    preview: URL.createObjectURL(e.target.files[0]),
    file: e.target.files[0],
  });
};

const removeImage = (id) => {
  images.value = images.value.filter((i) => i.id !== id);
};
const prepareMap = () => {
  const script = document.createElement("script");

  script.src =
    "//dapi.kakao.com/v2/maps/sdk.js?appkey=2701d0491303d0eea69f2f2b5138d02f&libraries=services&autoload=false";

  script.onload = () => {
    window.kakao.maps.load(drawMap);
    getBoard();
  };

  document.head.appendChild(script);
};

const addLocation = (marker, title, address) => {
  if (locations.value.length < 5) {
    if (!locations.value.some((l) => l.title === title))
      locations.value.push({
        id: Math.max(...locations.value.map((l) => l.id), 0) + 1,
        title: title,
        coord: marker.getPosition(),
        address: address,
        content: "",
      });
  }
};

const removeLocation = (id) => {
  locations.value = locations.value.filter((l) => l.id !== id);
};

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, places) {
  var el = document.createElement("li"),
    itemStr =
      '<span class="markerbg marker_' +
      (index + 1) +
      '"></span>' +
      '<div class="info">' +
      "   <h5>" +
      places.place_name +
      "</h5>";

  if (places.road_address_name) {
    itemStr +=
      "    <span>" +
      places.road_address_name +
      "</span>" +
      '   <span class="jibun gray">' +
      places.address_name +
      "</span>";
  } else {
    itemStr += "    <span>" + places.address_name + "</span>";
  }

  itemStr += '  <span class="tel">' + places.phone + "</span>" + "</div>";

  el.innerHTML = itemStr;
  el.className = "item";

  return el;
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx) {
  const maps = window.kakao.maps;

  const imageSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png"; // 마커 이미지 url, 스프라이트 이미지를 씁니다
  const imageSize = new maps.Size(36, 37); // 마커 이미지의 크기
  const imgOptions = {
    spriteSize: new maps.Size(36, 691), // 스프라이트 이미지의 크기
    spriteOrigin: new maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
    offset: new maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
  };
  const markerImage = new maps.MarkerImage(imageSrc, imageSize, imgOptions);
  const marker = new maps.Marker({
    position: position, // 마커의 위치
    image: markerImage,
  });

  marker.setMap(map.value); // 지도 위에 마커를 표출합니다
  markers.value.push(marker); // 배열에 생성된 마커를 추가합니다
  return marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
  for (var i = 0; i < markers.value.length; i++) {
    markers.value[i].setMap(null);
  }
  markers.value = [];
}

// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
function displayPagination(pagination) {
  var paginationEl = document.getElementById("pagination"),
    fragment = document.createDocumentFragment(),
    i;

  // 기존에 추가된 페이지번호를 삭제합니다
  while (paginationEl.hasChildNodes()) {
    paginationEl.removeChild(paginationEl.lastChild);
  }

  for (i = 1; i <= pagination.last; i++) {
    var el = document.createElement("a");
    el.href = "#";
    el.innerHTML = i;

    if (i === pagination.current) {
      el.className = "on";
    } else {
      el.onclick = (function (i) {
        return function () {
          pagination.gotoPage(i);
        };
      })(i);
    }

    fragment.appendChild(el);
  }
  paginationEl.appendChild(fragment);
}

// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
function displayInfowindow(marker, title) {
  var content = '<div style="padding:5px;z-index:1;">' + title + "</div>";

  infowindow.value.setContent(content);
  infowindow.value.open(map.value, marker);
}

// 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {
  while (el.hasChildNodes()) {
    el.removeChild(el.lastChild);
  }
}

const displayPlaces = (places) => {
  const maps = window.kakao.maps;

  var listEl = document.getElementById("placesList"),
    menuEl = document.getElementById("menu_wrap"),
    fragment = document.createDocumentFragment(),
    bounds = new maps.LatLngBounds(),
    listStr = "";

  // 검색 결과 목록에 추가된 항목들을 제거합니다
  removeAllChildNods(listEl);

  // 지도에 표시되고 있는 마커를 제거합니다
  removeMarker();

  for (var i = 0; i < places.length; i++) {
    // 마커를 생성하고 지도에 표시합니다
    const placePosition = new maps.LatLng(places[i].y, places[i].x);
    const marker = addMarker(placePosition, i);
    const address = places[i].road_address_name;
    const itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다
    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    // LatLngBounds 객체에 좌표를 추가합니다
    bounds.extend(placePosition);

    // 마커와 검색결과 항목에 mouseover 했을때
    // 해당 장소에 인포윈도우에 장소명을 표시합니다
    // mouseout 했을 때는 인포윈도우를 닫습니다
    (function (marker, title) {
      maps.event.addListener(marker, "click", function () {
        addLocation(marker, title, address);
      });

      maps.event.addListener(marker, "mouseover", function () {
        displayInfowindow(marker, title);
      });

      maps.event.addListener(marker, "mouseout", function () {
        infowindow.value.close();
      });

      itemEl.onclick = function () {
        addLocation(marker, title, address);
      };

      itemEl.onmouseover = function () {
        displayInfowindow(marker, title);
      };

      itemEl.onmouseout = function () {
        infowindow.value.close();
      };
    })(marker, places[i].place_name);

    fragment.appendChild(itemEl);
  }

  // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
  listEl.appendChild(fragment);
  menuEl.scrollTop = 0;

  // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
  map.value.setBounds(bounds);
};

const placesSearchCB = (data, status, pagination) => {
  const maps = window.kakao.maps;
  if (status === maps.services.Status.OK) {
    displayPlaces(data);
    displayPagination(pagination);
  } else if (status === maps.services.Status.ZERO_RESULT) {
    alert("검색 결과가 존재하지 않습니다.");
    return;
  } else if (status === maps.services.Status.ERROR) {
    alert("검색 결과 중 오류가 발생했습니다.");
    return;
  }
};

const searchPlaces = () => {
  const maps = window.kakao.maps;
  const ps = new maps.services.Places();

  if (!keyword.value.replace(/^\s+|\s+$/g, "")) {
    alert("키워드를 입력해주세요!");
    return false;
  }

  // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
  ps.keywordSearch(keyword.value, placesSearchCB);
};

const drawMap = () => {
  const maps = window.kakao.maps;

  const container = document.getElementById("map");
  const options = {
    center: new maps.LatLng(33.450701, 126.570667),
    level: 6,
  };

  map.value = new maps.Map(container, options);
  infowindow.value = new maps.InfoWindow({ zIndex: 1 });
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
.wrapper {
  padding-top: 5rem;
}

.header {
  margin-left: 3rem;
  font-size: 1.25rem;
  font-weight: 600;
}
.page {
  padding: 0 15% 2rem 15%;
  display: flex;
  flex-direction: column;
}

.page > div {
  margin-top: 3rem;
}
input[type="radio"] {
  margin: 0.3rem;
}
.select {
  display: flex;
  align-items: center;
}

.title {
  display: flex;
  align-items: center;
}

.title > div {
  margin-right: 1rem;
  font-weight: 600;
}

.title > input {
  flex-grow: 1;
  padding: 0.5rem;
  border: 0;
  border-bottom: 1px solid darkgray;
  background-color: #f1f1f1;
}
.map > p {
  font-size: 1.125rem;
  font-weight: 600;
}

.locations {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.location {
  margin-bottom: 1rem;
}

.location > div {
  display: flex;
  justify-content: space-between;
}

.location > div > p {
  font-size: 1.125rem;
  font-weight: 600;
}

.location > textarea {
  width: 100%;
  padding: 1rem;
  border: 0;
  border-bottom: 1px solid darkgray;
  background-color: #f1f1f1;
  resize: none;
}

hr {
  margin: 0 -2rem;
  padding: 0 2rem;
  border-top: 1px solid black;
  opacity: 1;
}

.summary {
}

.summary > p {
  font-size: 1.125rem;
  font-weight: 600;
}

.summary > textarea {
  width: 100%;
  padding: 1rem;
  border: 0;
  border-bottom: 1px solid darkgray;
  background-color: #f1f1f1;
  resize: none;
}

.images > p {
  font-size: 1.125rem;
  font-weight: 600;
}

.buttons {
  display: flex;
  justify-content: center;
}

.buttons > button {
  padding: 0.5rem;
}

.buttons > button:first-of-type {
  padding: 0.5rem 5rem;
  margin-right: 1rem;
  color: white;
  background-color: #858585;
}

.buttons > button:last-of-type {
  background-color: #c7c7c7;
}
</style>
<style>
.map_wrap,
.map_wrap * {
  margin: 0;
  padding: 0;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  font-size: 12px;
}
.map_wrap a,
.map_wrap a:hover,
.map_wrap a:active {
  color: #000;
  text-decoration: none;
}
.map_wrap {
  position: relative;
  width: 100%;
  height: 20rem;
}
#menu_wrap {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  margin: 10px 0 30px 10px;
  padding: 5px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.7);
  z-index: 1;
  font-size: 12px;
  border-radius: 10px;
}
.bg_white {
  background: #fff;
}
#menu_wrap hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 2px solid #5f5f5f;
  margin: 3px 0;
}
#menu_wrap .option {
  text-align: center;
}
#menu_wrap .option p {
  margin: 10px 0;
}
#menu_wrap .option button {
  margin-left: 5px;
}
#placesList li {
  list-style: none;
}
#placesList .item {
  position: relative;
  border-bottom: 1px solid #888;
  overflow: hidden;
  cursor: pointer;
  min-height: 65px;
}
#placesList .item span {
  display: block;
  margin-top: 4px;
}
#placesList .item h5,
#placesList .item .info {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
#placesList .item .info {
  padding: 10px 0 10px 55px;
}
#placesList .info .gray {
  color: #8a8a8a;
}
#placesList .info .jibun {
  padding-left: 26px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png)
    no-repeat;
}
#placesList .info .tel {
  color: #009900;
}
#placesList .item .markerbg {
  float: left;
  position: absolute;
  width: 36px;
  height: 37px;
  margin: 10px 0 0 10px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png)
    no-repeat;
}
#placesList .item .marker_1 {
  background-position: 0 -10px;
}
#placesList .item .marker_2 {
  background-position: 0 -56px;
}
#placesList .item .marker_3 {
  background-position: 0 -102px;
}
#placesList .item .marker_4 {
  background-position: 0 -148px;
}
#placesList .item .marker_5 {
  background-position: 0 -194px;
}
#placesList .item .marker_6 {
  background-position: 0 -240px;
}
#placesList .item .marker_7 {
  background-position: 0 -286px;
}
#placesList .item .marker_8 {
  background-position: 0 -332px;
}
#placesList .item .marker_9 {
  background-position: 0 -378px;
}
#placesList .item .marker_10 {
  background-position: 0 -423px;
}
#placesList .item .marker_11 {
  background-position: 0 -470px;
}
#placesList .item .marker_12 {
  background-position: 0 -516px;
}
#placesList .item .marker_13 {
  background-position: 0 -562px;
}
#placesList .item .marker_14 {
  background-position: 0 -608px;
}
#placesList .item .marker_15 {
  background-position: 0 -654px;
}
#pagination {
  margin: 10px auto;
  text-align: center;
}
#pagination a {
  display: inline-block;
  margin-right: 10px;
}
#pagination .on {
  font-weight: bold;
  cursor: default;
  color: #777;
}

.images {
  padding: 1rem;
  border: 1px solid black;

  display: flex;
}

.images > input {
  display: none;
}

.images > label {
  width: 5rem;
  height: 5rem;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.image {
  width: 5rem;
  height: 5rem;
  margin-right: 1rem;
  border: 1px solid black;
  position: relative;
}

.image > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image > button {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  color: white;
  background-color: black;
}
</style>
