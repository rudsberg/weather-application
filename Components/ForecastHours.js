import React from 'react'
import { View, StyleSheet } from 'react-native'
import ForecastHour from './ForecastHour'
import s from '../Assets/style'
import * as style from '../Assets/style'
import getDayFromDayIndex from '../Assets/Functions/getDayFromDayIndex'
import ForecastHeader from './ForecastHeader'
import getDayHoursForecast from '../Assets/Functions/getDayHoursForecast'

const ForecastHours = ({ hours }) => {
  // Get today & tomorrow forecast
  const todayHours = getDayHoursForecast(0, hours)
  const tomorrowHours = getDayHoursForecast(1, hours)

  return (
    <View style={styles.mainContent}>
      <ForecastHeader day={todayHours[0].day} date={todayHours[0].date} sunriseTime={'04:47'} sunsetTime={'22:58'} />
      {todayHours.map(hour => {
        return (
          <ForecastHour
            key={hour.time}
            time={hour.time}
            weatherType={hour.weatherType}
            weatherTypeNum={hour.weatherTypeNum}
            temperature={hour.temp}
            rain={hour.averageRain}
            windSpeed={hour.windSpeed}
            windGust={hour.windGust}
          />
        )
      })}

      <ForecastHeader
        day={tomorrowHours[0].day}
        date={tomorrowHours[0].date}
        sunriseTime={'04:47'}
        sunsetTime={'22:58'}
      />
      {tomorrowHours.map(hour => {
        return (
          <ForecastHour
            key={hour.time}
            time={hour.time}
            weatherType={hour.weatherType}
            weatherTypeNum={hour.weatherTypeNum}
            temperature={hour.temp}
            rain={hour.averageRain}
            windSpeed={hour.windSpeed}
            windGust={hour.windGust}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  mainContent: {
    backgroundColor: style.COL_WHITE,
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 1
  }
})

export default ForecastHours
