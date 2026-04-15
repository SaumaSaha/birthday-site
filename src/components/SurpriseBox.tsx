import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HiddenHeart {
  id: number;
  x: number;
  y: number;
  found: boolean;
}

const generateHearts = (): HiddenHeart[] => {
  return Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    x: Math.random() * (window.innerWidth - 50),
    y: Math.random() * (window.innerHeight - 150),
    found: false,
  }));
};

interface Props {
  onOpen?: () => void;
  showContinue?: boolean;
  onContinue?: () => void;
}

const SurpriseBox: React.FC<Props> = ({
  onOpen,
  showContinue = true,
  onContinue,
}) => {
  const [hearts, setHearts] = useState<HiddenHeart[]>(() => generateHearts());
  const [foundCount, setFoundCount] = useState(0);
  const [showGift, setShowGift] = useState(false);
  const [open, setOpen] = useState(false);

  const handleHeartClick = (id: number) => {
    const newFoundCount = foundCount + 1;
    setHearts((prev) =>
      prev.map((h) => (h.id === id ? { ...h, found: true } : h)),
    );
    setFoundCount(newFoundCount);
    if (newFoundCount >= 5) {
      setShowGift(true);
    }
  };

  const handleGiftClick = () => {
    setOpen(true);
    onOpen?.();
  };

  return (
    <div className="fixed inset-0">
      {/* Hidden hearts puzzle - scattered across the whole page */}
      {!showGift && (
        <div className="absolute inset-0">
          <p className="text-white/80 text-center text-lg mt-8">
            Find {5 - foundCount} hidden hearts to unlock your gift!
          </p>
          {hearts.map(
            (heart) =>
              !heart.found && (
                <motion.button
                  key={heart.id}
                  onClick={() => handleHeartClick(heart.id)}
                  className="absolute text-3xl hover:scale-125 transition-transform"
                  style={{
                    left: heart.x,
                    top: heart.y,
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                  💜
                </motion.button>
              ),
          )}
        </div>
      )}

      {/* Gift box - shown after puzzle solved */}
      {showGift && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <motion.div
            onClick={handleGiftClick}
            className="cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-7xl filter drop-shadow-2xl">🎁</span>
          </motion.div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="absolute left-1/2 -translate-x-1/2 top-24 bg-white/20 backdrop-blur-xl px-8 py-6 rounded-2xl shadow-2xl border border-white/30 min-w-[280px]"
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="text-4xl mb-3"
                  >
                    🎉
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Hugs and Kisses for the birthday girl! 🎂❤️💜❤️💜
                  </h3>
                  <p className="text-white/80 text-lg">
                    🤗😙🤗😙🤗😙🤗😙🤗😙🤗😙🤗😙🤗😙🤗😙🤗😙
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Continue button - always visible at bottom when showContinue is true */}
      {showContinue && showGift && onContinue && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <button
            onClick={onContinue}
            className="text-white/70 hover:text-white text-lg"
          >
            Continue →
          </button>
        </div>
      )}
    </div>
  );
};

export default SurpriseBox;
