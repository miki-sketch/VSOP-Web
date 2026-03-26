export const SHEET_ID = '1tiks8xZQukiy-xdzaSUzk-90BoKOv397S47i2HFkggU';

export const GAS_URL =
  'https://script.google.com/macros/s/AKfycbyoVXp7Au4e-oDHIm5w-4lo0dAqFWD09-fwMnj--m8pR3lobVdLsFclDy13Lf1TeOLg/exec';

export const GIDS = {
  announce: '1844759834',
  highlights: '1814448426',
  members: '113750912',
};

export const csvUrl = (gid) =>
  `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${gid}`;
