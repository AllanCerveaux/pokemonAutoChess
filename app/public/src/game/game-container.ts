import GameScene from "./scenes/game-scene"
import MoveToPlugin from "phaser3-rex-plugins/plugins/moveto-plugin.js"
import { getPath, transformCoordinate } from "../pages/utils/utils"
import Phaser from "phaser"
import Player from "../../../models/colyseus-models/player"
import { Room } from "colyseus.js"
import GameState from "../../../rooms/states/game-state"
import { Pokemon } from "../../../models/colyseus-models/pokemon"
import { DataChange } from "@colyseus/schema"
import {
  Emotion,
  IDragDropCombineMessage,
  IDragDropItemMessage,
  IDragDropMessage,
  IPlayer,
  IPokemon,
  IPokemonAvatar,
  IFloatingItem,
  IPokemonEntity,
  Transfer
} from "../../../types"
import PokemonEntity from "../../../core/pokemon-entity"
import { Item } from "../../../types/enum/Item"
import { DesignTiled } from "../../../core/design"
import { toast } from "react-toastify"
import React from "react"
import { IPokemonConfig } from "../../../models/mongo-models/user-metadata"
import { getPortraitSrc } from "../utils"
import { IPokemonRecord } from "../../../models/colyseus-models/game-record"
import { Synergy } from "../../../types/enum/Synergy"
import { AttackType, HealType } from "../../../types/enum/Game"
import store from "../stores"
import { logger } from "../../../utils/logger"

class GameContainer {
  room: Room<GameState>
  div: HTMLDivElement
  game: Phaser.Game | undefined
  player: Player | undefined
  tilemap: DesignTiled | undefined
  uid: string
  spectate: boolean
  constructor(div: HTMLDivElement, uid: string, room: Room<GameState>) {
    this.room = room
    this.div = div
    this.game = undefined
    this.player = undefined
    this.tilemap = undefined
    this.uid = uid
    this.spectate = false
    this.initializeEvents()
  }

  initializeGame() {
    if(this.game != null) return; // prevent initializing twice
    // Create Phaser game
    const config = {
      type: Phaser.CANVAS,
      width: 2000,
      height: 1000,
      parent: this.div,
      pixelArt: true,
      scene: GameScene,
      scale: { mode: Phaser.Scale.FIT },
      dom: {
        createContainer: true
      },
      plugins: {
        global: [
          {
            key: "rexMoveTo",
            plugin: MoveToPlugin,
            start: true
          }
        ]
      }
    }
    this.game = new Phaser.Game(config)
    this.game.scene.start("gameScene", {
      room: this.room,
      tilemap: this.tilemap,
      spectate: this.spectate
    })
  }

  initializeEvents() {
    this.room.onMessage(Transfer.DRAG_DROP_FAILED, (message) =>
      this.handleDragDropFailed(message)
    )
    this.room.state.avatars.onAdd = (avatar) => {
      this.handleAvatarAdd(avatar)
      avatar.onChange = (changes) => {
        changes.forEach((change) => {
          this.handleAvatarChange(avatar, change)
        })
      }
    }

    this.room.state.avatars.onRemove = (value, key) => {
      this.handleAvatarRemove(value)
    }

    this.room.state.floatingItems.onAdd = (floatingItem) => {
      this.handleFloatingItemAdd(floatingItem)
      floatingItem.onChange = (changes) => {
        changes.forEach((change) => {
          this.handleFloatingItemChange(floatingItem, change)
        })
      }
    }

    this.room.state.floatingItems.onRemove = (value, key) => {
      this.handleFloatingItemRemove(value)
    }
    this.room.onError((err) => logger.error("room error", err))
  }

  setTilemap(tilemap) {
    this.tilemap = tilemap
    if (this.player || (this.spectate && this.room.state.players.size > 0)) {
      // logger.debug('setTilemap', this.player, this.tilemap);
      this.initializeGame()
    }
  }

