export function addLineBreaksReact(text: string) {
  const sentences = text.split('. ').filter(s => s.trim() !== '');
  return sentences.map((sentence, i) => (
    <span key={i} className="block">
      • {sentence.trim()}
      {i < sentences.length - 1 && '.'}
      <br />
    </span>
  ));
}
