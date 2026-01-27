import IWord from '@/app/interfaces/word';

export default function handleWordPronunciation(
  event: React.MouseEvent,
  word: IWord,
) {
  event.stopPropagation();
  globalThis.speechSynthesis?.cancel();
  const pronouncedWord = new SpeechSynthesisUtterance(word.spanish);
  pronouncedWord.lang = 'es-ES';
  globalThis.speechSynthesis?.speak(pronouncedWord);
}
