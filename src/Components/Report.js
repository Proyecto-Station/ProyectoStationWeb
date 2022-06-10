import React, { useState, useEffect } from 'react'

import { Button } from '@mui/material'

import {
  usePDF,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from '@react-pdf/renderer'
import ScheduleService from '../Services/Api/Schedule.Service'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
})

const MyDoc = (
  <Document>
    <Page size='A4' style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
)

function Report() {
  const [instance, updateInstance] = usePDF({ document: MyDoc })
  const [data, setData] = useState([])

  if (instance.loading) return <div>Loading ...</div>
  
  return (
    <React.Fragment>
      <Button
        component='a'
        href={instance.url}
        download='test.pdf'
        sx={{ mt: 50 }}
      >
        Download
      </Button>
      <Button>pinchame</Button>
    </React.Fragment>
  )
}

export default Report
