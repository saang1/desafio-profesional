/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { InputGroup, FormControl, ListGroup } from "react-bootstrap";

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
    const handler = setTimeout(() => {
        setDebouncedValue(value);
    }, delay);

    return () => {
        clearTimeout(handler);
    };
    }, [value, delay]);

    return debouncedValue;
};

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [highlightedText, setHighlightedText] = useState("");
    const inputRef = useRef(null); 
    const debouncedQuery = useDebounce(query, 500); 

    useEffect(() => {
    if (debouncedQuery) {
        setLoading(true);
        axios
        .get(`/api/products/suggestions?query=${debouncedQuery}`)
        .then((response) => {
            setSuggestions(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching suggestions:", error);
            setLoading(false);
        });
    } else {
        setSuggestions([]);
    }
    }, [debouncedQuery]);

    useEffect(() => {
    inputRef.current?.focus(); 
    }, []);

const highlightMatch = (text) => {
    if (!debouncedQuery) return text;
    const regex = new RegExp(`(${debouncedQuery})`, "gi");
    return text.split(regex).map((part, index) =>
        regex.test(part) ? (
        <span key={index} style={{ fontWeight: "bold", color: 'red' }}>
            {part}
        </span>
        ) : (
        part
    )
    );
};

const handleSuggestionHover = async (id) => {
    try {
    const response = await axios.get(`/api/products/${id}`);
    console.log("Prefetched product data:", response.data);
    } catch (error) {
    console.error("Error fetching product data for pre-fetching:", error);
    }
};

return (
    <div>
    <InputGroup className="mb-3">
        <FormControl
        ref={inputRef}
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        />
    </InputGroup>
        {loading && <p>Loading...</p>}
        {suggestions.length > 0 && (
        <ListGroup>
            {suggestions.map((suggestion, index) => (
            <ListGroup.Item
                key={index}
                onMouseEnter={() => handleSuggestionHover(suggestion.id)} 
                onClick={() => {
                console.log(`Navigate to product ${suggestion.id}`);
            }}
            >
              {highlightMatch(suggestion.name)} {/* Highlight matching text */}
            </ListGroup.Item>
            ))}
        </ListGroup>
        )}
    </div>
    );
};

export default SearchBar;
