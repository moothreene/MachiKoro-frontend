import { GameData } from "../components/Types/GameTypes";

export const gameDataInitial:GameData = {
  currentMove: 1,
  store: {
    wheat_field: 6,
    ranch: 6,
    bakery: 6,
    cafe: 6,
    convenience_store: 6,
    forest: 6,
    tv_station: 2,
    publisher: 2,
    cheese_factory: 6,
    furniture_factory: 6,
    tax_office: 2,
    mine: 6,
    family_restaraunt: 6,
    apple_orchard: 6,
    fruit_and_vegetable_market: 6,
    train_station: 2,
    shopping_mall: 2,
    amusement_park: 2,
    radio_tower: 2
  },
  players: {
    1: {
      properties: {
        cafe: 0,
        family_restaraunt: 0,
        wheat_field: 1,
        ranch: 0,
        bakery: 0,
        convenience_store: 0,
        forest: 0,
        cheese_factory: 0,
        furniture_factory: 0,
        mine: 0,
        apple_orchard: 0,
        fruit_and_vegetable_market: 0,
        tv_station: 0,
        publisher: 0,
        tax_office: 0,
        train_station: 0,
        shopping_mall: 0,
        amusement_park: 0,
        radio_tower: 0
      },
      money: 100,
      money_to_earn: 0
    },
    2: {
      properties: {
        cafe: 0,
        family_restaraunt: 0,
        wheat_field: 1,
        ranch: 0,
        bakery: 0,
        convenience_store: 0,
        forest: 0,
        cheese_factory: 0,
        furniture_factory: 0,
        mine: 0,
        apple_orchard: 0,
        fruit_and_vegetable_market: 0,
        tv_station: 0,
        publisher: 0,
        tax_office: 0,
        train_station: 0,
        shopping_mall: 0,
        amusement_park: 0,
        radio_tower: 0
      },
      money: 100,
      money_to_earn: 0
    }
  }
}