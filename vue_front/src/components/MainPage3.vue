<template>
    <div class="mainpage3">
        <div class="mainpage3_third">
            <div class="mainpage3_third_filters">
                <div class="mainpage3_third_filters_location_filter">
                    <button class="filter_btn" @click="showLocation(), filterBtnClick($event)">지역 선택</button>
                    <svg v-if="isShowLocation" width="600" height="500" viewBox="50 25 700 600"
                        xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <filter id="dropshadow">
                                <feGaussianBlur in="SourceAlpha" stdDeviation="7" />
                                <feOffset dx="0" dy="0" result="offsetblur" />
                                <feMerge>
                                    <feMergeNode />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                            <filter id="dropshadow2">
                                <feGaussianBlur in="SourceAlpha" stdDeviation="1.4" />
                                <feOffset dx="1" dy="1" result="offsetblur" />
                                <feMerge>
                                    <feMergeNode />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        <g filter="url(#dropshadow)">
                            <path ref="jongro" id="jongro" @click="locationSelect($event)" class="OUTLINE"
                                d="M 455 297 l 4 -2 1 0 1 0 3 -1 4 5 7 3 2 6 0 8 -11 2 -11 1 -8 0 -9 1 -8 1 -9 1 -9 -2 -10 -1 -9 1 -4 3 -2 3 -6 -6 -3 -4 -5 -6 -4 -5 -2 -5 5 -3 0 -6 0 -10 0 -9 1 -9 -3 -4 -2 0 -2 0 -1 -4 0 -9 -5 -9 1 -10 -1 -11 -1 -6 2 -6 5 -2 7 -3 10 -2 2 -1 3 0 1 0 4 -2 8 -1 3 6 4 1 3 8 3 10 1 6 3 5 0 9 0 7 -1 5 -6 3 -6 4 -1 5 6 4 5 3 5 4 9 1 10 0 4 4 3 4 5 10 1 3 z " />
                            <path ref="jung" id="jung" @click="locationSelect($event)" class="OUTLINE"
                                d="M 477 316 l 0 9 5 5 -1 3 -4 5 -4 5 -5 4 -4 7 -3 4 -4 3 -4 10 -2 -1 -3 -7 -2 -5 -2 1 -1 0 -2 -1 -3 1 0 0 -3 1 -4 2 -5 -5 -6 -3 -10 -3 -4 -1 -3 -1 -2 2 -4 -1 -3 -1 -9 0 -2 2 -4 3 0 -7 1 -4 -2 -2 0 -1 6 -3 6 -4 -1 -2 -2 -5 2 -3 4 -3 9 -1 10 1 9 2 9 -1 8 -1 9 -1 8 0 11 -1 z " />
                            <path ref="yongsan" id="yongsan" @click="locationSelect($event)" class="OUTLINE"
                                d="M 394 349 l 3 1 4 1 2 -2 3 1 4 1 10 3 6 3 5 5 4 -2 3 -1 0 0 3 -1 2 1 1 0 2 -1 2 5 3 7 2 1 5 9 6 2 2 9 -4 5 -4 5 -5 6 -3 4 -5 4 -5 5 -5 4 -5 3 -8 8 -5 8 -7 3 -7 -1 -10 -4 -3 -1 -6 -3 -6 -5 -5 -3 -6 -3 -9 -3 1 -5 0 -10 -2 -8 -6 -11 5 -2 4 -1 5 -4 5 -6 2 -5 3 -6 6 -5 0 -3 -2 -3 4 -3 2 -2 z " />
                            <path ref="sungdong" id="sungdong" @click="locationSelect($event)" class="OUTLINE"
                                d="M 511 315 l 7 4 6 6 4 4 6 5 2 0 15 3 4 0 -5 20 -3 5 -5 12 -3 7 -10 20 -7 -4 -5 -3 -4 -4 -10 -3 -10 0 -7 0 -12 0 -8 4 -2 -9 -6 -2 -5 -9 4 -10 4 -3 3 -4 4 -7 5 -4 4 -5 4 -5 1 -3 -5 -5 0 -9 6 1 11 -1 5 -2 2 -1 6 0 z " />
                            <path ref="gwangjin" id="gwangjin" @click="locationSelect($event)" class="OUTLINE"
                                d="M 605 315 l 1 1 -1 4 -1 7 -2 9 3 6 4 4 3 -3 9 -1 3 3 -4 10 -2 10 -2 5 -2 4 -4 5 -5 5 -5 4 -11 12 -3 3 -3 2 -8 5 -6 3 -5 1 -5 -1 -5 -1 -6 -2 -12 -5 -7 -4 13 -27 5 -12 3 -5 5 -20 3 -8 4 -5 4 -9 7 1 11 3 9 -3 4 -3 4 -2 z " />
                            <path ref="dongdaemun" id="dongdaemun" @click="locationSelect($event)" class="OUTLINE"
                                d="M 554 245 l 2 10 -2 5 -3 6 2 9 1 6 3 9 3 6 2 3 1 11 3 5 -4 9 -4 5 -3 8 -4 0 -15 -3 -2 0 -6 -5 -4 -4 -6 -6 -7 -4 -4 -2 -6 0 -2 1 -5 2 -11 1 -6 -1 0 -8 -2 -6 6 -4 6 -5 4 -6 3 -4 4 -5 2 -3 6 -8 4 -2 8 -3 4 -5 7 -1 7 -2 4 -6 7 -2 z " />
                            <path ref="junglang" id="junglang" @click="locationSelect($event)" class="OUTLINE"
                                d="M 621 218 l 5 3 1 6 0 10 2 8 -3 8 -3 5 0 3 3 4 -1 6 -4 2 -5 9 0 5 -4 6 -4 3 -4 5 -3 10 -4 2 -4 3 -9 3 -11 -3 -7 -1 -3 -5 -1 -11 -2 -3 -3 -6 -3 -9 -1 -6 -2 -9 3 -6 2 -5 -2 -10 0 -8 2 -11 6 -3 4 -1 9 -4 9 1 10 1 6 -2 9 -1 z " />
                            <path ref="sungbuk" id="sungbuk" @click="locationSelect($event)" class="OUTLINE"
                                d="M 455 297 l -3 -2 -1 -3 -5 -10 -3 -4 -4 -4 -10 0 -9 -1 -5 -4 -5 -3 -6 -4 1 -5 6 -4 6 -3 1 -5 0 -7 0 -9 -3 -5 -1 -6 -3 -10 -3 -8 -4 -1 -3 -6 9 -5 4 -3 4 1 5 4 6 4 3 2 4 5 5 5 7 3 5 2 -1 3 0 0 0 2 1 3 5 6 9 3 4 3 5 3 8 -1 6 4 9 -4 4 -6 4 -4 4 -4 4 -6 4 -3 5 4 4 5 5 5 5 4 9 0 9 -2 -2 11 0 8 -7 1 -7 2 -4 6 -7 2 -7 1 -4 5 -8 3 -4 2 -6 8 -2 3 -4 5 -3 4 -4 6 -6 5 -6 4 -7 -3 -4 -5 -3 1 -1 0 -1 0 z " />
                            <path ref="gangbuk" id="gangbuk" @click="locationSelect($event)" class="OUTLINE"
                                d="M 448 87 l 2 0 1 0 0 0 4 4 3 7 4 5 4 7 3 5 1 2 -2 4 -2 6 -2 9 -2 8 -1 5 0 4 2 4 5 3 3 0 2 -1 3 2 7 5 3 3 7 6 2 6 5 4 3 7 6 6 7 6 3 6 -4 3 -4 6 -4 4 -4 4 -4 6 -9 4 -6 -4 -8 1 -5 -3 -4 -3 -9 -3 -4 -6 -2 -3 0 -2 0 0 1 -3 -5 -2 -7 -3 -5 -5 -4 -5 -3 -2 -6 -4 -5 -4 -4 -1 3 -4 0 -6 -3 -4 1 -3 2 -3 -2 -4 -3 -7 -4 -9 4 -1 7 -7 4 -8 6 -4 2 -5 0 -13 -1 -7 2 -5 6 -5 7 -2 z " />
                            <path ref="dobong" id="dobong" @click="locationSelect($event)" class="OUTLINE"
                                d="M 463 157 l -2 -4 0 -4 1 -5 2 -8 2 -9 2 -6 2 -4 -1 -2 -3 -5 -4 -7 -4 -5 -3 -7 -1 -9 0 -8 4 -11 8 -8 10 1 9 0 3 4 1 6 3 5 9 -1 4 -2 4 -1 4 4 5 0 5 13 0 9 -1 5 -4 12 0 8 3 9 2 9 3 10 1 9 2 7 -2 13 -3 -4 -2 -3 -2 3 -5 5 -1 6 -4 9 -1 7 -6 -6 -3 -7 -5 -4 -2 -6 -7 -6 -3 -3 -7 -5 -3 -2 -2 1 -3 0 z " />
                            <path ref="nowon" id="nowon" @click="locationSelect($event)" class="OUTLINE"
                                d="M 619 183 l 1 7 -3 7 -6 5 -3 7 1 8 -9 1 -6 2 -10 -1 -9 -1 -9 4 -4 1 -6 3 -9 2 -9 0 -5 -4 -5 -5 -4 -5 -5 -4 -3 -6 -7 -6 1 -7 4 -9 1 -6 5 -5 2 -3 2 3 3 4 2 -13 -2 -7 -1 -9 -3 -10 -2 -9 -3 -9 0 -8 4 -12 1 -5 0 -9 6 -4 5 -2 4 -4 4 -6 6 0 3 1 4 0 5 -1 4 -2 7 -1 5 8 5 5 5 0 3 -1 5 4 -3 10 -2 7 -1 2 1 3 3 7 2 8 -2 11 -2 5 -3 4 0 4 2 6 1 6 0 10 3 5 7 0 5 -2 5 0 4 4 4 3 z " />
                            <path ref="enpyeng" id="enpyeng" @click="locationSelect($event)" class="OUTLINE"
                                d="M 368 148 l 3 2 1 3 2 11 2 9 2 8 3 5 0 5 -3 3 -5 5 -7 3 -5 2 -2 6 1 6 1 11 -1 10 -7 6 -4 3 -4 7 0 7 -5 2 -9 4 -4 4 -3 5 -3 7 -5 4 -3 4 -8 -1 0 -3 -1 0 -3 -2 -3 2 -4 5 -4 5 -5 5 -1 5 -9 -8 -12 -9 -1 -2 -6 -6 -4 -5 6 -9 1 2 -2 5 2 5 8 0 9 -1 3 -6 1 -4 2 -5 -1 -9 2 -8 -2 -10 2 -10 4 -7 3 -4 2 -6 2 -9 -1 -10 5 -4 0 -1 -1 -5 1 -4 1 -4 0 -5 -5 -3 -5 -5 0 -1 1 1 5 3 6 4 11 -1 10 -3 3 -3 4 -2 9 -4 4 -5 3 -5 5 -2 6 -2 3 4 z " />
                            <path ref="seodaemun" id="seodaemun" @click="locationSelect($event)" class="OUTLINE"
                                d="M 365 255 l 1 4 2 0 2 0 3 4 -1 9 0 9 0 10 0 6 -5 3 2 5 4 5 5 6 3 4 6 6 2 5 1 2 -6 4 -6 3 -3 3 -8 0 -10 1 -11 1 -7 2 -10 -4 -7 -6 -2 -10 -6 -3 -6 -2 -4 -2 -8 -4 -5 -5 -7 -5 1 -5 5 -5 4 -5 4 -5 3 -2 3 2 1 0 0 3 8 1 3 -4 5 -4 3 -7 3 -5 4 -4 9 -4 5 -2 0 -7 4 -7 4 -3 7 -6 5 9 z " />
                            <path ref="mapo" id="mapo" @click="locationSelect($event)" class="OUTLINE"
                                d="M 263 289 l 12 9 9 8 7 5 5 5 8 4 4 2 6 2 6 3 2 10 7 6 10 4 7 -2 11 -1 10 -1 8 0 3 -3 0 1 2 2 -1 4 0 7 2 3 0 3 -6 5 -3 6 -2 5 -5 6 -5 4 -4 1 -5 2 -7 -4 -5 -4 -5 -3 -5 -2 -4 1 -4 2 -6 -4 -11 0 -12 0 -5 -2 -6 -7 -6 -6 -8 -4 -8 -4 -5 -4 -5 -3 -11 -7 -8 -5 -4 -2 -6 -4 -4 -4 -4 -3 -6 -6 -1 -3 8 -4 4 -2 4 -2 10 -2 10 -2 3 -2 0 -1 -1 -6 0 -5 4 -5 5 -4 4 5 6 6 z " />
                            <path ref="yangcheon" id="yangcheon" @click="locationSelect($event)" class="OUTLINE"
                                d="M 240 363 l 8 -1 5 5 2 5 4 8 4 9 -2 3 2 2 0 2 -8 3 -5 4 -3 4 -2 12 0 4 -2 7 -4 6 -1 8 -2 6 -1 -1 -4 -2 -10 -2 -6 -2 -4 -5 -8 -1 -8 2 -4 4 -7 3 -4 3 -5 1 -3 -1 -4 -5 -4 -4 -4 -2 -3 -12 2 -9 1 -7 4 -5 0 -4 -4 -4 -4 -6 -2 -11 4 -7 3 -7 5 -2 1 6 5 5 2 6 3 9 3 7 3 4 12 1 7 -2 11 -1 7 -2 1 -8 0 -7 -1 -9 0 -10 2 -8 5 2 5 4 z " />
                            <path ref="gangseo" id="gangseo" @click="locationSelect($event)" class="OUTLINE"
                                d="M 134 254 l 3 3 6 4 4 4 4 6 4 3 6 4 5 4 6 4 5 3 4 4 6 5 3 2 6 5 9 6 1 3 6 6 4 3 4 4 6 4 4 2 8 5 11 7 -4 8 3 9 -8 1 -8 -2 -5 -4 -5 -2 -2 8 0 10 1 9 0 7 -1 8 -7 2 -11 1 -7 2 -12 -1 -3 -4 -3 -7 -3 -9 -2 -6 -5 -5 -1 -6 -5 2 -3 7 -10 2 -9 -1 -7 -4 -3 -2 0 1 -9 5 -2 5 -6 2 -2 -6 -4 -5 -5 -4 -7 -2 -9 -2 -7 -4 -4 1 -1 -2 -2 -2 1 -1 -3 -2 -2 -7 8 -4 2 -5 6 -2 -1 -5 -2 -5 0 -3 2 1 0 1 5 -3 3 -3 -1 -2 2 -1 1 -5 8 -4 1 -1 1 1 2 -5 2 -6 1 3 1 2 2 -9 2 -4 2 2 1 -4 5 -5 0 -6 -3 -5 -1 -6 0 -5 3 -4 4 -6 4 2 z " />
                            <path ref="guro" id="guro" @click="locationSelect($event)" class="OUTLINE"
                                d="M 245 419 l 6 7 4 4 5 2 4 4 4 9 -1 9 2 9 1 6 1 5 3 7 5 5 4 3 -3 5 -4 5 -10 1 -7 -3 -4 -5 -5 -4 -5 -3 -2 0 -2 1 -3 -5 -4 -2 3 -2 0 -1 -3 0 -3 2 -1 -5 -2 -6 -2 1 -1 1 1 1 -4 4 -5 3 -4 5 -4 4 -6 6 -9 2 -2 4 -1 10 -6 0 -8 -1 -5 -4 -4 0 -4 2 -9 0 -5 1 -8 1 2 -4 4 -5 2 -8 2 -5 3 -4 -2 -5 -3 -1 -8 -5 -1 -7 6 -3 4 -6 2 -4 2 -6 5 -6 4 2 4 4 4 5 3 1 5 -1 4 -3 7 -3 4 -4 8 -2 8 1 4 5 6 2 10 2 4 2 1 1 2 -6 1 -8 4 -6 2 -7 z " />
                            <path ref="geumcheon" id="geumcheon" @click="locationSelect($event)" class="OUTLINE"
                                d="M 241 486 l 2 -1 2 0 5 3 5 4 4 5 7 3 10 -1 11 -1 6 1 3 10 -3 8 3 6 3 6 1 6 4 8 8 3 3 4 5 4 2 6 -7 7 -2 5 -3 6 -8 1 -5 4 -4 7 -9 -1 -4 -4 -3 -4 -2 -9 -3 -5 -2 -3 1 -3 -1 -3 -3 -4 -6 -3 -4 -6 -1 -9 -4 -4 -1 -4 2 -2 -2 -3 -3 -5 -4 -6 -2 -4 -4 -9 -3 -8 -1 -4 1 -2 z " />
                            <path ref="yeongdeungpo" id="yeongdeungpo" @click="locationSelect($event)" class="OUTLINE"
                                d="M 249 345 l 5 3 5 4 8 4 8 4 6 6 6 7 5 2 12 0 11 0 6 4 4 -2 4 -1 5 2 5 3 5 4 7 4 6 11 2 8 0 10 -1 5 -11 2 -8 1 -9 1 -8 2 -2 5 -3 8 -2 3 -3 10 -2 8 -9 2 -3 1 -4 7 -4 5 -3 5 -4 6 -4 -3 -5 -5 -3 -7 -1 -5 -1 -6 -2 -9 1 -9 -4 -9 -4 -4 -5 -2 -4 -4 -6 -7 2 -12 3 -4 5 -4 8 -3 0 -2 -2 -2 2 -3 -4 -9 -4 -8 -2 -5 -5 -5 -3 -9 z " />
                            <path ref="dongjak" id="dongjak" @click="locationSelect($event)" class="OUTLINE"
                                d="M 367 426 l 6 3 5 3 6 5 6 3 3 1 10 4 7 1 -3 4 0 0 4 5 2 8 -2 11 0 6 -1 11 0 8 0 9 -5 -2 -14 0 -3 -2 -5 -4 -6 -10 0 -11 -2 -6 -7 3 -3 1 -2 -2 -7 -3 -9 1 -7 0 -11 -2 -6 -1 -6 7 -6 1 -10 4 -4 3 -2 1 -12 3 4 -6 3 -5 4 -5 4 -7 3 -1 9 -2 2 -8 3 -10 2 -3 3 -8 2 -5 8 -2 9 -1 8 -1 11 -2 z " />
                            <path ref="gwanak" id="gwanak" @click="locationSelect($event)" class="OUTLINE"
                                d="M 323 470 l 6 1 11 2 7 0 9 -1 7 3 2 2 3 -1 7 -3 2 6 0 11 6 10 5 4 3 2 14 0 5 2 2 8 4 6 3 4 0 11 1 5 -9 4 -7 2 -3 1 -5 4 -5 7 -8 5 -2 7 -1 5 -5 2 -9 2 -9 1 -10 2 -4 2 -2 0 -3 -5 -2 -6 -5 -4 -5 -7 -4 -4 -2 -6 -5 -4 -3 -4 -8 -3 -4 -8 -1 -6 -3 -6 -3 -6 3 -8 -3 -10 -6 -1 -11 1 4 -5 3 -5 12 -3 2 -1 4 -3 10 -4 6 -1 z " />
                            <path ref="seocho" id="seocho" @click="locationSelect($event)" class="OUTLINE"
                                d="M 460 413 l 1 0 2 -3 6 9 1 6 0 1 3 9 5 15 5 13 6 17 7 10 6 -1 5 5 1 3 4 9 7 13 3 5 6 -2 4 0 6 -1 9 -2 8 -4 5 -3 2 -2 11 0 4 8 2 3 5 6 2 7 4 4 1 7 -5 8 -6 10 0 6 -6 4 -4 4 -5 0 -4 -1 -4 0 -2 6 -2 8 -1 4 -1 2 1 3 -4 0 -10 2 -9 0 -8 0 -7 -4 -4 -6 -5 -5 -4 -2 -5 -4 1 -5 2 -4 -1 -8 0 -5 -2 -4 2 -5 0 -1 -3 -4 -2 -9 -2 -6 -5 0 -2 7 -3 6 -6 4 -8 2 -4 1 -2 0 -6 -3 -3 -3 0 0 -1 -2 -3 -6 -2 -8 -8 -2 -5 3 1 3 0 1 -4 4 -6 3 -4 3 -1 -5 0 -11 -3 -4 -4 -6 -2 -8 0 -9 0 -8 1 -11 0 -6 2 -11 -2 -8 -4 -5 0 0 3 -4 7 -3 5 -8 8 -8 5 -3 5 -4 5 -5 5 -4 3 -4 z " />
                            <path ref="gangnam" id="gangnam" @click="locationSelect($event)" class="OUTLINE"
                                d="M 503 387 l 10 3 4 4 5 3 7 4 7 4 12 5 0 10 0 4 1 13 1 6 1 10 6 2 7 1 6 2 3 2 12 4 5 2 5 3 6 3 5 4 5 5 3 6 3 5 3 5 4 7 2 2 5 10 3 4 4 5 -10 11 -2 6 -4 0 -3 -4 -9 -2 -4 0 0 2 -1 1 -3 3 -11 3 -1 -7 -4 -4 -2 -7 -5 -6 -2 -3 -4 -8 -11 0 -2 2 -5 3 -8 4 -9 2 -6 1 -4 0 -6 2 -3 -5 -7 -13 -4 -9 -1 -3 -5 -5 -6 1 -7 -10 -6 -17 -5 -13 -5 -15 -3 -9 0 -1 -1 -6 -6 -9 -2 3 -1 0 -7 -6 5 -6 4 -5 4 -5 8 -4 12 0 7 0 z " />
                            <path ref="songpa" id="songpa" @click="locationSelect($event)" class="OUTLINE"
                                d="M 621 374 l 6 2 4 2 4 4 0 8 -2 5 -1 3 0 7 5 2 8 5 5 3 8 4 3 2 5 3 5 2 -4 3 0 6 -3 10 4 5 5 3 10 0 9 3 5 5 -1 4 -2 7 -3 9 -4 3 -5 4 -5 5 -2 6 -3 7 -5 5 -10 0 -6 0 0 8 -4 5 -6 -2 -2 -1 -1 4 -4 -5 -3 -4 -5 -10 -2 -2 -4 -7 -3 -5 -3 -5 -3 -6 -5 -5 -5 -4 -6 -3 -5 -3 -5 -2 -12 -4 -3 -2 -6 -2 -7 -1 -6 -2 -1 -10 -1 -6 -1 -13 0 -4 0 -10 6 2 5 1 5 1 5 -1 6 -3 8 -5 3 -2 3 -3 11 -12 5 -4 5 -5 4 -5 z " />
                            <path ref="gangdong" id="gangdong" @click="locationSelect($event)" class="OUTLINE"
                                d="M 726 320 l 1 7 3 9 0 9 1 9 1 10 1 5 -1 -1 -5 -1 -3 0 -4 2 -11 0 -8 1 -5 6 -4 5 -4 6 -2 4 -1 8 -4 7 -3 2 1 1 -1 2 -6 7 -1 8 -5 -2 -5 -3 -3 -2 -8 -4 -5 -3 -8 -5 -5 -2 0 -7 1 -3 2 -5 0 -8 -4 -4 -4 -2 -6 -2 -7 0 2 -4 2 -5 2 -10 4 -10 1 -1 4 -6 7 -6 5 -3 6 -3 8 -3 4 -1 5 0 11 0 9 -4 7 -5 8 -6 11 -6 11 0 0 7 3 6 z " />
                        </g>
                        <g filter="url(#dropshadow2)"></g>
                        <g filter="url(#dropshadow2)">
                            <text ref="jongro" id="jongro" class="TEXT" x="399" y="290">종로구</text>
                            <text ref="jung" id="jung" class="TEXT" x="433" y="338">중구</text>
                            <text ref="yongsan" id="yongsan" class="TEXT" x="407" y="395">용산구</text>
                            <text ref="sungdong" id="sungdong" class="TEXT" x="505" y="356">성동구</text>
                            <text ref="gwangjin" id="gwangjin" class="TEXT" x="577" y="365">광진구</text>
                            <text ref="dongdaemun" id="dongdaemun" class="TEXT" x="528" y="294">동대문구</text>
                            <text ref="junglang" id="junglang" class="TEXT" x="589" y="270">중랑구</text>
                            <text ref="sungbuk" id="sungbuk" class="TEXT" x="466" y="258">성북구</text>
                            <text ref="gangbuk" id="gangbuk" class="TEXT" x="459" y="181">강북구</text>
                            <text ref="dobong" id="dobong" class="TEXT" x="494" y="125">도봉구</text>
                            <text ref="nowon" id="nowon" class="TEXT" x="560" y="153">노원구</text>
                            <text ref="enpyeng" id="enpyeng" class="TEXT" x="323" y="218">은평구</text>
                            <text ref="seodaemun" id="seodaemun" class="TEXT" x="335" y="310">서대문구</text>
                            <text ref="mapo" id="mapo" class="TEXT" x="293" y="339">마포구</text>
                            <text ref="yangcheon" id="yangcheon" class="TEXT" x="209" y="421">양천구</text>
                            <text ref="gangseo" id="gangseo" class="TEXT" x="156" y="334">강서구</text>
                            <text ref="guro" id="guro" class="TEXT" x="199" y="470">구로구</text>
                            <text ref="geumcheon" id="geumcheon" class="TEXT" x="279" y="537">금천구</text>
                            <text ref="yeongdeungpo" id="yeongdeungpo" class="TEXT" x="295" y="413">영등포구</text>
                            <text ref="dongjak" id="dongjak" class="TEXT" x="361" y="461">동작구</text>
                            <text ref="gwanak" id="gwanak" class="TEXT" x="353" y="529">관악구</text>
                            <text ref="seocho" id="seocho" class="TEXT" x="481" y="515">서초구</text>
                            <text ref="gangnam" id="gangnam" class="TEXT" x="533" y="464">강남구</text>
                            <text ref="songpa" id="songpa" class="TEXT" x="624" y="448">송파구</text>
                            <text ref="gangdong" id="gangdong" class="TEXT" x="675" y="358">강동구</text>
                        </g>
                    </svg>
                </div>
                <div class="mainpage3_third_filters_theme_filter">
                    <button @click="showTheme(), filterBtnClick($event)" class="filter_btn">테마 선택</button>
                    <div v-if="isShowTheme" class="show_theme">
                        <h4 @click="themeSelect($event)">카페</h4>
                        <h4 @click="themeSelect($event)">식사</h4>
                        <h4 @click="themeSelect($event)">체험</h4>
                        <h4 @click="themeSelect($event)">전시</h4>
                        <h4 @click="themeSelect($event)">쇼룸,편집샵</h4>
                        <h4 @click="themeSelect($event)">등산</h4>
                    </div>
                </div>
                <div class="mainpage3_third_filters_keyword_filter">
                    <img src="../assets/img/search.png" alt=""><input class="keyword_filter" type="text"
                        placeholder="키워드 검색" />
                </div>
            </div>
            <div class="mainpage3_third_sort">
                <select ref="sort" name="items1">
                    <option value="최근순">최근순</option>
                    <option value="인기순">인기순</option>
                    <option value="조회순">조회순</option>
                </select>
            </div>
            <div class="mainpage3_third_contents">
                <div v-for="(item, i) in recentData" :key="i" class="mainpage3_third_content">
                    <div class="mainpage3_third_content_img">
                        <img :src="`http://localhost:3000/downloadCourse/${item.BRD_ID}/${item.IMG_PATH}`" alt="">
                        <div id="opacity_glass"></div>
                        <div class="mainpage3_third_content_like">
                            <img src="../assets/img/like.png" alt="" />
                        </div>
                    </div>
                    <div class="mainpage3_third_content_detail">
                        <h5>{{ item.BRD_TITLE }}</h5>
                        <div class="border"></div>
                        <p>{{ item.BRD_REV }}</p>
                    </div>
                </div>

            </div>
            <div class="more_btn">
                <button @click="showMoreContent">더보기</button>
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
            isShowLocation: false,
            isShowTheme: false,
            fill: false,
            locationSelectCount: 0,
            themeSelectCount: 0,
            recentOriginData: [],
            recentData: [],
            testresult: [],
            test: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16']
        };
    },

    setup() { },
    created() { },
    mounted() {
        this.showSortRecent()
    },
    unmounted() { },
    watch: {

    },
    methods: {
        showLocation() { //클릭시 지역선택 보여줌
            if (this.isShowLocation == false) {
                this.isShowLocation = true;
            } else {
                this.isShowLocation = false;
                this.locationSelectCount = 0;
            }
        },
        showTheme() { //클릭시 테마선택 보여줌
            if (this.isShowTheme == false) {
                this.isShowTheme = true;
            } else {
                this.isShowTheme = false;
                this.themeSelectCount = 0;
            }
        },
        filterBtnClick(event) {
            if (event.target.classList.contains('filters_btn')) {
                event.target.classList.remove("filters_btn");
                event.target.classList.add("filter_btn");
            } else {
                event.target.classList.add("filters_btn");
                event.target.classList.remove("filter_btn");
            }
        },
        locationSelect(event) { // 지역선택 5개까지만 가능
            if (this.locationSelectCount <= 5 - 1) {
                if (event.target.classList.contains('fill_location')) {
                    event.target.classList.remove("fill_location");
                    this.locationSelectCount -= 1;
                    console.log(this.locationSelectCount);
                } else {
                    event.target.classList.add("fill_location");
                    this.locationSelectCount += 1;
                    console.log(this.locationSelectCount);
                }
            } else if (this.locationSelectCount == 5) {
                if (event.target.classList.contains('fill_location')) {
                    event.target.classList.remove("fill_location");
                    this.locationSelectCount -= 1;
                    console.log(this.locationSelectCount);
                }
            }
        },
        themeSelect(event) { // 지역선택 5개까지만 가능
            if (this.themeSelectCount <= 5 - 1) {
                if (event.target.classList.contains('fill_theme')) {
                    event.target.classList.remove("fill_theme");
                    this.themeSelectCount -= 1;
                    console.log(this.themeSelectCount);
                } else {
                    event.target.classList.add("fill_theme");
                    this.themeSelectCount += 1;
                    console.log(this.themeSelectCount);
                }
            } else if (this.themeSelectCount == 5) {
                if (event.target.classList.contains('fill_theme')) {
                    event.target.classList.remove("fill_theme");
                    this.themeSelectCount -= 1;
                    console.log(this.themeSelectCount);
                }
            }
        },
        //비로그인시 좋아요버튼 누르면 로그인창으로 이동할건지 물어보기
        async showSortRecent() {
            const sortvalue = this.$refs.sort.value;
            if (sortvalue == "최근순") {
                await axios({
                    url: 'http://localhost:3000/getNewestCourse',
                    method: 'POST'
                }).then(res => {
                    this.recentOriginData = res.data;
                    for (let i = 0; i <= 5; i++) { //게시물 6개 출력
                        this.recentData.push(this.recentOriginData[i]);
                    }
                    console.log(this.recentData);


                })
            }
        },
        async showMoreContent() { //더보기버튼 누를시 게시글 6개 추가 출력
            await axios({
                url: 'http://localhost:3000/getNewestCourse',
                method: 'POST'
            }).then(res => {
                // this.recentData = res.data; //16개 데이터 16-6= 12, 7-12
                // console.log(this.recentData);
                // this.recentData.slice(0, 13);
                // console.log(this.recentData);
                this.testresult = this.test.slice(0, 7);
                console.log(this.testresult);
                this.testresult = this.test.slice(0, 13);
                console.log(this.testresult);
            })

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
    width: 100%;
}

.filters_btn {
    background-color: #A5C2B6;
    padding: 20px 80px;
    border: none;
    box-shadow: 0 0 5px #ccc;
}

.mainpage3_third_filters_location_filter {
    position: relative;
    padding: 5% 0;
}

.filter_btn {
    padding: 20px 80px;
    background-color: white;
    border: none;
    box-shadow: 0 0 5px #ccc;
}

.show_map {
    position: absolute;
    left: 0%;
    top: 100%;
    z-index: 5;
    box-shadow: 0 0 5px #ccc;
}

.mainpage3_third_filters_theme_filter {
    position: relative;

}

.show_theme {
    width: 110%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    background-color: white;
    padding: 1% 1%;
    margin-top: 1%;
    border-radius: 5%;
    position: absolute;
    box-shadow: 0 0 5px #ccc;
    z-index: 1;
}

.show_theme h4 {
    padding: 2% 12%;
    border: 1px solid black;
    cursor: pointer;
    user-select: none;
}

.show_theme h4:nth-child(5) {
    padding: 2% 18%;
}

.fill_theme {
    background-color: #388265;
    color: white;
}

.mainpage3_third_filters_keyword_filter {
    display: flex;
    padding: 19px 60px 19px 0px;
    justify-content: flex-start;
}

.mainpage3_third_filters_keyword_filter img {
    width: 20%;
    height: 20%;
    margin: auto 5% auto 20%;
}

.keyword_filter {
    border: none;
    border-bottom: 1px solid #ccc;
    padding: 10%;
}

.keyword_filter:focus {
    border: none;
    outline: none;
    border-bottom: 2px solid #388265;

}

.mainpage3_third_sort {
    display: flex;
    justify-content: flex-end;
    border: none;
    margin-bottom: 5%;
}

.mainpage3_third_sort select {
    border: 2px solid #A5C2B6;
    padding: 0.5% 1%;
    border-radius: 6px;
}

.mainpage3_third_sort select:focus {
    border: 2px solid #A5C2B6;
}

.mainpage3_third_sort option {
    padding: 0.5% 1%;
}


.mainpage3_third_contents {
    background-color: aquamarine;
    width: 100%;
    height: 100%;
    display: inline-flex;

    flex-wrap: wrap;
}

.mainpage3_third_content {
    background-color: yellowgreen;
    width: 30%;
    height: 45vh;
    margin: 0 1.6%;
    margin-bottom: 5%;

}

.mainpage3_third_content_img {
    width: 100%;
    height: 65%;
    background-color: thistle;
    position: relative;
}

.mainpage3_third_content_img img {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
    z-index: 3;
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
    padding-top: 3%;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    white-space: wrap;
    line-height: 1;
    overflow: hidden;
}

.border {
    width: 20%;
    border-bottom: 2px solid rgba(0, 0, 0, 0.5);
}

.mainpage3_third_content_detail p {
    padding-top: 2%;
    font-size: small;
    width: 100%;
    height: 2.8em;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    white-space: wrap;
    line-height: 1.2;
    overflow: hidden;
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
    border: none;
    border-radius: 8px;
    box-shadow: 0 0 5px #ccc;
    background-color: white;
}

#opacity_glass {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0.1;
    background-color: black;
}

/* svg스타일 코드 */

svg {
    background-color: white;
    border-radius: 5%;
    overflow: visible;
    position: absolute;
    z-index: 1;
    top: 70%;
    left: -162%;
}

.OUTLINE {
    stroke-linejoin: round;
    stroke: #ffffff;
    stroke-width: 2;
    fill: grey;
}

.fill_location {
    fill: #388265;
    stroke-linejoin: round;
    stroke: #ffffff;
    stroke-width: 2;
    font-size: 16px;
    text-anchor: middle;
    alignment-baseline: middle;
    user-select: none;
}

.LINE {
    stroke-linejoin: round;
    stroke: #ffffff;
    stroke-width: 1;
    fill: none;
}

.POINT {
    stroke: #ffffff;
    stroke-width: 1;
    fill: #ffffff;
}

.TEXT {
    fill: #ffffff;
    font-size: 16px;
    text-anchor: middle;
    alignment-baseline: middle;
    user-select: none;
    pointer-events: none;
}
</style>