
import './App.css'
// import { useTranslation, Trans } from 'react-i18next'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ViewLanguagePage from './Pages/ViewLanguagePage'
import CreateLanguagePage from './Pages/CreateLanguagePage'
import EditLanguagePage from './Pages/EditLanguagePage'
import HomePage from './Pages/HomePage';
// const lngs = {
//   en: { nativeName: 'English' },
//   de: { nativeName: 'Deutsch' },
//   ar: { nativeName: 'Arabic' },
// }
function App() {
  // const { t, i18n } = useTranslation()
  // const name_field = 'meta soft'
  // const condition = 'here is a condition'


  // const googleTranslateElementInit = () => {
  //   new window.google.translate.TranslateElement(
  //     {
  //       pageLanguage: "en",
  //       autoDisplay: false,
  //       layout: window.google.translate.TranslateElement.InlineLayout.TEXT,
  //     },
  //     "google_translate_element"
  //   );
  // };

  // const styleTag = document.createElement("style");
  // styleTag.innerHTML = `
  //   .goog-te-menu-value:hover,
  //   .goog-te-menu2-item:hover {
  //     background-color: transparent !important;
  //     color: inherit !important;
  //     text-decoration: none !important;
  //   }
  // `;
  // document.head.appendChild(styleTag);


  // useEffect(() => {
  //   var addScript = document.createElement("script");
  //   addScript.setAttribute(
  //     "src",
  //     "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
  //     // "//translate.google.com/translate_a/element.js?cb=loadGoogleTranslate"
  //   );
  //   document.body.appendChild(addScript);
  //   window.googleTranslateElementInit = googleTranslateElementInit;
  // }, []);


  return (
    <>

      {/* <div>
        {Object.keys(lngs).map((lng) => (
          <button type='submit' key={lng} onClick={() => i18n.changeLanguage(lng)} disabled={i18n.resolvedLanguage === lng} >{lngs[lng].nativeName} </button>
        ))}
      </div>
      <h1>{t('welcome')}</h1>
      <div className="card">
        <p>
          <Trans i18nKey={'description'}>

            Edit <code>src/App.jsx</code> and save to test HMR
          </Trans>
        </p>
        <p>{t('newKey', 'no key found it will automatically come')}</p>
        <p>{condition ? condition : t('other', { name_field })}</p>
      </div> */}

      {/* <div id="google_translate_element"></div>
      <h4>Start building your app. Happy Coding!</h4>
      <h1>hello world</h1> */}
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/languages' element={<ViewLanguagePage />} />
          <Route path='/create-language' element={<CreateLanguagePage />} />
          <Route path='/edit-language' element={<EditLanguagePage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
