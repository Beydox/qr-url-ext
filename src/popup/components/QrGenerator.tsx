import React from 'react'
import QRCode from "react-qr-code";


type QrGeneratorProps = {
    value: string
}

const QrGenerator = ({value}: QrGeneratorProps) => {

  return (
    <QRCode value={value} />
  )
}

export default QrGenerator
