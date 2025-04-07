import { ReactElement } from "react";

export interface ViewModeSelectorProps {
  viewMode: string;
  setViewMode: (mode: string) => void;
  renderViewModeIcon: () => ReactElement;
}

export type ViewModeTabsProps = Omit<
  ViewModeSelectorProps,
  "renderViewModeIcon"
>;
