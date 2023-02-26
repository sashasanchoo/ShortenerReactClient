import './App.css';
import Layout from './Components/Layout';
import Navbar from './Components/Navbar';
import StateProvider from './Context/StateProvider';
import RoutesProvider from './Pages/RoutesProvider';

function App() {
  return (
    <StateProvider>
      <Navbar/>
      <Layout>
        <RoutesProvider/>
      </Layout>

    </StateProvider>
  );
}

export default App;
