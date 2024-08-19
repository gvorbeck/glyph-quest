import { Box, Modal, Typography } from "@mui/material";

type GQModalProps = {
  open: boolean;
  handleClose: () => void;
  id: string;
  title: string;
  children: React.ReactNode;
  description?: string;
  width?: number;
};

const GQModal: React.FC<GQModalProps> = ({
  children,
  open,
  handleClose,
  id,
  title,
  description,
  width = 400,
}) => {
  const classNames = `border-solid border-spacing-0.5 p-8 bg-darkGray border-[#000000] shadow-[24px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4`;
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby={`${id}-modal-title`}
      aria-describedby={description ? `${id}-modal-description` : undefined}
    >
      <Box className={classNames} sx={{ width }}>
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
