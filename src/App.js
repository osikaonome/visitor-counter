import logo from './logo.svg';
import './App.css';
import GetIP from './component/GetIP';
import Footer from './component/footer/Footer';

function App() {
  return (
    <div className="App">
      <div className='wrapper'>
        <div className='header'>
          <img src='https://res.cloudinary.com/shopsfit/image/upload/v1688810852/MyAreaa/logo_nry2ce.svg' alt="Logo" />
        </div>
        <GetIP />
        <div className='footer-container'>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
