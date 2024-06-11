import { Box } from "@mui/material";
import { FaDiceOne, FaDiceTwo, FaDiceThree, FaDiceFour, FaDiceFive, FaDiceSix, FaSquare } from "react-icons/fa6";

function Dice({ dice, rolling=false }: { dice: number[]; rolling?: boolean}) {
  return (
    <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', height:'80%'}}>
    {dice.map((side:number) => {
        switch (side) {
          case 1:
            return <FaDiceOne size = {30} className={`Die${rolling?'-shaking':''}`}/>;
          case 2:
            return <FaDiceTwo size = {30} className={`Die${rolling?'-shaking':''}`}/>;
          case 3:
            return <FaDiceThree size = {30} className={`Die${rolling?'-shaking':''}`}/>;
          case 4:
            return <FaDiceFour size = {30} className={`Die${rolling?'-shaking':''}`}/>;
          case 5:
            return <FaDiceFive size = {30} className={`Die${rolling?'-shaking':''}`}/>;
          case 6:
            return <FaDiceSix size = {30} className={`Die${rolling?'-shaking':''}`}/>;
          default:
            return <FaSquare size = {50} className={`Die${rolling?'-shaking':''}`}/>;
        }
    })}
    </Box>
  )
}

export default Dice
