import { Suspense } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CustomToast from "./Components/CustomToast/CustomToast";
import { routes } from "./Routes";
import "./assests/scss/AllComponents.scss";

import DefaultProtectedContainer from "./Containers/DefaultLayouts/DefaultProtectedContainer";
import Login from "./Screen/User/Login";
import SignUp from "./Screen/User/SignUp";
import Components from "./Screen/Compo";
import { LoadingSpinner } from "./Components/AllInput/AllInput";
const App: React.FC = () => {
  return (
    <>
      <div id="loading" className="loading">
        <LoadingSpinner/>
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        <Router>
          <Routes >
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path='/Comp' element={<Components/>}/>
            <Route element={<DefaultProtectedContainer />}>
              {routes.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} />)}
            </Route>
            <Route path='/*' element={<Navigate to="/" />} />
          </Routes>
        </Router>
        <CustomToast ms={1800} />
      </Suspense>
    </>
  );
}

export default App;

