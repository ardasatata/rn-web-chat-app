import { ms } from "react-native-size-matters"

/**
 * The available spacing.
 *
 * Here's the rough guideline.  Customize this for you usage.  It's ok to put exceptions
 * within the components themselves if they are truly exceptions.
 *
 * 0 = none    - nothing. only here to bust out of a zero-based array.
 * 1 = tiny    - elements contextually close to each other
 * 2 = smaller - for groups of closely related items or perhaps borders
 * 3 = small   - ?
 * 4 = medium  - ?
 * 5 = medium+ - ?
 * 6 = large   - between groups of content that aren't related?
 * 7 = huge    - ?
 * 8 = massive - an uncomfortable amount of whitespace
 */
export const spacing = {
  // * designer scale

  // Scale by name
  zero: 0,
  pixel: ms(1),
  nano: ms(2),
  tiny: ms(4),
  regular: ms(6), // * Regular
  small: ms(8),
  medium: ms(12), // * Medium
  extraMedium: ms(16),
  large: ms(24), // * Large
  extraLarge: ms(28), // * Extra Large
  extraLarge2: ms(36),
  extraLarge3: ms(42),
  huge: ms(64),

  // Scale by number
  "1": ms(1),
  "2": ms(2),
  "3": ms(3),
  "4": ms(4),
  "5": ms(5),
  "6": ms(6),
  "8": ms(8),
  "10": ms(10),
  "12": ms(12),
  "14": ms(14),
  "16": ms(16),
  "18": ms(18),
  "20": ms(20),
  "22": ms(22),
  "24": ms(24),
  "28": ms(28),
  "32": ms(32),
  "36": ms(36),
  "42": ms(42),
  "48": ms(48),
  "54": ms(54),
  "60": ms(60),
  "64": ms(64),
  "67": ms(67),
  "72": ms(72),
  "84": ms(84),
  "96": ms(96),
  "112": ms(112),
  "128": ms(128),
  "144": ms(144),
  "160": ms(160),
  "256": ms(256),
  "320": ms(320),
  "480": ms(480),
}

// Custom Spacing
export const CustomSpacing = ms
