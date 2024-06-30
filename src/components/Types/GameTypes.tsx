export type Cards = {
  wheat_field: number
  ranch: number
  forest: number
  mine: number
  apple_orchard: number
  bakery: number
  convenience_store: number
  cheese_factory: number
  furniture_factory: number
  fruit_and_vegetable_market: number
  cafe: number
  family_restaraunt: number
  tv_station: number
  tax_office: number
  publisher: number
  train_station: number
  shopping_mall: number
  amusement_park: number
  radio_tower: number
  city_hall: number
}



export type GameData = {
  currentMove: number
  lastRoll: number[]
  store: Cards
  stage: number
  players:{
    [key: number]: {
      properties: Cards
      money: number
      money_to_earn: number
    }
  }
}

export type PropertyData = {
    color: string
    cost : number
    income: number | string
    dice : number[]
    type: string
    effect?: string
}

export type Player = 1 | 2 ;

export type Buy = {
  player: Player;
  property: keyof Cards;
};
  
export type Roll = {
  player: Player;
  dice: number[];
};

export type PlayerProp = [
  keyof Cards,
  number
]