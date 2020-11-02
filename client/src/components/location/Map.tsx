import React, { useState } from 'react'
import MapContext from '../../helpers/MapContext'
import { SettingsFetch } from '../../services'
import Report from '../report/Report'
import image from './iconfinder_location_1814106.png'

declare global {
  interface Window { H: any; }
}

function Map() {

  // Create a reference to the HTML element we want to put the map on
  const [settings, setSettings] = useState({})
  const mapRef = React.useRef(null)
  const [map, setMap] = useState()
  const [behavior, setBehave] = useState()
  const [ui, setUi] = useState()
  const [platform, setPlatform] = useState()
  const [location, setLocation] = useState({lat: 0, lng: 0})

  const loadData = async () => {
    SettingsFetch().then((data: any) => setSettings(data))
  }

  /**
   * Create the map instance
   * While `useEffect` could also be used here, `useLayoutEffect` will render
   * the map sooner
   */
  React.useLayoutEffect(()  => {
    loadData()
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( 
        (position) => {
        setLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
        // `mapRef.current` will be `undefined` when this hook first runs; edge case that
        if (!mapRef.current) return
        const H = window.H
        const platform = new H.service.Platform({
          //@ts-ignore
            apikey: settings.apiKey
        }) 
        const defaultLayers = platform.createDefaultLayers()
        const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
          center: { lat: position.coords.latitude, lng: position.coords.longitude },
          zoom: 15,
          pixelRatio: window.devicePixelRatio || 1
        })
        
        // Add a marker on user position
        const currentPoint = new H.geo.Point(position.coords.latitude, position.coords.longitude)
        // custom marker icon
        const icon = new H.map.Icon(image.toString())
        const currentMarker = new H.map.Marker(currentPoint, {icon: icon})

        hMap.addObject(currentMarker)

        // settings the map context 
        setBehave(new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap)))
        setUi(H.ui.UI.createDefault(hMap, defaultLayers))
        setMap(hMap)
        setPlatform(platform)
        
        // This will act as a cleanup to run once this hook runs again.
        // This includes when the component un-mounts
        return () => {
          hMap.dispose();
        }
      },
      (error) => { window.alert('error') }
    )}
    //@ts-ignore
  }, [mapRef, settings.apiKey]) // This will run this hook every time this ref is updated

  return (
    <MapContext.Provider value={{map, behavior, ui, platform }}>
      <div className="map" ref={mapRef} style={{ height: 350, width: '100%', maxWidth: '800px', margin: '0 auto' }} />
      <Report userLocation={location} />
    </MapContext.Provider>
  )
}

export default Map
