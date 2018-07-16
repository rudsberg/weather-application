import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import StartPage from './Views/StartPage/StartPage'
import { Tabs } from './config/router'

export default class App extends React.Component {
  render () {
    return <Tabs />
  }
}
