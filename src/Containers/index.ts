import { lazy } from "react";
const DefaultHeader = lazy(()=>import("./DefaultLayouts/DefaultHeader"));
const DefaultAside = lazy(()=>import("./DefaultLayouts/DefaultAside"));
const DefaultProtectedContainer= lazy(()=>import("./DefaultLayouts/DefaultProtectedContainer"));
export { DefaultHeader,DefaultAside,DefaultProtectedContainer}