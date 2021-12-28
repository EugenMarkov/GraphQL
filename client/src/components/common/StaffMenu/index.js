import LinkItem from "../LinkItem";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import useStyles from "./useStyles";

/**
 * @desc function for create staff menu
 * @returns {JSX.Element}
 */
const StaffMenu = () => {
  const classes = useStyles();

  const links = [
    {
      id: 1,
      url: "/admin/staff",
      icon: <ManageAccountsIcon className={classes.icon} />,
      text: "Staff",
    },
    {
      id: 2,
      url: "/admin/staff/new",
      icon: <PersonAddAltIcon className={classes.icon} />,
      text: "New staff",
    },
    {
      id: 3,
      url: "/admin/content",
      icon: <KeyboardBackspaceIcon className={classes.icon} />,
      text: "Back",
    },
  ];

  return (
    <nav className={classes.nav}>
      {links.map(link => (
        <LinkItem key={link.id} url={link.url} icon={link.icon} text={link.text} />
      ))}
    </nav>
  );
};

export default StaffMenu;
