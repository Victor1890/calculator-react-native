import { createContext } from "react";

export enum ThemeTypeEnum {
    LIGHT = 'light',
    DARK = 'dark'
}

export const ThemeContext = createContext<ThemeTypeEnum>(ThemeTypeEnum.LIGHT);