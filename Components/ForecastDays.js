import React from 'react'
import { View, StyleSheet, TouchableHighlight, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import ForecastDay from './ForecastDay'
import BoxContainer from './BoxContainer'
import * as style from '../Assets/style'
import s from '../Assets/style'
import getMonth from '../Assets/Functions/getMonth'
import getDayHoursForecast from '../Assets/Functions/getDayHoursForecast'
import getHighestOccurrence from '../Assets/Functions/getHighestOccurrence'

const ForecastDays = ({ days, navigation }) => {
  // Array holding weather forecast data for 10 days

  const tenDays = [
    getDayHoursForecast(0, days),
    getDayHoursForecast(1, days),
    getDayHoursForecast(2, days),
    getDayHoursForecast(3, days),
    getDayHoursForecast(4, days),
    getDayHoursForecast(5, days),
    getDayHoursForecast(6, days),
    getDayHoursForecast(7, days),
    getDayHoursForecast(8, days),
    getDayHoursForecast(9, days)
  ]

  // singleDay holds forecast for each day
  let key = 0
  const singleDay = []
  tenDays.forEach(day => {
    let dayData = {}
    let totRain = 0
    let maxTemp = -100
    let minTemp = 100
    let hoursLeft = 24

    var iconsDay = [] // Store the amount of times each weatherTypeNum appears during the day (08:00-20:00)
    var iconsNight = [] // Store the amount of times each weatherTypeNum appears during the night (20:00-08:00)

    day.forEach(hour => {
      totRain += hour.averageRain
      dayData.date = hour.date

      if (key === 0) {
        dayData.day = 'Idag'
        if (hoursLeft === 24) {
          hoursLeft = 24 - parseInt(hour.time)
        }
      } else {
        // Only display Mån instead of Måndag etc.
        dayData.day = hour.day.slice(0, 3)
      }

      // Find max and min temperature during the day
      let hourTemp = hour.temp
      if (hourTemp > maxTemp) {
        maxTemp = hourTemp
      }
      if (hourTemp < minTemp) {
        minTemp = hourTemp
      }

      let curTime = parseInt(hour.time)
      if (key != 0) {
        if (curTime < 8) iconsNight.push(hour.weatherTypeNum)
        else if (curTime < 20) iconsDay.push(hour.weatherTypeNum)
        else iconsNight.push(hour.weatherTypeNum)
      } else {
        if (curTime < 8 && dayData.weatherTypeNumNight === undefined) { dayData.weatherTypeNumNight = hour.weatherTypeNum }
        if (curTime < 20 && dayData.weatherTypeNumDay === undefined) { dayData.weatherTypeNumDay = hour.weatherTypeNum }
      }
    })
    if (key != 0) {
      dayData.weatherTypeNumDay = getHighestOccurrence(iconsDay)
      dayData.weatherTypeNumNight = getHighestOccurrence(iconsNight)
    }
    dayData.totalRain = Math.round(totRain * 10) / 10
    dayData.hoursLeft = hoursLeft
    dayData.tempHigh = maxTemp
    dayData.tempLow = minTemp
    dayData.key = key
    key += 1
    singleDay.push(dayData)
  })

  return (
    <BoxContainer>
      <FlatList
        data={singleDay}
        keyExtractor={item => `${item.key}`}
        renderItem={({ item }) => (
          <TouchableHighlight
            underlayColor={style.COL_GREY}
            activeOpacity={1}
            onPress={() => navigation.navigate('AllaTimmar')}
          >

            <ForecastDay
              day={item.day}
              date={item.date}
              tempHigh={item.tempHigh}
              tempLow={item.tempLow}
              weatherTypeNumNight={item.weatherTypeNumNight}
              weatherTypeNumDay={item.weatherTypeNumDay}
              totalRain={item.totalRain}
              hoursLeft={item.hoursLeft}
            />
          </TouchableHighlight>
        )}
      />

    </BoxContainer>
  )
}
ForecastDays.propTypes = {
  navigation: PropTypes.object.isRequired
}
export default ForecastDays
