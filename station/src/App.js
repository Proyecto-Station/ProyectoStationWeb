import {
    Routes,
    Route,
} from "react-router-dom";

import Login from "./Auth/Login";
import Home from "./pages/Home";

function App() {
return(
    <div>
        <Routes>
            <Route path='/' element={<Login />}/>
            <Route path='/home' element={<Home />}/>
        </Routes>
    </div>
)
}

export default App;