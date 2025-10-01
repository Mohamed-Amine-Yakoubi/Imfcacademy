'use client'


import { AnimatePresence, motion } from "framer-motion";
import getScrollAnimation from "../../utils/getScrollAnimation";
import ScrollAnimationWrapper from "../../layout/ScrollAnimationWrapper";
import { useMemo } from "react";
import { greatVibes, poppins } from "@/Styles/fonts/fonts";

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: "easeOut" },
    },
};
// Variants fade + slide horizontal (gauche à droite)
const fadeRight = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 1, ease: "easeOut" },
    },
};
// Variants fade + slide horizontal (droite à gauche)
const fadeLeft = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 1, ease: "easeOut" },
    },
};
export default function Section_titles({
    subtitle,
    title,
    description,
}) {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);


    return (
        <motion.div
            className="items-center   text-center gap-4 md:gap-8 mt-22 "
            variants={scrollAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >

            <motion.p
                className={`${greatVibes.className} mt-4 text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px] green_color  `}
                variants={fadeUp}
            >
                {subtitle}
            </motion.p>
            <motion.h1
                className={`${poppins.className} dark_color font-bold text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px]  `}
                variants={fadeUp}
                transition={{ delay: 0.2 }}
            >
                {title}


            </motion.h1>

            <motion.p
                className={`${poppins.className} text-black/50 font-medium mt-3 px-4 sm:px-0 max-w-3xl md:text-[14px] text-[13px] mx-auto `}
                variants={fadeUp}
                transition={{ delay: 0.4 }}
            >
                {description}       </motion.p>


        </motion.div>
    );
}