  initializePlayer(player: Player) {
    // logger.debug(player);
    if (this.uid == player.id) {
      this.player = player
      if (this.tilemap) {
        // logger.debug('initializePlayer', this.player, this.tilemap);
        this.initializeGame()
      }
    }
    else if(this.spectate && this.tilemap) {
      this.initializeGame()
    }

    player.board.onAdd = ((pokemon, key) => {
      const p = <Pokemon>pokemon
      if (p.stars > 1) {
        const config: IPokemonConfig | undefined = player.pokemonCollection.get(
          pokemon.index
        )
        const i = React.createElement(
          "img",
          {
            src: getPortraitSrc(
              pokemon.index,
              config?.selectedShiny,
              config?.selectedEmotion
            )
          },
          null
        )
        toast(i, { containerId: player.rank.toString(), className: "toast-new-pokemon" })
      }
      p.onChange = (changes: DataChange<any>[]) => {
        changes.forEach((change) => {
          this.handleBoardPokemonChange(player, p, change)
        })
      }

      p.items.onAdd = (value, key) => {
        // logger.debug('added', value, key)
        this.handleBoardPokemonItemAdd(player.id, value, p)
      }
      p.items.onRemove = (value, key) => {
        // logger.debug('removed', value, key)
        this.handleBoardPokemonItemRemove(player.id, value, p)
      }

      this.handleBoardPokemonAdd(player, p)
    }).bind(this)

    player.board.onRemove = ((pokemon, key) => {
      this.handleBoardPokemonRemove(player, pokemon)
    }).bind(this)

    player.items.onAdd = (value, key) => {
      // logger.debug('added', value, key);
      this.handleItemAdd(player, value)
    }

    player.items.onRemove = (value, key) => {
      // logger.debug('removed', value, key);
      this.handleItemRemove(player, value)
    }

    player.simulation.onChange = (changes: DataChange<any>[]) => {
      if (
        this.game != null &&
        player.id == this.uid &&
        this.game.scene.getScene("gameScene") != null
      ) {
        changes.forEach((change) => {
          // logger.debug('simulation change ', change.field, change.value);
          if (change.field == "climate") {
            this.handleClimateChange(change, player)
          }
        })
      }
    }

    player.simulation.blueTeam.onAdd = (p, key) => {
      // logger.debug('add pokemon');
      const pokemon = <PokemonEntity>p
      this.handlePokemonAdd(player.id, pokemon)

      pokemon.status.onChange = (changes: DataChange<any>[]) => {
        changes.forEach((change) => {
          this.handlePokemonStatusChange(player.id, change, pokemon)
        })
      }

      pokemon.onChange = (changes: DataChange<any>[]) => {
        // logger.debug('change pokemon');
        changes.forEach((change) => {
          // logger.debug(change.field);
          this.handlePokemonChange(player.id, change, pokemon)
        })
      }

      pokemon.items.onAdd = (value, key) => {
        // logger.debug('added', value, key)
        this.handleBattleManagerPokemonItemAdd(player.id, value, pokemon)
      }
      pokemon.items.onRemove = (value, key) => {
        // logger.debug('removed', value, key)
        this.handleBattleManagerPokemonItemRemove(player.id, value, pokemon)
      }

      pokemon.count.onChange = (changes: DataChange<any>[]) => {
        // logger.debug('change item');
        changes.forEach((change) => {
          this.handlePokemonCountChange(player.id, change, pokemon)
        })
      }
    }

    player.simulation.redTeam.onAdd = (p, key) => {
      // logger.debug('add pokemon');
      const pokemon = <PokemonEntity>p
      this.handlePokemonAdd(player.id, pokemon)

      pokemon.status.onChange = (changes) => {
        changes.forEach((change) => {
          this.handlePokemonStatusChange(player.id, change, pokemon)
        })
      }

      pokemon.onChange = (changes: DataChange<any>[]) => {
        // logger.debug('change pokemon');
        changes.forEach((change) => {
          this.handlePokemonChange(player.id, change, pokemon)
        })
      }
      pokemon.items.onAdd = (value, key) => {
        // logger.debug('added', value, key)
        this.handleBattleManagerPokemonItemAdd(player.id, value, pokemon)
      }
      pokemon.items.onRemove = (value, key) => {
        // logger.debug('removed', value, key)
        this.handleBattleManagerPokemonItemRemove(player.id, value, pokemon)
      }
      pokemon.count.onChange = (changes: DataChange<any>[]) => {
        // logger.debug('change item');
        changes.forEach((change) => {
          this.handlePokemonCountChange(player.id, change, pokemon)
        })
      }
    }
    player.simulation.blueTeam.onRemove = (pokemon, key) => {
      // logger.debug('remove pokemon');
      this.handlePokemonRemove(player.id, pokemon)
    }
    player.simulation.redTeam.onRemove = (pokemon, key) => {
      // logger.debug('remove pokemon');
      this.handlePokemonRemove(player.id, pokemon)
    }
    player.triggerAll()
  }

