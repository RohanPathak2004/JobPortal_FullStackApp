import './App.css'
import {Route, Router, Routes} from "react-router-dom";
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
import DashboardLayout from "./pages/DashboardLayout.jsx";
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


    return (
        <div className='h-screen mx-auto bg-mist-50'>

            <AuthContextProvider>
                <JobContextProvider>
                    <NavigationBar/>
                    <Container>
                        <Routes>
                            <Route path="/" element={<Home/>}></Route>

                            <Route path="/search" element={<Search/>}></Route>
                            <Route path="/jobPost/:postId" element={<RecruiterRoute/>}></Route>
                            <Route path={'/login'} element={<Login/>}/>
                            <Route path={'/register'} element={<Register/>}/>
                            <Route path={'/dashboard'} element={<DashboardLayout/>}>
                                <Route path={'admin'} element={<AdminDashboard/>}>
                                    <Route index element={<JobPostedByAdmin/>}/>
                                    <Route path={'applications'} element={<Applications/>}/>
                                    < Route path="addJob" element={<AddJob/>}/>
                                </Route>
                                <Route path={'candidate'} element={<UserDashboard/>}/>
                            </Route>
                            <Route path={'/review/application/:applicationId'} element={<ApplicationReview/>}/>
                        </Routes>
                    </Container>
                </JobContextProvider>
            </AuthContextProvider>

        </div>

    )
}

export default App
