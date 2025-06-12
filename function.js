"use strict";

function gameStart() {
    if (isAnimation) {
        frame = 0;
    } else {
        frame = 60;
    }
    state = 1;
    c0 = false;
    c1 = false;
    c2 = false;
    c3 = false;
    c4 = false;
    // 強化タイム
    if (enhance == 0) {
        state = 3;
        eh01 = Math.floor(Math.random() * EH_NUMBER);
        eh02 = Math.floor(Math.random() * EH_NUMBER);
        eh03 = Math.floor(Math.random() * EH_NUMBER);
        enhance = 10;
        
        shuffleArray(CARD);
        playerCard[0] = CARD[0];
        playerCard[1] = CARD[1];
        playerCard[2] = CARD[2];
        playerCard[3] = CARD[3];
        playerCard[4] = CARD[4];
        sortArray(playerCard);
        judgeRole(playerCard);
    } else {
        ct = Math.floor(Math.random() * 100);
        if (ct == 0) {
            state = 7;
            chanceTime();
        } else {
            shuffleArray(CARD);
            playerCard[0] = CARD[0];
            playerCard[1] = CARD[1];
            playerCard[2] = CARD[2];
            playerCard[3] = CARD[3];
            playerCard[4] = CARD[4];
            sortArray(playerCard);
        }
        judgeRole(playerCard);
    
        // 強化：占い師用
        if (ehFortune >= 1) {
            if (ehFortune * 5 > Math.random() * 100) {
                isFortune = true;
            } else {
                isFortune = false;
            }
        }
    }
}

// 挿入ソート
function sortArray(array) {
    let j, temp;
    for (let i = 0; i < array.length - 1; i++) {
        j = i + 1;
        while ((j > 0) && (array[j - 1] > array[j])) {
            temp = array[j];
            array[j] = array[j - 1];
            array[j - 1] = temp;
            j--;
        }
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function judgeRole(array) {
    const numberList = [Math.floor(array[0] / 4) + 1, Math.floor(array[1] / 4) + 1,
    Math.floor(array[2] / 4) + 1, Math.floor(array[3] / 4) + 1, Math.floor(array[4] / 4) + 1];
    const markList = [array[0] % 4, array[1] % 4, array[2] % 4, array[3] % 4, array[4] % 4];
    // 自分と同じ数字のカードが何枚あるか
    const samecards = [0, 0, 0, 0, 0];

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (numberList[i] == numberList[j]) {
                samecards[i]++;
            }
        }
    }
    const judge = samecards[0] + samecards[1] + samecards[2] + samecards[3] + samecards[4];

    if (numberList[0] == 1 && numberList[1] == 10 && numberList[2] == 11 && numberList[3] == 12 && numberList[4] == 13
        && markList[0] == markList[1] && markList[1] == markList[2] && markList[2] == markList[3] && markList[3] == markList[4]) {
        role = 0;
    }
    else if (numberList[1] - numberList[0] == 1 && numberList[2] - numberList[1] == 1 && numberList[3] - numberList[2] == 1
        && numberList[4] - numberList[3] == 1 && markList[0] == markList[1] && markList[1] == markList[2] && markList[2] == markList[3]
        && markList[3] == markList[4]) {
        role = 1;
    }
    else if (judge == 17) {
        role = 2;
    }
    else if (judge == 13) {
        role = 3;
    }
    else if (markList[0] == markList[1] && markList[1] == markList[2] && markList[2] == markList[3]
        && markList[3] == markList[4]) {
        role = 4;
    }
    else if (numberList[1] - numberList[0] == 1 && numberList[2] - numberList[1] == 1 && numberList[3] - numberList[2] == 1
        && numberList[4] - numberList[3] == 1) {
        role = 5;
    }
    else if (numberList[0] == 1 && numberList[1] == 10 && numberList[2] == 11 && numberList[3] == 12 && numberList[4] == 13) {
        role = 5;
    }
    else if (judge == 11) {
        role = 6;
    }
    else if (judge == 9) {
        role = 7;
    }
    else if (judge == 7) {
        role = 8;
    }
    else {
        role = 9;
    }
}

