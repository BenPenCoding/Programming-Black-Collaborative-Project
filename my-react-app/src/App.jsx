import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PageHeader from './PageHeader';
import LogIn from './LogIn';
import SignUp from './SignUp';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <PageHeader />

        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;