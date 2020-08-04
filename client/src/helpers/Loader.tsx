import React from 'react'
import { motion } from 'framer-motion'

function Loader() {
  return (
    <div>
      <svg viewBox="0 0 640 640">
        <motion.circle cx="50" cy="50" r="40" fill="grey"
        animate={{ fill: ["#c5c7c9", "#56a3f0", "#c5c7c9"]}}
        transition={{ loop: Infinity, ease: "easeInOut", duration: 2}}
        />
        <motion.circle cx="150" cy="50" r="40" fill="grey"
        animate={{ fill: ["#c5c7c9", "#56a3f0", "#c5c7c9"]}}
        transition={{ loop: Infinity, ease: "easeInOut", duration: 2, delay: .2}}
        />
        <motion.circle cx="250" cy="50" r="40" fill="grey"
        animate={{ fill: ["#c5c7c9", "#56a3f0", "#c5c7c9"]}}
        transition={{ loop: Infinity, ease: "easeInOut", duration: 2, delay: .4}}
        />
        Sorry, your browser does not support inline SVG.  
      </svg> 
    </div>
  )
}

export default Loader
