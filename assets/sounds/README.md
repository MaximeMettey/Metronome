# Metronome Sound Files

This directory contains pre-generated WAV files for the metronome beats.

## Sound Files

### Click Sounds (Default)
- `click-high.wav` - Strong beat (1000Hz, 50ms)
- `click-low.wav` - Weak beat (800Hz, 50ms)

### Woodblock Sounds
- `woodblock-high.wav` - Strong beat (1200Hz, 80ms)
- `woodblock-low.wav` - Weak beat (900Hz, 80ms)

### Beep Sounds
- `beep-high.wav` - Strong beat (880Hz, 100ms)
- `beep-low.wav` - Weak beat (660Hz, 100ms)

## Regenerating Sounds

If you need to regenerate these sound files, run:

```bash
node scripts/generateSounds.js
```

## Technical Details

- **Format**: WAV (PCM 16-bit mono)
- **Sample Rate**: 44100 Hz
- **Fade**: 10ms fade in/out to avoid clicks
- **Size**: ~4-9 KB per file
