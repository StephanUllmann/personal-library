import { Routes, Route, useNavigation, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Books from './pages/Books';
// import { useContext } from 'react';
// import { AuthContext } from './contexts/AuthContext';
import ProtectedLayout from './layouts/ProtectedLayout';
import ReadingList from './pages/ReadingList';

function App() {
  // const { user } = useContext(AuthContext);
  useNavigation;
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='signup' element={<Signup />} />
        {/* <Route path='books' element={user ? <Books /> : <Navigate to={'/signup'} />} /> */}

        <Route element={<ProtectedLayout />}>
          <Route path='books' element={<Books />} />
          <Route path='reading-list' element={<ReadingList />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
