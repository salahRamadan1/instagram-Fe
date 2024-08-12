
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './component/auth/Login';
import OnBoarding from './component/onBoarding/OnBoarding';
import { useEffect, useState } from 'react';
import Register from './component/auth/Register';
import VerfiyEmail from './component/auth/VerfiyEmail';
import Footer from './component/footer/Footer';
import CheckEmail from './component/auth/CheckEmail';
import ResetPassWord from './component/auth/ResetPassWord';
import MainHome from './component/home/MainHome';
import LeftBar from './component/LeftBar/LeftBar';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from './redux/auth/authSlice';



import GetSomeFirend from './component/FriendComponent/GetSomeFirend';
import AllFreind from './component/FriendComponent/AllFreind';
import MainFriend from './component/FriendComponent/MainFriend';
import RequestFreind from './component/FriendComponent/RequestFreind';
import StillThereRequest from './component/FriendComponent/StillThereRequest';
import MainMessage from './component/message/MainMessage';
import Notif from './component/notification/Notif';
import MyAccount from './component/myAccount/MyAccount';
import MainFriendAccount from './component/friendAccount/MainFriendAccount';
import Setting from './component/settings/Setting';
function App() {
  // 2. Data Fetching and Error Handling:
  const dispatch = useDispatch();
  const {
    isLoggedIn
  } = useSelector((state) => state.auth); // Get auth data and errors from Redux store
  const navigate = useNavigate()
  const [datas, setDatas] = useState([])

  useEffect(() => {
    dispatch(logIn())


    if (!localStorage.getItem('firstTime')) {
      navigate('/onBoarding')
    }





  }, [])
  return (
    <>
      {isLoggedIn &&
        <LeftBar />
      }

      <Routes>
        {/* on boarding */}
        <Route path='/onBoarding' element={<OnBoarding />} />
        {/* auth */}
        <Route path='' element={<Login />} />
        
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='verifyEmail' element={<VerfiyEmail />} />
        <Route path='checkEmail' element={<CheckEmail />} />
        <Route path='resetPassWord' element={<ResetPassWord />} />
        {/* home */}
        <Route path='mainHome' element={<MainHome />} />
        <Route path='friend' element={<GetSomeFirend />} />
        <Route path='mainFriend' element={<MainFriend />} >
          <Route path='/mainFriend' element={<AllFreind />} />
          <Route path='allfriend' element={<AllFreind />} />
          <Route path='requestfriend' element={<RequestFreind />} />
          <Route path='stillThereRequest' element={<StillThereRequest />} />

        </Route >
        <Route path='message' element={<MainMessage />} />
        <Route path='notif' element={<Notif />} />
        <Route path='myAccount' element={<MyAccount />} />
        <Route path='MainFriendAccount' element={<MainFriendAccount />} />
        <Route path='setting' element={<Setting />} />

      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
