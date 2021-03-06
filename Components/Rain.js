import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import * as style from '../Assets/style'
import s from '../Assets/style'

const Rain = ({ amountRain }) => {
  return (
    <View style={[s.flexDr, s.flexAce, s.flexJsa, s.mr2]}>
      <FontAwesome name='tint' size={style.ICON_SIZE_SMALL} color={style.COL_WATER_BLUE} />
      <Text style={[s.fz1, s.fw1, s.col_black, s.ml2]}>{amountRain}</Text>
      <Text style={[s.ml2]}>mm/h</Text>
    </View>
  )
}

export default Rain
