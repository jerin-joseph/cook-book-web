import { Link, Typography } from "@mui/material";
import { Link as ReactLink} from "react-router-dom";

export default function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link component={ReactLink} to="https://rsoclabs.com/" color="inherit">
             RSOC Labs
      </Link>
     {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}