import { useEffect, useRef } from "react";

export default function Word({ wordData, allWords, index }) {
  const meanings = wordData.meanings.map((meaning, index) => (
    <Meaning key={index} meaning={meaning} />
  ));

  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(
      wordData.phonetics?.find(
        (phonetics) => phonetics.text && phonetics.audio
      ).audio
    );
  }, [wordData]);
  return (
    <div className="word-container">
      <section className="word-header">
        <div className="word-heading-left">
          <h1 className="heading-l">
            {wordData.word}{" "}
            <span className="index text-s">
              ({index + 1} out of {allWords.length})
            </span>
          </h1>

          {wordData.phonetic && (
            <p className="heading-m phonetic">{wordData.phonetic}</p>
          )}
        </div>

        {wordData.phonetics?.find(
          (phonetics) => phonetics.text && phonetics.audio
        ) && (
          <button onClick={() => audioRef.current.play()} className="play-btn">
            <img src="icon-play.svg" alt="play icon" />
          </button>
        )}
      </section>

      {meanings}

      <div className="source-section">
        <div className="full-line"></div>
        <p className="text-m section-heading source-heading">Source</p>
        <div className="source-link-container">
          <a href={wordData.sourceUrls[0]}>{wordData.sourceUrls[0]}</a>
          <button className="new-window-btn">
            <img src="icon-new-window.svg" alt="new window icon" />
          </button>
        </div>
      </div>

      <div className="full-line"></div>
    </div>
  );
}

const Meaning = ({ meaning }) => {
  return (
    <section>
      <div className="part-of-Speech">
        <p className="heading-m italic">{meaning.partOfSpeech}</p>
        <div className="line"></div>
      </div>

      <p className="text-m section-heading">Meaning</p>
      <ul className="meanings-list">
        {meaning.definitions.map((definition, index) => (
          <li key={index}>
            <p className="definition text-m">{definition.definition}</p>
            {definition.example && (
              <p className="text-m italic example">"{definition.example}"</p>
            )}
          </li>
        ))}
      </ul>

      {meaning.synonyms.length > 0 && (
        <div className="synonyms-container">
          <p className="text-m section-heading">Synonyms</p>
          <ul className="synonyms-list">
            {meaning.synonyms.map((synonym, index) => (
              <li className="text-m" key={index}>
                {synonym}
              </li>
            ))}
          </ul>
        </div>
      )}

      {meaning.antonyms.length > 0 && (
        <div className="synonyms-container">
          <p className="text-m section-heading">antonyms</p>
          <ul className="synonyms-list">
            {meaning.antonyms.map((antonym, index) => (
              <li className="text-m" key={index}>
                {antonym}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