  initializeSpectactor(uid: string){
    if (this.uid === uid) {
      this.spectate = true
      if (this.tilemap && this.room.state.players.size > 0) {
        this.initializeGame()
      }
    }
  }

  handlePokemonAdd(playerId: string, pokemon: IPokemonEntity) {
    // logger.debug('simulation add' + pokemon.name);
    if (this.game && this.game.scene && this.game.scene.getScene("gameScene")) {
      const g = <GameScene>this.game.scene.getScene("gameScene")
      if (g.battle) {
        g.battle.addPokemon(playerId, pokemon)
      }
    }
  }

  handlePokemonRemove(playerId: string, pokemon: IPokemonEntity) {
    // logger.debug('simulation remove' + pokemon.name);
    if (this.game && this.game.scene && this.game.scene.getScene("gameScene")) {
      const g = <GameScene>this.game.scene.getScene("gameScene")
      if (g.battle) {
        g.battle.removePokemon(playerId, pokemon)
      }
    }
  }

  handleItemAdd(player: Player, value: Item) {
    if (
      this.game != null &&
      player.id === this.uid &&
      this.game.scene.getScene("gameScene")
    ) {
      const g = <GameScene>this.game.scene.getScene("gameScene")
      const spectatedPlayerId = store.getState().game.currentPlayerId
      if (g.itemsContainer && player.id === spectatedPlayerId) {
        g.itemsContainer.addItem(value)
      }
    }
  }

  handleItemRemove(player: Player, value: Item) {
    if (
      this.game != null &&
      player.id == this.uid &&
      this.game.scene.getScene("gameScene")
    ) {
      const g = <GameScene>this.game.scene.getScene("gameScene")
      if (g.itemsContainer) {
        g.itemsContainer.removeItem(value)
      }
    }
  }

  handlePokemonChange(
    playerId: string,
    change: DataChange<any>,
    pokemon: IPokemonEntity
  ) {
    // logger.debug('simulation change' + change.field);
    if (this.game && this.game.scene && this.game.scene.getScene("gameScene")) {
      const g = <GameScene>this.game.scene.getScene("gameScene")
      if (g.battle) {
        g.battle.changePokemon(playerId, change, pokemon)
      }
    }
  }

  handlePokemonStatusChange(
    playerId: string,
    change: DataChange<any>,
    pokemon: IPokemonEntity
  ) {
    // logger.debug('simulation change' + change.field);
    if (this.game && this.game.scene && this.game.scene.getScene("gameScene")) {
      const g = <GameScene>this.game.scene.getScene("gameScene")
      if (g.battle) {
        g.battle.changeStatus(playerId, change, pokemon)
      }
    }
  }

  handleBattleManagerPokemonItemAdd(
    playerId: string,
    value: Item,
    pokemon: IPokemonEntity
  ) {
    if (
      this.game != null &&
      playerId == this.uid &&
      this.game.scene.getScene("gameScene")
    ) {
      const g = <GameScene>this.game.scene.getScene("gameScene")
      if (g.battle) {
        g.battle.addPokemonItem(playerId, value, pokemon)
      }
    }
  }

  handleBattleManagerPokemonItemRemove(
    playerId: string,
    value: Item,
    pokemon: IPokemonEntity
  ) {
    if (
      this.game != null &&
      playerId == this.uid &&
      this.game.scene.getScene("gameScene")
    ) {
      const g = <GameScene>this.game.scene.getScene("gameScene")
      if (g.battle) {
        g.battle.removePokemonItem(playerId, value, pokemon)
      }
    }
  }

