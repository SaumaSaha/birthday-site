import { useState } from "react";

interface Props {
  onComplete: () => void;
}

const Questionnaire: React.FC<Props> = ({ onComplete }) => {
  const [question, setQuestion] = useState<1 | 2>(1);
  const [noClicks, setNoClicks] = useState(0);
  const [noWidth, setNoWidth] = useState(140);
  const [yesWidth, setYesWidth] = useState(140);

  const handleYesClick = () => {
    if (question === 1) {
      // Increase NO width, decrease YES width
      const newNoWidth = Math.min(noWidth + 80, window.innerWidth - 60);
      setNoWidth(newNoWidth);

      // YES shrinks by 25px each click
      const newYesWidth = Math.max(yesWidth - 25, 0);
      setYesWidth(newYesWidth);
    } else if (question === 2) {
      // Reveal surprise!
      onComplete();
    }
  };

  const handleNoClick = () => {
    if (question === 1) {
      setQuestion(2);
    } else if (question === 2) {
      setNoClicks((prev) => prev + 1);
    }
  };

  // For question 1 - YES increases NO width, YES shrinks - NO MOVEMENT
  if (question === 1) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="text-center w-full max-w-4xl">
          <h2 className="text-4xl font-bold text-white mb-20">
            Do you hate me? 😢
          </h2>

          <div className="flex items-center justify-center gap-8">
            {/* YES button - shrinks on each click, stays in place */}
            {yesWidth > 0 && (
              <button
                onClick={handleYesClick}
                className="bg-red-500 hover:bg-red-600 text-white rounded-2xl font-bold transition-all"
                style={{
                  width: yesWidth,
                  height: 64,
                  fontSize: yesWidth > 50 ? "1.25rem" : "0.65rem",
                }}
              >
                YES
              </button>
            )}

            {/* NO button - grows on each YES click, stays in place */}
            <button
              onClick={handleNoClick}
              className="bg-green-500 hover:bg-green-600 text-white rounded-2xl font-bold transition-all"
              style={{
                width: noWidth,
                height: 64,
                fontSize: noWidth > 250 ? "1.5rem" : "1rem",
              }}
            >
              NO
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Question 2 - YES grows bigger, NO moves anywhere
  return (
    <div className="fixed inset-0">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2">
        <h2 className="text-4xl font-bold text-white mb-16">
          Do you love me? ❤️
        </h2>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-20">
        <button
          onClick={handleYesClick}
          className="bg-green-500 hover:bg-green-600 text-white rounded-2xl font-bold px-12 py-4 transition-transform"
          style={{
            transform: `scale(${1 + noClicks * 0.25})`,
          }}
        >
          YES
        </button>

        <button
          onClick={handleNoClick}
          className="bg-red-500 hover:bg-red-600 text-white rounded-2xl font-bold text-xl px-10 py-4"
        >
          NO
        </button>
      </div>

      {noClicks > 0 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
          <p className="text-white/60 text-lg">
            NO clicked {noClicks} time{noClicks > 1 ? "s" : ""}! 😜
          </p>
        </div>
      )}
    </div>
  );
};

export default Questionnaire;
