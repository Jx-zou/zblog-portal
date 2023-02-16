import { styled } from "@nextui-org/react";

export const Box = styled('div', {
  boxSizing: 'border-box',
  maxWidth: '100%'
})

export const Main = styled('div', {
  width: '80%',
  margin: '0 auto',
  position: 'relative',
  zIndex: 'var(--nextui-zIndices-3)'
})

export const SvgIcon = styled('div', {
  dflex: "center",
  p: "$2"
})

export const SvgButton = styled('button', {
  dflex: "center",
  size: "auto",
  cursor: "pointer",
  background: "transparent",
  border: "none",
  padding: 0,
  "@xsMax": {
    px: "$2",
  },
  "& svg": {
    transition: "$default"
  },
  "&:hover": {
    "& svg": {
      opacity: 0.7
    }
  },
  "&:active": {
    "& svg": {
      opacity: 0.2
    }
  }
});