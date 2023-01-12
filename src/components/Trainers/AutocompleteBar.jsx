import { useState } from "react";

const AutoComplete = ({ data, handlePokemon }) => {
    
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    setValue(query);
    if (query.length > 1) {
      const filterSuggestions = data.filter(
        (suggestion) =>
          suggestion.toLowerCase().indexOf(query) > -1
      );
      setSuggestions(filterSuggestions);
      setSuggestionsActive(true);
    } else {
      setSuggestionsActive(false);
    }
  };

  const handleClick = (e) => {
    setSuggestions([]);
    setValue(e.target.innerText);
    handlePokemon([e.target.innerText]);
    setSuggestionsActive(false);
  };

  const Suggestions = () => {
    return (
      <ul>
        {suggestions.map((suggestion, index) => {
          return (
            <li
              key={index}
              onClick={handleClick}
            >
              {suggestion}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
      />
      {suggestionsActive && <Suggestions />}
    </div>
  );
  
};

export default AutoComplete; 