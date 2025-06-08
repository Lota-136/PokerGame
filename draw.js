"use strict";

function draw() {
    context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    context.imageSmoothingEnabled = false;      // 画像のボケ防止処理

    // 背景画像
    context.drawImage(imgBack, Math.floor(back / 4) * 200, back % 4 * 90, 200, 90, 0, 0, 800, 360);

    context.fillStyle = "rgba(0, 0, 0, 0.3)";
    if (state == 0 || state == 4 || state == 5 || state == 6) {
        context.fillRect(0, 0, 800, 360);
    }

    // グレー背景
    context.fillStyle = "rgba(0, 0, 0, 0.7)";
    if (state == 1) {
        context.fillRect(195, 280, 74, 23); // 交換
        context.fillRect(279, 280, 74, 23);
        context.fillRect(363, 280, 74, 23);
        context.fillRect(447, 280, 74, 23);
        context.fillRect(531, 280, 74, 23);
    }
    if (state == 1 || state == 2) {
        context.fillRect(280, 125, 240, 30); // 役
        context.fillRect(5, 50, 180, 300); // 強化
    }
    if (state == 8 && frame > 59) {
        context.fillRect(280, 125, 240, 30); // 役
    }
    if (state == 0 || state == 1 || state == 2 || state == 7 || state == 8) {
        context.fillRect(5, 5, 240, 40); // コイン
    }
    if (state == 3) {
        context.fillRect(60, 15, 680, 280);
        context.fillRect(60, 300, 680, 50);
    }
    if (state == 4 || state == 5 || state == 6) {
        context.fillRect(60, 15, 680, 330);
    }

    context.fillStyle = "white";
    context.font = "bold 15px sans-serif";
    context.textAlign = "right";

    if (state == 2) {
        if (frame > 15) {
            context.fillText("+" + winCoin, 240, 60);
        }
    }

    if (state == 0 || state == 1 || state == 2 || state == 7) {
        if (coin2 != 0) {
            context.fillText(coin.toString().padStart(9, "0"), 240, 30);
            context.fillText(coin2, 144, 30);
        } else {
            context.fillText(coin, 240, 30);
        }
    }

    if (state == 0 || state == 1 || state == 2 || state == 4 || state == 5 || state == 6 || state == 7 || state == 8) {
        // 戻るボタン
        if (mouse.x >= 745 && mouse.x <= 795 && mouse.y >= 5 && mouse.y <= 55) {
            context.drawImage(imgIcon, 75, 70, 25, 25, 745, 7, 50, 50);
        } else {
            context.drawImage(imgIcon, 0, 70, 25, 25, 745, 5, 50, 50);
        }
    }

    if (state == 0 || state == 1 || state == 2 || state == 7 || state == 8) {
        // コイン
        context.drawImage(imgIcon, 30, 95, 15, 15, 10, 10, 30, 30);
    }

    if (state == 0) {
        context.drawImage(imgTitle, 0, 0, 200, 80, 240, 40, 400, 160);
        // 設定
        if (mouse.x >= 690 && mouse.x <= 740 && mouse.y >= 5 && mouse.y <= 55) {
            context.drawImage(imgIcon, 100, 70, 25, 25, 690, 7, 50, 50);
        } else {
            context.drawImage(imgIcon, 25, 70, 25, 25, 690, 5, 50, 50);
        }
        // 記録
        if (mouse.x >= 635 && mouse.x <= 685 && mouse.y >= 5 && mouse.y <= 55) {
            context.drawImage(imgIcon, 125, 70, 25, 25, 635, 7, 50, 50);
        } else {
            context.drawImage(imgIcon, 50, 70, 25, 25, 635, 5, 50, 50);
        }
        // 見た目変更
        if (mouse.x >= 580 && mouse.x <= 630 && mouse.y >= 5 && mouse.y <= 55) {
            context.drawImage(imgIcon, 125, 95, 25, 25, 580, 7, 50, 50);
        } else {
            context.drawImage(imgIcon, 50, 95, 25, 25, 580, 5, 50, 50);
        }
        // スタートボタン
        if (mouse.x >= 330 && mouse.x <= 480 && mouse.y >= 240 && mouse.y <= 300) {
            context.drawImage(imgIcon, 75, 0, 75, 30, 330, 242, 150, 60);
        } else {
            context.drawImage(imgIcon, 0, 0, 75, 30, 330, 240, 150, 60);
        }
    }

    context.font = "bold 12px sans-serif";
    context.textAlign = "center";
    if (state == 1) {
        if (isAnimation) {
            // アニメーション
            if (frame <= 5) {
                context.drawImage(imgCards, 416, 0, 32, 48, 200, 180, 64, 96);
                context.drawImage(imgCards, 416, 0, 32, 48, 284, 180, 64, 96);
                context.drawImage(imgCards, 416, 0, 32, 48, 368, 180, 64, 96);
                context.drawImage(imgCards, 416, 0, 32, 48, 452, 180, 64, 96);
                context.drawImage(imgCards, 416, 0, 32, 48, 536, 180, 64, 96);
            }
            if (frame > 5 && frame <= 7) {
                context.drawImage(imgCards, 416, 48, 32, 48, 200, 180, 64, 96);
                context.drawImage(imgCards, 416, 48, 32, 48, 284, 180, 64, 96);
                context.drawImage(imgCards, 416, 48, 32, 48, 368, 180, 64, 96);
                context.drawImage(imgCards, 416, 48, 32, 48, 452, 180, 64, 96);
                context.drawImage(imgCards, 416, 48, 32, 48, 536, 180, 64, 96);
            }
            if (frame > 7 && frame <= 9) {
                context.drawImage(imgCards, 416, 96, 32, 48, 200, 180, 64, 96);
                context.drawImage(imgCards, 416, 96, 32, 48, 284, 180, 64, 96);
                context.drawImage(imgCards, 416, 96, 32, 48, 368, 180, 64, 96);
                context.drawImage(imgCards, 416, 96, 32, 48, 452, 180, 64, 96);
                context.drawImage(imgCards, 416, 96, 32, 48, 536, 180, 64, 96);
            }
            if (frame > 9) {
                if (c0) {
                    context.drawImage(imgCards, Math.floor(playerCard[0] / 4) * 32, playerCard[0] % 4 * 48, 32, 48,
                        200, 180 - 20, 64, 96);
                    context.fillText("交換する", 232, 296);
                } else {
                    context.drawImage(imgCards, Math.floor(playerCard[0] / 4) * 32, playerCard[0] % 4 * 48, 32, 48,
                        200, 180, 64, 96);
                    context.fillText("交換しない", 232, 296);
                }
                if (c1) {
                    context.drawImage(imgCards, Math.floor(playerCard[1] / 4) * 32, playerCard[1] % 4 * 48, 32, 48,
                        284, 180 - 20, 64, 96);
                    context.fillText("交換する", 316, 296);
                } else {
                    context.drawImage(imgCards, Math.floor(playerCard[1] / 4) * 32, playerCard[1] % 4 * 48, 32, 48,
                        284, 180, 64, 96);
                    context.fillText("交換しない", 316, 296);
                }
                if (c2) {
                    context.drawImage(imgCards, Math.floor(playerCard[2] / 4) * 32, playerCard[2] % 4 * 48, 32, 48,
                        368, 180 - 20, 64, 96);
                    context.fillText("交換する", 400, 296);
                } else {
                    context.drawImage(imgCards, Math.floor(playerCard[2] / 4) * 32, playerCard[2] % 4 * 48, 32, 48,
                        368, 180, 64, 96);
                    context.fillText("交換しない", 400, 296);
                }
                if (c3) {
                    context.drawImage(imgCards, Math.floor(playerCard[3] / 4) * 32, playerCard[3] % 4 * 48, 32, 48,
                        452, 180 - 20, 64, 96);
                    context.fillText("交換する", 484, 296);
                } else {
                    context.drawImage(imgCards, Math.floor(playerCard[3] / 4) * 32, playerCard[3] % 4 * 48, 32, 48,
                        452, 180, 64, 96);
                    context.fillText("交換しない", 484, 296);
                }
                if (c4) {
                    context.drawImage(imgCards, Math.floor(playerCard[4] / 4) * 32, playerCard[4] % 4 * 48, 32, 48,
                        536, 180 - 20, 64, 96);
                    context.fillText("交換する", 568, 296);
                } else {
                    context.drawImage(imgCards, Math.floor(playerCard[4] / 4) * 32, playerCard[4] % 4 * 48, 32, 48,
                        536, 180, 64, 96);
                    context.fillText("交換しない", 568, 296);
                }
            }
            // 強化：占い師用
            if (isFortune) {
                context.fillText("次に来るカード：", 500, 100);
                context.drawImage(imgCards, Math.floor(CARD[5] / 4) * 32, CARD[5] % 4 * 48, 32, 48,
                    550, 70, 32, 48);
            }
        } else {
            // アニメーションなし
            if (c0) {
                context.drawImage(imgCards, Math.floor(playerCard[0] / 4) * 32, playerCard[0] % 4 * 48, 32, 48,
                    200, 180 - 20, 64, 96);
                context.fillText("交換する", 232, 296);
            } else {
                context.drawImage(imgCards, Math.floor(playerCard[0] / 4) * 32, playerCard[0] % 4 * 48, 32, 48,
                    200, 180, 64, 96);
                context.fillText("交換しない", 232, 296);
            }
            if (c1) {
                context.drawImage(imgCards, Math.floor(playerCard[1] / 4) * 32, playerCard[1] % 4 * 48, 32, 48,
                    284, 180 - 20, 64, 96);
                context.fillText("交換する", 316, 296);
            } else {
                context.drawImage(imgCards, Math.floor(playerCard[1] / 4) * 32, playerCard[1] % 4 * 48, 32, 48,
                    284, 180, 64, 96);
                context.fillText("交換しない", 316, 296);
            }
            if (c2) {
                context.drawImage(imgCards, Math.floor(playerCard[2] / 4) * 32, playerCard[2] % 4 * 48, 32, 48,
                    368, 180 - 20, 64, 96);
                context.fillText("交換する", 400, 296);
            } else {
                context.drawImage(imgCards, Math.floor(playerCard[2] / 4) * 32, playerCard[2] % 4 * 48, 32, 48,
                    368, 180, 64, 96);
                context.fillText("交換しない", 400, 296);
            }
            if (c3) {
                context.drawImage(imgCards, Math.floor(playerCard[3] / 4) * 32, playerCard[3] % 4 * 48, 32, 48,
                    452, 180 - 20, 64, 96);
                context.fillText("交換する", 484, 296);
            } else {
                context.drawImage(imgCards, Math.floor(playerCard[3] / 4) * 32, playerCard[3] % 4 * 48, 32, 48,
                    452, 180, 64, 96);
                context.fillText("交換しない", 484, 296);
            }
            if (c4) {
                context.drawImage(imgCards, Math.floor(playerCard[4] / 4) * 32, playerCard[4] % 4 * 48, 32, 48,
                    536, 180 - 20, 64, 96);
                context.fillText("交換する", 568, 296);
            } else {
                context.drawImage(imgCards, Math.floor(playerCard[4] / 4) * 32, playerCard[4] % 4 * 48, 32, 48,
                    536, 180, 64, 96);
                context.fillText("交換しない", 568, 296);
            }
            if (isFortune) {
                context.fillText("次に来るカード：", 500, 100);
                context.drawImage(imgCards, Math.floor(CARD[5] / 4) * 32, CARD[5] % 4 * 48, 32, 48,
                    550, 70, 32, 48);
            }
        }

        // 交換ボタン
        if (mouse.x >= 325 && mouse.x <= 475 && mouse.y >= 305 && mouse.y <= 345) {
            context.drawImage(imgIcon, 75, 30, 75, 20, 325, 307, 150, 40);
        } else {
            context.drawImage(imgIcon, 0, 30, 75, 20, 325, 305, 150, 40);
        }
    }

    if (state == 2) {
        // アニメーション
        if (isAnimation) {
            if (frame <= 5) {
                if (c0) {
                    context.drawImage(imgCards, 416, 0, 32, 48, 200, 180, 64, 96);
                } else {
                    context.drawImage(imgCards, Math.floor(playerCard[0] / 4) * 32, playerCard[0] % 4 * 48, 32, 48,
                        200, 180, 64, 96);
                }
                if (c1) {
                    context.drawImage(imgCards, 416, 0, 32, 48, 284, 180, 64, 96);
                } else {
                    context.drawImage(imgCards, Math.floor(playerCard[1] / 4) * 32, playerCard[1] % 4 * 48, 32, 48,
                        284, 180, 64, 96);
                }
                if (c2) {
                    context.drawImage(imgCards, 416, 0, 32, 48, 368, 180, 64, 96);
                } else {
                    context.drawImage(imgCards, Math.floor(playerCard[2] / 4) * 32, playerCard[2] % 4 * 48, 32, 48,
                        368, 180, 64, 96);
                }
                if (c3) {
                    context.drawImage(imgCards, 416, 0, 32, 48, 452, 180, 64, 96);
                } else {
                    context.drawImage(imgCards, Math.floor(playerCard[3] / 4) * 32, playerCard[3] % 4 * 48, 32, 48,
                        452, 180, 64, 96);
                }
                if (c4) {
                    context.drawImage(imgCards, 416, 0, 32, 48, 536, 180, 64, 96);
                } else {
                    context.drawImage(imgCards, Math.floor(playerCard[4] / 4) * 32, playerCard[4] % 4 * 48, 32, 48,
                        536, 180, 64, 96);
                }
            }
            if (frame > 5 && frame <= 7) {
                if (c0) {
                    context.drawImage(imgCards, 416, 48, 32, 48, 200, 180, 64, 96);
                } else {
                    context.drawImage(imgCards, Math.floor(playerCard[0] / 4) * 32, playerCard[0] % 4 * 48, 32, 48,
                        200, 180, 64, 96);
                }
                if (c1) {
                    context.drawImage(imgCards, 416, 48, 32, 48, 284, 180, 64, 96);
                } else {
                    context.drawImage(imgCards, Math.floor(playerCard[1] / 4) * 32, playerCard[1] % 4 * 48, 32, 48,
                        284, 180, 64, 96);
                }
                if (c2) {
                    context.drawImage(imgCards, 416, 48, 32, 48, 368, 180, 64, 96);
                } else {
                    context.drawImage(imgCards, Math.floor(playerCard[2] / 4) * 32, playerCard[2] % 4 * 48, 32, 48,
                        368, 180, 64, 96);
                }
                if (c3) {
                    context.drawImage(imgCards, 416, 48, 32, 48, 452, 180, 64, 96);
                } else {
                    context.drawImage(imgCards, Math.floor(playerCard[3] / 4) * 32, playerCard[3] % 4 * 48, 32, 48,
                        452, 180, 64, 96);
                }
                if (c4) {
                    context.drawImage(imgCards, 416, 48, 32, 48, 536, 180, 64, 96);
                } else {
                    context.drawImage(imgCards, Math.floor(playerCard[4] / 4) * 32, playerCard[4] % 4 * 48, 32, 48,
                        536, 180, 64, 96);
                }
            }
            if (frame > 7 && frame <= 9) {
                if (c0) {
                    context.drawImage(imgCards, 416, 96, 32, 48, 200, 180, 64, 96);
                } else {
                    context.drawImage(imgCards, Math.floor(playerCard[0] / 4) * 32, playerCard[0] % 4 * 48, 32, 48,
                        200, 180, 64, 96);
                }
                if (c1) {
                    context.drawImage(imgCards, 416, 96, 32, 48, 284, 180, 64, 96);
                } else {
                    context.drawImage(imgCards, Math.floor(playerCard[1] / 4) * 32, playerCard[1] % 4 * 48, 32, 48,
                        284, 180, 64, 96);
                }
                if (c2) {
                    context.drawImage(imgCards, 416, 96, 32, 48, 368, 180, 64, 96);
                } else {
                    context.drawImage(imgCards, Math.floor(playerCard[2] / 4) * 32, playerCard[2] % 4 * 48, 32, 48,
                        368, 180, 64, 96);
                }
                if (c3) {
                    context.drawImage(imgCards, 416, 96, 32, 48, 452, 180, 64, 96);
                } else {
                    context.drawImage(imgCards, Math.floor(playerCard[3] / 4) * 32, playerCard[3] % 4 * 48, 32, 48,
                        452, 180, 64, 96);
                }
                if (c4) {
                    context.drawImage(imgCards, 416, 96, 32, 48, 536, 180, 64, 96);
                } else {
                    context.drawImage(imgCards, Math.floor(playerCard[4] / 4) * 32, playerCard[4] % 4 * 48, 32, 48,
                        536, 180, 64, 96);
                }
            }

            if (frame > 9) {
                context.drawImage(imgCards, Math.floor(playerCard[0] / 4) * 32, playerCard[0] % 4 * 48, 32, 48,
                    200, 180, 64, 96);
                context.drawImage(imgCards, Math.floor(playerCard[1] / 4) * 32, playerCard[1] % 4 * 48, 32, 48,
                    284, 180, 64, 96);
                context.drawImage(imgCards, Math.floor(playerCard[2] / 4) * 32, playerCard[2] % 4 * 48, 32, 48,
                    368, 180, 64, 96);
                context.drawImage(imgCards, Math.floor(playerCard[3] / 4) * 32, playerCard[3] % 4 * 48, 32, 48,
                    452, 180, 64, 96);
                context.drawImage(imgCards, Math.floor(playerCard[4] / 4) * 32, playerCard[4] % 4 * 48, 32, 48,
                    536, 180, 64, 96);
            }
        } else {
            // アニメーションなし
            context.drawImage(imgCards, Math.floor(playerCard[0] / 4) * 32, playerCard[0] % 4 * 48, 32, 48,
                200, 180, 64, 96);
            context.drawImage(imgCards, Math.floor(playerCard[1] / 4) * 32, playerCard[1] % 4 * 48, 32, 48,
                284, 180, 64, 96);
            context.drawImage(imgCards, Math.floor(playerCard[2] / 4) * 32, playerCard[2] % 4 * 48, 32, 48,
                368, 180, 64, 96);
            context.drawImage(imgCards, Math.floor(playerCard[3] / 4) * 32, playerCard[3] % 4 * 48, 32, 48,
                452, 180, 64, 96);
            context.drawImage(imgCards, Math.floor(playerCard[4] / 4) * 32, playerCard[4] % 4 * 48, 32, 48,
                536, 180, 64, 96);
        }


        // リトライボタン
        if (mouse.x >= 325 && mouse.x <= 475 && mouse.y >= 305 && mouse.y <= 345) {
            context.drawImage(imgIcon, 75, 50, 75, 20, 325, 307, 150, 40);
        } else {
            context.drawImage(imgIcon, 0, 50, 75, 20, 325, 305, 150, 40);
        }
    }

    context.fillStyle = "white";
    context.font = "bold 15px sans-serif";
    context.textAlign = "center";
    if (state == 1 || state == 2 || (state == 8 && frame > 59)) {
        if (frame > 9) {
            switch (role) {
                case 0: context.fillText("ロイヤルストレートフラッシュ", 400, 145); break;
                case 1: context.fillText("ストレートフラッシュ", 400, 145); break;
                case 2: context.fillText("フォーカード", 400, 145); break;
                case 3: context.fillText("フルハウス", 400, 145); break;
                case 4: context.fillText("フラッシュ", 400, 145); break;
                case 5: context.fillText("ストレート", 400, 145); break;
                case 6: context.fillText("スリーカード", 400, 145); break;
                case 7: context.fillText("ツーペア", 400, 145); break;
                case 8: context.fillText("ワンペア", 400, 145); break;
                case 9: context.fillText("ノーペア", 400, 145); break;
            }
        }

        // 現在の強化表示
        context.fillText("x" + ehOneP, 60, 80);
        context.fillText("x" + ehTwoP, 160, 80);
        context.fillText("x" + ehThreeC, 60, 120);
        context.fillText("x" + ehStraight, 160, 120);
        context.fillText("x" + ehFlush, 60, 160);
        context.fillText("x" + ehFullhouse, 160, 160);
        context.fillText("x" + ehNoP, 60, 200);
        context.fillText("x" + ehSeven, 160, 200);
        context.fillText("x" + ehFortune, 60, 240);
        for (let i = 0; i < EH_NUMBER; i++) {
            context.drawImage(imgEnhance, i % 6 * 32, Math.floor(i / 6) * 32, 32, 32,
                i % 2 * 100 + 10, Math.floor(i / 2) * 40 + 50, 32, 32);
        }
    }

    context.textAlign = "left";
    if (state == 3) {
        context.lineWidth = 3;
        if (mouse.x >= 70 && mouse.x <= 290 && mouse.y >= 25 && mouse.y <= 285) {
            context.strokeStyle = "aqua";
            context.fillText(ENHANCE_TEXT[eh01], 70, 330);
        } else {
            context.strokeStyle = "white";
        }
        context.strokeRect(70, 25, 218, 260);
        if (mouse.x >= 291 && mouse.x <= 510 && mouse.y >= 25 && mouse.y <= 285) {
            context.strokeStyle = "aqua";
            context.fillText(ENHANCE_TEXT[eh02], 70, 330);
        } else {
            context.strokeStyle = "white";
        }
        context.strokeRect(291, 25, 218, 260);
        if (mouse.x >= 512 && mouse.x <= 730 && mouse.y >= 25 && mouse.y <= 285) {
            context.strokeStyle = "aqua";
            context.fillText(ENHANCE_TEXT[eh03], 70, 330);
        } else {
            context.strokeStyle = "white";
        }
        context.strokeRect(512, 25, 218, 260);

        context.textAlign = "center";

        context.drawImage(imgEnhance, eh01 % 6 * 32, Math.floor(eh01 / 6) * 32, 32, 32, 120, 60, 128, 128);
        context.drawImage(imgEnhance, eh02 % 6 * 32, Math.floor(eh02 / 6) * 32, 32, 32, 340, 60, 128, 128);
        context.drawImage(imgEnhance, eh03 % 6 * 32, Math.floor(eh03 / 6) * 32, 32, 32, 560, 60, 128, 128);
        context.fillText(ENHANCE[eh01], 180, 260);
        context.fillText(ENHANCE[eh02], 400, 260);
        context.fillText(ENHANCE[eh03], 620, 260);
    }

    context.textAlign = "center";
    context.lineWidth = 1;
    if (state == 4) {
        if (settingPage == 0) {
            context.fillText("キー設定", 150, 40);
            context.drawImage(imgCards, 416, 0, 32, 48, 200, 50, 64, 96);
            context.drawImage(imgCards, 416, 0, 32, 48, 284, 50, 64, 96);
            context.drawImage(imgCards, 416, 0, 32, 48, 368, 50, 64, 96);
            context.drawImage(imgCards, 416, 0, 32, 48, 452, 50, 64, 96);
            context.drawImage(imgCards, 416, 0, 32, 48, 536, 50, 64, 96);
            if (c0) {
                context.fillText("__", 232, 175);
            } else {
                context.fillText(c0key, 232, 175);
            }
            if (c1) {
                context.fillText("__", 316, 175);
            } else {
                context.fillText(c1key, 316, 175);
            }
            if (c2) {
                context.fillText("__", 400, 175);
            } else {
                context.fillText(c2key, 400, 175);
            }
            if (c3) {
                context.fillText("__", 484, 175);
            } else {
                context.fillText(c3key, 484, 175);
            }
            if (c4) {
                context.fillText("__", 568, 175);
            } else {
                context.fillText(c4key, 568, 175);
            }
            if (c0 || c1 || c2 || c3 || c4) {
                context.fillText("設定するキーを入力", 400, 210);
            } else {
                context.fillText("設定するカードをクリック", 400, 210);
            }
            context.fillText("キーを初期配置に戻す", 400, 260);
            if (mouse.x >= 310 && mouse.x <= 490 && mouse.y >= 240 && mouse.y <= 270) {
                context.strokeStyle = "aqua";
            } else {
                context.strokeStyle = "white";
            }
            context.strokeRect(310, 240, 180, 30);
            // ページ切り替えボタン
            if (mouse.x >= 700 && mouse.x <= 730 && mouse.y >= 155 && mouse.y <= 205) {
                context.drawImage(imgIcon, 75, 95, 15, 25, 700, 157, 30, 50);
            } else {
                context.drawImage(imgIcon, 0, 95, 15, 25, 700, 155, 30, 50);
            }
        }
        if (settingPage == 1) {
            context.fillText("ゲーム設定", 150, 40);
            context.textAlign = "left";
            context.fillText("カードのアニメーション", 130, 80);
            context.fillText("カードを交換後に並べ替える", 130, 120);

            // 行線
            context.strokeStyle = "white";
            context.beginPath();
            context.moveTo(120, 95);
            context.lineTo(680, 95);
            context.stroke();
            context.beginPath();
            context.moveTo(120, 135);
            context.lineTo(680, 135);
            context.stroke();

            // onoffスイッチ
            if (isAnimation == true) {
                context.drawImage(imgIcon, 0, 120, 30, 15, 600, 60, 60, 30);
            } else {
                context.drawImage(imgIcon, 75, 120, 30, 15, 600, 60, 60, 30);
            }
            if (isSort == true) {
                context.drawImage(imgIcon, 0, 120, 30, 15, 600, 100, 60, 30);
            } else {
                context.drawImage(imgIcon, 75, 120, 30, 15, 600, 100, 60, 30);
            }

            // ページ切り替えボタン
            if (mouse.x >= 700 && mouse.x <= 730 && mouse.y >= 155 && mouse.y <= 205) {
                context.drawImage(imgIcon, 75, 95, 15, 25, 700, 157, 30, 50);
            } else {
                context.drawImage(imgIcon, 0, 95, 15, 25, 700, 155, 30, 50);
            }
            if (mouse.x >= 70 && mouse.x <= 100 && mouse.y >= 155 && mouse.y <= 205) {
                context.drawImage(imgIcon, 90, 95, 15, 25, 70, 157, 30, 50);
            } else {
                context.drawImage(imgIcon, 15, 95, 15, 25, 70, 155, 30, 50);
            }
        }
        if (settingPage == 2) {
            context.fillText("データ削除", 400, 70);
            if (mouse.x >= 310 && mouse.x <= 490 && mouse.y >= 50 && mouse.y <= 80) {
                context.strokeStyle = "aqua";
            } else {
                context.strokeStyle = "white";
            }
            context.strokeRect(310, 50, 180, 30);
            // ページ切り替えボタン
            if (mouse.x >= 70 && mouse.x <= 100 && mouse.y >= 155 && mouse.y <= 205) {
                context.drawImage(imgIcon, 90, 95, 15, 25, 70, 157, 30, 50);
            } else {
                context.drawImage(imgIcon, 15, 95, 15, 25, 70, 155, 30, 50);
            }
        }
    }

    context.textAlign = "left";
    if (state == 5) {
        context.fillText("プレイ回数： " + plays, 120, 40);
        context.fillText("ロイヤルストレートフラッシュを出した数： " + rsf + " ( " + rsf_per + "% )", 120, 65);
        context.fillText("ストレートフラッシュを出した数： " + sf + " ( " + sf_per + "% )", 120, 90);
        context.fillText("フォーカードを出した数： " + fourC + " ( " + fourC_per + "% )", 120, 115);
        context.fillText("フルハウスを出した数： " + fullhouse + " ( " + fullhouse_per + "% )", 120, 140);
        context.fillText("フラッシュを出した数： " + flush + " ( " + flush_per + "% )", 120, 165);
        context.fillText("ストレートを出した数： " + straight + " ( " + straight_per + "% )", 120, 190);
        context.fillText("スリーカードを出した数： " + threeC + " ( " + threeC_per + "% )", 120, 215);
        context.fillText("ツーペアを出した数： " + twoP + " ( " + twoP_per + "% )", 120, 240);
        context.fillText("ワンペアを出した数： " + oneP + " ( " + oneP_per + "% )", 120, 265);
    }

    context.textAlign = "center";
    if (state == 6) {
        // 背景
        for (let i = 0; i < 4; i++) {
            context.drawImage(imgBack, Math.floor(i / 4) * 200, i % 4 * 90, 200, 90,
                Math.floor(i / 2) * 300 + 150, i % 2 * 150 + 60, 200, 90);
        }
        // 現在選択されているもの
        context.lineWidth = 5;
        context.strokeStyle = "red";
        context.strokeRect(Math.floor(back / 2) * 300 + 150, back % 2 * 150 + 60, 200, 90);
    }

    // チャンスタイム
    if (state == 7) {
        if (isAnimation) {
            // アニメーション
            if (frame <= 5) {
                context.drawImage(imgCards, 416, 0, 32, 48, 200, 180, 64, 96);
                context.drawImage(imgCards, 416, 0, 32, 48, 284, 180, 64, 96);
                context.drawImage(imgCards, 416, 0, 32, 48, 368, 180, 64, 96);
                context.drawImage(imgCards, 416, 0, 32, 48, 452, 180, 64, 96);
            }
            if (frame > 5 && frame <= 7) {
                context.drawImage(imgCards, 416, 48, 32, 48, 200, 180, 64, 96);
                context.drawImage(imgCards, 416, 48, 32, 48, 284, 180, 64, 96);
                context.drawImage(imgCards, 416, 48, 32, 48, 368, 180, 64, 96);
                context.drawImage(imgCards, 416, 48, 32, 48, 452, 180, 64, 96);
            }
            if (frame > 7 && frame <= 9) {
                context.drawImage(imgCards, 416, 96, 32, 48, 200, 180, 64, 96);
                context.drawImage(imgCards, 416, 96, 32, 48, 284, 180, 64, 96);
                context.drawImage(imgCards, 416, 96, 32, 48, 368, 180, 64, 96);
                context.drawImage(imgCards, 416, 96, 32, 48, 452, 180, 64, 96);
            }
            if (frame > 9) {
                context.drawImage(imgCards, Math.floor(playerCard[0] / 4) * 32, playerCard[0] % 4 * 48, 32, 48, 200, 180, 64, 96);
                context.drawImage(imgCards, Math.floor(playerCard[1] / 4) * 32, playerCard[1] % 4 * 48, 32, 48, 284, 180, 64, 96);
                context.drawImage(imgCards, Math.floor(playerCard[2] / 4) * 32, playerCard[2] % 4 * 48, 32, 48, 368, 180, 64, 96);
                context.drawImage(imgCards, Math.floor(playerCard[3] / 4) * 32, playerCard[3] % 4 * 48, 32, 48, 452, 180, 64, 96);
            }
        } else {
            context.drawImage(imgCards, Math.floor(playerCard[0] / 4) * 32, playerCard[0] % 4 * 48, 32, 48, 200, 180, 64, 96);
            context.drawImage(imgCards, Math.floor(playerCard[1] / 4) * 32, playerCard[1] % 4 * 48, 32, 48, 284, 180, 64, 96);
            context.drawImage(imgCards, Math.floor(playerCard[2] / 4) * 32, playerCard[2] % 4 * 48, 32, 48, 368, 180, 64, 96);
            context.drawImage(imgCards, Math.floor(playerCard[3] / 4) * 32, playerCard[3] % 4 * 48, 32, 48, 452, 180, 64, 96);
        }
        context.drawImage(imgCards, 416, 0, 32, 48, 304, 50, 64, 96);
        context.drawImage(imgCards, 416, 0, 32, 48, 432, 50, 64, 96);
    }

    // チャンスタイム結果
    if (state == 8) {
        context.drawImage(imgCards, Math.floor(playerCard[0] / 4) * 32, playerCard[0] % 4 * 48, 32, 48, 200, 180, 64, 96);
        context.drawImage(imgCards, Math.floor(playerCard[1] / 4) * 32, playerCard[1] % 4 * 48, 32, 48, 284, 180, 64, 96);
        context.drawImage(imgCards, Math.floor(playerCard[2] / 4) * 32, playerCard[2] % 4 * 48, 32, 48, 368, 180, 64, 96);
        context.drawImage(imgCards, Math.floor(playerCard[3] / 4) * 32, playerCard[3] % 4 * 48, 32, 48, 452, 180, 64, 96);
        if (ctCardPl == 0) {
            if (frame <= 5) {
                context.drawImage(imgCards, 416, 0, 32, 48, 304, 50, 64, 96);
            } else if (frame > 5 && frame <= 15) {
                context.drawImage(imgCards, 416, 48, 32, 48, 304, 50, 64, 96);
            } else if (frame > 15 && frame <= 40) {
                context.drawImage(imgCards, 416, 96, 32, 48, 304, 50, 64, 96);
            } else if (frame > 40 && frame <= 59) {
                context.drawImage(imgCards, Math.floor(playerCard[4] / 4) * 32, playerCard[4] % 4 * 48, 32, 48, 304, 50, 64, 96);
            } else {
                context.drawImage(imgCards, Math.floor(playerCard[4] / 4) * 32, playerCard[4] % 4 * 48, 32, 48, 536, 180, 64, 96);
            }
        } else {
            if (frame <= 5) {
                context.drawImage(imgCards, 416, 0, 32, 48, 432, 50, 64, 96);
            } else if (frame > 5 && frame <= 15) {
                context.drawImage(imgCards, 416, 48, 32, 48, 432, 50, 64, 96);
            } else if (frame > 15 && frame <= 40) {
                context.drawImage(imgCards, 416, 96, 32, 48, 432, 50, 64, 96);
            } else if (frame > 40 && frame <= 59) {
                context.drawImage(imgCards, Math.floor(playerCard[4] / 4) * 32, playerCard[4] % 4 * 48, 32, 48, 432, 50, 64, 96);
            } else {
                context.drawImage(imgCards, Math.floor(playerCard[4] / 4) * 32, playerCard[4] % 4 * 48, 32, 48, 536, 180, 64, 96);
            }
        }
        if (frame == 5 || frame == 16 || frame == 41) sndTurnOver.play();
        if (frame == 59) sndPush.play();
        if (frame > 59) {
            context.textAlign = "right";
            if (coin2 != 0) {
                context.fillText(coin.toString().padStart(9, "0"), 240, 30);
                context.fillText(coin2, 144, 30);
            } else {
                context.fillText(coin, 240, 30);
            }
            context.fillText("+" + winCoin, 240, 65);
            // リトライボタン
            if (mouse.x >= 325 && mouse.x <= 475 && mouse.y >= 305 && mouse.y <= 345) {
                context.drawImage(imgIcon, 75, 50, 75, 20, 325, 307, 150, 40);
            } else {
                context.drawImage(imgIcon, 0, 50, 75, 20, 325, 305, 150, 40);
            }
        }
    }

    // デバッグ state == 9 で任意のカードを表示
    if (state == 9) {
        playerCard[0] = 36;
        playerCard[1] = 40;
        playerCard[2] = 44;
        playerCard[3] = 48;
        playerCard[4] = 0;
        context.drawImage(imgCards, Math.floor(playerCard[0] / 4) * 32, playerCard[0] % 4 * 48, 32, 48, 0, 0, 64, 96);
        context.drawImage(imgCards, Math.floor(playerCard[1] / 4) * 32, playerCard[1] % 4 * 48, 32, 48, 64, 0, 64, 96);
        context.drawImage(imgCards, Math.floor(playerCard[2] / 4) * 32, playerCard[2] % 4 * 48, 32, 48, 128, 0, 64, 96);
        context.drawImage(imgCards, Math.floor(playerCard[3] / 4) * 32, playerCard[3] % 4 * 48, 32, 48, 192, 0, 64, 96);
        context.drawImage(imgCards, Math.floor(playerCard[4] / 4) * 32, playerCard[4] % 4 * 48, 32, 48, 256, 0, 64, 96);
    }

    // デバッグ情報
    context.textAlign = "left";
    if (debug == true) {
        context.fillText("plCard = " + playerCard, 0, 20);
        context.fillText("ct = " + ct, 0, 40);
        context.fillText("state = " + state, 0, 60);
        context.fillText("ctSeed = " + ctSeed, 0, 80);
        context.fillText("ctRole = " + ctRole, 0, 100);
        context.fillText("mouse_x = " + Math.floor(mouse.x), 0, 120);
        context.fillText("mouse_y = " + Math.floor(mouse.y), 0, 140);
        context.fillText("frame = " + frame, 0, 160);
    }
}