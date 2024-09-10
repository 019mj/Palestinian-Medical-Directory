import { TabPanel, TabView } from "primereact/tabview";

import { DocContext } from "../../store/doctors-cnxt";
import { useContext } from "react";

function getTabs(fetchedDoctors) {
  const citiesSet = new Set(fetchedDoctors.map((elemnt) => elemnt.city));
  return [
    { label: "All", icon: "pi pi-list" },
    ...Array.from(citiesSet).map((city) => {
      return { label: city, icon: "pi pi-map-marker" };
    }),
  ];
}

export default function Tabs({ fetchedDoctors }) {
  const tabs = getTabs(fetchedDoctors);

  const { setFilter, activeIndex, setActiveIndex } = useContext(DocContext);

  return (
    <div>
      <TabView
        scrollable
        activeIndex={activeIndex}
        onTabChange={(e) => {
          setActiveIndex(e.index);
          setFilter((prevFilter) => {
            return {
              ...prevFilter,
              city: tabs[e.index].label === "All" ? null : tabs[e.index].label 
            };
          });
        }}
      >
        {tabs.map((tab, index) => (
          <TabPanel
            key={index}
            leftIcon={<i className={tab.icon} style={{ marginRight: "8px" }} />}
            header={tab.label}
          />
        ))}
      </TabView>
    </div>
  );
}
