import { motion } from 'framer-motion'

const loadingContainer = {
  width: '1.5rem',
  display: 'flex',
  justifyContent: 'space-around',
  alignSelf: 'center',
}
const loadingCircle = {
  display: 'block',
  width: '0.3rem',
  height: '0.3rem',
  backgroundColor: '#ffffff',
  borderRadius: '0.35rem',
}

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const loadingCircleVariants = {
  start: {
    y: '60%',
  },
  end: {
    y: ['60%', '0%', '60%', '60%', '60%', '60%'],
  },
}
const loadingCircleTransition = {
  duration: 2,
  repeat: Infinity,
  ease: 'easeInOut',
}

const DotDotDotAnimation = () => {
  return (
    <div>
      <div className="flex fixed justify-center items-center">
        <motion.div style={loadingContainer} variants={loadingContainerVariants} initial="start" animate="end">
          <motion.span
            style={loadingCircle}
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          ></motion.span>
          <motion.span
            style={loadingCircle}
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          ></motion.span>
          <motion.span
            style={loadingCircle}
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          ></motion.span>
        </motion.div>
      </div>
    </div>
  )
}

export default DotDotDotAnimation
