import { Box, Button, Card, CardMedia } from '@mui/material';

function PropertyPopup({
  open,
  disabled,
  img,
  handleBuy,
  placement
}: {
  open: boolean;
  disabled: boolean;
  img: string;
  handleBuy: () => void;
  placement: string;
}) {
  return (
    <Card
      sx={{
        display: open ? 'block' : 'none',
        position: 'absolute',
        zIndex: '100',
        width: '195px',
        top:'inherit',
        left:'inherit',
        transform: placement === 'store'?'translate(0, -50%)':placement === 'player_top'?'translate(0, -15%)':'translate(0%, -100%)'
      }}
    >
      <CardMedia component={'img'} image={img} />
      {(!disabled && placement === 'store') && <Button onClick={handleBuy}>Buy</Button>}
    </Card>
  );
}

export default PropertyPopup;
