import React from 'react';
import { motion } from 'framer-motion';

function Loader() {
  return (
    <motion.div
      className="loader-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="spinner"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear"
        }}
      />
      <p>Loading...</p>
    </motion.div>
  );
}

export default Loader;
