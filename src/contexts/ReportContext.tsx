import { createContext, useContext } from "react";

export const ReportContext = createContext(null);

export const ReportProvider = ReportContext.Provider;

export function useReportContext() {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error(
      "useFormStructureContext must be used within a FormStructureProvider"
    );
  }
  return context;
}
