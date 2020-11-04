import React, { useEffect, useState } from 'react'
import './hero.css'
import { motion } from 'framer-motion'
import { ReportFetch, SettingsFetch } from '../../services'
import LocationMap from '../../components/location/LocationMap'

function Landing() {

  const [settigns, setSettings] = useState({})
  const [reports, setReports] = useState([])
  
  const loadSettings = async () => {
    await SettingsFetch().then((data: any) => setSettings(data))
  }

  const loadReports = async () => {
    await ReportFetch().then((data: any) => setReports(data))
  }


  useEffect(() => {
    loadSettings()
    loadReports()
  }, [])

  return (
    <div className='hero__wrapper' >
      <motion.div
       className='hero__container child'
       animate={{ opacity: [0, 1], transition: { delay: .2, duration: 2, ease: [.6, .01, -0.05, .9]}}}
      >
        {
          Object.entries(settigns).length !== 0 && reports.length !== 0
          ?
          <LocationMap settings={settigns} reports={reports} />
          :
          null
        }
      </motion.div>
    </div>
  )
}

export default Landing
