import { useEffect, useState } from "react";

const message =
  "No matter what happens. I will choose you. Always ❤️💜❤️💜❤️💜❤️💜. Happy Birthday once again!🎂❤️💜❤️💜❤️💜❤️💜";

const Final: React.FC = () => {
  const [text, setText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(message.slice(0, i));
      i++;
      if (i > message.length) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const renderText = () => {
    return text.split("").map((char, index) => {
      if (char === ".") {
        return (
          <span key={index}>
            <br />
          </span>
        );
      }
      return <span key={index}>{char}</span>;
    });
  };

  return <h1 className="text-3xl text-pink-400">{renderText()}</h1>;
};

export default Final;
