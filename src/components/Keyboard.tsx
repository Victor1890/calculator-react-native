import { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Button from './Button'
import { Styles } from '../styles/global.style'
import { myColors } from '../styles/colors.style'

export default function Keyboard() {

    const [firstNumber, setFirstNumber] = useState<string>("")
    const [secondNumber, setSecondNumber] = useState<string>("")
    const [operation, setOperation] = useState<string>("")
    const [result, setResult] = useState<number | null>()

    const clearState = () => {
        setFirstNumber("");
        setSecondNumber("");
        setOperation("");
        setResult(null)
    }

    const handleNumberPress = (value: string) => {
        if(value.length < 10) setFirstNumber(firstNumber + value)

    }

    const handleOperationPress = (value: string) => {
        setOperation(value)
        setSecondNumber(firstNumber)
        setFirstNumber("")
    }

    const getResult = () => {
        const result: { [x: string]: () => void } = {
            "+": () => {
                clearState();
                setResult(parseFloat(secondNumber) + parseFloat(firstNumber))
            },
            "-": () => {
                clearState();
                setResult(parseFloat(secondNumber) - parseFloat(firstNumber))
            },
            "*": () => {
                clearState();
                setResult(parseFloat(secondNumber) * parseFloat(firstNumber))
            },
            "/": () => {
                clearState();
                setResult(+(parseFloat(secondNumber) / parseFloat(firstNumber)).toFixed(2))
            },
            "%": () => {
                clearState();
                setResult(+((parseFloat(secondNumber) / 100) * parseFloat(firstNumber)).toFixed(2))
            },
        }

        return result[operation]()
    }

    const firstNumberDisplay = () => {
        if(result != null) return <Text style={result < 99999 ? {...Styles.screenFirstNumber, color: myColors.result} : {...Styles.screenFirstNumber, fontSize: 50, color: myColors.result}}>{result?.toString()}</Text>

        if(firstNumber.length < 6) {
            return <Text style={Styles.screenFirstNumber}>{firstNumber}</Text>
        }

        if(firstNumber == ''){
            return <Text style={Styles.screenFirstNumber}>{"0"}</Text>
        }

        if(firstNumber.length > 5 && firstNumber.length < 8){
            return (
                <Text style={{...Styles.screenFirstNumber, fontSize: 70}}>
                    {firstNumber}
                </Text>
            )
        }

        if(firstNumber.length > 7) {
            return (
                <Text style={{...Styles.screenFirstNumber, fontSize: 50}}>
                    {firstNumber}
                </Text>
            )
        }
    }

    return (
        <View style={Styles.viewBottom}>
            <View style={{
                height: 120,
                width: "90%",
                justifyContent: "flex-end",
                alignSelf: 'center'
            }}>
                <Text style={Styles.screenSecondNumber}>
                    {secondNumber}
                    <Text style={{color: "purple", fontSize: 50, fontWeight: "500"}}>{operation}</Text>
                </Text>
                {firstNumberDisplay()}
            </View>
            <View style={Styles.row}>
                <Button text='C' isGray onPress={clearState}/>
                <Button text='+/-' isGray onPress={() => handleOperationPress("+/-")}/>
                <Button text='%' isGray onPress={() => handleOperationPress("%")}/>
                <Button text='/' isGray onPress={() => handleOperationPress("/")}/>
            </View>
            <View style={Styles.row}>
                <Button text='7' onPress={() => handleNumberPress("7")}/>
                <Button text='8' onPress={() => handleNumberPress("8")}/>
                <Button text='9' onPress={() => handleNumberPress("9")}/>
                <Button text='*' onPress={() => handleOperationPress("*")}/>
            </View>
            <View style={Styles.row}>
                <Button text='4' onPress={() => handleNumberPress("4")}/>
                <Button text='5' onPress={() => handleNumberPress("5")}/>
                <Button text='6' onPress={() => handleNumberPress("6")}/>
                <Button text='-' onPress={() => handleOperationPress("-")}/>
            </View>
            <View style={Styles.row}>
                <Button text='1' onPress={() => handleNumberPress("1")}/>
                <Button text='2' onPress={() => handleNumberPress("2")}/>
                <Button text='3' onPress={() => handleNumberPress("3")}/>
                <Button text='+' onPress={() => handleOperationPress("+")}/>
            </View>
            <View style={Styles.row}>
                <Button text='.' onPress={() => handleNumberPress(".")}/>
                <Button text='0' onPress={() => handleNumberPress("0")}/>
                <Button text='<=' onPress={() => setFirstNumber(firstNumber.slice(0, -1))}/>
                <Button text='=' onPress={() => getResult()}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: myColors.light,
        alignItems: "center",
        justifyContent: "flex-start"
    }
})