import { LIcon, LineIcon, RectangleIcon } from "../components/icons/icons";

export const layoutSelectionData = [
  {
    id: "layoutOption1",
    layoutType: "Line",
    lengthOptions: [1800, 3600, 5400, 7200, 9000, 10800, 12600, 14400, 16200],
    widthOptions: [],
    // image: <LineIcon />,
  },
  {
    id: "layoutOption2",
    layoutType: "L-shape",
    lengthOptions: [2100, 3900, 5700, 7500, 9300, 11100, 12900, 14700],
    widthOptions: [2100, 3900, 5700, 7500, 9300, 11100, 12900, 14700],
    // image: <LIcon />,
  },
  {
    id: "layoutOption3",
    layoutType: "Rectangle",
    lengthOptions: [2400, 4200, 6000, 7800, 9600, 11400, 13200, 15000],
    widthOptions: [2400, 4200, 6000, 7800, 9600, 11400, 13200, 15000],
    // image: <RectangleIcon />,
  },
];
