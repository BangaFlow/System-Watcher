import React from 'react'
import { motion } from 'framer-motion'

function Loader() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh'}}>
      <svg style={{ margin: 'auto'}}>
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
