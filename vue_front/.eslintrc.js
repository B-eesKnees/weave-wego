
module.exports = {
    // 기본적인 ESLint 구성 옵션
    // ...

    // Vue 플러그인 활성화
    extends: [
        // 기본적인 Vue 규칙
        'plugin:vue/recommended',

        // 기타 다른 규칙 추가 가능
    ],

    // 플러그인 옵션 설정
    plugins: [
        // 기본적으로 'vue' 플러그인은 자동으로 로드됩니다.
        // 추가 플러그인이 있다면 여기에 추가 가능
    ],

    // 규칙 설정
    rules: {
        // 특정 규칙 설정
        // ...
    }
};