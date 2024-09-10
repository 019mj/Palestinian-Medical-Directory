import { createContext } from "react";

export const DocContext = createContext({
  activeIndex: 0,
  setActiveIndex: () => {},
  filter: {},
  setFilter: () => {}
});
