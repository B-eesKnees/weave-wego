<template>
  <div class="container">
    <div class="cart_wrap">
      <div class="cart_header" style="background-color: white">
        <input
          type="checkbox"
          v-model="selectAll"
          @change="selectAllItems"
          id="book_checkbox"
        /><label for="book_checkbox"></label>
        <h3>&nbsp;장바구니</h3>
      </div>
      <div class="cart_float">
        <div class="cart_inside">
          <ol class="cart_list">
            <span v-if="cart.length == 0" class="if_nodata">
              <div class="nodata"><img src="../assets/img/nodata.png" /></div>
              <br /><br />
              <p>장바구니에 담긴 상품이 없어요</p>
            </span>
            <span v-else-if="cart.length >= 1">
              <li v-for="(book, index) in cart" :key="index">
                <input
                  type="checkbox"
                  v-model="book.checked"
                  @change="insertOrRemove(book)"
                  :id="'book_checkbox_' + index"
                />
                <label :for="'book_checkbox_' + index"></label>
                <img class="cart_img" :src="book.img" />
                <span class="book_name">{{ book.title }}</span
                >&nbsp;
                <span class="book_price">{{ book.price }} 원</span>
                <span class="book_point"
                  >적립포인트 &nbsp;&nbsp;&nbsp;{{ getPoint(book) }}</span
                >
                <button
                  type="button"
                  class="deleteBook"
                  @click="deleteBook(book)"
                ></button>
                <div class="changeQua">
                  <div class="button">
                    <button @click="decreaseQuantity(book)">-</button>
                    <span>{{ book.quantity }}</span>
                    <button @click="increaseQuantity(book)">+</button>
                  </div>
                  <br />
                  <p>{{ getPrice(book) }} 원</p>
                </div>
                <p></p>
              </li>
            </span>
          </ol>
          <div class="footer"></div>
        </div>

        <!-- CSS작업시 컨텐츠를 박스라고 생각하면 이해가 쉬움 
             payment_area라는 최상위 부모박스 > 형제박스(pay_wrap 자식박스, pay_wrap 자식박스)
        -->
        <div class="payment_area">
          <div class="pay_wrap">
            <p class="payment_value">상품금액</p>
            <span class="getTotalPrice">{{ getTotalPrice }} </span>
            <span class="unit">원</span>
          </div>

          <div class="pay_wrap">
            <div class="payment_value">배송비</div>
            <span class="getTotalPrice">{{ fee }} </span>
            <span class="unit">원</span>
          </div>

          <br /><br /><br /><br /><br />
          <hr />
          <div class="pay_wrap">
            <div class="payment_text">결제금액</div>
            <div class="payment_total">{{ getFinalPrice }}</div>
            <span class="unit">원</span>
          </div>
          <div class="pay_wrap">
            <div class="payment_text">총 적립 포인트</div>
            <div class="payment_point">{{ totalPoint }}</div>
            <span class="unit">원</span>
          </div>
          <button @click="choosePay" class="pay_button">주문하기</button>
          <!-- <button @click="allPay">전체 결제</button> -->
        </div>
      </div>
    </div>
  </div>
  <div class="progress">
    <span class="first">장바구니</span>
    <span class="right">> 주문/결제> 완료</span>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      cart: [
        // 책 데이터 예시
        {
          img: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791192512365.jpg",
          title:
            "엄청나게 긴 책 제목 테스트입니다 아무튼간에 엄청나게 긴 책 제목 테스트입니다 아무튼간에 엄청나게 긴 책 제목 테스트입니다 아무튼간에",
          price: 9900,
          point: 50,
          quantity: 20,
          book_no: 1,
        },
        {
          img: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791192512365.jpg",
          title: "Book 2",
          price: 24000,
          point: 30,
          quantity: 1,
          book_no: 2,
        },
        {
          img: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791192512365.jpg",
          title: "Book 2",
          price: 24000,
          point: 30,
          quantity: 1,
          book_no: 3,
        },
        {
          img: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791192512365.jpg",
          title: "Book 2",
          price: 24000,
          point: 30,
          quantity: 1,
          book_no: 4,
        },
        {
          img: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791192512365.jpg",
          title: "Book 2",
          price: 24000,
          point: 30,
          quantity: 1,
          book_no: 5,
        },
        {
          img: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791192512365.jpg",
          title: "Book 2",
          price: 24000,
          point: 30,
          quantity: 1,
          book_no: 6,
        },
      ],
      select: [],
      selectAll: false,
    };
  },
  methods: {
    increaseQuantity(book) {
      //장바구니 수량 늘리기

      book.quantity++;
    },
    deleteBook(book) {
      if (confirm("상품을 삭제하시겠습니까?")) {
        this.cart = this.cart.filter((i) => i.book_no !== book.book_no);
        console.log(this.cart);
      } else {
        return;
      }
    },
    choosePay() {
      // 선택된 상품들만 필터링하여 가져옵니다.
      const selectedBooks = this.cart.filter((book) =>
        this.select.includes(book.book_no)
      );

      if (selectedBooks.length == 0) {
        alert("상품을 선택해주세요");
        return;
      }

      let TP = 0; //총 결제 금액
      let TP2 = 0; //총 포인트
      let thisFee = 0;

      let bookData = [];

      selectedBooks.forEach((book) => {
        TP += this.getPrice(book);
        TP2 += this.getPoint(book);

        bookData.push({
          ORDERITEM_BOOKID: book.book_no,
          ORDERITEM_CNT: book.quantity,
          ORDERITEM_PRICE: book.price,
          ORDERITEM_POINT: this.getPoint(book),
        });
      });

      if (TP >= 15000) {
        //결제금액이 15000원이상이면 배송료 0원으로 설정
        thisFee = 0;
      } else if (TP < 15000) {
        thisFee = 2500;
      }

      axios({
        url: "http://localhost:3000/cart",
        method: "POST",
        data: {
          email: "bj3757@naver.com",
          total_pay: TP,
          total_point: TP2,
          fee: thisFee,
          books_info: bookData,
        },
      })
        .then((res) => {
          if (res.status == 401) {
            console.log("에러 발생: " + res.data.error);
          } else if (res.status == 200) {
            const orderId = res.data.orderID;
            alert("결제페이지로 이동합니다");
            window.location.href = `/pay/${orderId}`;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // allPay() {
    //   const allBooks = this.cart; //장바구니에 담긴 책 정보 전부 담아오기

    //   let TP = 0; //총 결제 금액
    //   let TP2 = 0; //총 포인트
    //   let thisFee = 0;

    //   let bookData = [];

    //   // 모든 상품에 대한 결제 정보를 콘솔로 출력합니다.
    //   allBooks.forEach((book) => {
    //     TP += this.getPrice(book);
    //     TP2 += this.getPoint(book);

    //     bookData.push({
    //       ORDERITEM_BOOKID: book.book_no,
    //       ORDERITEM_CNT: book.quantity,
    //       ORDERITEM_PRICE: book.price,
    //       ORDERITEM_POINT: this.getPoint(book),
    //     });
    //   });

    //   if (TP >= 15000) { //결제금액이 15000원이상이면 배송료 0원으로 설정
    //     thisFee = 0;
    //   } else if (TP < 15000) {
    //     thisFee = 2500;
    //   }

    //   axios({
    //     url: "http://localhost:3000/cart",
    //     method: "POST",
    //     data: {
    //       "email": "bj3757@naver.com",
    //       "total_pay": TP,
    //       "total_point": TP2,
    //       "fee": thisFee,
    //       "books_info": bookData,
    //     },
    //   }).then((res => {
    //     if (res.status == 401) {
    //       console.log("에러 발생: " + res.data.error);
    //     } else if (res.status == 200) {
    //       const orderId = res.data.orderID;
    //       alert('결제페이지로 이동합니다');
    //       window.location.href = `/pay/${orderId}`;
    //     }
    //   })).catch(error => {
    //     console.log(error);
    //   });
    // },
    decreaseQuantity(book) {
      //장바구니 수량 줄이기
      if (book.quantity === 1) {
        //한개 이상은 못줄이게 하기
        return;
      }
      book.quantity--;
    },
    insertOrRemove(book) {
      // 배열에 book.book_no가 없으면 해당 값을 추가
      // 배열에 이미 book.book_no가 있으면 해당 값을 제거하는 filter 적용

      if (book.checked && !this.select.includes(book.book_no)) {
        this.select.push(book.book_no); // 체크되어 있고, 배열에 없는 경우 추가
      } else if (!book.checked && this.select.includes(book.book_no)) {
        this.select = this.select.filter(
          (selectedBookNo) => selectedBookNo !== book.book_no
        ); // 체크가 해제되고, 배열에 있는 경우 제거
      }
      console.log(this.select);
    },
    selectAllItems() {
      for (const book of this.cart) {
        book.checked = this.selectAll;
        this.insertOrRemove(book);
      }
    },
    handleChildCheckboxChange() {
      // 모든 자식 체크박스가 선택되어 있는지 확인합니다.
      const allChildChecked = this.cart.every((book) => book.checked);

      // 부모 체크박스의 상태를 업데이트합니다.
      this.selectAll = allChildChecked;
    },
  },
  computed: {
    // 데이터 값이 바뀌면 실행 되는것?
    getPrice(book) {
      //버튼으로 수량을 바꾸면 실행
      return (book) => book.price * book.quantity; //값 * 수량
    },
    getPoint(book) {
      //버튼으로 수량바꾸면 실행
      const point = (book) => book.point * book.quantity; //마일리지 * 수량
      return point;
    },
    getTotalPrice() {
      //선택한 상품들 총합 가격
      const selectedBooks = this.cart.filter((book) =>
        this.select.includes(book.book_no)
      ); //책 정보가 있는 배열에서 체크가 된것만 필터링

      if (selectedBooks.length == 0) {
        return 0;
      }

      const totalPrice = selectedBooks.reduce(
        (total, book) => total + book.price * book.quantity,
        0
      ); //선택된것만 값 총합 가져오기

      return totalPrice; //리턴
    },
    fee() {
      if (this.getTotalPrice > 15000) {
        return 0;
      } else {
        return 2500;
      }
    },
    getFinalPrice() {
      //최종 결제 가격 함수
      if (this.getTotalPrice + this.fee == 2500) {
        return 0;
      }
      return this.getTotalPrice + this.fee;
    },
    totalPoint() {
      //결제 시 얻는 포인트
      const selectedBooks = this.cart.filter((book) =>
        this.select.includes(book.book_no)
      ); //책 정보가 있는 배열에서 체크가 된것만 필터링

      const totalPoint = selectedBooks.reduce(
        (total, book) => total + book.point * book.quantity,
        0
      ); //선택된것만 값 총합 가져오기

      return totalPoint;
    },
  },
  mounted() {},
  watch: {
    // 자식 체크박스 상태 변경 감지
    cart: {
      handler() {
        this.handleChildCheckboxChange();
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.cart_img {
  text-align: center;
  max-height: 200px;
  margin-top: 20px;
}

.footer {
  padding-bottom: 100px;
}

.cart_header {
  width: 50%;
  font-size: 1.4em;
  font-weight: bolder;
  border-bottom: 2px solid #000000;
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  padding-top: 20px;
  border-radius: 30px 30px 0 0;
}
/* .cart_header h3{
  vertical-align: top;
  position: relative;
  margin-bottom: 20px;
} */

.container {
  width: 100%;
}

.cart_wrap {
  width: 100%;

  margin-top: 8.65%;
  margin-left: 11%;
  padding-bottom: 5%;
}

.cart_list li {
  width: 100%;
  height: 250px;
  border-bottom: 2px solid #ccc;
  list-style: none;
  background-color: white;
}

.book_name {
  position: absolute;
  margin-left: 15px;
  margin-top: 20px;
  font-weight: 700;
  font-size: 1.1em;
  width: 450px;
  line-height: 20px;
}

.book_price {
  position: absolute;
  display: inline-block;
  margin-left: 5px;
  margin-top: 170px;
}

.book_point {
  margin-left: 5px;
}

.changeQua {
  float: right;
  text-align: center;
  width: 300px;
  height: 249px;
  border-left: 2px solid #ccc;
}

.changeQua .button {
  margin-top: 100px;
  margin-left: 80px;
  border: none;
  padding: 3px 15px;
  border-radius: 4px;
  width: 150px;
  height: 40px;
  border: 1px solid #050505;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.changeQua .button button {
  border: none;
  background-color: white;
  cursor: pointer;
  font-size: larger;
  margin-left: 10px;
  margin-right: 10px;
  width: 30px;
  height: 30px;
  padding: auto;
}
.changeQua span {
  text-align: center;
}

.progress {
  position: absolute;
  top: 17%;
  right: 15%;
  font-size: 1.4em;
  font-weight: bolder;
}

.first {
  color: #4e4eff;
}

.right {
  color: rgb(158, 158, 158);
}

.cart_float {
  width: 100%; /* 가로100% 공간 사용 */
}

.cart_inside {
  float: left; /* 화면 왼쪽 배치 */
  width: 50%; /* 가로50% 공간 사용 */
}

.payment_area {
  right: -20px;
  top: 205px;
  position: fixed;
  width: 20%; /* 가로20% 공간 사용 */
  height: 400px;
  margin-top: 0%;
  margin-right: 18%; /* 박스를 오른쪽으로 18%만큼 떨어뜨림(밀어냄) */
  padding: 2% 30px; /* 위아래 1% 양옆 10px*/
  border-radius: 5%;
  /* box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2); */
  border: 1px solid #ccc;
  background-color: white;
}

/* 상품금액,배송비 */
.pay_wrap {
  margin-top: 5%;
  display: flex; /* 세로배치를 가로배치로 */
  width: 100%; /* 장바구니박스 가로100% 공간 사용 */
  font-size: large;
  font-weight: bolder;
}
/* 금액(숫자) */
.payment_value {
  width: 70%; /* 그중에 70% 사용 */
}
/* 원 */
.getTotalPrice {
  width: 20%; /* 그중에 20% 사용 */
  text-align: right; /* 텍스트 오른쪽 정렬(텍스트 길이가 길어지면 왼쪽으로 늘어남) */
}

.unit {
  width: 10%;
  font-size: 16px;
  padding-left: 1%;
  text-align: center;
}
/* .checkAll {
  position: relative;
  top: 20px;
} */
.payment_total {
  width: 20%; /* 그중에 20% 사용 */
  text-align: right; /* 텍스트 오른쪽 정렬(텍스트 길이가 길어지면 왼쪽으로 늘어남) */
  color: #4e4eff;
}
.payment_text {
  width: 70%;
}
.payment_point {
  width: 20%; /* 그중에 20% 사용 */
  text-align: right; /* 텍스트 오른쪽 정렬(텍스트 길이가 길어지면 왼쪽으로 늘어남) */
}
.pay_button {
  position: absolute;
  width: 300px;
  height: 80px;
  top: 75%;
  right: 40px;
  color: white;
  background-color: #4e4eff;
  border: none;
  border-radius: 20px;
  font-weight: bolder;
  font-size: large;
  cursor: pointer;
}
.deleteBook {
  color: grey;
  background-color: white;
  border: none;
  cursor: pointer;
  width: 18px;
  height: 18px;
  position: absolute;
  left: 43.5%;
  margin-top: 11%;
  background-image: url(../assets/img/btn_delete_ord@2x.png);
  background-repeat: no-repeat;
  background-position: center;
}
input[type="checkbox"] {
  display: none;
}

input[type="checkbox"] + label {
  display: inline-block;
  width: 22px;
  height: 22px;
  border: 0.5px solid #707070;
  border-radius: 50%;
  position: relative;
  margin-right: 2%;
  bottom: 70%;
  transition: background-color 0.3s, border-color 0.3s;
}

input[id^="book_checkbox"]:checked + label::after {
  content: "";
  width: 22px;
  height: 22px;
  text-align: center;
  position: absolute;
  left: -2px;
  top: -3px;
  border-radius: 50%;
  background-image: url("../assets/img/ico_checkbox_active@2x.png");
  background-size: 10px 7px;
  background-position: center 8px;
  background-repeat: no-repeat;
  background-color: #4e4eff;
  border: 2px solid #000000;
  transition: background-color 0.3s, border-color 0.3s, content 0.3s;
}
.if_nodata {
  text-align: center;
  padding: 10px;
  /* 필요한 경우 다른 스타일 속성을 추가로 적용할 수 있습니다 */
}
.nodata {
  margin-top: 15%;
}
</style>

<style>
body {
  background-color: #fafafa;
}
</style>
