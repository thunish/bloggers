import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from "./ui/pages/Signup";
import { Signin } from "./ui/pages/Signin";
import { Blog } from "./ui/pages/Blog";
import { Blogs } from "./ui/pages/Blogs";
import { NewBlog } from "./ui/pages/NewBlog";
import { RecoilRoot } from "recoil";
import { Navigate } from "react-router-dom";


function App() {
  return (
    <>
      <RecoilRoot>
        <div>
          <BrowserRouter>
            <Routes>
              <Route path="/signup" element={<Signup></Signup>}></Route>
              <Route path="/signin" element={<Signin></Signin>}></Route>
              <Route path="/blog/:id" element={<Blog></Blog>}></Route>
              <Route path="/blogs" element={<Blogs></Blogs>}></Route>
              <Route path="/new-story" element={<NewBlog></NewBlog>}></Route>
              <Route path="*" element={<Navigate to="/signup" />} />
            </Routes>
          </BrowserRouter>
        </div>
      </RecoilRoot>
    </>
  )
}

export default App
