import React from "react"
import { Synergy } from "../../../../../types/enum/Synergy"
import "./synergy-icon.css"
import {useTranslation} from "react-i18next";

export default function SynergyIcon(props: { type: Synergy; size?: string }) {
  const {t} = useTranslation()
  const type = t(`pokemon.type.${props.type.toLowerCase()}`)
  return (
    <img
      src={"assets/types/" + props.type + ".svg"}
      alt={type}
      title={type}
      className="synergy-icon"
      style={{
        width: props.size ?? "40px",
        height: props.size ?? "40px"
      }}
    />
  )
}
