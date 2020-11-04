import React, { useState } from 'react'


const initialState = {}

const HereMapContext = React.createContext({})

function HereMapProvider(props) {

  const [hereMap, setHereMap] = useState(initialState)

  return (
    <HereMapContext.Provider value={{ hereMap, setHereMap }}>
      {props.children}
    </HereMapContext.Provider>
  )
}

export { HereMapContext, HereMapProvider }