import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import UserProfile from './pages/UserProfile';
import CreateListing from './pages/CreateListing';
import UserListings from './pages/UserListings';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';

function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/listings/:id' element={<Listing />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path='/user-profile' element={<UserProfile />} />
            <Route path='/create-listing' element={<CreateListing />} />
            <Route path='/update-listing/:id' element={<UpdateListing />} />
            <Route path='/user-profile/userListings' element={<UserListings />} />
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
