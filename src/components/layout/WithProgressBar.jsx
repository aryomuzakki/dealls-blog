"use client"

import { AppProgressBar } from "next-nprogress-bar"

const WithProgressBar = ({ ...props }) => {
  return (
    <AppProgressBar {...props} />
  )
}

export default WithProgressBar