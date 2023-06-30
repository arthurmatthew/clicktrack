interface Section {
  name: string;
  id: string;
  position: number;
  permanant: boolean;
  data: {
    bpm: number;
  };
  opened?: boolean;
}

export default Section;
