import { useState } from "react";

interface Props {
  message: string;
}

const HiddenMessage: React.FC<Props> = ({ message }) => {
  const [revealed, setRevealed] = useState(false);

  const processedMessage = message.split(".").map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));

  return (
    <div onClick={() => setRevealed(true)} className="cursor-pointer">
      {revealed ? (
        <p className="text-white-400 mt-2">{processedMessage}</p>
      ) : (
        <span className="text-gray-300">✨ Tap to reveal</span>
      )}
    </div>
  );
};

export default HiddenMessage;
