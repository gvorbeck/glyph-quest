import { useState, MouseEvent } from "react";
import Popover from "@mui/material/Popover";
import { PopoverProps } from "@mui/material/Popover";

interface UsePopoverReturn {
  openPopover: (event: MouseEvent<HTMLButtonElement>) => void;
  closePopover: () => void;
  popoverProps: Omit<PopoverProps, "open"> & { open: boolean };
}

export default function usePopover(): UsePopoverReturn {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const openPopover = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const popoverProps: UsePopoverReturn["popoverProps"] = {
    id,
    open,
    anchorEl,
    onClose: closePopover,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
  };

  return { openPopover, closePopover, popoverProps };
}
