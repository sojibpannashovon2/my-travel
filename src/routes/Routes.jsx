import {
      createBrowserRouter,

} from "react-router-dom";




import MainLayout from "../layout/MainLayout";
import Home from "../Components/pages/Home/Home";
import Signup from "../Components/logs/Signup";

const router = createBrowserRouter([
      {
            path: "/",
            element: <MainLayout />,
            children: [

                  {
                        path: "/",
                        element: <Home />
                  },
                  {
                        path: "signup",
                        element: <Signup></Signup>
                  },
            ]
      },
]);


export default router