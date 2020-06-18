export const getBorderRadius = (
  rouded: boolean,
  extraRounded: boolean
): number => {
  if (rouded) {
    return 4;
  }

  if (extraRounded) {
    return 8;
  }

  return 100;
};
