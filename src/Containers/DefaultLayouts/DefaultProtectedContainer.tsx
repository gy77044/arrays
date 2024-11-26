import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { getAuthState } from "../../Utils/AuthRedirections";
import { AuthState, userRole } from "../../Utils/Const";
import {
  ConsumerRoofAnalysisRoutes,
  DefaultAsideType,
} from "./AsideRouteLists";
import DefaultAside from "./DefaultAside";
import DefaultHeader from "./DefaultHeader";

export const routeMap: { [key: string]: DefaultAsideType[] } = {
  "/Consumer/RoofAnalysis": ConsumerRoofAnalysisRoutes,
};

const DefaultContainer = ({ pathname }: { pathname: string }) => {
  const [routeList, setRouteList] = useState([] as DefaultAsideType[]);

  useEffect(() => {
    setRouteList(getRouteList(pathname));
  }, [pathname]);

  const getRouteList = (pathname: string): DefaultAsideType[] => {
    return routeMap[pathname] || [];
  };

  return (
    <>
      {/* <div className="home-container">
        <div className="action-container z-10"></div>
        <div className="center-container " style={{ backgroundColor: "white" }}>
          <div className="header-container">
            <DefaultHeader />
          </div>
          <ErrorBoundary>
          <Outlet />
          </ErrorBoundary>
        </div>
      </div> */}
      {/* <NewLayout /> */}
      {/* <div className="flex flex-col h-screen">
        <header className="sticky top-0 h-16">
          <DefaultHeader />
        </header>
        <div className="flex-1">
          <div className="flex flex-row">
            <aside className="h-screen w-14 sticky left-0">
              <DefaultAside routeList={routeList} />
            </aside>
            <main className="flex-1">
              <Outlet />
            </main>
          </div>
        </div>
        <main className="">
        </main>
        <footer className="sticky bottom-0 h-9">
          <Footer />
        </footer>
      </div> */}
      <div className="flex flex-col h-screen">
        <header className="flex-none sticky top-0 h-[6.3vh] z-50">
          <DefaultHeader />
        </header>
        <main className="grow flex flex-row h-[calc(100vh-8.5vh)]">
          <nav className={`${pathname==="/Consumer"?"hidden":"flex-none w-[7.2vh]"}`}>
            <DefaultAside routeList={routeList} />
          </nav>
          <section className="grow w-auto overflow-auto">
            <Outlet />
          </section>
        </main>
        {<footer className={`${pathname==="/Consumer"||pathname==="/Partner/Dashboard"?"hidden":"flex-none sticky bottom-1 bg-gray-100/80 h-[2vh]"}`}>
          <Footer /> 
        </footer>}
      </div>
    </>
  );
};

const DefaultProtectedContainer: React.FC<any> = () => {
  let { pathname } = useLocation(),
    allowedRoles = [
      "Consumer"
    ] as userRole[];
  const auth: AuthState = getAuthState();
  const userRole = auth?.user?.role;
  if (!auth.isAuthenticated || !userRole) {
    localStorage.clear();
    return <Navigate to="/" />;
  }
  if (!pathname.startsWith(`/${userRole}`)) {
    allowedRoles = [];
  }
  if (!allowedRoles.includes(userRole!)) {
    return (
      <Navigate
        to={
          userRole === "Consumer"
            ? "/Consumer"
            : '/'
        }
      />
    );
  }
  if (pathname === "/Admin/RoofAnalysis/") {
    pathname = "/Admin/RoofAnalysis";
    window.location.href = `${window.location.origin}/`;
  }
  return <DefaultContainer pathname={pathname} />
};

export default DefaultProtectedContainer;





// import React, { useEffect, useState } from 'react';
// import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import { getAuthState } from '../../Utils/AuthRedirections';
// import { AuthState, userRole } from '../../Utils/Const';
// import { ConsumerRoofAnalysisRoutes, DefaultAsideType, PartnerAsideRouteList, PartnerRoofAanalysisAsideRouteList } from './AsideRouteLists';
// import DefaultHeader from './DefaultHeader';
// import DefaultAside from './DefaultAside';
// import { store } from '../../ReduxTool/store/store';
// import { toast } from 'react-toastify';

// export const routeMap: { [key: string]: DefaultAsideType[] } = {
//   "/Consumer/RoofAnalysis": ConsumerRoofAnalysisRoutes,
//   "/Partner/Dashboard": PartnerAsideRouteList,
//   "/Partner/LeadBoards": PartnerAsideRouteList,
//   "/Partner/InstallerBoard": PartnerAsideRouteList,
//   "/Partner/TrainingSOPBoard": PartnerAsideRouteList,
//   "/Partner/RoofAnalysis": PartnerRoofAanalysisAsideRouteList,
//   "/Admin/RoofAnalysis": PartnerRoofAanalysisAsideRouteList,
// };

// const DefaultContainer = ({ pathname }: { pathname: string }) => {
//   const [routeList, setRouteList] = useState([] as DefaultAsideType[]);

//   useEffect(() => {
//     setRouteList(getRouteList(pathname))
//   }, [pathname]);


//   const getRouteList = (pathname: string): DefaultAsideType[] => {
//     return routeMap[pathname] || [];
//   };

//   return (
//     <>
//       <div className="home-container">
//         <div className="action-container z-20">
//           <DefaultAside routeList={routeList} />
//         </div>
//         <div className="center-container " style={{ backgroundColor: "white" }}>
//           <div className="header-container">
//             <DefaultHeader />
//           </div>
//           <Outlet />
//         </div>
//       </div>
//     </>
//   );
// };

// const DefaultProtectedContainer: React.FC<any> = () => {
//   let { pathname } = useLocation(),allowedRoles = ['Admin','Consumer','Partner','verifyUserType'] as userRole[];
//   const auth: AuthState = getAuthState();
//   const userRole = auth?.user?.role;
//   if (!auth.isAuthenticated || !userRole) {
//     localStorage.clear();
//     return <Navigate to="/" />;
//   };
//   if(!pathname.startsWith(`/${userRole}`)){
//     allowedRoles = [];
//   };
//   if (!allowedRoles.includes(userRole!)) {
//     return <Navigate to={userRole === "Consumer" ? "/Consumer" : userRole === "Partner" ? "/Partner/Dashboard" : userRole === "verifyUserType" ? "/verifyUserType" : "/Admin/RoofAnalysis"} />;
//   };
//   if(pathname === "/Admin/RoofAnalysis/"){
//     pathname = "/Admin/RoofAnalysis"
//     window.location.href = `${window.location.origin}/Admin/RoofAnalysis`;
//   }
//   return <DefaultContainer pathname={pathname} />;
// };

// export default DefaultProtectedContainer;
