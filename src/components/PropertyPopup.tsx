import { Button, Card, CardMedia } from '@mui/material';

function PropertyPopup({
  open,
  disabled,
  img,
  placement,
  handleBuy,
}: {
  open: boolean;
  disabled: boolean;
  img: string;
  placement: string;
  handleBuy: () => void;
}) {
  
  return (
    <Card
      sx={{
        className: 'property-popup',
        display: open ? 'block' : 'none',
        position: 'absolute',
        zIndex: '1000',
        width: 'inherit',
        top: 'inherit',
        left: 'inherit',
        transform:
          placement === 'store'
            ? 'translate(0, -50%)'
            : placement === 'player_top'
            ? 'translate(0, -4em)'
            : 'translate(0%, -100%)',
      }}
    >
      <CardMedia
        component="img"
        image={img}
        sx={{ width: '100%', height: 'auto' }}
      />

      {!disabled && placement === 'store' && (
        <Button fullWidth onClick={handleBuy}>
          Buy
        </Button>
      )}
    </Card>
  );
}

export default PropertyPopup;
