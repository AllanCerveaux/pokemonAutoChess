import React from "react"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import WikiContent from "./wiki-content"
import WikiStatistic from "./wiki-statistic"
import WikiTypes from "./wiki-types"
import WikiFaq from "./wiki-faq"
import WikiTutorials from "./wiki-tutorials"
import WikiItemsCheatSheet from "./wiki-items-cheat-sheet"
import WikiStatus from "./wiki-status"
import "./wiki.css"

export default function Wiki(props: { toggleWiki: () => void }) {
  return (
    <div id="wiki-page">
      <button
        onClick={props.toggleWiki}
        className="bubbly blue"
      >Back to Lobby</button>

      <div className="nes-container">
        <Tabs>
          <TabList>
            <Tab key="title-faq">F.A.Q.</Tab>
            <Tab key="title-tutorials">HOW TO PLAY ?</Tab>
            <Tab key="title-pokemon">POKEMONS</Tab>
            <Tab key="title-items">ITEMS</Tab>
            <Tab key="title-types">SYNERGIES</Tab>
            <Tab key="title-statistic">STATISTICS</Tab>
            <Tab key="title-status">STATUS</Tab>
          </TabList>

          <TabPanel key="faq">
            <WikiFaq />
          </TabPanel>
          <TabPanel key="tutorials">
            <WikiTutorials />
          </TabPanel>
          <TabPanel key="pokemon">
            <WikiContent />
          </TabPanel>
          <TabPanel key="items">
            <WikiItemsCheatSheet />
          </TabPanel>
          <TabPanel key="types">
            <WikiTypes />
          </TabPanel>
          <TabPanel key="statistic">
            <WikiStatistic />
          </TabPanel>
          <TabPanel key="status">
            <WikiStatus />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  )
}
