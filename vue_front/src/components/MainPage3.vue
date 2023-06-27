<template>
    <div class="mainpage3">
        <div class="mainpage3_third">
            <div class="mainpage3_third_filters">
                <div class="mainpage3_third_filters_location_filter">
                    <button @click="showMap">지역 선택</button>
                    <img v-show="show_map" class="show_map" usemap="#image-map" src="../assets/img/seoulmap.png">
                    <map name="image-map">
                        <area target="_blank" alt="도봉" title="도봉" href="/www.naver.com" coords="1350,228,1431,640,1671,636,1644,236" shape="poly">
                    </map>
                </div>
                <div class="mainpage3_third_filters_theme_filter">
                    <select name="items2">
                        <option value="카페">카페</option>
                        <option value="식사">식사</option>
                        <option value="체험">체험</option>
                        <option value="전시">전시</option>
                        <option value="쇼룸,편집샵">쇼룸,편집샵</option>
                        <option value="등산">등산</option>
                    </select>
                </div>
                <div class="mainpage3_third_filters_keyword_filter">
                    <input type="text" />
                </div>
            </div>
            <div class="mainpage3_third_sort">
                <select name="items1">
                    <option value="인기순">인기순</option>
                    <option value="조회순">조회순</option>
                    <option value="최근순">최근순</option>
                    <option value="오래된순">오래된순</option>
                </select>
            </div>
            <div class="mainpage3_third_contents">
                <div class="mainpage3_third_content">
                    <div class="mainpage3_third_content_img">
                        <img src="" alt="">
                        <div class="mainpage3_third_content_like">
                            <img src="../assets/img/like.png" alt="" />
                        </div>
                    </div>
                    <div class="mainpage3_third_content_detail">
                        <h5>신용산역 삼각지역 핫한 카페 추천</h5>
                        <div class="border"></div>
                        <p>요즘 삼각지역 근처엔 정말 온갖 핫플이 다 몰려있죠? 주말에
                            친구들과 신용산에서 만났는데 저는 보통 밥먹고 어느...</p>
                    </div>
                </div>
                <div class="mainpage3_third_content">
                    <div class="mainpage3_third_content_img">
                        <img src="" alt="">
                        <div class="mainpage3_third_content_like">
                            <img src="../assets/img/like.png" alt="" />
                        </div>
                    </div>
                    <div class="mainpage3_third_content_detail">
                        <h5>신용산역 삼각지역 핫한 카페 추천</h5>
                        <div class="border"></div>
                        <p>요즘 삼각지역 근처엔 정말 온갖 핫플이 다 몰려있죠? 주말에
                            친구들과 신용산에서 만났는데 저는 보통 밥먹고 어느...</p>
                    </div>
                </div>
                <div class="mainpage3_third_content">
                    <div class="mainpage3_third_content_img">
                        <img src="" alt="">
                        <div class="mainpage3_third_content_like">
                            <img src="../assets/img/like.png" alt="" />
                        </div>
                    </div>
                    <div class="mainpage3_third_content_detail">
                        <h5>신용산역 삼각지역 핫한 카페 추천</h5>
                        <div class="border"></div>
                        <p>요즘 삼각지역 근처엔 정말 온갖 핫플이 다 몰려있죠? 주말에
                            친구들과 신용산에서 만났는데 저는 보통 밥먹고 어느...</p>
                    </div>
                </div>
            </div>
            <div class="more_btn">
                <button>더보기</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    components: {},
    data() {
        return {
            show_map: false
        };
    },

    setup() { },
    created() { },
    mounted() { },
    unmounted() { },
    methods: {
        showMap() {
            if (this.show_map == false) {
                this.show_map = true
            } else {
                this.show_map = false;
            }
        }
    }
}
</script>

<style scoped>
.mainpage3 {
    background-color: tan;
    padding: 5% 15%;
    width: 100%;
    height: 100%;
}

.mainpage3_third {
    width: 100%;
    background-color: aliceblue;
}

.mainpage3_third_filters {
    display: flex;
    justify-content: center;
    align-items: center;
}

.mainpage3_third_filters_location_filter {
    position: relative;
}

.show_map {
    position: absolute;
    left: 0%;
    top: 100%;
    z-index: 1;
}

.mainpage3_third_filters_theme_filter {}

.mainpage3_third_filters_keyword_filter {}

.mainpage3_third_sort {
    display: flex;
    justify-content: end;
    border: none;
}


.mainpage3_third_contents {
    background-color: aquamarine;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.mainpage3_third_content {
    background-color: yellowgreen;
    width: 30%;
    height: 45vh;
    margin-bottom: 3%;
}

.mainpage3_third_content_img {
    width: 100%;
    height: 65%;
    background-color: thistle;
    position: relative;
}

.mainpage3_third_content_detail {
    width: 90%;
    height: 35%;
    font-size: medium;
    display: flex;
    flex-direction: column;
    justify-content: center;

    margin: 0 auto;

}

.mainpage3_third_content_detail h5 {
    font-size: large;
    font-weight: bold;
    padding-bottom: 3%;
}

.border {
    width: 20%;
    border-bottom: 2px solid rgba(0, 0, 0, 0.5);
}

.mainpage3_third_content_detail p {
    padding-top: 2%;
    font-size: small;
}

.mainpage3_third_content_like {
    position: absolute;
    right: 5%;
    bottom: 5%;
}

.mainpage3_third_content_like img {
    width: 2rem;
    height: 2rem;
}

.more_btn {
    text-align: center;
}

.more_btn button {
    padding: 1% 5%;
    border: 1px solid black;
    background-color: white;
}</style>