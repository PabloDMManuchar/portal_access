import "./App.css";
import CardButton from "./components/cardButton/cardButton";

function App() {
  return (
    <>
      <div className="container-title">
        <h1 className="grid text-center text-light p-0">Portal Acceso</h1>
      </div>

      <CardButton />
      {/* <footer className="footer">
        <img src={manucharLogo} alt="LogoIT" className="imagen-footer" />
        <img src={logoItMar} alt="LogoIT" className="imagen-footer" />
      </footer> */}
    </>
  );
}

export default App;
