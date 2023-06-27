<template>
    <div class="mainpage3">
        <div class="mainpage3_third">
            <div class="mainpage3_third_filters">
                <div class="mainpage3_third_filters_location_filter">
                    <button @click="showMap">지역 선택</button>
                    <img v-show="show_map" class="show_map" usemap="#image-map" ref="img" :src="require(`../assets/img/seoul/${img}.png`)">
                    <map name="image-map">
                        <area @click="locationDobong" alt="도봉" title="도봉" coords="358,52,351,68,347,83,358,92,366,106,357,128,362,140,371,136,396,168,403,146,415,156,413,122,406,105,408,81,404,68,391,66,384,71,381,59" shape="poly">
                        <area @click="locationNowon" target="" alt="노원" title="노원"  coords="411,74,407,103,419,150,411,155,408,146,394,166,423,192,454,185,468,187,483,181,493,167,493,152,484,142,466,143,469,119,471,106,467,94,474,80,467,71,458,75,452,63" shape="poly">
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
            show_map: false,
            hidden: false,
            img: 'seoul',
            isActive: true
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
        },
        locationDobong() {
            if(this.img !== 'dobong') {
                this.img = 'dobong';
            } else {
                this.img = 'seoul';
            }
        },
        locationNowon() {
            if(this.img !== 'nowon') {
                this.img = 'nowon';
            } else {
                this.img = 'seoul';
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
    justify-content: flex-end;
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
}



#aaa:hover {
    
    fill: blue;
}
</style>