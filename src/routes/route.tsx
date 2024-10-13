import Home from "../pages/Home/Home";
import PathConstants from "./PathConstants.tsx";
import Login from "../pages/Auth/Login/Login.tsx";
import StudentList from "../pages/Students/StudentList.tsx";
import StudentForm from "../pages/Students/StudentForm.tsx";

const routes = [
    {
        path:"",
        element: <Home/>,
    },
    {
        path: "/login",
        element:<Login/>
    },
    {
        path: PathConstants.STUDENTS,
        element:<StudentList/>
    },
    {
        path: "/students/form",
        element:<StudentForm/>
    }
]

export default routes;