import { useRecoilState } from 'recoil';
import './App.css';
import LoadingScreen from './Component/LoadingScreen/LoadingScreen';
import DashBoard from './Pages/DashBoard/DashBoard';
import { loadingStatus } from './Recoil';
import { useEffect } from 'react';

function App() {
  const  [isLoading, SetIsloading] = useRecoilState(loadingStatus)
  const authToken = JSON.parse(localStorage.getItem("token"));

//   useEffect(()=>{
// if(!authToken){
//  window.location.href="/"
// }
//   },[])

  return (
    <div className="App">
      {isLoading  &&  <LoadingScreen />}
       <DashBoard/>
    </div>
  );
}

export default App;
