import { MouseEventHandler, PropsWithChildren } from "react";

export default function Button_Sidebar(
  props: PropsWithChildren & {
    className?: string;
    clickHandle?: MouseEventHandler;
    id?: string;
  },
) {
  return (
    <div className={props.className} id={props.id} onClick={props.clickHandle}>
      {props.children}
    </div>
  );
}
