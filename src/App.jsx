import { useAppContext } from './context/AppContext'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/layout/Layout'
import Home from './components/pages/Home'
import About from './components/pages/About'
import FAQ from './components/pages/FAQ'
import Contact from './components/pages/Contact'
import Loading from './components/common/Loading'
import Error from './components/common/Error'

function App() {
  const { loading, error } = useAppContext();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Error message={error} />
      </div>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Layout>
  );
}

export default App
