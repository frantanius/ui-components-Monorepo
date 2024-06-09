import React, { useState, useRef, useEffect } from "react";
import styles from "./Dropdown.module.css";

type TOption = {
  value: string;
  label: string;
};

interface IDropdown {
  options: TOption[];
  multiple?: boolean;
  withSearch?: boolean;
  onChange: (selected: TOption | TOption[]) => void;
  placeholder?: string;
  label?: string;
}

const Dropdown: React.FC<IDropdown> = ({
  options,
  multiple = false,
  withSearch = true,
  onChange,
  placeholder = "Selects..",
  label = "Label",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<TOption[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: TOption) => {
    if (multiple) {
      const alreadySelected = selectedOptions.includes(option);
      const newSelectedOptions = alreadySelected
        ? selectedOptions.filter((opt) => opt !== option)
        : [...selectedOptions, option];
      setSelectedOptions(newSelectedOptions);
      onChange(newSelectedOptions);
    } else {
      setSelectedOptions([option]);
      onChange(option);
      setIsOpen(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const removeOption = (optionToRemove: TOption) => {
    const newSelectedOptions = selectedOptions.filter(
      (option) => option !== optionToRemove
    );
    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getHighlightedText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={index} className={styles.highlight}>
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.dropdownWrapper}>
        <div
          className={selectedOptions.length !== 0 ? styles.dropdownToggle : ""}
          onClick={toggleDropdown}
        >
          {multiple ? (
            <>
              {selectedOptions.length !== 0 ? (
                <div className={styles.selectedOptions}>
                  {selectedOptions.map((option) => (
                    <div key={option.value} className={styles.selectedOption}>
                      <div className={styles.selectedOptionLabel}>
                        {option.label}
                      </div>
                      <span
                        className={styles.removeOption}
                        onClick={(e) => {
                          e.stopPropagation();
                          removeOption(option);
                        }}
                      >
                        &#x2715;
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  readOnly
                  value=""
                  placeholder={placeholder}
                  className={styles.placeholder}
                />
              )}
            </>
          ) : (
            <input
              type="text"
              readOnly
              value={selectedOptions[0]?.label || ""}
              placeholder={placeholder}
              className={styles.placeholder}
            />
          )}
          <svg
            height="25"
            width="25"
            viewBox="0 0 25 25"
            focusable="false"
            className={styles.dropdownToggleIcon}
          >
            <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" />
          </svg>
        </div>

        {isOpen && (
          <div className={styles.dropdownMenu}>
            {/* Input Search */}
            {withSearch && (
              <div style={{ position: "relative" }}>
                <svg
                  width="20"
                  height="20"
                  className={styles.searchBoxIconSearch}
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
                    stroke="currentColor"
                    fill="none"
                    fill-rule="evenodd"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <input
                  type="text"
                  className={styles.searchBox}
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search"
                />
              </div>
            )}
            {/* Lists Option */}
            <div className={styles.options}>
              {filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`${styles.option} ${
                    selectedOptions.includes(option) ? styles.selected : ""
                  }`}
                  onClick={() => handleOptionClick(option)}
                >
                  {getHighlightedText(option.label, searchTerm)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
