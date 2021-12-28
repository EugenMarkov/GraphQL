import CircularProgress from "@mui/material/CircularProgress";
import useStyles from "./useStyles";

/**
 * @desc function for create preloader
 * @param {string} className - preloader className
 * @param {number} size - preloader size
 * @returns {JSX.Element}
 */
const Preloader = ({ className = "", size = 40 }) => {
  const classes = useStyles();

  return (
    <div className={`${classes.preloaderWrap} ${className}`}>
      <CircularProgress size={size} sx={{ color: "#6875F5" }} />
    </div>
  );
};

export default Preloader;
