<template>
  <div class="input_book_title">
    <form class="book_title_form" @submit.prevent="book_research">
      <input type="text" class="book_title" v-model="bookname" placeholder="Enter book name">
      <button type="submit">검색</button>
    </form>
  </div>
  <div class="book_info">
    <img :src="book_image" class="book_image">
    <h6>책 이름: {{ bookname2 }}</h6>
    <h6>작가: {{ book_author }}</h6>
    <h6>가격: {{ book_price }}</h6>
    <h6>카테고리: {{ book_category }}</h6>
  </div>

  <div v-if="bookResults.length > 0" class="book_selection">
    <label for="selectedBook">Select a book:</label>
    <select v-model="selectedBook" @change="onBookSelectionChange">
      <option value="default">-----------------------</option>
      <option v-for="(book, index) in bookResults" :key="index" :value="index">
        {{ book.title }}
      </option>
    </select>
  </div>
  <div>
    <button @click="requestPay">결제하기</button>
  </div>

  <span class="addinput">{{ num }}</span>
  <input type="button" @click="sample4_execDaumPostcode" value="우편번호 찾기"><br>
  <input type="text" id="sample4_roadAddress" placeholder="도로명주소">
  <input type="text" id="sample4_jibunAddress" placeholder="지번주소">
  <span id="guide" style="color:#999;display:none"></span>
  <input type="text" id="sample4_detailAddress" placeholder="상세주소">
  <input type="text" id="sample4_extraAddress" placeholder="참고항목">
  <br/>
  <button @click="startEventWithTimeLimit">안녕</button>
  <p v-if="timeLeft > 0">Time left: {{ formatTime(timeLeft) }}</p>

  
</template>

<script>
    import axios from "axios";
    axios.defaults.baseURL = "http://localhost:3000";
    axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export default {
  
  data() {
    return {
        num: "test",
        showMessage: false,
        timeLimit: 3, // 5분 =  5 * 60 
        timeLeft: 0,

        bookname: "",
        email: "",
        password: "",
        provider: "",
        bookname2: "",
        book_image: "",
        book_author: "",
        book_price: "",
        book_category: "",
        zipinput: false,
        bookResults: [],
        naverResults: [],
        selectedBook: null,
        selected: 'radio1',
        options: [
          { text: 'Radio 1', value: 'radio1' },
          { text: 'Radio 3', value: 'radio2' },
          { text: 'Radio 3 (disabled)', value: 'radio3', disabled: true },
          { text: 'Radio 4', value: 'radio4' }
        ]
    };
  },
  methods: {
    book_research() { //검색 시 입력창에 있는 걸로 알라딘 api 검색 실시합니다.
        axios({
        url: '/getAladin',
        method: 'POST',
        data: {
            bookname : this.bookname //서버으로 넘깁니다.
        }
      }).then((res)=>{
        let aladinXml = res.data //서버에서 json으로 검색 결과를 넘긴걸 변수에 넣습니다.
        console.log(aladinXml.object.item);
        if (aladinXml.object.item) { //검색 결과가 있으면
            this.bookResults = aladinXml.object.item.map((item) => ({ //배열에 넣어줍니다.
              title: item.title._text,
              image: item.cover._text,
              author: item.author._text,
              price: item.priceStandard._text,
              category: item.categoryName._text,
              isbn : item.isbn13._text,
              itemID : item._attributes.itemId
            }));
            this.selectedBook = "defautl"; //이건 왜 안될까요?
          } else { //검색결과가 없으면 선택창 작동안하게 합니다.
            this.bookResults = [];
            this.selectedBook = "defautl";
          }
        }).catch((err)=> { //에러처리
        console.log(err);
      })
    },
    startEventWithTimeLimit() {
      
      if(this.timeLeft>0) { //시간이 남아있으면 버튼의 이벤트 비활성화
        return;
      }
      this.timeLeft = this.timeLimit; //이건 왜 있는거지?
      this.updateTimeDisplay(); // updateTimeDisplay() 실행
    },
    updateTimeDisplay() {
      var time = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--; // 1초마다 시간을 깎는 중
        } else {
          //시간이 끝났을경우 뭘 할까?
          alert("!!!!!");
          clearInterval(time);
        }
      }, 1000); // 1초마다 실행되도록 setInterval 설정
    },
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    },
    onBookSelectionChange() { //select창에서 선택을 하게 되면 이 메소드가 실행됩니다.
      if(this.selectedBook === "default") {
        return;
      }

      if (this.selectedBook !== null) {
        
        const selectedBookData = this.bookResults[this.selectedBook]; //배열에서 select에서 선택한걸로 index를 받습니다.
        this.bookname2 = selectedBookData.title;
        this.book_author = selectedBookData.author;
        this.book_price = selectedBookData.price;
        this.book_category = selectedBookData.category;

        if(selectedBookData.itemID  ) { //itemID을 이용하여 알라딘 api를 사용하여 책 이미지를 받습니다.
          axios({
            url: "/downBookImage",
            method: "POST",
            data: {
              isbn: selectedBookData.isbn,
              itemID: selectedBookData.itemID //select로 선택한 것의 itemID을 서버로 넘깁니다. itemID는 알라딘의 고유 상품 번호입니다.
            } 
          }).then(res => {
            const aladinData = res.data;
            console.log(aladinData.item); //서버에서 처리후 이미지 url을 받습니다.
            this.book_image = aladinData.item[0].cover; //알라딘은 왤캐 이미지 해상도를 거지같이 주는거지
          }).catch(err=>{
            alert('없을 수가 있나?'); //네이버에서 isbn으로 검색했을때 없는 경우가 잇을까요?
          })
        } else {
          alert('이 에러가 왜나?') //책 세트면 에러가 납니다..
        }
      }
    },
    requestPay() {

      const IMP = window.IMP;
      IMP.init("imp18828153");
    
        IMP.request_pay({ // param
          pg: "inicis",
          pay_method: "card",
          name: "테스트",
          amount: 1,
          buyer_email: "gildong@gmail.com",
          buyer_name: "홍길동",
          buyer_tel: "010-4242-4242",
          buyer_addr: "서울특별시 강남구 신사동",
          buyer_postcode: "01181"
        }, rsp => { // callback
          if (rsp.success) {
            alert("!");
            console.log(rsp.success);
            console.log(rsp);
          } else {
            alert("?");
          }
        });
      },
      sample4_execDaumPostcode() {
        new window.daum.Postcode({
            oncomplete: (data) => {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var roadAddr = data.roadAddress; // 도로명 주소 변수
                var extraRoadAddr = ''; // 참고 항목 변수

                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraRoadAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                   extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraRoadAddr !== ''){
                    extraRoadAddr = ' (' + extraRoadAddr + ')';
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                this.num = data.zonecode;
                document.getElementById("sample4_roadAddress").value = roadAddr;
                document.getElementById("sample4_jibunAddress").value = data.jibunAddress;

                this.zipinput = true;
               
            }
        }).open();
    },
    test() {
      axios({
        url: '/test',
        method: 'POST',
        data: this.num
      })
    }
  }
};
</script>

<style scoped>
.input_book_title {
  margin-bottom: 20px;
}

.book_title_form {
  display: flex;
  align-items: center;
}

.book_title {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 8px;
}

.book_info {
  margin-bottom: 20px;
}

.book_image {
  height: auto;
  width: auto;
  display: block;
  margin-bottom: 10px;
}

.book_description {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.book_selection {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  margin-right: 8px;
}

select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>