import React, { useState } from "react";

const DISPLAY_FONT = "'Trebuchet MS', 'Segoe UI', system-ui, sans-serif";
const BODY_FONT = "'Segoe UI', system-ui, -apple-system, sans-serif";

const COLORS = {
  bg: "#FFF8ED",
  surface: "#FFFFFF",
  ink: "#3D3833",
  inkSoft: "#6B655E",
  primary: "#2FA6C7",
  primaryDeep: "#1F87A4",
  highlightBg: "#E1F1FA",
  border: "#EFE6D3",
  success: "#3FA85C",
  successBg: "#E4F6E8",
};

const EMOTIONS = [
  { key: "calm", label: "Calm" },
  { key: "annoyed", label: "Annoyed" },
  { key: "anxious", label: "Anxious" },
  { key: "confused", label: "Confused" },
];

const STORY = [
  {
    id: 1,
    text: "One morning, Sam wakes up. The room is quiet, and sunlight comes softly through the curtains. He feels calm.",
    emotion: "calm",
  },
  {
    id: 2,
    text: "Mum calls up the stairs: \u201cTime to get ready for school!\u201d Sam was still half-asleep, and now everything feels rushed. He feels annoyed.",
    emotion: "annoyed",
  },
  {
    id: 3,
    text: "Sam opens his cupboard to get dressed. Everything inside looks jumbled together, and it's hard to know where to start. He feels anxious.",
    emotion: "anxious",
  },
  {
    id: 4,
    text: "He calls for Mum. She says, \u201cWear the white top and the blue jeans.\u201d But there are two white tops and two pairs of blue jeans in the cupboard. He feels confused.",
    emotion: "confused",
  },
];

