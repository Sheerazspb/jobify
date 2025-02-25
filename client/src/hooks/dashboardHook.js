import { useContext } from "react";
import { createContext } from "react";

export const DashboardContext = createContext();

export const useDashboardContext = () => useContext(DashboardContext);
