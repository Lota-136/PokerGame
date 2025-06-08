"use strict";

const CARD = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 
            22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
            42, 43, 44, 45, 46, 47, 48, 49, 50, 51];
let playerCard = [];

let role;

let c0 = false;
let c1 = false;
let c2 = false;
let c3 = false;
let c4 = false;

// localstorageに保存
// 設定系
let c0key = localStorage.getItem("c0key");
let c1key = localStorage.getItem("c1key");
let c2key = localStorage.getItem("c2key");
let c3key = localStorage.getItem("c3key");
let c4key = localStorage.getItem("c4key");
let isAnimation = localStorage.getItem("isAnimation");
let isSort = localStorage.getItem("isSort");

// 背景
let back = localStorage.getItem("back") - 0;

// コイン数
let coin = localStorage.getItem("coin") - 0;
let coin2 = localStorage.getItem("coin2") - 0;

// 統計
let rsf = localStorage.getItem("rsf") - 0;
let sf = localStorage.getItem("sf") - 0;
let fourC = localStorage.getItem("fourC") - 0;
let fullhouse = localStorage.getItem("fullhouse") - 0;
let flush = localStorage.getItem("flush") - 0;
let straight = localStorage.getItem("straight") - 0;
let threeC = localStorage.getItem("threeC") - 0;
let twoP = localStorage.getItem("twoP") - 0;
let oneP = localStorage.getItem("oneP") - 0;
let plays = localStorage.getItem("plays") - 0;

// 強化系
let enhance = localStorage.getItem("enhance") - 0;  // 強化までのプレイ回数
let ehOneP = localStorage.getItem("ehOneP") - 0;
let ehTwoP = localStorage.getItem("ehTwoP") - 0;
let ehThreeC = localStorage.getItem("ehThreeC") - 0;
let ehStraight = localStorage.getItem("ehStraight") - 0;
let ehFlush = localStorage.getItem("ehFlush") - 0;
let ehFullhouse = localStorage.getItem("ehFullhouse") - 0;
let ehNoP = localStorage.getItem("ehNoP") - 0;
let ehSeven = localStorage.getItem("ehSeven") - 0;
let ehFortune = localStorage.getItem("ehFortune") - 0;

// チャンスタイム
let ct;
let ctCard01;
let ctCard02;
let ctRole;
let ctSeed;
let ctCardPl;

// 役が出た割合
let rsf_per;
let sf_per;
let fourC_per;
let fullhouse_per;
let flush_per;
let straight_per;
let threeC_per;
let twoP_per;
let oneP_per;

let winCoin = 0;
let wincoin2 = 0;
let settingPage = 0;
let frame = 0;  // 各stateの開始からの経過フレーム
let state = 0;  // ゲームの状態遷移

const EH_NUMBER = 9;   // 現在の強化の総数

let eh01;
let eh02;
let eh03;
const ENHANCE = ["ワンペア強化",
                "ツーペア強化",
                "スリーカード強化",
                "ストレート強化",
                "フラッシュ強化",
                "フルハウス強化",
                "ノーペア保険",
                "ラッキーセブン",
                "占い師"
];
const ENHANCE_TEXT = ["ワンペアが成立した時、もらえるコインが10%UPする。",
                    "ツーペアが成立した時、もらえるコインが10%UPする。",
    "スリーカードが成立した時、もらえるコインが10%UPする。",
    "ストレートが成立した時、もらえるコインが10%UPする。",
    "フラッシュが成立した時、もらえるコインが10%UPする。",
    "フルハウスが成立した時、もらえるコインが10%UPする。",
    "ノーペアのときコインが３枚もらえる。（２強化目以降はもらえるコインが３枚ずつ増える）",
    "交換後のカードに７があったとき、もらえるコインが77%UPする。",
    "交換後に来るカードが5%の確率で１枚わかる。（２強化目以降はわかる確率が5%ずつ増える）"
];
let isFortune;  // 占い師が発動したかどうか

let imgCards = new Image();
let imgTitle = new Image();
let imgIcon = new Image();
let imgEnhance = new Image();
let imgBack = new Image();

let sndPush = new Audio();
let sndCancel = new Audio();
let sndSelect = new Audio();
let sndTurnOver = new Audio();

// デバッグ用変数
let debug = false;

const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 360;

let canvas;
let context;
let scaleRate;

let mouse = {};
document.onmousemove = function (e) {
    mouse.x = e.clientX / scaleRate;
    mouse.y = e.clientY / scaleRate;
    mouse.move = true;
}

let key;

window.onload = setup;

