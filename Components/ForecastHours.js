import React from 'react'
import { View, ScrollView, StyleSheet, TouchableNativeFeedback, TouchableHighlight, FlatList } from 'react-native'
import PropTypes from 'prop-types'

import ForecastHour from './ForecastHour'
import s from '../Assets/style'
import * as style from '../Assets/style'
import ForecastHeaderSunrise from './ForecastHeaderSunrise'
import getDayHoursForecast from '../Assets/Functions/getDayHoursForecast'
import getMonth from '../Assets/Functions/getMonth'
import BoxContainer from './BoxContainer'
import computeSunrise from '../Assets/Functions/computeSunrise'

const ForecastHours = ({
  hours,
  forecastDay,
  latitude,
  longitude,
  hideHeader = false,
  useBoxcontainer = true,
  showDate = true
}) => {
  // Get today & tomorrow forecast
  const dayHours = getDayHoursForecast(forecastDay, hours)
  let dayLabel = null
  if (forecastDay === 0) {
    dayLabel = 'Idag'
  } else if (forecastDay === 1) {
    dayLabel = 'Imorgon'
  } else if (forecastDay === 2) {
    dayLabel = 'Övermorgon'
  } else {
    dayLabel = ''
  }

  let currentDay = new Date().getHours() === 23 ? 1 : 0

  const itemSeperator = () => {
    return <View style={[s.bc, s.bbw]} />
  }

  const content = (
    <ScrollView>
      {!hideHeader &&
        dayHours.length >= 1 &&
        <ForecastHeaderSunrise
          day={showDate ? dayLabel : ''}
          date={showDate ? `${dayHours[0].dayNumber} ${getMonth(dayHours[0].month)}` : ''}
          sunriseTime={computeSunrise(
            longitude,
            latitude,
            dayHours[currentDay].dayNumber,
            dayHours[currentDay].month,
            dayHours[currentDay].year,
            true
          )}
          sunsetTime={computeSunrise(
            longitude,
            latitude,
            dayHours[currentDay].dayNumber,
            dayHours[currentDay].month,
            dayHours[currentDay].year,
            false
          )}
        />}
      {dayHours.length >= 1 &&
        <FlatList
          data={dayHours}
          ItemSeparatorComponent={() => itemSeperator()}
          keyExtractor={item => `${item.date} ${item.time}`}
          renderItem={({ item }) => (
            <ForecastHour
              time={item.time}
              weatherType={item.weatherType}
              weatherTypeNum={item.weatherTypeNum}
              temperature={item.temp}
              rain={item.averageRain}
              windSpeed={item.windSpeed}
              windGust={item.windGust}
              thunderRisk={item.thunderRisk}
              airPressure={item.airPressure}
              windDirection={item.windDirection}
              relativeHumidity={item.relativeHumidity}
            />
          )}
        />}
    </ScrollView>
  )

  return useBoxcontainer
    ? <BoxContainer>
      {content}
    </BoxContainer>
    : content
}

ForecastHours.propTypes = {
  hours: PropTypes.array.isRequired
}

export default ForecastHours
