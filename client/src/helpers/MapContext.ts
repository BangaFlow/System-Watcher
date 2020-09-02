import React from 'react'
declare global {
  interface Window { H: any; }
}
export interface HEREMapContext {
  map?: H.Map
  behavior?: H.mapevents.Behavior
  ui?: H.ui.UI
  platform?: any
}

const MapContext = React.createContext({} as HEREMapContext)

export default MapContext