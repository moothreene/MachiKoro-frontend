import { Grid } from "@mui/material";
import PropertyButton from "./PropertyButton";
import images from "./Images";
import { Cards, GameData } from "./Types/GameTypes";

function Store({gameState,stage,player,handleBuy}:{gameState:GameData,stage:number, player:number,handleBuy:(key:keyof Cards)=>void}) {
  return (
    <Grid container spacing={.5} columns={12} sx={{ margin: 0, width:'100%', height:'40vh'}}>
        {Object.entries(gameState.store).map(([key, value]: any[]) => {
          return (
            <PropertyButton
              key={key}
              amount={value}
              name={key}
              image={images[key]}
              isDisabled={
                !(stage === 2 && 2 - (gameState.currentMove % 2) === player)
              }
              onClick={() => handleBuy(key)}
            />
          );
        })}
      </Grid>
  )
}

export default Store
