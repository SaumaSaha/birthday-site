// useAudio.ts
import { audioManager } from "./audioManager";

export const useAudio = () => {
  return {
    play: audioManager.play,
    pause: audioManager.pause,
    stop: audioManager.stop,
    unlock: audioManager.unlock,
  };
};
