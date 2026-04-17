import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PageHeader from './PageHeader';
import LogIn from './LogIn';
import SignUp from './SignUp';
import Dashboard from './Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <PageHeader />

        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;