import { motion } from "framer-motion";

const HeartButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="text-5xl"
    >
      ❤️
    </motion.button>
  );
};

export default HeartButton;
