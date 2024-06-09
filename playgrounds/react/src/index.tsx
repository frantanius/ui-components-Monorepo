import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Dropdown } from "@makyo-components/ui-components";
import "@makyo-components/ui-components/build/index.css";

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const App = () => {
  const [selectedOption, setSelectedOption] = useState<string[]>([]);

  const handleChange = (selected: any) => {
    setSelectedOption(selected);
  };

  return (
    <>
      <Dropdown
        options={options}
        multiple={true}
        withSearch={true}
        onChange={handleChange}
        placeholder="Select an option"
      />
    </>
  );
};

root.render(<App />);
