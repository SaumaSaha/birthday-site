import { Routes, Route, useNavigate } from "react-router-dom";
import FloatingHearts from "./components/FloatingHearts";
import Landing from "./sections/Landing";
import Messages from "./sections/Messages";
import SurpriseBox from "./components/SurpriseBox";
import Questionnaire from "./components/Questionnaire";
import Final from "./sections/Final";
import { useSecretTrigger } from "./hooks/useSecretTrigger";
import { useState } from "react";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Landing onNext={() => navigate("/messages")} />
    </div>
  );
};

const MessagesPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Messages onNext={() => navigate("/surprise")} />
    </div>
  );
};

const SurprisePage: React.FC = () => {
  const navigate = useNavigate();
  const [showGift, setShowGift] = useState(false);

  return (
    <div className="min-h-screen">
      {!showGift ? (
        <Questionnaire onComplete={() => setShowGift(true)} />
      ) : (
        <SurpriseBox onContinue={() => navigate("/final")} />
      )}
    </div>
  );
};

const FinalPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Final />
    </div>
  );
};

const App: React.FC = () => {
  const [secret, setSecret] = useState(false);

  useSecretTrigger("l", () => setSecret(true));

  return (
    <div className="relative text-white">
      <FloatingHearts />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/surprise" element={<SurprisePage />} />
        <Route path="/final" element={<FinalPage />} />
      </Routes>

      {secret && (
        <div className="fixed bottom-10 right-10 bg-white/20 backdrop-blur p-4 rounded-xl text-pink-500">
          I love you more than words can say ❤️
        </div>
      )}
    </div>
  );
};

export default App;
