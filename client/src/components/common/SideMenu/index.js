import { useReactiveVar } from "@apollo/client";
import { isAuthenticated } from "../../../graphql/cache";

import LinkItem from "../LinkItem";
import ArticleIcon from "@mui/icons-material/Article";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import GroupIcon from "@mui/icons-material/Group";
import ChatIcon from "@mui/icons-material/Chat";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SupportIcon from "@mui/icons-material/Support";

import useStyles from "./useStyles";

/**
 * @desc function for create side menu
 * @returns {JSX.Element}
 */
const SideMenu = () => {
  const classes = useStyles();
  const { role } = useReactiveVar(isAuthenticated);

  const links = [
    {
      id: 1,
      url: "/admin/content",
      icon: <ArticleIcon className={classes.icon} />,
      text: "Content",
      roles: ["OWNER", "ADMIN", "USER"],
    },
    {
      id: 2,
      url: "/admin/files",
      icon: <InsertDriveFileIcon className={classes.icon} />,
      text: "Private files",
      roles: ["OWNER", "ADMIN"],
    },
    {
      id: 3,
      url: "/admin/users",
      icon: <GroupIcon className={classes.icon} />,
      text: "Users",
      roles: ["OWNER", "ADMIN"],
    },
    {
      id: 4,
      url: "/admin/staff",
      icon: <ManageAccountsIcon className={classes.icon} />,
      text: "Staff",
      roles: ["OWNER"],
    },
    {
      id: 5,
      url: "/admin/chat",
      icon: <ChatIcon className={classes.icon} />,
      text: "Chat",
      roles: ["OWNER", "ADMIN", "USER"],
    },
    {
      id: 6,
      url: "/admin/support",
      icon: <SupportIcon className={classes.icon} />,
      text: "Support",
      roles: ["USER"],
    },
  ];
  const filteredLinks = links.filter(linkItem => linkItem.roles.includes(role));

  return (
    <nav className={classes.nav}>
      {filteredLinks.map(link => (
        <LinkItem key={link.id} url={link.url} icon={link.icon} text={link.text} />
      ))}
    </nav>
  );
};

export default SideMenu;
