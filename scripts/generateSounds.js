#!/usr/bin/env node
/**
 * Generate simple WAV files for metronome beats
 */
const fs = require('fs');
const path = require('path');

function generateWavFile(frequency, duration, amplitude, outputPath) {
  const sampleRate = 44100;
  const numSamples = Math.floor(sampleRate * duration);
  const buffer = Buffer.alloc(44 + numSamples * 2);

  // WAV header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + numSamples * 2, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // fmt chunk size
  buffer.writeUInt16LE(1, 20); // audio format (1 = PCM)
  buffer.writeUInt16LE(1, 22); // num channels (1 = mono)
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28); // byte rate
  buffer.writeUInt16LE(2, 32); // block align
  buffer.writeUInt16LE(16, 34); // bits per sample
  buffer.write('data', 36);
  buffer.writeUInt32LE(numSamples * 2, 40);

  // Generate sine wave samples
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    // Apply envelope to avoid clicks (fade in/out)
    let envelope = 1.0;
    const fadeTime = 0.01; // 10ms fade
    if (t < fadeTime) {
      envelope = t / fadeTime;
    } else if (t > duration - fadeTime) {
      envelope = (duration - t) / fadeTime;
    }

    const value = Math.sin(2 * Math.PI * frequency * t) * amplitude * envelope * 32767;
    buffer.writeInt16LE(Math.round(value), 44 + i * 2);
  }

  fs.writeFileSync(outputPath, buffer);
  console.log(`Generated: ${outputPath}`);
}

// Create sounds directory
const soundsDir = path.join(__dirname, '..', 'assets', 'sounds');
if (!fs.existsSync(soundsDir)) {
  fs.mkdirSync(soundsDir, { recursive: true });
}

// Generate different sounds
const sounds = [
  { name: 'click-high.wav', freq: 1000, duration: 0.05, amplitude: 0.5 }, // Strong beat
  { name: 'click-low.wav', freq: 800, duration: 0.05, amplitude: 0.3 },  // Weak beat
  { name: 'woodblock-high.wav', freq: 1200, duration: 0.08, amplitude: 0.6 },
  { name: 'woodblock-low.wav', freq: 900, duration: 0.08, amplitude: 0.4 },
  { name: 'beep-high.wav', freq: 880, duration: 0.1, amplitude: 0.5 },
  { name: 'beep-low.wav', freq: 660, duration: 0.1, amplitude: 0.35 },
];

sounds.forEach(sound => {
  const outputPath = path.join(soundsDir, sound.name);
  generateWavFile(sound.freq, sound.duration, sound.amplitude, outputPath);
});

console.log('\nAll sound files generated successfully!');
console.log(`Location: ${soundsDir}`);
