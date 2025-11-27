"use client";
import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";

const AnimatedNumbers = dynamic(
  () => {
    return import("react-animated-numbers");
  },
  { ssr: false }
);

const achievementsList = [
  {
    metric: "Projects",
    value: "50",
    postfix: "+",
  },
  {
    prefix: "~",
    metric: "Users",
    value: "1000",
  },
  {
    metric: "Awards",
    value: "4",
  },
  {
    metric: "Years",
    value: "5",
  },
];

const AchievementsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={sectionRef}
      className="py-8 px-4 xl:gap-16 sm:py-16 xl:px-16"
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="sm:border-[#33353F] sm:border rounded-md py-8 px-8 md:px-16 flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-4 bg-white/[0.02] backdrop-blur">
        {achievementsList.map((achievement, index) => (
          <motion.div
            key={achievement.metric}
            className="flex flex-col items-center justify-center mx-4"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 * index, duration: 0.5, ease: "easeOut" }}
          >
            <h2 className="text-white text-4xl font-bold flex flex-row items-baseline gap-1">
              {achievement.prefix}
              <AnimatedNumbers
                includeComma
                className="text-green-400 text-4xl font-bold"
                transitions={(idx) => ({
                  type: "spring",
                  duration: idx + 0.3,
                })}
                animateToNumber={achievement.value}
                configs={(_, idx) => ({
                  mass: 1,
                  friction: 100,
                  tensions: 150 * (idx + 1),
                })}
              />
              {achievement.postfix}
            </h2>
            <p className="text-[#ADB7BE] text-base mt-1">{achievement.metric}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AchievementsSection;
