import { Drawer } from 'antd'
import React, { useState } from 'react'
import { HereMapContext } from '../../helpers/LocationMapContext'

function LocationMap({ settings, reports }: any) {

  // Create a reference to the HTML element we want to put the map on
  const mapRef = React.useRef(null)
  const [visible, setVisible] = useState(false)
  const [details, setDetails] = useState<any>({})
 //@ts-ignore
  const { setHereMap } = React.useContext(HereMapContext)
  
  const showDrawer = (data: any) => {
    setVisible(true)
    setDetails(data)
  }
  const onClose = () => {
    setVisible(false)
    setDetails({})
  }
  
  React.useLayoutEffect(() => {
    // `mapRef.current` will be `undefined` when this hook first runs; edge case that
    if (!mapRef.current) return
    const H = window.H
    const platform = new H.service.Platform({
      //@ts-ignore
        apikey: settings.apiKey
    }) 
    const defaultLayers = platform.createDefaultLayers()
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: 33.88, lng: 9.8 },
      zoom: 6.8,
      pixelRatio: window.devicePixelRatio || 1
    })

    const reportCoordArray = reports.filter((report: { agencyCoord: { lat: any; lng: any } },index: any, self: any[]) => {
      return self.findIndex((index) => (index.agencyCoord.lat === report.agencyCoord.lat && index.agencyCoord.lng === report.agencyCoord.lng))=== index
    })

    reportCoordArray.forEach((report: any) => {
      const marker = new H.map.Marker({lat: report.agencyCoord.lat, lng: report.agencyCoord.lng})
      hMap.addObject(marker)
      marker.addEventListener('tap', function (evt: any) {
        // event target is the marker itself, group is a parent event target
        showDrawer(report)

      }, false)
    })

    // settings the map context 
    setHereMap({
      behavior: new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap)),
      ui: H.ui.UI.createDefault(hMap, defaultLayers),
      map: hMap,
      platform
     })
    
    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
    return () => {
      hMap.dispose();
    }
    //@ts-ignore
    // eslint-disable-next-line
  }, [mapRef, settings.apiKey, reports])
  return (
    <>
    {
      reports.length !== 0
      ?
      <>
      <div className="map" ref={mapRef} style={{ height: 750, width: '100%',  margin: '0 auto' }} />
      <Drawer
        title="Report Details"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        {
          Object.entries(details).length !== 0
          ?
          <>
            <p>
              <strong>Agency Name / Location:</strong><br/>
              .{details.agencyLocationText}
            </p>
            <p>
              <strong>Issue:</strong><br/>
              {details.type}
            </p>
            <p><strong>Agency Coorinations:</strong><br/>
              lat: {details.agencyCoord.lat}, <br/>
              lng: {details.agencyCoord.lng}
            </p>
          </>
          :
          null
        }
        
      </Drawer>
      </>
      :
      null
    }
    </>
  )
}

export default LocationMap
