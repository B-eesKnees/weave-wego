<template>
    <div class="admin_boardlist">
        <h2>전체 게시글</h2>
        <h5>전체 80,143개</h5>
        <div class="admin_boards">
            <div class="admin_boards_info">
                <p>제목</p>
                <p>글쓴이</p>
                <p>날짜</p>
                <p>조회수</p>
                <p>좋아요</p>
                <p>상태</p>
                <input type="checkbox">
            </div>
            <div class="admin_board">
                <p>밥먹으러갔어요</p>
                <p>밥밥</p>
                <p>2023-07-23 11:23:56</p>
                <p>32</p>
                <p>56</p>
                <p>공개</p>
                <input type="checkbox">
            </div>
        </div>
        <button>이전</button>
        <button>현재페이지 : 1</button>
        <button>다음</button>
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
.admin_boardlist {
    width: 80%;
    margin: 0 auto;
}
.admin_boardlist>h2 {
    margin-top: 5%;
    text-align: center;
}

.admin_boards {
    border: 1px solid black;
}

.admin_boards_info {
    max-width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1%;
}

.admin_boards_info p:nth-child(1) { 
    padding-right: 40%;
}
.admin_boards_info p:nth-child(2) { 
    padding-right: 15%;
}
.admin_boards_info p:nth-child(3) { 
    padding-right: 10%;
}

.admin_boards_info {
    max-width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1%;
}

.admin_boards_info p:nth-child(1) { 
    padding-right: 40%;
}
.admin_boards_info p:nth-child(2) { 
    padding-right: 15%;
}
.admin_boards_info p:nth-child(3) { 
    padding-right: 10%;
}
</style>