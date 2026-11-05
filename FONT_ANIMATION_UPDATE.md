# Font animation update

- Replaced old random font swapping with four readable typefaces: Oxanium, Rajdhani, Space Grotesk and Sora.
- The typefaces crossfade in 16-second loops, with each letter offset by 0.72 seconds. Text content never switches suddenly.
- All hero title lines, subtitles, and the name under the static profile photo use the effect.
- Accessibility: reduced-motion setting displays a still Oxanium font.
- No Sass build step required.
- Fonts are requested from Google Fonts; the browser uses fallback sans-serif when offline.
