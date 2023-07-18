<template>
  <div class="mainpage2">
    <span>🌟</span>
    <h2>추천 코스</h2>
    <div class="mainpage2_second">
      <div class="mainpage2_second_left">
        <div class="mainpage2_second_left_img">
          <img
            :src="`http://localhost:3000/downloadCourse/${recommendData.BRD_ID}/${recommendData.IMG_PATH}`"
            alt=""
          />
        </div>
        <a :href="`/detail/${recommendData.BRD_ID}`" target="_blank">
          <div id="opacity_glass"></div>
        </a>

        <div class="mainpage2_second_left_content">
          <h2 class="mainpage2_second_left_content_name">
            {{ recommendData.BRD_TITLE }}
          </h2>
          <span
            v-for="(item, i) in brdHashtags"
            :key="i"
            class="mainpage2_second_left_content_hashtag"
            >#{{ item }}</span
          >
          <span class="mainpage2_second_left_content_user"
            >{{ recommendData.BRD_NICK }}
            <p>님의 코스</p>
          </span>
        </div>
      </div>
      <div class="mainpage2_second_right">
        <div class="mainpage2_second_right_rows">
          <div
            v-for="(item, i) in recommendData2"
            :key="i"
            class="mainpage2_second_right_row"
          >
            <a :href="`/detail/${recommendData2[i].BRD_ID}`" target="_blank">
              <div class="mainpage2_second_right_row_img">
                <img
                  :src="`http://localhost:3000/downloadCourse/${item.BRD_ID}/${item.IMG_PATH}`"
                  alt=""
                />
                <div id="opacity_glass2"></div>
              </div>
              <div class="mainpage2_second_right_row_content">
                <h3 class="mainpage2_second_right_row_content_name">
                  {{ item.BRD_TITLE }}
                </h3>
                <template v-for="(item2, j) in brdHashtags2[i]">
                  <span class="mainpage2_second_right_row_content_hashtag"
                    >#{{ item2 }}</span
                  >
                </template>
                <span class="mainpage2_second_right_row_content_user"
                  >{{ item.BRD_NICK }}
                  <p class="nim">님의 코스</p>
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export default {
  name: "",
  components: {},
  data() {
    return {
      recommendData: [],
      brdHashtags: [],
      brdHashtags2: [],
      recommendData2: [],
      email: "",
    };
  },

  setup() {},
  created() {},
  mounted() {
    this.email = localStorage.getItem("userID");
    this.getRecommendData();
  },
  unmounted() {},
  methods: {
    async getRecommendData() {
      await axios({
        url: "http://localhost:3000/getLikeCourse",
        method: "POST",
      }).then((res) => {
        this.recommendData = res.data[0]; // DB의 ["종로구","식사"]가 배열이 아닌 문자열임
        //1순위 게시물 해시태그 문자열 배열로 뽑는 코드
        const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi; // 특수문자 모음을 reg변수에 저장
        const leftReplaceData = this.recommendData.BRD_HASHTAG.replace(
          reg,
          " "
        ); //ex( 종로구  식사  )
        const leftReplaceData2 = leftReplaceData.split(" "); // ["","종로구","","식사",""] <<배열
        //배열의 모든 요소를 순회하며
        //빈 배열 삭제
        for (var i in leftReplaceData2) {
          if (leftReplaceData2[i] == "") {
            leftReplaceData2.splice(i, 2);
          }
        }
        this.brdHashtags = leftReplaceData2; //["종로구","식사"] 배열 << 결과값

        for (let i = 1; i <= 3; i++) {
          this.recommendData2.push(res.data[i]);
        }

        for (var i = 0; i < this.recommendData2.length; i++) {
          const rightReplaceData = this.recommendData2[i].BRD_HASHTAG.replace(reg," ");
          const rightReplaceData2 = rightReplaceData.split(" ");

          this.brdHashtags2.push(rightReplaceData2);
        }


        for (var i = 0; i < this.brdHashtags2.length; i++) {
          this.brdHashtags2[i] = this.brdHashtags2[i].filter(Boolean); ''
        }
      });
    },
  },
};
</script>

<style scoped>
.mainpage2 > span {
  font-size: x-large;
}

.mainpage2 > h2 {
  font-size: xx-large;
  font-weight: bold;
  padding: 2% 0;
}

.mainpage2 {
  padding: 5% 15% 10% 15%;
  width: 100%;
  height: 110vh;
}

.mainpage2_second {
  width: 100%;
  height: 100%;
}

.mainpage2_second p {
  font-size: small;
  line-height: 200%;
  z-index: 5;
}

.mainpage2_second_left {
  width: 49%;
  height: 100%;
  float: left;
  position: relative;
  box-shadow: 0 0 5px #ccc;
}

.mainpage2_second_left_content {
  box-sizing: border-box;
  padding: 3%;
  position: absolute;
  width: 100%;
  color: whitesmoke;
}

.mainpage2_second_left_img {
  position: absolute;
  width: 100%;
  height: 100%;
}

.mainpage2_second_left_img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 3;
}

.mainpage2_second_left_content_hashtag {
  margin-top: 5%;
  margin-right: 1%;
  font-size: small;
  z-index: 10;
  color: #ccc;
}

.mainpage2_second_left_content_user {
  margin-top: 90%;
  display: flex;
  align-self: flex-end;
  font-weight: bold;
  font-size: large;
  justify-content: end;
  width: 100%;
}

.mainpage2_second_right {
  width: 49%;
  height: 100%;
  float: right;
  box-sizing: border-box;
}

.mainpage2_second_right_rows {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.mainpage2_second_right_row {
  width: 100%;
  height: 30%;
  box-shadow: 0 0 5px #ccc;
}

.mainpage2_second_right_row_img {
  width: 35%;
  height: 100%;
  float: left;
  box-sizing: border-box;
  position: relative;
}

.mainpage2_second_right_row_img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 3;
}

.mainpage2_second_right_row_content {
  width: 65%;
  height: 100%;
  padding: 3%;
  float: right;
  box-sizing: border-box;
  position: relative;
  /* display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    align-self: flex-end; */
}

.mainpage2_second_right_row_content_name,
.mainpage2_second_left_content_name {
  font-weight: bold;
  z-index: 5;
}

.mainpage2_second_right_row_content_hashtag {
  margin-top: -10%;
  margin-right: 1%;
  font-size: small;
  color: #ccc;
  font-weight: normal;
  z-index: 5;
}

.mainpage2_second_right_row_content_user {
  width: 90%;
  display: flex;
  font-weight: bold;
  justify-content: end;
  z-index: 5;
  position: absolute;
  bottom: 0;
}

.mainpage2_second_right_row_content_user p,
.mainpage2_second_left_content_user p {
  font-weight: normal;
}

#opacity_glass {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.1;
  background-color: black;
  z-index: 4;
}

#opacity_glass2 {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.1;
  background-color: black;
  z-index: 4;
}
</style>
