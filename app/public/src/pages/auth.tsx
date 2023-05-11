import React from "react"
import Login from "./component/auth/login"
import Media from "./component/auth/media"
import { useTranslation } from 'react-i18next'
import "./auth.css"


export default function Auth() {
  const isSupposedlyMobile = navigator.maxTouchPoints > 0 && window.matchMedia("(orientation: portrait)").matches
  const {t} = useTranslation()
  return (
    <div className="auth-page">
      {isSupposedlyMobile && <p className="mobile-warning">{t('warning.mobile')}</p>}
      <main>
        <h1>Pokemon<br />Auto Chess</h1>
        <Login />
      </main>
      <img className="logo" src="assets/ui/pokemon_autochess_final.svg" />
      <Media />
    </div>
  )
}
