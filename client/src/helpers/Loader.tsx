import React from 'react'
import { motion } from 'framer-motion'

function Loader() {
  return (
    <div style={{margin: '0 auto', width: '50%', textAlign: "center", paddingTop: "15%"}}>
      <svg>
        <motion.circle cx="100" cy="75" r="16" fill="grey"
        animate={{ fill: ["#CCCCCC", "#C32A2A", "#CCCCCC"]}}
        transition={{ loop: Infinity, ease: "easeInOut", duration: .8}}
        />
        <motion.circle cx="150" cy="75" r="16" fill="grey"
        animate={{ fill: ["#CCCCCC", "#C32A2A", "#CCCCCC"]}}
        transition={{ loop: Infinity, ease: "easeInOut", duration: .8, delay: .1}}
        />
        <motion.circle cx="200" cy="75" r="16" fill="grey"
        animate={{ fill: ["#CCCCCC", "#C32A2A", "#CCCCCC"]}}
        transition={{ loop: Infinity, ease: "easeInOut", duration: .8, delay: .2}}
        />
        Sorry, your browser does not support inline SVG.  
      </svg> 
    </div>
  )
}

export default Loader