function setup() {
    if (c0key == null) c0key = "a";
    if (c1key == null) c1key = "s";
    if (c2key == null) c2key = "d";
    if (c3key == null) c3key = "f";
    if (c4key == null) c4key = "g";
    if (isAnimation == null) isAnimation = true;
    if (isSort == null) isSort = true;
    if (back == null) back = 0;

    enhance = 10;
    
    canvas = document.createElement(`canvas`);
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;

    scaleRate = Math.min((window.innerWidth - 15) / SCREEN_WIDTH, (window.innerHeight - 15) / SCREEN_HEIGHT);
    canvas.style.backgroundColor = `green`;
    canvas.style.width = SCREEN_WIDTH * scaleRate + `px`;
    canvas.style.height = SCREEN_HEIGHT * scaleRate + `px`;

    context = canvas.getContext(`2d`);
    document.body.appendChild(canvas);

    imgCards.src = "png/cards.png";
    imgTitle.src = "png/title.png";
    imgIcon.src = "png/icon.png";
    imgEnhance.src = "png/enhance.png";
    imgBack.src = "png/back.png";

    sndPush.src = "sound/push.wav";
    sndCancel.src = "sound/cancel.wav";
    sndSelect.src = "sound/select.wav";
    sndTurnOver.src = "sound/turnOver.wav";

    // マウス操作
    canvas.addEventListener('click', function () {
        // スタートボタン
        if (state == 0) {
            if (mouse.x >= 330 && mouse.x <= 480 && mouse.y >= 240 && mouse.y <= 300) {
                sndPush.play();
                setTimeout(gameStart, 1);
            }
            // 設定ボタン
            if (mouse.x >= 690 && mouse.x <= 740 && mouse.y >= 5 && mouse.y <= 55) {
                sndSelect.play();
                state = 4;
            }
            // 統計
            if (mouse.x >= 635 && mouse.x <= 685 && mouse.y >= 5 && mouse.y <= 55) {
                sndSelect.play();
                if (plays == 0) {
                    rsf_per = 0;
                    sf_per = 0;
                    fourC_per = 0;
                    fullhouse_per = 0;
                    flush_per = 0;
                    straight_per = 0;
                    threeC_per = 0;
                    twoP_per = 0;
                    oneP_per = 0;
                } else {
                    rsf_per = Math.round(rsf / plays * 10000) / 100;
                    sf_per = Math.round(sf / plays * 10000) / 100;
                    fourC_per = Math.round(fourC / plays * 10000) / 100;
                    fullhouse_per = Math.round(fullhouse / plays * 10000) / 100;
                    flush_per = Math.round(flush / plays * 10000) / 100;
                    straight_per = Math.round(straight / plays * 10000) / 100;
                    threeC_per = Math.round(threeC / plays * 10000) / 100;
                    twoP_per = Math.round(twoP / plays * 10000) / 100;
                    oneP_per = Math.round(oneP / plays * 10000) / 100;
                }
                state = 5;
            }
            // 見た目変更ボタン
            if (mouse.x >= 580 && mouse.x <= 630 && mouse.y >= 5 && mouse.y <= 55) {
                sndSelect.play();
                state = 6;
            }
        }

        // 戻るボタン
        if (state != 0) {
            if (mouse.x >= 745 && mouse.x <= 795 && mouse.y >= 5 && mouse.y <= 55) {
                sndCancel.play();
                state = 0;
                c0 = false;
                c1 = false;
                c2 = false;
                c3 = false;
                c4 = false;
            }
        }
        // カード
        if (state == 1) {
            if (mouse.x >= 200 && mouse.x <= 264 && mouse.y >= 160 && mouse.y <= 276) {
                if (c0 == false) {
                    sndSelect.play();
                    c0 = true;
                } else {
                    sndCancel.play();
                    c0 = false;
                }
            }
            if (mouse.x >= 284 && mouse.x <= 348 && mouse.y >= 160 && mouse.y <= 276) {
                if (c1 == false) {
                    sndSelect.play();
                    c1 = true;
                } else {
                    sndCancel.play();
                    c1 = false;
                }
            }
            if (mouse.x >= 368 && mouse.x <= 432 && mouse.y >= 160 && mouse.y <= 276) {
                if (c2 == false) {
                    sndSelect.play();
                    c2 = true;
                } else {
                    sndCancel.play();
                    c2 = false;
                }
            }
            if (mouse.x >= 452 && mouse.x <= 516 && mouse.y >= 160 && mouse.y <= 276) {
                if (c3 == false) {
                    sndSelect.play();
                    c3 = true;
                } else {
                    sndCancel.play();
                    c3 = false;
                }
            }
            if (mouse.x >= 536 && mouse.x <= 600 && mouse.y >= 160 && mouse.y <= 276) {
                if (c4 == false) {
                    sndSelect.play();
                    c4 = true;
                } else {
                    sndCancel.play();
                    c4 = false;
                }
            }
            // 交換ボタン
            if (mouse.x >= 325 && mouse.x <= 475 && mouse.y >= 305 && mouse.y <= 345) {
                sndPush.play();
                setTimeout(changeCard, 1);
            }
        }
        if (state == 2) {
            // リトライボタン
            if (mouse.x >= 325 && mouse.x <= 475 && mouse.y >= 305 && mouse.y <= 345) {
                if (frame >= 15) {
                    sndPush.play();
                    setTimeout(gameStart, 1);
                }
            }
        }
        if (state == 3) {
            if (mouse.x >= 70 && mouse.x <= 290 && mouse.y >= 25 && mouse.y <= 305) {
                addEnhance(eh01);
                state = 1;
            }
            if (mouse.x >= 291 && mouse.x <= 510 && mouse.y >= 25 && mouse.y <= 305) {
                addEnhance(eh02);
                state = 1;
            }
            if (mouse.x >= 512 && mouse.x <= 730 && mouse.y >= 25 && mouse.y <= 305) {
                addEnhance(eh03);
                state = 1;
            }

        }
        if (state == 4) {
            if (settingPage == 0) {
                // 設定内のカード
                if (mouse.x >= 200 && mouse.x <= 264 && mouse.y >= 50 && mouse.y <= 180) {
                    c0 = true;
                    c1 = false;
                    c2 = false;
                    c3 = false;
                    c4 = false;
                }
                if (mouse.x >= 284 && mouse.x <= 348 && mouse.y >= 50 && mouse.y <= 180) {
                    c0 = false;
                    c1 = true;
                    c2 = false;
                    c3 = false;
                    c4 = false;
                }
                if (mouse.x >= 368 && mouse.x <= 432 && mouse.y >= 50 && mouse.y <= 180) {
                    c0 = false;
                    c1 = false;
                    c2 = true;
                    c3 = false;
                    c4 = false;
                }
                if (mouse.x >= 452 && mouse.x <= 516 && mouse.y >= 50 && mouse.y <= 180) {
                    c0 = false;
                    c1 = false;
                    c2 = false;
                    c3 = true;
                    c4 = false;
                }
                if (mouse.x >= 536 && mouse.x <= 600 && mouse.y >= 50 && mouse.y <= 180) {
                    c0 = false;
                    c1 = false;
                    c2 = false;
                    c3 = false;
                    c4 = true;
                }
                // 初期配置に戻す
                if (mouse.x >= 310 && mouse.x <= 490 && mouse.y >= 240 && mouse.y <= 270) {
                    c0key = "a"; localStorage.setItem("c0key", c0key);
                    c1key = "s"; localStorage.setItem("c1key", c1key);
                    c2key = "d"; localStorage.setItem("c2key", c2key);
                    c3key = "f"; localStorage.setItem("c3key", c3key);
                    c4key = "g"; localStorage.setItem("c4key", c4key);
                    c0 = false;
                    c1 = false;
                    c2 = false;
                    c3 = false;
                    c4 = false;
                }

                // ページ移動
                if (mouse.x >= 700 && mouse.x <= 730 && mouse.y >= 155 && mouse.y <= 205) {
                    sndSelect.play();
                    setTimeout(() => { settingPage++; }, 1);    // 次のページまで一気に進んでしまうことを防ぐため1f待つ
                }
            }
            if (settingPage == 1) {
                // スイッチ
                if (mouse.x >= 600 && mouse.x <= 660 && mouse.y >= 60 && mouse.y <= 90) {
                    setTimeout(function () {
                        if (isAnimation == true) {
                            isAnimation = false;
                        } else {
                            isAnimation = true;
                        }
                        localStorage.setItem("isAnimation", isAnimation);
                    }, 1);
                }
                if (mouse.x >= 600 && mouse.x <= 660 && mouse.y >= 100 && mouse.y <= 130) {
                    setTimeout(function () {
                        if (isSort == true) {
                            isSort = false;
                        } else {
                            isSort = true;
                        }
                        localStorage.setItem("isSort", isSort);
                    }, 1);
                }
                // ページ移動
                if (mouse.x >= 700 && mouse.x <= 730 && mouse.y >= 155 && mouse.y <= 205) {
                    sndSelect.play();
                    setTimeout(() => { settingPage++; }, 1);
                }
                if (mouse.x >= 70 && mouse.x <= 100 && mouse.y >= 155 && mouse.y <= 205) {
                    sndSelect.play();
                    setTimeout(() => { settingPage--; }, 1);
                }
            }
            if (settingPage == 2) {
                // リセットボタン
                if (mouse.x >= 310 && mouse.x <= 490 && mouse.y >= 50 && mouse.y <= 80) {
                    let rs = confirm("ゲームのデータはすべて消去されます。\n本当によろしいですか？");
                    if (rs) {
                        localStorage.clear();
                        window.location.reload();
                    }
                }
                // ページ移動
                if (mouse.x >= 70 && mouse.x <= 100 && mouse.y >= 155 && mouse.y <= 205) {
                    sndSelect.play();
                    setTimeout(() => { settingPage--; }, 1);
                }
            }
        }
        // 背景変更
        if (state == 6) {
            if (mouse.x >= 150 && mouse.x <= 350 && mouse.y >= 60 && mouse.y <= 150) {
                sndSelect.play();
                back = 0; localStorage.setItem("back", back);
            }
            if (mouse.x >= 150 && mouse.x <= 350 && mouse.y >= 210 && mouse.y <= 300) {
                sndSelect.play();
                back = 1; localStorage.setItem("back", back);
            }
            if (mouse.x >= 450 && mouse.x <= 650 && mouse.y >= 60 && mouse.y <= 150) {
                sndSelect.play();
                back = 2; localStorage.setItem("back", back);
            }
            if (mouse.x >= 450 && mouse.x <= 650 && mouse.y >= 210 && mouse.y <= 300) {
                sndSelect.play();
                back = 3; localStorage.setItem("back", back);
            }
        }
        // チャンスタイム
        if (state == 7) {
            if (mouse.x >= 304 && mouse.x <= 368 && mouse.y >= 50 && mouse.y <= 146) {
                playerCard[4] = ctCard01;
                ctCardPl = 0;
                state = 8;
                ctResult();
            }
            if (mouse.x >= 432 && mouse.x <= 496 && mouse.y >= 50 && mouse.y <= 146) {
                playerCard[4] = ctCard02;
                ctCardPl = 1;
                state = 8;
                ctResult();
            }
        }
        // チャンスタイム結果
        if (state == 8) {
            // リトライボタン
            if (mouse.x >= 325 && mouse.x <= 475 && mouse.y >= 305 && mouse.y <= 345) {
                if (frame >= 15) {
                    sndPush.play();
                    setTimeout(gameStart, 1);
                }
            }
        }
    });

    // キーボード操作
    document.addEventListener('keyup', function (event) {
        key = event.key;
        if (state == 1) {
            if (key == c0key) {
                if (c0 == false) {
                    sndSelect.pause();
                    sndSelect.currentTime = 0;
                    sndSelect.play();
                    c0 = true;
                } else {
                    sndCancel.pause();
                    sndCancel.currentTime = 0;
                    sndCancel.play();
                    c0 = false;
                }
            }
            if (key == c1key) {
                if (c1 == false) {
                    sndSelect.pause();
                    sndSelect.currentTime = 0;
                    sndSelect.play();
                    c1 = true;
                } else {
                    sndCancel.pause();
                    sndCancel.currentTime = 0;
                    sndCancel.play();
                    c1 = false;
                }
            }
            if (key == c2key) {
                if (c2 == false) {
                    sndSelect.pause();
                    sndSelect.currentTime = 0;
                    sndSelect.play();
                    c2 = true;
                } else {
                    sndCancel.pause();
                    sndCancel.currentTime = 0;
                    sndCancel.play();
                    c2 = false;
                }
            }
            if (key == c3key) {
                if (c3 == false) {
                    sndSelect.pause();
                    sndSelect.currentTime = 0;
                    sndSelect.play();
                    c3 = true;
                } else {
                    sndCancel.pause();
                    sndCancel.currentTime = 0;
                    sndCancel.play();
                    c3 = false;
                }
            }
            if (key == c4key) {
                if (c4 == false) {
                    sndSelect.pause();
                    sndSelect.currentTime = 0;
                    sndSelect.play();
                    c4 = true;
                } else {
                    sndCancel.pause();
                    sndCancel.currentTime = 0;
                    sndCancel.play();
                    c4 = false;
                }
            }
            if (key == "Enter") {
                if (frame >= 15) {
                    sndPush.play();
                    setTimeout(changeCard, 1);
                }
            }
        }
        if (state == 2) {
            if (key == "Enter") {
                if (frame >= 15) {
                    sndPush.play();
                    setTimeout(gameStart, 1);
                }
            }
        }
        if (state == 4) {
            if (c0) {
                c0key = key;
                localStorage.setItem("c0key", c0key);
                c0 = false;
            }
            if (c1) {
                c1key = key;
                localStorage.setItem("c1key", c1key);
                c1 = false;
            }
            if (c2) {
                c2key = key;
                localStorage.setItem("c2key", c2key);
                c2 = false;
            }
            if (c3) {
                c3key = key;
                localStorage.setItem("c3key", c3key);
                c3 = false;
            }
            if (c4) {
                c4key = key;
                localStorage.setItem("c4key", c4key);
                c4 = false;
            }
        }
    });

    update();
}

function update() 
{
    if (frame < 60) frame++;
    draw();
    setTimeout(update, 1000 / 30);
}