import type { RouteSectionProps } from "@solidjs/router";
import HeaderLayout from "./HeaderLayout";

const MainLayout = (props: RouteSectionProps) => {
  return (
    <>
      <HeaderLayout />
      {props.children}
    </>
  );
};

export default MainLayout;
