const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

export const randomMinute = (from: number, to: number) => {
  return randomNumber(from, to) * 60 * 1000;
}