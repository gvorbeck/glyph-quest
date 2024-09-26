import { Typography } from "@mui/material";
import { PropsWithChildren } from "react";

type InventorySectionProps = {
  title: string;
  subtitle?: string;
};

const InventorySection: React.FC<PropsWithChildren<InventorySectionProps>> = ({
  title,
  children,
  subtitle,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Typography variant="h3" className="font-jaini-purva">
        {title}
      </Typography>
      {!!subtitle && <Typography>{subtitle}</Typography>}
      {children}
    </div>
  );
};

export default InventorySection;
