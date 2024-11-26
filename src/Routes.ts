import { lazy } from "react";
//Customer
const CustomerDashBoard = lazy(() => import('./Screen/Consumer/Dashboard/CustomerDashBoard'));
const CustomerRoofAnalysis = lazy(() => import('./Screen/Consumer/RoofAnalysis/ConsumerRoofAnalysis'));

export type routeType = { path: string, Component: React.LazyExoticComponent<() => JSX.Element>}[];
export const routes: routeType = [
    { path: "/Consumer", Component: CustomerDashBoard },
    { path: "/Consumer/RoofAnalysis", Component: CustomerRoofAnalysis }
]

