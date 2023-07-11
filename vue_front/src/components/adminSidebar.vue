<template>
    <div class="admin_sidebar">
        <p>☰</p>
        <img src="../assets/img/logo.png" alt="logo" class="admin_logo" />
        <a href="/admin">관리자 홈</a>
        <a href="/admin/boardlist">전체 게시글</a>
        <a href="/admin/reportboard">신고 게시글</a>
        <a href="/admin/boardlist">신고 댓글</a>
        <a href="/admin/boardlist">유저목록</a>
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
/* 메뉴 사이드바 */
.admin_sidebar {
    position: fixed;
    width: 17%;
    height: 80vh;
    top: 14%;
    left: 0;
    text-align: center;
    background-color: #474B4E;
    margin-left: -14%;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    transition: all 0.3s ease-in-out;
}

.admin_sidebar:hover {
    margin-left: 0;
}

.admin_sidebar>p {
    position: fixed;
    font-size: xx-large;
    color: whitesmoke;
    text-align: left;
    font-weight: bold;
    left: 0.5%;
    top: 15%;
}

.admin_sidebar a {
    display: flex;
    justify-content: center;
    align-items: center;
    color: whitesmoke;
    text-decoration: none;
    font-weight: normal;
    width: 100%;
    height: 10%;
    margin-bottom: 5%;
    opacity: 0.5;
}

.admin_sidebar a:nth-child(2) {
    opacity: 1;
}

.admin_sidebar a:hover {
    background-color: #0073AA;
    opacity: 1;
    font-weight: bold;
}

.admin_logo {
    margin-top: 30%;
    margin-bottom: 20%;
    height: 3%;
}
</style>