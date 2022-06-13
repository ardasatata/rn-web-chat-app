import { ms } from "react-native-size-matters"

export const roundness = {
  none: 0,
  xs: ms(2),
  sm: ms(4),
  md: ms(8),
  lg: ms(12),
  full: ms(9999),

  // * designer guideline for border radius, would implement later
  small: ms(2),
  regular: ms(4),
  medium: ms(6),
  circle: ms(48),
}