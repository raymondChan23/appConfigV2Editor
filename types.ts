export interface ThemeConfig {
    startDate: string;
    endDate: string;
    files: Record<string, string | null | object>;
    version: string;
    [key: string]: any;
}

export interface AmountOptions {
    topUpOptions?: number[];
    minTopUpAmount?: number;
    maxTopUpAmount?: number;
    [key: string]: any;
}

export interface ConfigData {
    theme?: ThemeConfig;
    amountSetting?: Record<string, AmountOptions>;
    aoSetting?: Record<string, number>;
    eeCustomMerchant?: Record<string, any>;
    travel?: Record<string, string>;
    cross_sell?: Record<string, any>;
    [key: string]: any;
}

export type UpdateValueFn = (path: string[], value: any) => void;