  handlePokemonCountChange(
    playerId: string,
    change: DataChange<any>,
    pokemon: IPokemonEntity
  ) {
    if (this.game && this.game.scene && this.game.scene.getScene("gameScene")) {
      const g = <GameScene>this.game.scene.getScene("gameScene")
      if (g.battle) {
        g.battle.changeCount(playerId, change, pokemon)
      }
    }
  }

  handleClimateChange(change: DataChange<any>, player: Player) {
    if (
      this.game != null &&
      player.id == this.uid &&
      this.game.scene.getScene("gameScene")
    ) {
      const g = <GameScene>this.game.scene.getScene("gameScene")
      if (g.weatherManager) {
        switch (change.value) {
          case "RAIN":
            g.weatherManager.addRain()
            break

          case "SUN":
            g.weatherManager.addSun()
            break

          case "SANDSTORM":
            g.weatherManager.addSandstorm()
            break

          case "SNOW":
            g.weatherManager.addSnow()
            break

          case "NEUTRAL":
            g.weatherManager.clearWeather()
            break

          default:
            break
        }
      }
    }
  }

  handleDisplayHeal(message: {
    type: HealType
    id: string
    x: number
    y: number
    index: string
    amount: number
  }) {
    if (this.game && this.game.scene && this.game.scene.getScene("gameScene")) {
      const g = <GameScene>this.game.scene.getScene("gameScene")
      if (g.battle) {
        g.battle.displayHeal(
          message.x,
          message.y,
          message.amount,
          message.type,
          message.index,
          message.id
        )
      }
    }
  }

  handleDisplayDamage(message: {
    type: AttackType
    id: string
    x: number
    y: number
    index: string
    amount: number
  }) {
    if (this.game && this.game.scene && this.game.scene.getScene("gameScene")) {
      const g = <GameScene>this.game.scene.getScene("gameScene")
      if (g.battle) {
        g.battle.displayDamage(
          message.x,
          message.y,
          message.amount,
          message.type,
          message.index,
          message.id
        )
      }
    }
  }

  handleAvatarAdd(avatar: IPokemonAvatar) {
    if (this.game != null && this.game.scene.getScene("gameScene")) {
      const g = <GameScene>this.game.scene.getScene("gameScene")
      if (g.minigameManager) {
        g.minigameManager.addPokemon(avatar)
      }
    }
  }

  handleFloatingItemAdd(floatingItem: IFloatingItem) {
    if (this.game != null && this.game.scene.getScene("gameScene")) {
      const g = <GameScene>this.game.scene.getScene("gameScene")
      if (g.minigameManager) {
        g.minigameManager.addItem(floatingItem)
      }
    }
  }

  handleBoardPokemonAdd(player: IPlayer, pokemon: IPokemon) {
    if (this.game != null && this.game.scene.getScene("gameScene")) {
      const g = <GameScene>this.game.scene.getScene("gameScene")
      if (g.board && g.board.player && g.board.player.id == player.id) {
        g.board.addPokemon(pokemon)
      }
    }
  }

  handleBoardPokemonRemove(player: IPlayer, pokemon: IPokemon) {
    if (this.game != null && this.game.scene.getScene("gameScene")) {
      const g = <GameScene>this.game.scene.getScene("gameScene")
      if (g.board && g.board.player && g.board.player.id == player.id) {
        g.board.removePokemon(pokemon)
      }
    }
  }

  handleAvatarRemove(avatar: IPokemonAvatar) {
    if (this.game != null && this.game.scene.getScene("gameScene")) {
      const g = <GameScene>this.game.scene.getScene("gameScene")
      if (g.minigameManager) {
        g.minigameManager.removePokemon(avatar)
      }
    }
  }

  handleFloatingItemRemove(floatingItem: IFloatingItem) {
    if (this.game != null && this.game.scene.getScene("gameScene")) {
      const g = <GameScene>this.game.scene.getScene("gameScene")
      if (g.minigameManager) {
        g.minigameManager.removeItem(floatingItem)
      }
    }
  }

