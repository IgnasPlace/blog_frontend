import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "../components/layout/Header/Header";
import Posts from "../pages/Posts/Posts";
import Login from "../pages/Login/Login";
import ProtectedRoute from "./ProtectedRoute";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import AnonymousRoute from "./AnonymousRoute";
import CreatePost from "../components/ui/Post/CreatePost";
import LoginFailed from "../pages/Login/LoginFailed";
import MyPosts from "../pages/Posts/MyPosts";

const Router = () => {
  const user = useSelector((state: RootState) => state.user.user);
  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
        <Route element={<ProtectedRoute user={user} redirectPath="/login" />}>
          <Route path="/" element={<Posts />} />
          <Route path="/my-posts" element={<MyPosts user={user} />} />
          <Route path="/create-post" element={<CreatePost user={user} />} />
        </Route>
        <Route element={<AnonymousRoute user={user} redirectPath="/" />}>
          <Route path="/login" element={<Login />} />
          <Route path="/login/failed" element={<LoginFailed />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
