import { useState } from "react";

const AutoCompleteBar = ({ items, selectItem }) => {
    
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");

  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setValue(query);
    if (query.length > 1) {
      const filterSuggestions = items.filter(
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
    const selectedItem = e.target.innerText;
    setSuggestions([]);
    setValue(selectedItem);
    selectItem([selectedItem]);
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
        onChange={handleInputChange}
      />
      {suggestionsActive && <Suggestions />}
    </div>
  );
  
};

export default AutoCompleteBar; 