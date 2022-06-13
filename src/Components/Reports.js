import React, { useState, useEffect } from 'react'

import { StyleSheet, usePDF } from '@react-pdf/renderer'

const stylesPDF = StyleSheet.create({
  page: { flexDirection: "column", padding: 25 },
  table: {
    fontSize: 10,
    width: 550,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "stretch",
    flexWrap: "nowrap",
    alignItems: "stretch"
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "stretch",
    flexWrap: "nowrap",
    alignItems: "stretch",
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 35
  },
  cell: {
    borderColor: "#cc0000",
    borderStyle: "solid",
    borderWidth: 2,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "auto",
    alignSelf: "stretch"
  },
  header: {
    backgroundColor: "#eee"
  },
  headerText: {
    fontSize: 11,
    fontWeight: 1200,
    color: "#1a245c",
    margin: 8
  },
  tableText: {
    margin: 10,
    fontSize: 10,
    color: 'neutralDark'
  }
})

function Reports() {
  const [instance, updateInstance] = usePDF({ document: MyDoc })

  const MyDoc = {}

  return (
    <></>
  )
}

export default Reports
