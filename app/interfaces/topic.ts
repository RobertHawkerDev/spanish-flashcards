import IWord from './word';

export default interface ITopic {
  id: string;
  name: string;
  slug: string;
  icon_png: string;
  icon_svg: string;
  description: string;
  word_count: number;
  words: IWord[];
}
