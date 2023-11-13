export default function Word({ wordData }) {
  const meanings = wordData.meanings.map((meaning, index) => (
    <Meaning key={index} meaning={meaning} />
  ));
  return (
    <div className="word-container">
      <header>
        <div>
          <h1>{wordData.word}</h1>
          {wordData.phonetic && <p>{wordData.phonetic}</p>}
        </div>
        <button>
          <img src="icon-play.svg" alt="play icon" />
        </button>
      </header>

      {meanings}
    </div>
  );
}

const Meaning = ({ meaning }) => {
  return (
    <section>
      <div>
        <p>{meaning.partOfSpeech}</p>
        <hr />
      </div>

      <p>Meaning</p>
      <ul>
        {meaning.definitions.map((definition, index) => (
          <li key={index}>
            <p>{definition.definition}</p>
            {definition.example && <p>{definition.example}</p>}
          </li>
        ))}
      </ul>

      {meaning.synonyms.length > 0 && (
        <div>
          <p>Synonyms</p>
          <ul>
            {meaning.synonyms.map((synonym, index) => (
              <li key={index}>{synonym}</li>
            ))}
          </ul>
        </div>
      )}

      {meaning.antonyms.length > 0 && (
        <div>
          <p>antonyms</p>
          <ul>
            {meaning.antonyms.map((antonym, index) => (
              <li key={index}>{antonym}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
