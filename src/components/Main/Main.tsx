import React, { ReactChild } from 'react'
import { Container } from '@material-ui/core'

interface MainProps {
  children: ReactChild
}

const Main = ({ children }: MainProps) => (
  <Container
    className="flex flex-col flex-1 overflow-x-hidden overflow-y-auto px-10 container"
    maxWidth="xl"
    disableGutters={true}
  >
    {children}
  </Container>
)

export default Main
