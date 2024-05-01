import { styled } from "@mui/system";
import Badge from "@mui/material/Badge";

const StyledBadge = styled(Badge)(({ online }) => ({
  '.MuiBadge-badge': {
    backgroundColor: online === "online" ? "#44b700" : "#9e9e9e", // Use your desired color for offline state
    color: online === "online" ? "#44b700" : "#9e9e9e", // Use your desired color for offline state
    boxShadow: `0 0 0 2px #fff`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default StyledBadge;
