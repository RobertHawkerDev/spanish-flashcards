import IWord from './word';

export default interface IDeck {
  id: string;
  name: string;
  slug: string;
  icon_png: string;
  icon_svg: string;
  seo_description: string;
  seo_title: string;
  word_count: number;
  words: IWord[];
}
