import './App.css'
import {Route, Router, Routes, useNavigate} from "react-router-dom";
import Home from "./pages/Home.jsx";
import NavigationBar from "./components/NavigationBar.jsx";
import AddJob from "./pages/AddJob.jsx";
import Search from "./pages/Search.jsx";
import UpdateAndDeleteJobPost from "./pages/UpdateAndDeleteJobPost.jsx";
import JobContextProvider, {JobContext} from "./context/JobContext.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ValidationContext, {useAuthContext} from "./context/AuthContext.jsx";
import ValidationContextProvider from "./context/AuthContext.jsx";
import {useContext, useEffect} from "react";
import JobPost from "./pages/JobPost.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";
import HomeLayout from "./pages/HomeLayout.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import JobPostedByAdmin from "./pages/JobPostedByAdmin.jsx";
import Applications from "./pages/Applications.jsx";
import ApplicationReview from "./pages/ApplicationReview.jsx";
import Container from "./components/Container.jsx";

const RecruiterRoute = () => {
    const {user} = useAuthContext();
    if (user?.role === 'ROLE_RECRUITER') {
        return <UpdateAndDeleteJobPost/>
    }
    return <JobPost/>;
}

function App() {

    const {user} = useAuthContext();

    const adminRoute = [{
        path: null,
        element: <JobPostedByAdmin/>,
    }, {
        path: 'applications',
        element: <Applications/>,
    }, {
        path: 'addJob',
        element: <AddJob/>,
    }

    ]
    return (
        <div className='min-h-[100vh] bg-white text-zinc-900 transition-colors duration-300 dark:bg-slate-950 dark:text-zinc-100'>

            <JobContextProvider>

                <NavigationBar/>
                <Container>
                    <Routes>
                        <Route path="/" element={<Home/>}></Route>
                        <Route path="/dashboard" element={<UserDashboard/>}/>
                        <Route path="/search" element={<Search/>}></Route>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path={'/register'} element={<Register/>}/>
                        <Route path={'/jobPost/:postId'} element={<JobPost/>}/>
                        {user?.role === 'ROLE_RECRUITER' && <>
                            <Route path='/' element={<AdminDashboard/>}>
                                {adminRoute.map((route) =>
                                    route.path === null
                                        ? <Route key={'index'} index element={route.element}/>
                                        : <Route key={route.path} path={route.path} element={route.element}/>
                                )
                                }

                            </Route>
                            <Route path={'/action/:postID'}
                                   element={<UpdateAndDeleteJobPost/>}
                            />
                            <Route path={'/review/application/:applicationId'} element={<ApplicationReview/>}/>
                            <Route path="/jobPost/:postId" element={<RecruiterRoute/>}></Route>
                        </>
                        }
                    </Routes>
                </Container>
            </JobContextProvider>

        </div>

    )
}

export default App
