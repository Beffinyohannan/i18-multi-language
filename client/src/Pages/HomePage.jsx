import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { Link } from 'react-router-dom'

const lngs = {
    en: { nativeName: 'English' },
    de: { nativeName: 'Deutsch' },
    ar: { nativeName: 'Arabic' },
}

function HomePage() {
    const { t, i18n } = useTranslation()
    const name_field = 'meta soft'
    const condition = 'here is a condition'


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
        <div className='text-center mt-10 gap-5'>
            <h1 className='mt-10 text-2xl font-bold' >Multi Language</h1>

            <div className='mt-5'>
                {Object.keys(lngs).map((lng) => (
                    <Button className='ml-3' type='' key={lng} onClick={() => i18n.changeLanguage(lng)} disabled={i18n.resolvedLanguage === lng} >{lngs[lng].nativeName} </Button>
                ))}
            </div>
            <h1 className='mt-5 text-xl font-bold'>{t('welcome')}</h1>
            <div className="mt-5  font-semibold">
                <p>
                    <Trans i18nKey={'description'}>

                        Edit <code>src/App.jsx</code> and save to test HMR
                    </Trans>
                </p>
                <p>{t('newKey', 'no key found it will automatically come')}</p>
                <p >{condition ? condition : t('other', { name_field })}</p>
            </div>
            <div className='mt-10'>

                <Link to={'/languages'} className='bg-sky-500 p-2 text-sm rounded-lg  '   ><PlusOutlined />Manage languages</Link>
            </div>

            {/* <div id="google_translate_element"></div>
      <h4>Start building your app. Happy Coding!</h4>
      <h1>hello world</h1> */}
        </div>
    )
}

export default HomePage