function changeCard() {
    if (isAnimation == true) frame = 0;
    state = 2;
    let temp = 0;
    if (c0) {
        playerCard[0] = CARD[5];
        temp++;
    }
    if (c1) {
        playerCard[1] = CARD[5 + temp];
        temp++;
    }
    if (c2) {
        playerCard[2] = CARD[5 + temp];
        temp++;
    }
    if (c3) {
        playerCard[3] = CARD[5 + temp];
        temp++;
    }
    if (c4) {
        playerCard[4] = CARD[5 + temp];
        temp++;
    }

    if (isAnimation == true) {
        setTimeout(function () {
            if (isSort == true) sortArray(playerCard);
            judgeRole(playerCard);
            getCoin();
        }, 500)
    } else {
        if (isSort == true) sortArray(playerCard);
        judgeRole(playerCard);
        getCoin();
    }

}
function getCoin() {
    switch (role) {
        case 0: winCoin = 1000000000;
            if (rsf <= 999999999) rsf++;
            localStorage.setItem("rsf", rsf); break;
        case 1: winCoin = 500000;
            if (sf <= 999999999) sf++;
            localStorage.setItem("sf", sf); break;
        case 2: winCoin = 200000;
            if (fourC <= 999999999) fourC++;
            localStorage.setItem("fourC", fourC); break;
        case 3: winCoin = Math.floor(5000 + 5000 * ehFullhouse * 0.1);
            if (fullhouse <= 999999999) fullhouse++;
            localStorage.setItem("fullhouse", fullhouse); break;
        case 4: winCoin = Math.floor(3000 + 3000 * ehFlush * 0.1);
            if (flush <= 999999999) flush++;
            localStorage.setItem("flush", flush); break;
        case 5: winCoin = Math.floor(1000 + 1000 * ehStraight * 0.1);
            if (straight <= 999999999) straight++;
            localStorage.setItem("straight", straight); break;
        case 6: winCoin = Math.floor(100 + 100 * ehThreeC * 0.1);
            if (threeC <= 999999999) threeC++;
            localStorage.setItem("threeC", threeC); break;
        case 7: winCoin = Math.floor(30 + 30 * ehTwoP * 0.1);
            if (twoP <= 999999999) twoP++;
            localStorage.setItem("twoP", twoP); break;
        case 8: winCoin = Math.floor(10 + 10 * ehOneP * 0.1);
            if (oneP <= 999999999) oneP++;
            localStorage.setItem("oneP", oneP); break;
        case 9: winCoin = 0 + ehNoP * 3; break;
    }

    // 強化の効果
    // ラッキーセブン
    for (let i = 0; i < 5; i++) {
        if (playerCard[i] == 24 || playerCard[i] == 25 || playerCard[i] == 26 || playerCard[i] == 27) {
            winCoin = winCoin + Math.floor(winCoin * ehSeven * 0.77);
        }
    }

    while (winCoin >= 1000000000) {
        wincoin2 += 1;
        winCoin -= 1000000000;
    }

    coin += winCoin;
    coin2 += wincoin2;
    enhance--;

    while (coin >= 1000000000) {
        coin2 += 1;
        coin = coin - 1000000000;
    }
    if (coin2 >= 1000000000) {
        coin = 999999999;
        coin2 = 999999999;
    }

    localStorage.setItem("coin", coin);
    localStorage.setItem("coin2", coin2);

    if (plays <= 999999999) plays++;
    localStorage.setItem("plays", plays);
}

function addEnhance(eh) {
    switch (eh) {
        case 0: ehOneP += 1; localStorage.setItem("ehOneP", ehOneP); break;
        case 1: ehTwoP += 1; localStorage.setItem("ehTwoP", ehTwoP); break;
        case 2: ehThreeC += 1; localStorage.setItem("ehThreeC", ehThreeC); break;
        case 3: ehStraight += 1; localStorage.setItem("ehStraight", ehStraight); break;
        case 4: ehFlush += 1; localStorage.setItem("ehFlush", ehFlush); break;
        case 5: ehFullhouse += 1; localStorage.setItem("ehFullhouse", ehFullhouse); break;
        case 6: ehNoP += 1; localStorage.setItem("ehNoP", ehNoP); break;
        case 7: ehSeven += 1; localStorage.setItem("ehSeven", ehSeven); break;
        case 8: ehFortune += 1; localStorage.setItem("ehFortune", ehFortune); break;
    }
}

function chanceTime() {
    ctSeed = Math.floor(Math.random() * 200);
    if (ctSeed >= 198) {
        ctRole = 0;
    } else if (ctSeed >= 160) {
        ctRole = 1;
    } else if (ctSeed >= 100) {
        ctRole = 2;
    } else {
        ctRole = 3;
    }

    // RSF
    if (ctRole == 0) {
        playerCard[0] = 36;
        playerCard[1] = 40;
        playerCard[2] = 44;
        playerCard[3] = 48;
        if (ctSeed - 198 >= 1) {
            ctCard01 = 1;
            ctCard02 = 13;
        } else {
            ctCard01 = 13;
            ctCard02 = 1;
        }
    }

    // SF
    else if (ctRole == 1) {
        playerCard[0] = 2;
        playerCard[1] = 6;
        playerCard[2] = 10;
        playerCard[3] = 14;
        if (ctSeed - 160 >= 19) {
            ctCard01 = 18;
            ctCard02 = 28;
        } else {
            ctCard01 = 28;
            ctCard02 = 18;
        }
    }

    // FC
    else if (ctRole == 2) {
        playerCard[0] = 23;
        playerCard[1] = 0;
        playerCard[2] = 1;
        playerCard[3] = 2;
        if (ctSeed - 100 >= 30) {
            ctCard01 = 3;
            ctCard02 = 26;
        } else {
            ctCard01 = 26;
            ctCard02 = 3;
        }
    }

    // FH
    else {
        playerCard[0] = 5;
        playerCard[1] = 6;
        playerCard[2] = 34;
        playerCard[3] = 35;
        if (ctSeed >= 50) {
            ctCard01 = 33;
            ctCard02 = 50;
        } else {
            ctCard01 = 50;
            ctCard02 = 33;
        }
    }
}

function ctResult() {
    if (isAnimation) {
        frame = 0;
    } else {
        frame = 60;
    }
    judgeRole(playerCard);
    getCoin();
}
