


import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import MovieList from "./Components/MovieList";

import { useState } from "react";
import Login from "./Components/Login";
function App() {
  const [user, setUser] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (user) {
  //     navigate("/movie-list");
  //   } else {
  //     navigate("/login");
  //   }
  // }, [user]);

  return (
    <>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/MovieList" element={<MovieList/>} />
    </Routes>
    </>



    // <div className="App">
    //   <Login user={user} setUser={setUser} />
    //   <Routes>
        
    //     <Route path="/" Component={Home} />

    //     <Route path="/login"
    //       element={<Login user={user} setUser={setUser} />}/>

    //     <Route path="/movie-list"
    //       element={ <PrivateRouter user={user}>  <MovieList />
    //     </PrivateRouter>
    //       }
    //     />

    //     <Route path="/movie-details/:id" element={<MovieDetails />} />
    //     <Route
    //       path="/admin"
    //       element={
    //         <PrivateRouter user={user}>
    //           <Admin />
    //         </PrivateRouter>
    //       }
    //     />
    //   </Routes>

    // </div>
  );
}

export default App;








//     <div className='App'>
//       <Login user={user} setuser={setUser} />
//     <Routes>

      
//     
//       <Route path='/' Components={Home} />
//       <Route path='movie-list' Components={MovieList} />
//       <Route path='movie-details/:id' Components={Home} />
//       <Route path='admin' element={<PrivateRoute> <Admin/> </PrivateRoute>} />
//       <Route path='admin' element={<PrivateRoute> <Admin/> </PrivateRoute>} />
//       <Route path='admin' element={<PrivateRoute> <Admin/> </PrivateRoute>} />