function Face({ emotion, size = 56 }) {
  const s = size;
  const stroke = COLORS.ink;
  const common = {
    fill: "none",
    stroke,
    strokeWidth: 3,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  let brows = null;
  let eyes = null;
  let mouth = null;
  let cheeks = null;

  if (emotion === "calm") {
    brows = (
      <>
        <path d="M20 23 Q24 21 28 23" {...common} />
        <path d="M40 23 Q44 21 48 23" {...common} />
      </>
    );
    eyes = (
      <>
        <path d="M19 30 Q24 34 29 30" {...common} />
        <path d="M39 30 Q44 34 49 30" {...common} />
      </>
    );
    mouth = <path d="M25 43 Q34 50 43 43" {...common} />;
    cheeks = (
      <>
        <circle cx="19" cy="39" r="4" fill={COLORS.primary} opacity="0.18" />
        <circle cx="49" cy="39" r="4" fill={COLORS.primary} opacity="0.18" />
      </>
    );
  } else if (emotion === "annoyed") {
    brows = (
      <>
        <path d="M19 22 L29 27" {...common} />
        <path d="M49 22 L39 27" {...common} />
      </>
    );
    eyes = (
      <>
        <circle cx="24" cy="31" r="2.6" fill={stroke} stroke="none" />
        <circle cx="44" cy="31" r="2.6" fill={stroke} stroke="none" />
      </>
    );
    mouth = <path d="M25 46 Q34 41 43 46" {...common} />;
  } else if (emotion === "anxious") {
    brows = (
      <>
        <path d="M18 25 Q24 18 30 23" {...common} />
        <path d="M38 23 Q44 18 50 25" {...common} />
      </>
    );
    eyes = (
      <>
        <circle cx="24" cy="31" r="3.8" {...common} />
        <circle cx="44" cy="31" r="3.8" {...common} />
      </>
    );
    mouth = <ellipse cx="34" cy="45" rx="4.5" ry="3.6" {...common} />;
  } else {
    brows = (
      <>
        <path d="M18 24 Q24 19 30 22" {...common} />
        <path d="M39 26 Q44 24 49 27" {...common} />
      </>
    );
    eyes = (
      <>
        <path d="M19 30 Q24 34 29 30" {...common} />
        <circle cx="44" cy="31" r="2.6" fill={stroke} stroke="none" />
      </>
    );
    mouth = <path d="M26 45 Q34 49 41 43" {...common} />;
  }

  return (
    <svg width={s} height={s} viewBox="0 0 68 68" role="img" aria-label={emotion}>
      <circle cx="34" cy="34" r="30" fill={COLORS.surface} stroke={COLORS.border} strokeWidth="2" />
      <circle cx="34" cy="34" r="30" fill={COLORS.primary} opacity="0.05" />
      {cheeks}
      {brows}
      {eyes}
      {mouth}
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4 2.5 L13 8 L4 13.5 Z" fill="currentColor" />
    </svg>
  );
}

function ProgressDots({ total, current }) {
  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 28 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: i <= current ? COLORS.primary : COLORS.border,
            transition: "background 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}

function PrimaryButton({ children, onClick, style }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: "16px 24px",
        borderRadius: 16,
        border: "none",
        background: COLORS.primary,
        color: "#FFFFFF",
        fontFamily: DISPLAY_FONT,
        fontWeight: 700,
        fontSize: 17,
        cursor: "pointer",
        transition: "background 0.2s ease, transform 0.1s ease",
        ...style,
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {children}
    </button>
  );
}

export default function App() {
  const [screen, setScreen] = useState("welcome");
  const [name, setName] = useState("");
  const [codeword, setCodeword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [beatIndex, setBeatIndex] = useState(0);
  const [step, setStep] = useState("narrate");
  const [feedback, setFeedback] = useState("");
  const [correctFlash, setCorrectFlash] = useState(false);

  const beat = STORY[beatIndex];
  const isLastBeat = beatIndex === STORY.length - 1;

  function handleLogin() {
    if (!name.trim()) {
      setLoginError("Enter a name to continue.");
      return;
    }
    if (codeword.trim().toLowerCase() !== "sunshine") {
      setLoginError("That codeword doesn't match. Try again.");
      return;
    }
    setLoginError("");
    setScreen("voice");
  }

  function startStory() {
    setBeatIndex(0);
    setStep("narrate");
    setFeedback("");
    setScreen("story");
  }

  function handleEmotionPick(key) {
    if (key === beat.emotion) {
      setFeedback("");
      setCorrectFlash(true);
      setTimeout(() => {
        setCorrectFlash(false);
        setStep("face");
      }, 700);
    } else {
      setFeedback("Not quite \u2014 try again.");
    }
  }

  function handleFacePick(key) {
    if (key === beat.emotion) {
      setFeedback("");
      setCorrectFlash(true);
      setTimeout(() => {
        setCorrectFlash(false);
        if (isLastBeat) {
          setScreen("end");
        } else {
          setBeatIndex((i) => i + 1);
          setStep("narrate");
        }
      }, 700);
    } else {
      setFeedback("Not quite \u2014 try again.");
    }
  }

  const shellStyle = {
    minHeight: "100%",
    background: COLORS.bg,
    display: "flex",
    justifyContent: "center",
    padding: "40px 20px",
    fontFamily: BODY_FONT,
    color: COLORS.ink,
    boxSizing: "border-box",
  };

  const cardStyle = { width: "100%", maxWidth: 420 };

  return (
    <div style={shellStyle}>
      <div style={cardStyle}>
        {screen === "welcome" && (
          <div>
            <h1 style={{ fontFamily: DISPLAY_FONT, fontWeight: 700, fontSize: 26, marginBottom: 8, color: COLORS.primaryDeep }}>
              Let's get ready
            </h1>
            <p style={{ color: COLORS.inkSoft, lineHeight: 1.6, marginBottom: 32 }}>
              This story is read in a voice you know. Enter your name and today's
              codeword to begin.
            </p>

            <label style={{ display: "block", fontFamily: DISPLAY_FONT, fontWeight: 700, fontSize: 14, marginBottom: 6, color: COLORS.inkSoft }}>
              Your name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Sam"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "14px 16px",
                borderRadius: 12,
                border: `2px solid ${COLORS.border}`,
                fontSize: 16,
                fontFamily: BODY_FONT,
                marginBottom: 18,
                outline: "none",
              }}
            />

            <label style={{ display: "block", fontFamily: DISPLAY_FONT, fontWeight: 700, fontSize: 14, marginBottom: 6, color: COLORS.inkSoft }}>
              Codeword
            </label>
            <input
              value={codeword}
              onChange={(e) => setCodeword(e.target.value)}
              placeholder="Enter the codeword"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "14px 16px",
                borderRadius: 12,
                border: `2px solid ${COLORS.border}`,
                fontSize: 16,
                fontFamily: BODY_FONT,
                marginBottom: 6,
                outline: "none",
              }}
            />
            <p style={{ fontSize: 13, color: COLORS.inkSoft, marginBottom: 24, fontStyle: "italic" }}>
              Demo codeword: sunshine
            </p>

            {loginError && (
              <p style={{ color: "#D9534F", fontSize: 14, marginBottom: 16 }}>{loginError}</p>
            )}

            <PrimaryButton onClick={handleLogin}>Continue</PrimaryButton>
          </div>
        )}

        {screen === "voice" && (
          <div style={{ textAlign: "center", paddingTop: 24 }}>
            <div
              style={{
                width: 88,
                height: 88,
                borderRadius: "50%",
                background: COLORS.highlightBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 28px",
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="9" y="3" width="6" height="12" rx="3" stroke={COLORS.primaryDeep} strokeWidth="2" />
                <path d="M5 11a7 7 0 0 0 14 0" stroke={COLORS.primaryDeep} strokeWidth="2" strokeLinecap="round" />
                <path d="M12 18v3" stroke={COLORS.primaryDeep} strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h1 style={{ fontFamily: DISPLAY_FONT, fontWeight: 700, fontSize: 24, marginBottom: 12, color: COLORS.primaryDeep }}>
              Hi {name || "there"}
            </h1>
            <p style={{ color: COLORS.inkSoft, lineHeight: 1.6, marginBottom: 36, padding: "0 8px" }}>
              This story will be told in Mum's voice. In the full app, she records
              herself reading it first \u2014 for this prototype, we'll go straight
              to the story.
            </p>
            <PrimaryButton onClick={startStory}>Start the story</PrimaryButton>
          </div>
        )}

        {screen === "story" && (
          <div>
            <ProgressDots total={STORY.length} current={beatIndex} />

            <div style={{ background: COLORS.surface, border: `2px solid ${COLORS.border}`, borderRadius: 20, padding: 28 }}>
              {step === "narrate" && (
                <div>
                  <p style={{ fontSize: 18, lineHeight: 1.7, marginBottom: 24 }}>{beat.text}</p>
                  <button
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      background: COLORS.highlightBg,
                      color: COLORS.primaryDeep,
                      border: "none",
                      borderRadius: 999,
                      padding: "10px 18px",
                      fontFamily: DISPLAY_FONT,
                      fontWeight: 700,
                      fontSize: 14,
                      cursor: "pointer",
                      marginBottom: 24,
                    }}
                  >
                    <PlayIcon />
                    Hear it in Mum's voice
                  </button>
                  <PrimaryButton onClick={() => setStep("identify")}>Continue</PrimaryButton>
                </div>
              )}

              {step === "identify" && (
                <div>
                  <p style={{ fontFamily: DISPLAY_FONT, fontWeight: 700, fontSize: 19, marginBottom: 20 }}>
                    How does he feel right now?
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: feedback ? 14 : 4 }}>
                    {EMOTIONS.map((e) => (
                      <button
                        key={e.key}
                        onClick={() => handleEmotionPick(e.key)}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 8,
                          padding: "16px 8px",
                          borderRadius: 14,
                          border: `2px solid ${COLORS.border}`,
                          background: COLORS.highlightBg,
                          cursor: "pointer",
                          fontFamily: BODY_FONT,
                          fontWeight: 700,
                          fontSize: 14,
                          color: COLORS.primaryDeep,
                        }}
                      >
                        <Face emotion={e.key} size={40} />
                        {e.label}
                      </button>
                    ))}
                  </div>
                  {feedback && <p style={{ color: "#D9534F", fontSize: 14, marginTop: 4 }}>{feedback}</p>}
                </div>
              )}

              {step === "face" && (
                <div>
                  <p style={{ fontFamily: DISPLAY_FONT, fontWeight: 700, fontSize: 19, marginBottom: 20 }}>
                    Which face matches that feeling?
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: feedback ? 14 : 4 }}>
                    {EMOTIONS.map((e) => (
                      <button
                        key={e.key}
                        onClick={() => handleFacePick(e.key)}
                        aria-label={e.label}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "18px 8px",
                          borderRadius: 14,
                          border: `2px solid ${COLORS.border}`,
                          background: COLORS.highlightBg,
                          cursor: "pointer",
                        }}
                      >
                        <Face emotion={e.key} size={56} />
                      </button>
                    ))}
                  </div>
                  {feedback && <p style={{ color: "#D9534F", fontSize: 14, marginTop: 4 }}>{feedback}</p>}
                </div>
              )}

              {correctFlash && (
                <div
                  style={{
                    marginTop: 18,
                    padding: "10px 14px",
                    borderRadius: 12,
                    background: COLORS.successBg,
                    color: COLORS.success,
                    fontFamily: DISPLAY_FONT,
                    fontWeight: 700,
                    fontSize: 14,
                    textAlign: "center",
                  }}
                >
                  That's it!
                </div>
              )}
            </div>
          </div>
        )}

        {screen === "end" && (
          <div style={{ textAlign: "center", paddingTop: 24 }}>
            <div
              style={{
                width: 88,
                height: 88,
                borderRadius: "50%",
                background: COLORS.successBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 28px",
              }}
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 13l4 4 10-10" stroke={COLORS.success} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 style={{ fontFamily: DISPLAY_FONT, fontWeight: 700, fontSize: 24, marginBottom: 12, color: COLORS.primaryDeep }}>
              Well done, {name || "there"}!
            </h1>
            <p style={{ color: COLORS.inkSoft, lineHeight: 1.6, marginBottom: 36, padding: "0 8px" }}>
              You noticed how Sam was feeling through the whole morning.
            </p>
            <PrimaryButton onClick={() => setScreen("welcome")}>Start again</PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
}
