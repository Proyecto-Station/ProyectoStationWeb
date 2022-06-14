import React, { useState, useEffect } from 'react'

import { Button } from '@mui/material';

import jsPDF from 'jspdf';
import 'jspdf-autotable'

const generatePDF = () => {
  var doc = new jsPDF('p', 'pt');

  const headers = [["NAME", "PROFESSION"]]

  var itemNew = [
    { id: 'Case Number', name : '101111111' },
    { id: 'Patient Name', name : 'UAT DR' },
    { id: 'Hospital Name', name: 'Dr Abcd' }
  ]

  const data = itemNew.map((elt) => [elt.id, elt.name])

  let content = {
    head: headers,
    body: data
  }

  doc.text(20, 20, 'This is the first title.')
  doc.text(20, 60, 'This is the second title.')
  doc.text(20, 100, 'This is the thrid title.')

  doc.autoTable(content);

  doc.save('demo.pdf')
}

function Reports() {
  return (
    <>
    <Button sx={{ mt: 10 }} onClick={generatePDF}>print</Button>
    </>
  )
}

export default Reports
