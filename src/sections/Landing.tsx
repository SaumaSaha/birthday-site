import { motion } from "framer-motion";
import HeartButton from "../components/HeartButton";
import { useAudio } from "../hooks/useAudio";
import { useEffect } from "react";

interface Props {
  onNext: () => void;
}

const Landing: React.FC<Props> = ({ onNext }) => {
  const { play } = useAudio();

  useEffect(() => {
    const handleFirstInteraction = async () => {
      await play("/music1.mp3");

      removeListeners();
    };

    const removeListeners = () => {
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };

    window.addEventListener("pointerdown", handleFirstInteraction);
    window.addEventListener("keydown", handleFirstInteraction);

    return removeListeners;
  }, [play]);

  const handleClick = async () => {
    await play("/music2.mp3");

    onNext();
  };

  return (
    <div className="relative w-full h-screen flex flex-col justify-between items-center text-center px-6">
      {/* TOP CONTENT */}
      <div className="mt-20">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-white"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Happy Birthday Kushum Madam❤️💜
        </motion.h1>
        <h3 className="text-xl text-white/90 mt-4">
          Hope you have an amazing day filled with love, laughter, and all the
          things that make you happy.
          <br />
          You deserve the best on your special day and always! 🎂🎉
          <br />
          Celebrate your special day with a little surprise I made for you! 🎉
        </h3>
        <h3 className="text-xl text-white/90 mt-4">
          Anything you see here is made with love, just for you. Hope it brings
          a smile to your face! 😊
        </h3>
        <br />
        <br />
        <br />
        <br />
        <p className="mt-6 text-sm text-white/80">
          Let’s see how many hearts you can catch 😙
        </p>
        <br />
        <br />
        <br />
        <p className="mt-6 text-sm text-white/80">
          And nothing happens on "L" click 🤪
        </p>
      </div>

      {/* BOTTOM CTA */}
      <div className="mb-16 flex flex-col items-center">
        <HeartButton onClick={handleClick} />

        <p className="mt-3 text-white/90 text-sm">Let’s continue →</p>
      </div>
    </div>
  );
};

export default Landing;
