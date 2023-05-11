import React from "react"
import DiscordButton from "../buttons/discord-button"
import GithubButton from "../buttons/github-button"
import PolicyButton from "../buttons/policy-button"
import {useTranslation} from "react-i18next";

export default function Media() {
  const {t} = useTranslation()

  return (
    <div className="media">
      <DiscordButton />
      <GithubButton />
      <PolicyButton />
      <span>V3.3</span>
      <p>
        {t("misc.made-by-fan")}
        <br />
        {t("misc.financement")}
        <br />
        {t("misc.copyright")}
      </p>
    </div>
  )
}
