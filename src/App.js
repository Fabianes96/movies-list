import { useEffect, useReducer } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { auth } from './firebase/firebase-config';
import AppRoutes from './routes/AppRoutes';
import { authReducer } from './services/authService';
import { AuthContext } from './store/auth-context';

function App() {
  const init = ()=> JSON.parse(localStorage.getItem('user'));
  const [user, dispatch] = useReducer(authReducer, {}, init); 
  useEffect(() => {   
    if(!user ){
      return;
    }
    const uns = auth.onAuthStateChanged(usr=>{
      if(usr?.uid){
        localStorage.setItem('user', JSON.stringify({uid:usr.uid,name:usr.displayName,isLogged:true}));
      }else{
        localStorage.removeItem('user');        
      }
    })  
    return (uns);    
  }, [user])
  
  return (
    <AuthContext.Provider value={{user,dispatch}}>
      <Header image='' />
      <AppRoutes />
      <Footer />
    </AuthContext.Provider>
  );
}

export default App;
