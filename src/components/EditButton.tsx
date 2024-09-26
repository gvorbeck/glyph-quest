import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";

type EditButtonProps = {
  onClick: () => void;
};

const EditButton: React.FC<
  EditButtonProps & React.ComponentPropsWithRef<"div">
> = ({ onClick, className }) => {
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    onClick();
  };
  return (
    <Tooltip title={editMode ? "Save" : "Edit"} className={className}>
      <IconButton color="primary" onClick={toggleEditMode}>
        {editMode ? <SaveIcon /> : <EditIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default EditButton;
