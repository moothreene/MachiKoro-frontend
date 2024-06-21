import { Tooltip, TooltipProps, styled, tooltipClasses } from '@mui/material';
import { ReactElement } from 'react';

function CustomTooltip({
  open,
  maxWidth,
  title,
  placement,
  children,
  zIndex,
}: {
  open: boolean;
  maxWidth: string;
  title: any;
  placement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
  children: ReactElement;
  zIndex?: number;
}) {
  const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip
      {...props}
      title={title}
      classes={{ popper: className }}
      placement={placement}
      open={open}
      arrow
      disableFocusListener
      disableHoverListener
      disableTouchListener
      disableInteractive
      PopperProps={{style:{zIndex:zIndex || 100}}}
    />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: maxWidth,
    },
  });
  return <CustomWidthTooltip title={title}>{children}</CustomWidthTooltip>;
}

export default CustomTooltip;
