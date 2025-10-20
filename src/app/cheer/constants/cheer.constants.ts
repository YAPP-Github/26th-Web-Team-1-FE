export const CHEER_CARD_CONSTANTS = {
  DEFAULT_SIZE: 50,
  ANIMATION: {
    DURATION: 0.3,
    EASE: [0.4, 0.0, 0.2, 1] as const,
  },
} as const;

export const SLIDER_SETTINGS = {
  arrows: false,
  infinite: false,
  speed: 300,
  adaptiveHeight: true,
} as const;
