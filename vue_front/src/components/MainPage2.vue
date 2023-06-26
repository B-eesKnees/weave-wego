<template>
    <div class="mainpage2">
        <span>🌟</span>
        <h2>추천 코스</h2>
        <div class="mainpage2_second">
            <div class="mainpage2_second_left">
                <div class="mainpage2_second_left_img">
                    <img src="" alt="" />
                </div>
                <div id="opacity_glass"></div>
                <h3 class="mainpage2_second_left_content_name">국립현대미술관에서의 데이트</h3>
                <p class="mainpage2_second_left_content_hashtag">#종로구</p>
                <span class="mainpage2_second_left_content_user">홍길동
                    <p>님의 코스</p>
                </span>
                <div class="mainpage2_second_left_content"></div>
            </div>
            <div class="mainpage2_second_right">
                <div class="mainpage2_second_right_rows">
                    <div class="mainpage2_second_right_row">
                        <div class="mainpage2_second_right_row_img">
                            <img src="" alt="">
                            <div id="opacity_glass2"></div>
                        </div>
                        <div class="mainpage2_second_right_row_content">
                            <h3 class="mainpage2_second_right_row_content_name">국립현대미술관에서의 데이트</h3>
                            <p class="mainpage2_second_right_row_content_hashtag">#종로구</p>
                            <span class="mainpage2_second_right_row_content_user">홍길동
                                <p class="nim">님의 코스</p>
                            </span>
                        </div>
                    </div>

                    <div class="mainpage2_second_right_row">
                        <div class="mainpage2_second_right_row_img">
                            <img src="" alt="">
                            <div id="opacity_glass2"></div>
                        </div>
                        <div class="mainpage2_second_right_row_content">
                            <h3 class="mainpage2_second_right_row_content_name">국립현대미술관에서의 데이트</h3>
                            <p class="mainpage2_second_right_row_content_hashtag">#종로구</p>
                            <span class="mainpage2_second_right_row_content_user">홍길동
                                <p class="nim">님의 코스</p>
                            </span>
                        </div>
                    </div>

                    <div class="mainpage2_second_right_row">
                        <div class="mainpage2_second_right_row_img">
                            <img src="" alt="">
                            <div id="opacity_glass2"></div>
                        </div>
                        <div class="mainpage2_second_right_row_content">
                            <h3 class="mainpage2_second_right_row_content_name">국립현대미술관에서의 데이트</h3>
                            <p class="mainpage2_second_right_row_content_hashtag">#종로구</p>
                            <span class="mainpage2_second_right_row_content_user">홍길동
                                <p class="nim">님의 코스</p>
                            </span>
                        </div>
                    </div>  
                </div>
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
            sampleData: ''
        };
    },

    setup() { },
    created() { },
    mounted() { },
    unmounted() { },
    methods: {}
}
</script>

<style scoped>
.mainpage2 > span {
    font-size: x-large;
}
.mainpage2 > h2 {
    font-size: x-large;
    font-weight: bold;
    padding: 2% 0;
}

.mainpage2 {
    background-color: antiquewhite;
    padding: 5% 15% 10% 15%;
    width: 100%;
    height: 110vh;
}

.mainpage2_second {
    background-color: aliceblue;
    width: 100%;
    height: 100%;
}

.mainpage2_second_left {
    background-color: coral;
    width: 49%;
    height: 100%;
    float: left;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    align-self: flex-end;
    padding: 3%;
    position: relative;
}
.mainpage2_second_left_img {
    position: absolute;
}
.mainpage2_second_left_content_hashtag {
    margin-bottom: 80%;
    font-size: small;
}
.mainpage2_second_left_content_user {
    display: flex;
    align-self: flex-end;
    font-weight: bold;
}
.mainpage2_second_right {
    background-color: cornflowerblue;
    width: 49%;
    height: 100%;
    float: right;
    box-sizing: border-box;
}

.mainpage2_second_right_rows {
    background-color: cadetblue;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

}

.mainpage2_second_right_row {
    background-color: chartreuse;
    width: 100%;
    height: 30%;
    
}

.mainpage2_second_right_row_img {
    background-color: aquamarine;
    width: 35%;
    height: 100%;
    float: left;
    box-sizing: border-box;
    position: relative;
}

.mainpage2_second_right_row_content {
    width: 65%;
    height: 100%;
    padding: 3%;
    float: right;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    align-self: flex-end;

}

.mainpage2_second_right_row_content_name, .mainpage2_second_left_content_name {
    font-weight: bold;
}

.mainpage2_second_right_row_content_hashtag {
    margin-top: -20%;
    font-size: small;
}

.mainpage2_second_right_row_content_user, .mainpage2_second_left_content_user {
    display: flex;
    align-self: flex-end;
    font-weight: bold;
}

.mainpage2_second_right_row_content_user p, .mainpage2_second_left_content_user p {
    font-weight: normal;
}

#opacity_glass {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0.2;
    background-color: black;
}
#opacity_glass2 {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0.2;
    background-color: black;
}
</style>