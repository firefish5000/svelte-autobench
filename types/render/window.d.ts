interface ThemeObject {
    colors?: Record<string, Record<string, string>>;
    numbers?: Record<string, number>;
    booleans?: Record<string, boolean>;
}
export declare function isColor(strColor: string): boolean;
export declare function returnIfColor(strColor: string): string | undefined;
export declare function tryColorProp(prop: string, strColor: string, fallback?: string | undefined): string | undefined;
export declare function updateColorsFromUrl(): ThemeObject;
export declare function themeSerialize(theme: ThemeObject): URLSearchParams;
export declare function themeFromUri(): ThemeObject;
export declare function makeColors(): {
    color: string;
    background: string;
};
export declare function checkTheme(theme: ThemeObject): ThemeObject;
export declare function generateWindowStyle(themeChecked: ThemeObject): string;
export {};
