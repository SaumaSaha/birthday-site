import { motion } from "framer-motion";
import HiddenMessage from "../components/HiddenMessage";
import { messages } from "../data/messages";

interface Props {
  onNext?: () => void;
}

const Messages: React.FC<Props> = ({ onNext }) => {
  return (
    <div className="space-y-8 max-w-2xl mx-auto px-6">
      {messages.map((m, i) => (
        <motion.div
          key={i}
          className="p-6 bg-white/20 backdrop-blur rounded-xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl mb-2">{m.title}</h2>
          <HiddenMessage message={`${m.en}`} />
        </motion.div>
      ))}
      {onNext && (
        <div className="text-center pt-8">
          <button
            onClick={onNext}
            className="text-white/70 hover:text-white text-sm"
          >
            Continue →
          </button>
        </div>
      )}
    </div>
  );
};

export default Messages;
