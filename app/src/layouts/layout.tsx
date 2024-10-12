import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loading from "../components/Loading";



// Default values shown
const Layout = () => {
  return (
    <main>
      <Suspense
        fallback={<Loading size={100}/>}
      >
        <Outlet />
      </Suspense>
    </main>
  );
};

export default Layout;
