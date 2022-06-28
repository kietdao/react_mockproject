import React from 'react'
import i18n from "i18next";
import "../../translations/i18n";
      
export default function Header() {
  const changeLanguages = () => {
    i18n.changeLanguage('en')
  }
  return (
    <div>Header
      <button onClick={changeLanguages}>EN / VN</button>
    </div>
  )
}
