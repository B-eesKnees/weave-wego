<template>
  <div class="attendance">
    <div class="bar_wrap">
      <p class="name">이 달의 출석일</p>
      <div class="bar">
        <div style="width: 13%"></div>
      </div>
    </div>
    <!-- 상단 문구 -->
    <div class="head"></div>

    <!-- 출석 도장 영역 -->
    <ol class="stamp">
      <li v-for="index in month">
        <div class="stamp-item">
            <span v-if="checkAtt(index)"><img src="https://contents.kyobobook.co.kr/resources/fo/images/common/ink/img_attendance_active@2x.png" alt="출석완료"></span>
            <span v-else>{{ index }}</span>
        </div>
      </li>
    </ol>
    <div class="attendance_button">
      <button @click="attendance">출석체크</button>
    </div>
    <!-- 비로그인인 경우 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      userAtt: [10, 11, 13, 15], //ex 출석체크 데이터
      today: null, //오늘의 날짜 데이터
      month: null //30일인지 31일인지 확인
    };
  },
  mounted() {
    this.getMonth();
  },
  methods: {
    checkAtt(index) { // 유저가 출석한 날짜를 받아와서 출석한 날짜는 true 안한 날짜는 false로 return
        return this.userAtt.includes(index);
    },
    attendance() {
        this.today = new Date().toISOString().slice(8, 10); //오늘의 날짜 추출 STRING으로 추출됨

        const todayInt = parseInt(this.today); //STRING > INT

        if(this.userAtt.includes(todayInt)) { //버튼 연속으로 누르면 거부하는 조건문
            return;
        }

        this.userAtt.push(todayInt); //버튼을 처음 누르면 배열에 오늘 날짜 삽입
        console.log(this.userAtt); //테스트용 콘솔
        alert(`${todayInt}일 출석 성공!!`);

        //출석체크 쿠폰 출석일이 쌓이면 받는 형식으로 
    },
    getMonth() { //달에 알맞은 일자 출력하게 하는 함수
      //new Date 객체 생성하고 getMonth() 쓰는게 더 간단함 
      const checkMonth = new Date().toISOString().slice(5, 7); //2023-"01"-01 //무슨 달인지 추출
      if(checkMonth == "01"  || checkMonth == "03" || checkMonth == "05"  || checkMonth == "07"  || checkMonth == "08"  || checkMonth == "10"  || checkMonth == "12") {
        this.month = 31; //31일인 달
      } else if(checkMonth == "02") {
        this.month = 28; //2월은 28일
      } else {
        this.month = 30; //나머지는 30일
      }
    }
  }
};
</script>

<style scoped>
.attendance_button{
  text-align: center;
}
.attendance_button button {
  box-sizing: border-box;
  width: 300px;
  padding: 15px 20px;
  border-radius: 20px;
  background-color: #4e4eff;
  box-shadow: 0 6px 6px rgba(29, 29, 104, 0.2);
  margin-top: 5%;
  color: #fff;
  font-size: large;
  border: none;
}
.attendance .bar_wrap .name {
  font-size: 20px;
  line-height: 30px;
  letter-spacing: -0.01em;
  color: #fff;
}
p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
.attendance .bar_wrap {
  position: absolute;
  left: 50%;
  top: -50px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  display: -webkit-flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-justify-content: center;
  -webkit-box-align: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -moz-box-orient: horizontal;
  -moz-box-direction: normal;
  -ms-flex-direction: row;
  -webkit-flex-direction: row;
  flex-direction: row;
  transform: translateX(-50%);
  box-sizing: border-box;
  width: 500px;
  padding: 15px 20px;
  border-radius: 20px;
  background-color: #4e4eff;
  box-shadow: 0 6px 6px rgba(29, 29, 104, 0.2);
}
.attendance {
  position: relative;
  box-sizing: border-box;
  width: 920px;
  margin: auto;
  margin-top: 5%;
  margin-bottom: 5%;
  padding: 92px 128px 90px;
  border-radius: 30px;
  background-color: #fff;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.1);
}

.stamp {
  display: flex;
  flex-wrap: wrap; /* 공간이 부족하면 다음 줄로 이동 */
  justify-content: flex-start; /* 왼쪽 정렬 */
  align-items: flex-start; /* 위쪽 정렬 */
  list-style: none; /* 기본 목록 스타일 제거 */
  padding: 0; /* 기본 padding 제거 */
  margin: 0; /* 기본 margin 제거 */
}

.stamp li {
  /* 각 li 요소의 크기와 스타일 조정 */
  width: 18%; /* 5개의 항목이 한 줄에 표시되므로 가로 너비는 20% */
  height: 100px;
  box-sizing: border-box;
  margin: 5px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.stamp-item {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  Text-Align: center;
}

.stamp-item img {
  max-width: 80%; /* 이미지가 자동으로 축소되도록 함 */
  max-height: 80%; /* 이미지가 자동으로 축소되도록 함 */
  margin: auto;
  display: block;
}
</style>
