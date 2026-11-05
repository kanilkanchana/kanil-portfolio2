"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FC,
} from "react";

// Font pool adapted from the uploaded Loki kinetic typography file.
const FONTS = [
  "Italiana",
  "Cinzel",
  "Cormorant Garamond",
  "Syne",
  "Tenor Sans",
  "Raleway",
  "Space Grotesk",
  "Oxanium",
] as const;

const BASE_FONT = FONTS[FONTS.length - 1];

type Props = {
  words: readonly string[];
  className?: string;
  enabled?: boolean;
  duration?: number;
  holdDuration?: number;
  rhythm?: number;
  fontWeight?: number;
  wordCycle?: boolean;
  fontLoop?: boolean;
  letterMorph?: boolean;
};

type MorphSlot = {
  char: string;
  fontIndex: number;
  expanded: boolean;
  fading: boolean;
  locked: boolean;
  pulse: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const cleanWords = (words: readonly string[]) =>
  words.map((word) => word.trim()).filter(Boolean);

/**
 * Name-only animation. The name stays the same, while ONE visible character at
 * a time changes font. This is intentionally separate from the hero word
 * morphing engine.
 */
const NameLetterLoop: FC<{
  text: string;
  className: string;
  enabled: boolean;
  rhythm: number;
  fontWeight: number;
  fontLoop: boolean;
}> = ({ text, className, enabled, rhythm, fontWeight, fontLoop }) => {
  const letters = useMemo(() => Array.from(text), [text]);
  const [fontIndexes, setFontIndexes] = useState<number[]>(() =>
    letters.map(() => FONTS.length - 1),
  );
  const [fadingIndex, setFadingIndex] = useState<number | null>(null);
  const cursor = useRef(0);
  const swapTimer = useRef<number | null>(null);

  useEffect(() => {
    setFontIndexes(letters.map(() => FONTS.length - 1));
    cursor.current = 0;
  }, [text, letters.length]);

  useEffect(() => {
    if (!enabled || !fontLoop || letters.length === 0) return;

    const intervalMs = clamp(Number(rhythm) || 420, 260, 1800);
    const interval = window.setInterval(() => {
      let attempts = 0;
      let position = cursor.current % letters.length;
      while (attempts < letters.length && letters[position] === " ") {
        cursor.current = (cursor.current + 1) % letters.length;
        position = cursor.current;
        attempts += 1;
      }

      setFadingIndex(position);
      if (swapTimer.current) window.clearTimeout(swapTimer.current);
      swapTimer.current = window.setTimeout(() => {
        setFontIndexes((previous) => {
          const next = [...previous];
          const current = next[position] ?? FONTS.length - 1;
          next[position] = (current + 1) % FONTS.length;
          return next;
        });
        setFadingIndex(null);
        cursor.current = (position + 1) % letters.length;
      }, Math.min(150, intervalMs * 0.34));
    }, intervalMs);

    return () => {
      window.clearInterval(interval);
      if (swapTimer.current) window.clearTimeout(swapTimer.current);
    };
  }, [enabled, fontLoop, letters, rhythm]);

  return (
    <span className={`kanil-name-kinetic ${className}`} aria-label={text}>
      {letters.map((char, index) => (
        <span
          key={`${index}-${char}`}
          aria-hidden="true"
          className={
            char === " "
              ? "kanil-name-kinetic__space"
              : "kanil-name-kinetic__slot"
          }
        >
          {char !== " " && (
            <span
              className="kanil-name-kinetic__glyph"
              style={{
                fontFamily: `"${enabled ? FONTS[fontIndexes[index] ?? FONTS.length - 1] : BASE_FONT}", sans-serif`,
                fontWeight,
                opacity: fadingIndex === index ? 0.18 : 1,
                filter: fadingIndex === index ? "blur(1.2px)" : "blur(0)",
                transform:
                  fadingIndex === index
                    ? "translateY(.035em) scale(.97)"
                    : "translateY(0) scale(1)",
              }}
            >
              {char}
            </span>
          )}
        </span>
      ))}
    </span>
  );
};

/**
 * Direct in-place word morph. It follows the uploaded HTML engine's model:
 * slots remain mounted, extra slots expand/collapse, fonts shuffle while the
 * word is morphing, then letters lock left-to-right before a short hold.
 */
const DirectWordMorph: FC<{
  words: string[];
  className: string;
  enabled: boolean;
  duration: number;
  holdDuration: number;
  rhythm: number;
  fontWeight: number;
  wordCycle: boolean;
  fontLoop: boolean;
  letterMorph: boolean;
}> = ({
  words,
  className,
  enabled,
  duration,
  holdDuration,
  rhythm,
  fontWeight,
  wordCycle,
  fontLoop,
  letterMorph,
}) => {
  const [index, setIndex] = useState(0);
  const currentWord = words[index % words.length] || "Web Apps";
  const [slots, setSlots] = useState<MorphSlot[]>(() =>
    Array.from(currentWord).map((char) => ({
      char,
      fontIndex: FONTS.length - 1,
      expanded: true,
      fading: false,
      locked: true,
      pulse: 0,
    })),
  );

  const timers = useRef<number[]>([]);
  const running = useRef(false);

  const clearTimers = useCallback(() => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    running.current = false;
  }, []);

  const resetToWord = useCallback((word: string) => {
    setSlots(
      Array.from(word).map((char) => ({
        char,
        fontIndex: FONTS.length - 1,
        expanded: true,
        fading: false,
        locked: true,
        pulse: 0,
      })),
    );
  }, []);

  const startMorph = useCallback(
    (nextIndex: number) => {
      if (running.current || words.length === 0) return;
      running.current = true;

      const from = words[index % words.length] || "";
      const target = words[nextIndex % words.length] || "";
      const fromChars = Array.from(from);
      const targetChars = Array.from(target);
      const maxLength = Math.max(fromChars.length, targetChars.length, 1);
      const morphMs = clamp((Number(duration) || 5.5) * 1000, 1600, 16000);
      const baseRhythm = clamp(Number(rhythm) || 200, 90, 500);

      setSlots(
        Array.from({ length: maxLength }, (_, position) => ({
          char: fromChars[position] || "",
          fontIndex: FONTS.length - 1,
          expanded: position < fromChars.length,
          fading: false,
          locked: false,
          pulse: 0,
        })),
      );

      // Expand slots needed by the new word on the next frame.
      timers.current.push(
        window.setTimeout(() => {
          setSlots((previous) =>
            previous.map((slot, position) => ({
              ...slot,
              expanded:
                position < fromChars.length || position < targetChars.length,
            })),
          );
        }, 32),
      );

      const scheduleShuffle = (position: number, stopAt: number) => {
        if (!fontLoop || targetChars[position] === " ") return;

        const tick = () => {
          if (!running.current) return;
          const now = performance.now();
          if (now >= stopAt) return;

          setSlots((previous) =>
            previous.map((slot, i) =>
              i === position
                ? {
                    ...slot,
                    fading: true,
                    pulse: slot.pulse + 1,
                  }
                : slot,
            ),
          );

          timers.current.push(
            window.setTimeout(() => {
              setSlots((previous) =>
                previous.map((slot, i) => {
                  if (i !== position || slot.locked) return slot;
                  const nextFont =
                    (slot.fontIndex + 1 + ((position + slot.pulse) % 3)) %
                    FONTS.length;
                  return {
                    ...slot,
                    fontIndex: nextFont,
                    fading: false,
                  };
                }),
              );
            }, Math.min(72, baseRhythm * 0.34)),
          );

          const dynamicDelay =
            baseRhythm + ((position * 37 + Math.round(now)) % 70);
          timers.current.push(window.setTimeout(tick, dynamicDelay));
        };

        timers.current.push(
          window.setTimeout(tick, Math.min(110, position * 24)),
        );
      };

      const startAt = performance.now();

      for (let position = 0; position < maxLength; position += 1) {
        const normalized = position / Math.max(maxLength - 1, 1);
        const threshold = letterMorph
          ? 0.28 + Math.pow(normalized, 0.88) * 0.56
          : 0.62;
        const lockDelay = Math.round(morphMs * threshold);
        const lockAt = startAt + lockDelay;

        scheduleShuffle(position, lockAt);

        timers.current.push(
          window.setTimeout(() => {
            setSlots((previous) =>
              previous.map((slot, i) => {
                if (i !== position) return slot;
                const nextChar = targetChars[position] || "";
                return {
                  ...slot,
                  char: nextChar,
                  fontIndex: FONTS.length - 1,
                  fading: false,
                  locked: true,
                  expanded: Boolean(nextChar),
                  pulse: slot.pulse + 1,
                };
              }),
            );
          }, lockDelay),
        );
      }

      timers.current.push(
        window.setTimeout(() => {
          setIndex(nextIndex % words.length);
          resetToWord(target);
          running.current = false;
        }, morphMs + 80),
      );
    }, [
      duration,
      fontLoop,
      index,
      letterMorph,
      resetToWord,
      rhythm,
      words,
    ],
  );

  useEffect(() => {
    clearTimers();
    setIndex(0);
    resetToWord(words[0] || "Web Apps");
  }, [words.join("\u001f"), clearTimers, resetToWord]);

  useEffect(() => {
    if (!enabled || !wordCycle || words.length < 2) {
      clearTimers();
      resetToWord(words[0] || "Web Apps");
      setIndex(0);
      return;
    }

    const holdMs = clamp((Number(holdDuration) || 2.2) * 1000, 350, 12000);
    const id = window.setTimeout(() => {
      startMorph((index + 1) % words.length);
    }, holdMs);
    timers.current.push(id);

    return () => {
      // Only cancel the hold timer for this effect. startMorph manages its own
      // transition timers and clears when props/words change.
      window.clearTimeout(id);
    };
  }, [enabled, wordCycle, words.length, index, holdDuration, startMorph, resetToWord, clearTimers, words]);

  useEffect(() => clearTimers, [clearTimers]);

  const ariaText = slots.map((slot) => slot.char).join("");

  if (!enabled) {
    return (
      <span className={`kanil-direct-morph ${className}`} aria-label={words[0]}>
        {Array.from(words[0] || "Web Apps").map((char, position) => (
          <span
            key={`${position}-${char}`}
            aria-hidden="true"
            className={
              char === " "
                ? "kanil-direct-morph__space"
                : "kanil-direct-morph__slot"
            }
          >
            {char !== " " && (
              <span
                className="kanil-direct-morph__glyph"
                style={{ fontFamily: `"${BASE_FONT}", sans-serif`, fontWeight }}
              >
                {char}
              </span>
            )}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className={`kanil-direct-morph ${className}`} aria-label={ariaText}>
      {slots.map((slot, position) => {
        const isSpace = slot.char === " ";
        return (
          <span
            key={position}
            aria-hidden="true"
            className={isSpace ? "kanil-direct-morph__space" : "kanil-direct-morph__slot"}
            style={{
              width: slot.expanded ? undefined : 0,
              flexBasis: slot.expanded ? undefined : 0,
              opacity: slot.expanded ? 1 : 0,
              transform: slot.expanded ? "scale(1)" : "scale(.32)",
            }}
          >
            {!isSpace && (
              <span
                className="kanil-direct-morph__glyph"
                style={{
                  fontFamily: `"${FONTS[slot.fontIndex]}", sans-serif`,
                  fontWeight,
                  opacity: slot.fading ? 0.34 : 1,
                  filter: slot.fading ? "blur(.65px)" : "blur(0)",
                  transform: slot.fading
                    ? "translateY(.035em) scale(.985)"
                    : "translateY(0) scale(1)",
                }}
              >
                {slot.char || "\u00a0"}
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
};

export const LokiTitle: FC<Props> = ({
  words,
  className = "",
  enabled = true,
  duration = 5.5,
  holdDuration = 2.2,
  rhythm = 200,
  fontWeight = 700,
  wordCycle = true,
  fontLoop = true,
  letterMorph = true,
}) => {
  const signature = words.join("\u001f");
  const items = useMemo(() => cleanWords(words), [signature, words]);
  const safeItems = items.length ? items : ["Web Apps"];

  if (!wordCycle || safeItems.length === 1) {
    return (
      <NameLetterLoop
        text={safeItems[0]}
        className={className}
        enabled={enabled}
        rhythm={rhythm}
        fontWeight={fontWeight}
        fontLoop={fontLoop}
      />
    );
  }

  return (
    <DirectWordMorph
      words={safeItems}
      className={className}
      enabled={enabled}
      duration={duration}
      holdDuration={holdDuration}
      rhythm={rhythm}
      fontWeight={fontWeight}
      wordCycle={wordCycle}
      fontLoop={fontLoop}
      letterMorph={letterMorph}
    />
  );
};
