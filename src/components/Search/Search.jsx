import { Button } from "primereact/button";
import { ButtonGroup } from "primereact/buttongroup";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import styles from "./Search.module.css";

import { DocContext } from "../../store/doctors-cnxt";
import { useContext, useRef, useState } from "react";

function getMajors(fetchedDoctors) {
  const majorsSet = new Set(fetchedDoctors.map((elemnt) => elemnt.major));
  return [
    ...Array.from(majorsSet).map((major) => {
      return { label: major, code: major };
    }),
  ];
}

export default function Search({ fetchedDoctors }) {
  const majors = getMajors(fetchedDoctors);
  const { setFilter, setActiveIndex } = useContext(DocContext);
  const [selectedMajor, setSelectedMajor] = useState(null);

  const nameField = useRef(null);
  function onSearch() {    
    
    setFilter((prevFilter) => {
      return {
        ...prevFilter,
        major: selectedMajor ? selectedMajor.label : null,
        name: nameField.current.value === "" ? null : nameField.current.value
      }
    })
  }

  
  return (
    <div className={`p-d-flex p-ai-center p-jc-start ${styles.container}`}>
      <InputText
        ref={nameField}
        placeholder="Search Keyword"
        className={`p-ml-2 ${styles.input}`}
      />

      <Dropdown
        value={selectedMajor}
        options={majors}
        filter
        showClear
        className={`w-full md:w-14rem ${styles.input}`}
        placeholder="Select a Major"
        onChange={(e) => setSelectedMajor(e.value)}
      />

      <ButtonGroup>
        <Button
          label="Search"
          icon="pi pi-search"
          className={`p-button-warning ${styles.button}`}
          onClick={onSearch}
        />

        <Button
          label="Clear"
          icon="pi pi-times"
          className={`p-button-warning ${styles.button}`}
          onClick={() => {
            setActiveIndex(0);
            setSelectedMajor(null);
            nameField.current.value = ''
            setFilter({
              name: null, city: null, major: null
            })
          }}
        />
      </ButtonGroup>
    </div>
  );
}
