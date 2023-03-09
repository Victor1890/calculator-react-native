import { useContext } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { ThemeContext, ThemeTypeEnum } from "../context/theme.context";
import { Styles } from '../styles/global.style'

interface ButtonProps {
    onPress: () => void,
    text: string
    isBlue?: boolean
    isGray?: boolean
}

export default function Button({ onPress, text, isBlue, isGray }:ButtonProps) {

    const theme = useContext(ThemeContext);
    return (
        <TouchableOpacity
            style={
                isBlue
                ? Styles.btnBlue
                : isGray
                ? Styles.btnGray
                : theme == ThemeTypeEnum.LIGHT
                ? Styles.btnLight
                : Styles.btnDark
            }
            onPress={onPress}
        >
            <Text
                style={
                    isBlue || isGray
                    ? Styles.smallTextLight
                    : theme == ThemeTypeEnum.DARK
                    ? Styles.smallTextLight
                    : Styles.smallTextDark
                }
            >
                {text}
            </Text>
        </TouchableOpacity>
    );

}
