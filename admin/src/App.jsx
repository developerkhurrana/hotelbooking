import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login/";
import List from "./Pages/List/List";
import Single from "./Pages/Single/Single";
import New from "./Pages/New/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { hotelInputs, userInputs } from "./formSource"
import NewHotel from "./Pages/NewHotel/NewHotel";
import NewRoom from "./Pages/NewRoom/NewRoom";
import UpdateUser from "./Pages/UpdateUser/UpdateUser";
import UpdateRoom from "./Pages/UpdateRoom/UpdateRoom";
import UpdateHotel from "./Pages/UpdateHotel/UpdateHotel";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="user">
              <Route index element={<List listname = {"user"} />} />  
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
              <Route path={"updateuser/:id"} 
              element={<UpdateUser inputs={userInputs} title={"Update User"}/>}/>
            </Route>
            <Route path="hotel">
              <Route index element={<List listname = {"hotel"}   />} />
              <Route path=":hotelId" element={<Single />} />
              <Route
                path="new"
                element={<NewHotel inputs={hotelInputs} title="Add New Hotel" />}
              />
              <Route path={"updatehotel/:id"} element={<UpdateHotel/>}/>

            </Route>
            <Route path="room">
              <Route index element={<List listname = {"room"}   />} />
              <Route path=":roomId" element={<Single />} />
              <Route
                path="new"
                element={<NewRoom inputs={userInputs} title="Add New Room" />}
              />
              <Route path={"updateroom/:id"} element={<UpdateRoom/>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

