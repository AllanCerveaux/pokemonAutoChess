import React from "react"
import {useTranslation} from "react-i18next";

export default function PolicyButton() {
  const {t} = useTranslation()

  function handlePrivacyPolicyClick() {
    window.location.href =
      "https://pokemonautochess-b18fb.web.app/privacy-policy.html"
  }
  return (
    <button
      type="button"
      className="bubbly"
      onClick={() => {
        handlePrivacyPolicyClick()
      }}
    >
      {t("misc.privacy-policy")}
    </button>
  )
}
