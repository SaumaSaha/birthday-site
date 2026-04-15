import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface HeartWithPopup {
  id: number;
  x: number;
  startY: number;
  delay: number;
  duration: number;
  emoji: string;
  showPopup: boolean;
  message: string;
  clicked: boolean;
}

const messages = [
  "I love you ❤️",
  "You are my peace 💜",
  "Stay with me forever 🥺",
  "You make everything better ✨",
  "Miss you already 😙",
  "Forever us ❤️",
];

const generateHearts = (): HeartWithPopup[] => {
  const width = typeof window !== "undefined" ? window.innerWidth : 1800;
  const height = typeof window !== "undefined" ? window.innerHeight : 800;

  return Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    x: Math.random() * width,
    startY: height + 50,
    delay: Math.random() * 10,
    duration: 10 + Math.random() * 5,
    emoji: Math.random() > 0.5 ? "❤️" : "💜",
    showPopup: false,
    message: "",
    clicked: false,
  }));
};

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<HeartWithPopup[]>(() =>
    generateHearts(),
  );

  useEffect(() => {
    setHearts(generateHearts());
  }, []);

  const handleHeartClick = (id: number) => {
    // eslint-disable-next-line react-hooks/purity
    const msgIndex = Math.floor(Math.random() * messages.length);
    const message = messages[msgIndex];
    setHearts((prev) =>
      prev.map((heart) =>
        heart.id === id
          ? { ...heart, showPopup: true, message, clicked: true }
          : heart,
      ),
    );

    // Reset after animation - make heart appear again
    setTimeout(() => {
      setHearts((prev) =>
        prev.map((heart) =>
          heart.id === id
            ? { ...heart, showPopup: false, clicked: false }
            : heart,
        ),
      );
    }, 3000);
  };

  return (
    <div className="fixed inset-0 overflow-hidden z-50 pointer-events-none">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute pointer-events-auto"
          initial={{
            x: heart.x,
            y: heart.startY,
            opacity: 0,
          }}
          animate={{
            y: -150,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
        >
          {/* Clickable heart - hide when clicked, show popup */}
          {!heart.clicked && (
            <motion.div
              onClick={() => handleHeartClick(heart.id)}
              className="cursor-pointer relative"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 1.3 }}
            >
              <span className="text-3xl select-none filter drop-shadow-md">
                {heart.emoji}
              </span>
            </motion.div>
          )}

          {/* Popup message that appears at heart position and floats up */}
          <AnimatePresence>
            {heart.showPopup && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: -80,
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/30 backdrop-blur-md px-5 py-3 rounded-xl text-white text-lg font-medium shadow-lg border border-white/20"
              >
                {heart.message}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
