/**
 * Utilitaires audio pour feedback sonore
 */

// Son de réussite (arpège majeur)
export const playSuccessSound = () => {
    if (typeof window === "undefined" || !window.AudioContext) return;

    try {
        const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();

        const playNote = (frequency: number, startTime: number, duration: number) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = "sine";

            gainNode.gain.setValueAtTime(0.3, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
        };

        const now = audioContext.currentTime;
        // Arpège Do-Mi-Sol (C-E-G)
        playNote(523.25, now, 0.15);        // C5
        playNote(659.25, now + 0.1, 0.15);  // E5
        playNote(783.99, now + 0.2, 0.2);   // G5
    } catch (e) {
        console.warn("Impossible de jouer le son de réussite:", e);
    }
};

// Son d'erreur (note descendante)
export const playErrorSound = () => {
    if (typeof window === "undefined" || !window.AudioContext) return;

    try {
        const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.2);

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
        console.warn("Impossible de jouer le son d'erreur:", e);
    }
};

// Son de clic (léger)
export const playClickSound = () => {
    if (typeof window === "undefined" || !window.AudioContext) return;

    try {
        const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = "sine";
        oscillator.frequency.value = 800;

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.05);
    } catch (e) {
        console.warn("Impossible de jouer le son de clic:", e);
    }
};
