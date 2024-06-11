import { GameData } from "../components/Types/GameTypes";

export const gameDataInitial:GameData = {
  currentMove: 1,
  store: {
    wheat_field: 6,
    ranch: 6,
    forest: 6,
    mine: 6,
    apple_orchard: 6,
    bakery: 6,
    convenience_store: 6,
    cheese_factory: 6,
    furniture_factory: 6,
    fruit_and_vegetable_market: 6,
    cafe: 6,
    family_restaraunt: 6,
    stadium: 4,
    tv_station: 4,
    business_center: 4,
    train_station: 4,
    shopping_mall: 4,
    amusement_park: 4,
    radio_tower: 4
  },
  players: {
    1: {
      properties: {
        wheat_field: 1,
        ranch: 0,
        forest: 0,
        mine: 0,
        apple_orchard: 0,
        bakery: 0,
        convenience_store: 0,
        cheese_factory: 0,
        furniture_factory: 0,
        fruit_and_vegetable_market: 0,
        cafe: 0,
        family_restaraunt: 0,
        stadium: 0,
        tv_station: 0,
        business_center: 0,
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
        wheat_field: 1,
        ranch: 0,
        forest: 0,
        mine: 0,
        apple_orchard: 0,
        bakery: 0,
        convenience_store: 0,
        cheese_factory: 0,
        furniture_factory: 0,
        fruit_and_vegetable_market: 0,
        cafe: 0,
        family_restaraunt: 0,
        stadium: 0,
        tv_station: 0,
        business_center: 0,
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