  handleBoardPokemonChange(
    player: IPlayer,
    pokemon: IPokemon,
    change: DataChange<any>
  ) {
    if (this.game != null && this.game.scene.getScene("gameScene")) {
      const g = <GameScene>this.game.scene.getScene("gameScene")
      if (g.board && g.board.player && g.board.player.id == player.id) {
        g.board.changePokemon(pokemon, change)
      }
    }
  }

  handleAvatarChange(avatar: IPokemonAvatar, change: DataChange<any>) {
    if (this.game != null && this.game.scene.getScene("gameScene")) {
      const g = <GameScene>this.game.scene.getScene("gameScene")
      if (g.minigameManager) {
        g.minigameManager.changePokemon(avatar, change)
      }
    }
  }

  handleFloatingItemChange(
    floatingItem: IFloatingItem,
    change: DataChange<any>
  ) {
    if (this.game != null && this.game.scene.getScene("gameScene")) {
      const g = <GameScene>this.game.scene.getScene("gameScene")
      if (g.minigameManager) {
        g.minigameManager.changeItem(floatingItem, change)
      }
    }
  }

  handleBoardPokemonItemAdd(playerId: string, value: Item, pokemon: IPokemon) {
    if (
      this.game != null &&
      playerId == this.uid &&
      this.game.scene.getScene("gameScene")
    ) {
      const g = <GameScene>this.game.scene.getScene("gameScene")
      g.board?.addPokemonItem(playerId, value, pokemon)
    }
  }

  handleBoardPokemonItemRemove(
    playerId: string,
    value: Item,
    pokemon: IPokemon
  ) {
    if (
      this.game != null &&
      playerId == this.uid &&
      this.game.scene.getScene("gameScene")
    ) {
      const g = <GameScene>this.game.scene.getScene("gameScene")
      g.board?.removePokemonItem(playerId, value, pokemon)
    }
  }

  handleDragDropFailed(message: any) {
    const g = <GameScene>this.game?.scene.getScene("gameScene")

    if (g && message.updateBoard) {
      const tg = g.lastDragDropPokemon
      if (tg) {
        const coordinates = transformCoordinate(tg.positionX, tg.positionY)
        tg.x = coordinates[0]
        tg.y = coordinates[1]
      }
    }

    if (g && message.updateItems) {
      g.itemsContainer?.updateItems()
    }
  }

  onPlayerClick(id: string) {
    if (this.game && this.game.scene.getScene("gameScene")) {
      const g = <GameScene>this.game.scene.getScene("gameScene")
      const player = this.room.state.players.get(id)
      if (player) {
        g.setPlayer(player)
      }
    }
  }

  onDragDrop(event: CustomEvent<IDragDropMessage>) {
    this.room.send(Transfer.DRAG_DROP, event.detail)
  }

  onDragDropCombine(event: CustomEvent<IDragDropCombineMessage>) {
    this.room.send(Transfer.DRAG_DROP_COMBINE, event.detail)
  }

  onDragDropItem(event: CustomEvent<IDragDropItemMessage>) {
    this.room.send(Transfer.DRAG_DROP_ITEM, event.detail)
  }

  onSellDrop(event: CustomEvent<{ pokemonId: string }>) {
    this.room.send(Transfer.SELL_DROP, event.detail)
  }

  transformToSimplePlayer(player: IPlayer) {
    const simplePlayer = {
      elo: player.elo,
      name: player.name,
      id: player.id,
      rank: player.rank,
      avatar: player.avatar,
      title: player.title,
      role: player.role,
      pokemons: new Array<IPokemonRecord>(),
      synergies: new Array<{ name: Synergy; value: number }>()
    }

    const allSynergies = new Array<{ name: Synergy; value: number }>()
    player.synergies.forEach((v, k) => {
      allSynergies.push({ name: k as Synergy, value: v })
    })

    allSynergies.sort((a, b) => b.value - a.value)

    simplePlayer.synergies = allSynergies.slice(0, 5)

    if (player.board && player.board.size > 0) {
      player.board.forEach((pokemon) => {
        if (pokemon.positionY != 0) {
          simplePlayer.pokemons.push({
            avatar: getPath(pokemon),
            items: pokemon.items.toArray(),
            name: pokemon.name
          })
        }
      })
    }

    return simplePlayer
  }
}

export default GameContainer
