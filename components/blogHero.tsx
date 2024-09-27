import * as motion from "framer-motion/client"


export default function blogHero() {
  return (
    <motion.div
    initial={{ x: "100%" }}
    animate={{ x: "calc(100vw - 50%)" }}
  >
    THIS IS THE BLOG
  </motion.div>
  )
}
