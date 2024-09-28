import * as motion from "framer-motion/client";

export default function BlogHero() {
    return (
        <section className=" mx-auto flex justify-center w-[90%] sm:w-[85%]" >
            <motion.p
                initial={{
                    y: "200%", // Starts 100% above the viewport
                    opacity: 0  // Invisible at the start
                }}
                animate={{
                    y: "0",  // Moves to its final position (y = 0)
                    opacity: 1 // Fully visible when in position
                }}
                transition={{
                    ease: "easeInOut", // Smooth easing for the motion
                    duration: 0.8, // Animation duration (you can adjust it)
                    delay: 2 // Delay of 2 seconds before animation starts
                }}

                className="text-6xl font-bold"
            >
                Welcome to my Blog!
                <motion.p
                    initial={{
                        x: "-200%", // Starts 100% above the viewport
                        opacity: 0  // Invisible at the start
                    }}
                    animate={{
                        x: "0",  // Moves to its final position (y = 0)
                        opacity: 1 // Fully visible when in position
                    }}
                    transition={{
                        ease: "easeInOut", // Smooth easing for the motion
                        duration: 0.8, // Animation duration (you can adjust it)
                        delay: 3.5 // Delay of 3 seconds before animation starts
                    }}

                    className="text-3xl"

                >
                    This is a personal blog where i discuss technologies, philosophy and poetry...
                    <motion.p
                        initial={{
                            x: "200%", // Starts 100% above the viewport
                            opacity: 0  // Invisible at the start
                        }}
                        animate={{
                            x: "0",  // Moves to its final position (y = 0)
                            opacity: 1 // Fully visible when in position
                        }}
                        transition={{
                            ease: "easeInOut", // Smooth easing for the motion
                            duration: 0.9, // Animation duration (you can adjust it)
                            delay: 4.4 // Delay of 2 seconds before animation starts
                        }}

                        className="text-2xl"

                    >
                        Peruse my latest posts below 👇🏽 or visit them by their main categories above ☝🏽
                    </motion.p>
                </motion.p>

            </motion.p>
        </section>
    );
}
