import React, { useRef, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Alert, Platform, Animated } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import Cat from './componets/Cat'

const TAMANHO_CIRCULO = 100

const Circulo = ({ onPress, animatedValue }) => {
  const animatedBackground = animatedValue.interpolate({
    inputRange: [0, 0.0001, 0.5, 0.5001, 1],
    outputRange: ["#F2CDAC","#F2CDAC","#F2CDAC","#bC4227","#F2CDAC"]
  })

  const animatedText = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [20, 35, 20]
  })

  const animatedColor = animatedValue.interpolate({
    inputRange: [0, 0.0001, 0.5, 0.5001,  1],
    outputRange: ["black","pink", "red", "pink", "black"]
  })



  return (
    <Animated.View style={[StyleSheet.absoluteFillObject, styles.containerCirculo, {backgroundColor: animatedBackground}]}>
      <Text style={styles.titulo}>Animações em React Native</Text>
        <Cat />
        
        <Animated.Text style={{
          fontSize: animatedText, 
          color: animatedColor,
          margin:10
        }}>Miiiiiaaauuuw!!!</Animated.Text>

        <Animated.View style={[styles.circulo, {
         transform:[
       {
           rotateY: animatedValue.interpolate({
             inputRange: [0, 0.5, 0.6, 1],
             outputRange: ['0deg', '-90deg','-180deg', '0deg']
           })
          },
          {
            scale: animatedValue.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [1, 2, 1]
            })
          },
          {
            translateX: animatedValue.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0 , 50, 0]
            })
          }
        ]
        }]}>

        <TouchableOpacity onPress={onPress}>
          <View style={[styles.circulo]}>
            <AntDesign name="arrowright" size={28} color={"#8C4227"} />
          </View>
        </TouchableOpacity>

      </Animated.View>
    </Animated.View>
  )
}


export default function App() {
/*
UseRef é um hook que retorna um objeto mutável,
 no qual a propriedade current é inicializado 
 com o argumento passado.
 O objeto retornado persistirá durante todo o clico
 de vida do componente. 
 https://pt-br.reactjs.org/docs/hooks-reference.html#useref
 */

 const animatedValue = useRef( new Animated.Value(0) ).current
 const [indice, setIndice] = useState(0)

 const animation = (toValue) => Animated.timing(animatedValue, {
    toValue: toValue,
    duration: 3000,
    useNativeDriver: false
  })
 

  const onPress = () => {
    setIndice(indice === 1 ? 0 : 1)
    animation(indice === 1 ? 0 : 1).start()
  }

  return (
    <View style={styles.container}>
      <Circulo onPress={onPress} animatedValue={animatedValue} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2CDAC",
    alignItems: 'center'
  },
  titulo: {
    fontSize: 25,
    color: "#D99873",
    paddingTop: 20
  },
  containerCirculo: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: TAMANHO_CIRCULO
  },
  circulo: {
    backgroundColor: "#D99873",
    width: TAMANHO_CIRCULO,
    height: TAMANHO_CIRCULO,
    borderRadius: TAMANHO_CIRCULO / 2,
    justifyContent: 'center',
    alignItems: 'center'
  }
})