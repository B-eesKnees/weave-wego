<template>
    <div class="mainpage3">
        <div class="mainpage3_third">
            <div class="mainpage3_third_filters">
                <div class="mainpage3_third_filters_location_filter">
                    <select class="" name="items1">
                        <option value="HTML">HTML</option>
                        <option value="자바스크립트">자바스크립트</option>
                        <option value="CSS">CSS</option>
                    </select>
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
                    <input type="text"/>
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
                        <div class="mainpage3_third_content_like"></div>
                    </div>
                    <div class="mainpage3_third_content_detail"></div>
                </div>
                <div class="mainpage3_third_content">
                    <div class="mainpage3_third_content_img">
                        <img src="" alt="">
                        <div class="mainpage3_third_content_like"></div>
                    </div>
                    <div class="mainpage3_third_content_detail"></div>
                </div>
                <div class="mainpage3_third_content">
                    <div class="mainpage3_third_content_img">
                        <img src="" alt="">
                        <div class="mainpage3_third_content_like"></div>
                    </div>
                    <div class="mainpage3_third_content_detail"></div>
                </div>
                <div class="mainpage3_third_content">
                    <div class="mainpage3_third_content_img">
                        <img src="" alt="">
                        <div class="mainpage3_third_content_like"></div>
                    </div>
                    <div class="mainpage3_third_content_detail"></div>
                </div>
                <div class="mainpage3_third_content">
                    <div class="mainpage3_third_content_img">
                        <img src="" alt="">
                        <div class="mainpage3_third_content_like"></div>
                    </div>
                    <div class="mainpage3_third_content_detail"></div>
                </div>
                <div class="mainpage3_third_content">
                    <div class="mainpage3_third_content_img">
                        <img src="" alt="">
                        <div class="mainpage3_third_content_like"></div>
                    </div>
                    <div class="mainpage3_third_content_detail"></div>
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

}
.mainpage3_third_filters_theme_filter {

}
.mainpage3_third_filters_keyword_filter {

}
.mainpage3_third_sort {
    display: flex;
    justify-content: end;
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
</style>