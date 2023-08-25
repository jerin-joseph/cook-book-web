import { Link, Typography } from "@mui/material";
import { Link as ReactLink} from "react-router-dom";

export default function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <ReactLink to="https://rsoclabs.com/">
        <Link color="inherit" >
             RSOC Labs
        </Link>
      </ReactLink>
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}