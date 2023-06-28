<template>
    <div class="mainpage2">
        <span>🌟</span>
        <h2>추천 코스</h2>
        <div class="mainpage2_second">
            <div class="mainpage2_second_left">
                <div v-for="(item, i) in recommendData" :key="i" class="mainpage2_second_left_img">
                    <img v-if="i==0" :src="`http://localhost:3000/downloadCourse/${item.BRD_ID}/${item.IMG_PATH}`" alt="" />
                </div>
                <div id="opacity_glass"></div>
                <div v-for="(item, i) in recommendData" :key="i" class="mainpage2_second_left_content">
                    <h3 v-if="i==0" class="mainpage2_second_left_content_name">{{ item.BRD_TITLE }}</h3>
                    <p v-if="i==0" class="mainpage2_second_left_content_hashtag">{{ item.BRD_HASHTAG }}</p>
                    <span v-if="i==0" class="mainpage2_second_left_content_user">{{ item.BRD_NICK }}
                        <p>님의 코스</p>
                    </span>
                </div>
            </div>
            <div class="mainpage2_second_right">
                <div class="mainpage2_second_right_rows">
                    <div v-for="(item, i) in recommendData" :key="i" class="mainpage2_second_right_row">
                        <div class="mainpage2_second_right_row_img">
                            <img src="/downloadCourse/" alt="">
                            <div id="opacity_glass2"></div>
                        </div>
                        <div class="mainpage2_second_right_row_content">
                            <h3 v-if="i>=1&i<=3" class="mainpage2_second_right_row_content_name">{{ item.BRD_TITLE }}</h3>
                            <p v-if="i>=1&i<=3" class="mainpage2_second_right_row_content_hashtag">{{ item.BRD_HASHTAG }}</p>
                            <span  v-if="i>=1&i<=3" class="mainpage2_second_right_row_content_user">{{ item.BRD_NICK }}
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
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default {
    name: '',
    components: {},
    data() {
        return {
            recommendData: {},
        };
    },

    setup() { },
    created() { },
    mounted() {
        this.getRecommendData()
    },
    unmounted() { },
    methods: {
        async getRecommendData() {       
            await axios({
                url: 'http://localhost:3000/getLikeCourse',
                method: 'POST'
            }).then(res => {
                this.recommendData = res.data;

                console.log(this.recommendData[0].IMG_PATH);
            })
        }
    }
}
</script>

<style scoped>
.mainpage2>span {
    font-size: x-large;
}

.mainpage2>h2 {
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

.mainpage2_second_left {
    width: 49%;
    height: 100%;
    float: left;
    position: relative;
}
.mainpage2_second_left_content {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    align-self: flex-end;
    padding: 3%;
    
}
.mainpage2_second_left_img {
    position: absolute;
    width: 100%;
    height: 100%;
}
.mainpage2_second_left_img img{
    width: 100%;
    height: 100%;
    object-fit: scale-down;
    z-index: 3;
}

.mainpage2_second_left_content_hashtag {
    margin-top: 5%;
    font-size: small;
}

.mainpage2_second_left_content_user {
    margin-top: 70%;
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

.mainpage2_second_right_row_content_name,
.mainpage2_second_left_content_name {
    font-weight: bold;
    z-index: 5;
}

.mainpage2_second_right_row_content_hashtag {
    margin-top: -20%;
    font-size: small;
    z-index: 5;
}

.mainpage2_second_right_row_content_user,
.mainpage2_second_left_content_user {
    display: flex;
    align-self: flex-end;
    font-weight: bold;
    z-index: 5;
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
}</style>