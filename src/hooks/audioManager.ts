class AudioManager {
  private audio: HTMLAudioElement;
  private unlocked = false;

  constructor() {
    this.audio = new Audio();
    this.audio.preload = "auto";
  }

  // 🔓 Unlock on first user interaction
  unlock = async () => {
    if (this.unlocked) return;

    try {
      await this.audio.play();
      this.audio.pause();
      this.unlocked = true;
    } catch {
      // ignore (will retry on next interaction)
    }
  };

  // ▶️ Play a track
  play = async (src: string) => {
    if (this.audio.src !== src) {
      this.audio.src = src;
    }

    try {
      await this.audio.play();
    } catch (err) {
      console.error("Audio play failed:", err);
    }
  };

  pause = () => {
    this.audio.pause();
  };

  stop = () => {
    this.audio.pause();
    this.audio.currentTime = 0;
  };
}

export const audioManager = new AudioManager();
