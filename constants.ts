import { ConfigData } from './types';

export const INITIAL_DATA: ConfigData = {
    "theme": {
        "startDate": "202510020900",
        "endDate": "202612042359",
        "files": {
            "profile": null,
            "launchScreen": null,
            "splashScreen": "https://static-oepay-app.octopus-cards.com/mobile_app/app_skin/octopus_go_app_splash.json",
            "appIcon": null,
            "actionButton": "https://static-oepay-app.octopus-cards.com/mobile_app/app_skin/ani_action_button.json",
            "actionButtonStartColor": "#EB7300",
            "actionButtonEndColor": "#EFA03D",
            "walletActionButton": "https://static-oepay-app.octopus-cards.com/mobile_app/app_skin/ani_action_button.json",
            "walletActionButtonStartColor": "#48D0A0",
            "walletActionButtonEndColor": "#48A2D3",
            "walletActionButtonV2": "https://static-oepay-app.octopus-cards.com/mobile_app/app_skin/ani_scanner_button.json",
            "walletActionButtonStartColorV2": "#48D0A0",
            "walletActionButtonEndColorV2": "#48A2D3",
            "homeBackground": "https://static-oepay-app.octopus-cards.com/mobile_app/app_skin/header_bg_testorangebg.json",
            "travelBackground": "https://static-oepay-app.octopus-cards.com/mobile_app/app_skin/header_bg_testorangebg.json",
            "appTheme" : {
                 "skinPackage" : "https://apptest.oepay.octopus-cards.com/mobile_app_uat/thematic/2025/Dec/mcdonald_app_theme.zip"
            }
        },
        "version": "202510281700"
    },
    "amountSetting": {
        "card": {
            "topUpOptions": [500, 1000, 1800],
            "topUpFpsAppToAppOptions": [500, 1000, 1800],
            "topUpEddaOptions": [500, 1000, 1800],
            "minTopUpAmount": 0.1,
            "maxTopUpAmount": 3000,
            "minFpsTopUpAmount": 50,
            "maxFpsTopUpAmount": 3000,
            "minEddaTopUpAmount": 50,
            "maxEddaTopUpAmount": 3000
        },
        "sim": {
            "topUpOptions": [500, 1000, 1800],
            "topUpFpsAppToAppOptions": [500, 1000, 1800],
            "topUpEddaOptions": [500, 1000, 1800],
            "minTopUpAmount": 0.1,
            "maxTopUpAmount": 3000,
            "minFpsTopUpAmount": 50,
            "maxFpsTopUpAmount": 3000,
            "minEddaTopUpAmount": 50,
            "maxEddaTopUpAmount": 3000
        },
        "apo": {
            "newCardTopUpOptions": [500, 1000, 1800],
            "newCardApayTopUpOptions": [500, 1000, 1800],
            "newCardTopUpFpsAppToAppOptions": [500, 1000, 1800],
            "newCardTopUpEddaOptions": [500, 1000, 1800],
            "newCardMinTopupAmount": 100,
            "newCardMaxTopupAmount": 3000,
            "topUpOptions": [500, 1000, 1800],
            "topUpApayOptions": [500, 1000, 1800],
            "topUpFpsAppToAppOptions": [500, 1000, 1800],
            "topUpEddaOptions": [500, 1000, 1800],
            "minTopUpAmount": 0.1,
            "maxTopUpAmount": 3000,
            "minApayTopUpAmount": 100,
            "maxApayTopUpAmount": 3000,
            "minFpsTopUpAmount": 50,
            "maxFpsTopUpAmount": 3000,
            "minEddaTopUpAmount": 50,
            "maxEddaTopUpAmount": 3000
        },
        "spo": {
            "topUpOptions": [500, 1000, 1800],
            "topUpFpsAppToAppOptions": [500, 1000, 1800],
            "topUpEddaOptions": [500, 1000, 1800],
            "minTopUpAmount": 0.1,
            "maxTopUpAmount": 3000,
            "minFpsTopUpAmount": 50,
            "maxFpsTopUpAmount": 3000,
            "minEddaTopUpAmount": 50,
            "maxEddaTopUpAmount": 3000
        },
        "hpo": {
            "newCardTopUpOptions": [500, 1000, 1800],
            "newCardTopUpUpayOptions": [500, 1000, 1800],
            "newCardTopUpHpayOptions": [500, 1000, 1800],
            "newCardTopUpFpsAppToAppOptions": [500, 1000, 1800],
            "newCardTopUpEddaOptions": [500, 1000, 1800],
            "newCardMinTopupAmount": 100,
            "newCardMaxTopupAmount": 3000,
            "topUpOptions": [500, 1000, 1800],
            "topUpUpayOptions": [500, 1000, 1800],
            "topUpHpayOptions": [500, 1000, 1800],
            "topUpFpsAppToAppOptions": [500, 1000, 1800],
            "topUpEddaOptions": [500, 1000, 1800],
            "minTopUpAmount": 0.1,
            "maxTopUpAmount": 3000,
            "minUpayTopUpAmount": 100,
            "maxUpayTopUpAmount": 3000,
            "minHpayTopUpAmount": 100,
            "maxHpayTopUpAmount": 3000,
            "minFpsTopUpAmount": 50,
            "maxFpsTopUpAmount": 3000,
            "minEddaTopUpAmount": 50,
            "maxEddaTopUpAmount": 3000
        },
        "ao": {
            "newCardTopUpOptions": [500, 1000, 1800],
            "newCardTopUpUpayOptions": [500, 1000, 1800],
            "newCardTopUpGpayOptions": [500, 1000, 1800],
            "newCardTopUpFpsAppToAppOptions": [500, 1000, 1800],
            "newCardTopUpEddaOptions": [500, 1000, 1800],
            "newCardMinTopupAmount": 100,
            "newCardMaxTopupAmount": 3000,
            "topUpOptions": [500, 1000, 1800],
            "topUpUpayOptions": [500, 1000, 1800],
            "topUpGpayOptions": [500, 1000, 1800],
            "topUpFpsAppToAppOptions": [500, 1000, 1800],
            "topUpEddaOptions": [500, 1000, 1800],
            "minTopUpAmount": 0.1,
            "maxTopUpAmount": 3000,
            "minGpayTopUpAmount": 100,
            "maxGpayTopUpAmount": 3000,
            "minUpayTopUpAmount": 100,
            "maxUpayTopUpAmount": 3000,
            "minFpsTopUpAmount": 50,
            "maxFpsTopUpAmount": 3000,
            "minEddaTopUpAmount": 50,
            "maxEddaTopUpAmount": 3000
        },
        "wallet": {
            "minCardTopUpAmount": 0.1,
            "minFpsTopUpAmount": 50,
            "minEddaTopUpAmount": 50,
            "topUpOptions": [500, 1000, 1800],
            "topUpFpsAppToAppOptions": [500, 1000, 1800],
            "topUpEddaOptions": [500, 1000, 1800],
            "topUpCardOptions": [500, 1000, 1800],
            "topUpSIMOptions": [500, 1000, 1800]
        },
        "edda": {
            "topUpOptions": [500, 1000, 1800],
            "minTopUpAmount": 500
        },
        "fpsAavs": {
            "applyTopUpAmount": 500
        }
    },
    "aoSetting": {
        "prolongedLoading": 500
    },
    "eeCustomMerchant": {
        "octopus": {
            "merchantId": 312,
            "campaignId": 444,
            "bgColor": "#FBE6EF",
            "textColor": "#E12369"
        }
    },
    "travel": {
        "newIndicatorStartTime": "2025-09-01T00:00:00+08:00",
        "newIndicatorEndTime": "2099-12-31T23:59:59+08:00"
    },
    "cross_sell": {
        "card_list": {
            "titleEn": "",
            "titleZh": "",
            "messageEn": "",
            "messageZh": "",
            "iconEn": "",
            "iconZh": "",
            "buttonEn": "",
            "buttonZh": "",
            "linkEn": "",
            "linkZh": ""
        },
        "edda_success": {
            "titleEn": "",
            "titleZh": "",
            "messageEn": "",
            "messageZh": "",
            "iconEn": "",
            "iconZh": "",
            "buttonEn": "",
            "buttonZh": "",
            "linkEn": "",
            "linkZh": ""
        },
        "fund_transfer_fps_aavs": {
            "titleEn": "",
            "titleZh": "",
            "messageEn": "",
            "messageZh": "",
            "iconEn": "",
            "iconZh": "",
            "buttonEn": "",
            "buttonZh": "",
            "linkEn": "",
            "linkZh": ""
        },
        "fund_transfer_fps_credit_card": {
            "titleEn": "",
            "titleZh": "",
            "messageEn": "",
            "messageZh": "",
            "iconEn": "",
            "iconZh": "",
            "buttonEn": "",
            "buttonZh": "",
            "linkEn": "",
            "linkZh": ""
        },
        "fund_transfer_link_card": {
            "titleEn": "",
            "titleZh": "",
            "messageEn": "",
            "messageZh": "",
            "iconEn": "",
            "iconZh": "",
            "buttonEn": "",
            "buttonZh": "",
            "_comment": "not support link"
        }
    }
};