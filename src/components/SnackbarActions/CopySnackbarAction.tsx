import { copyToClipboard } from "@/utils/utils";
import { ContentCopy } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

type CopySnackbarActionProps = {
  message: string;
};

const CopySnackbarAction: React.FC<CopySnackbarActionProps> = ({ message }) => {
  return (
    <Tooltip title="Copy attack message">
      <IconButton
        size="small"
        aria-label="copy"
        color="inherit"
        onClick={() => copyToClipboard(message)}
      >
        <ContentCopy fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export default CopySnackbarAction;
