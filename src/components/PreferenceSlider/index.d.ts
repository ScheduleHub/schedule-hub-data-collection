export interface PreferenceSliderProps {
  label: string;
  helpMsg: string;
  leftLabel: string;
  rightLabel: string;
  sliderValue: number;
  onSliderValueChange: (event: React.ChangeEvent<{}>, value: number | number[]) => void;
}

export default function PreferenceSlider(props: PreferenceSliderProps): JSX.Element;
