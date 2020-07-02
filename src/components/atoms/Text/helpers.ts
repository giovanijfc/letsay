export const getFontSize = (
  small: boolean,
  ultraSmall: boolean,
  regular: boolean,
  extraRegular: boolean,
  big: boolean,
  extraBig: boolean
): number => {
  if (small) {
    return 12;
  }

  if (ultraSmall) {
    return 10;
  }

  if (regular) {
    return 14;
  }

  if (extraRegular) {
    return 20;
  }

  if (big) {
    return 24;
  }

  if (extraBig) {
    return 28;
  }

  return 36;
};

export const getFontWeight = (semiBold: boolean, bold: boolean): string => {
  if (semiBold) {
    return '600';
  }

  if (bold) {
    return '900';
  }

  return '100';
};

export const getFontFamily = (bold: boolean, semiBold: boolean): string => {
  if (bold) {
    return 'Graphik-Bold';
  }

  if (semiBold) {
    return 'Graphik-Medium';
  }

  return 'Graphik-Regular';
};
