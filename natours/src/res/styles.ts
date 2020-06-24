import { css } from "@emotion/core";
import facepaint from 'facepaint';

export const defaultFontSize = '1.6rem';

export const gutterHorizontal = '6rem';
export const gutterVertical = '8rem';
export const gutterVerticalSmall = '6rem';
export const gridWidth = '114rem';

export const centerText = css`
  text-align: center;
`;

export const center = css`
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const marginBottom = (size: number) => css`
  margin-bottom: ${size}rem;
`;

export const marginTop = (size: number) => css`
  margin-top: ${size}rem;
`;

/**
 * 0 - 600px     :     Phone
 * 600 - 900px   :     Tablet portrait
 * 900 - 1200px  :     Tablet landscape
 * 1200 - 1800px :     Normal
 * 1800+px       :     Big desktop
 */
const breakpoints = {
  'min-width': [1800], // in px,  from lowest to highest
  'max-width': [1200, 900, 600], // in px, from highest to lowest
}
export const mq = facepaint([
  ...breakpoints['min-width']
    .map(bp => `@media (min-width: ${bp / 16}em)`),
  ...breakpoints['max-width']
    .map(bp => `@media (max-width: ${bp / 16}em)`),
]);

const getSortedBreakpoints = (order: 'smallest' | 'largest') => (values: any[]) => {
  const defaultValue = values[values.length - 1];
  const length = breakpoints["min-width"].length + breakpoints["max-width"].length
  const restValues = Array(length - values.length).fill(defaultValue)

  if (order === 'smallest') {
    return [
      defaultValue,
      ...restValues,
      ...values.reverse(),
    ]
  } else {
    return [
      defaultValue,
      ...values,
      ...restValues,
    ]
  }
};
export const smallest = (values: any[]) => getSortedBreakpoints('smallest')(values)
export const largest = (values: any[]) => getSortedBreakpoints('largest')(values)

export const oneOf = (size: number) => css`
  float: left;

  ${mq({
    width: smallest(['100% !important', '100% !important', `calc((100% - ${size - 1} * ${gutterHorizontal}) / ${size})`]),
  })}

  &:not(:last-child) {
    ${mq({
      marginBottom: smallest([gutterVerticalSmall, gutterVerticalSmall, 'initial']),
      marginRight: smallest([0, 0, gutterHorizontal]),
    })}
  }
`;

export const row = css`
  margin: 0 auto;
  
  ${mq({
    maxWidth: smallest(['50rem', '50rem', gridWidth]),
    padding: smallest(['0 3rem', '0 3rem', 'initial']),
  })}

  &:not(:last-child) {
    ${mq({
      marginBottom: smallest([gutterVerticalSmall, gutterVertical]),
    })}
  }

  &:after {
    content: "";
    display: table;
    clear: both;
  }
`;
