import { Link, useLocation } from "react-router-dom";

import useStyles from "./useStyles";

/**
 * @desc function for create menu item
 * @returns {JSX.Element}
 */
const LinkItem = ({ url, icon, text }) => {
  const classes = useStyles();
  const { pathname } = useLocation();

  return (
    <Link to={url} className={`${classes.link} ${pathname === url ? classes.link__selected : ""}`}>
      {icon}
      {text}
    </Link>
  );
};

export default LinkItem;
