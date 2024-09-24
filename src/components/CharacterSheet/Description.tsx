import { Character } from "@/types/character";
import {
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
  capitalize,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2 (unstable)
import Text from "../Text";

type DescriptionProps = {
  details: Character["details"];
  careers: Character["careers"];
};

const Description: React.FC<
  DescriptionProps & React.ComponentPropsWithRef<"div">
> = ({ details, careers, className }) => {
  const classNames = [
    "flex flex-col gap-2 bg-darkGray/75 p-2 rounded",
    className,
  ].join(" ");
  const detailsArr = Object.entries(details).sort();
  return (
    <Box className={classNames}>
      <Text variant="h3" font className="text-3xl">
        Careers
      </Text>
      <div className="flex gap-2">
        {careers.map((career: string) => (
          <Chip label={capitalize(career)} key={career} />
        ))}
      </div>
      {detailsArr.length > 0 && (
        <>
          <Text variant="h3" font className="text-3xl">
            Details
          </Text>
          <div className="flex gap-2 flex-wrap">
            {detailsArr.map(([key, value]) => (
              <Tooltip title={key} key={key}>
                <Chip label={value} />
              </Tooltip>
            ))}
          </div>
        </>
      )}
    </Box>
  );
  // return (
  //   <Grid xs={xs}>
  //     <Paper className="p-4">
  //       <Typography variant="h3" className="font-jaini-purva">
  //         Description
  //       </Typography>
  //       <List dense>
  //         {details.detail && (
  //           <ListItem>
  //             <ListItemText
  //               primary={capitalize(detailsArr[0])}
  //               secondary={capitalize(details.detail ?? "")}
  //             />
  //           </ListItem>
  //         )}
  //         {details.personality && (
  //           <ListItem>
  //             <ListItemText
  //               primary={capitalize(detailsArr[1])}
  //               secondary={capitalize(details.personality)}
  //             />
  //           </ListItem>
  //         )}
  //         {details.mannerism && (
  //           <ListItem>
  //             <ListItemText
  //               primary={capitalize(detailsArr[2])}
  //               secondary={capitalize(details.mannerism)}
  //             />
  //           </ListItem>
  //         )}
  //       </List>
  //     </Paper>
  //   </Grid>
  // );
};

export default Description;
