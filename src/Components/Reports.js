import React, { useState, useEffect } from 'react'

import { Button } from '@mui/material';

import jsPDF from 'jspdf';

const generatePDF = () => {
  var doc = new jsPDF('p', 'pt');

  doc.text(20, 20, 'This is the first title.')
  doc.addFont('helvetica', 'normal')
  doc.text(20, 60, 'This is the second title.')
  doc.text(20, 100, 'This is the thrid title.')

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
