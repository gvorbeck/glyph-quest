import { Box, Modal, Typography } from "@mui/material";

type GQModalProps = {
  open: boolean;
  handleClose: () => void;
  id: string;
  title: string;
  children: React.ReactNode;
  description?: string;
};

const GQModal: React.FC<GQModalProps> = ({
  children,
  open,
  handleClose,
  id,
  title,
  description,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby={`${id}-modal-title`}
      aria-describedby={description ? `${id}-modal-description` : undefined}
    >
      <Box className=" border-solid border-spacing-0.5 p-8 bg-darkGray border-[#000000] shadow-[24px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] flex flex-col gap-4">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        {description && (
          <Typography id="modal-modal-description" className="mt-4">
            {description}
          </Typography>
        )}
        <div>{children}</div>
      </Box>
    </Modal>
  );
};

export default GQModal;
