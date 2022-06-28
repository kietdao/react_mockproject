import { useTranslation } from "react-i18next";
import Header from "./components/header";
import './App.scss';

function App() {
  const { t } = useTranslation()

  return (
    <div className="App">
      <Header />
        <p>
          {t('welcome')}
        </p>
    </div>
  );
}

export default App;
