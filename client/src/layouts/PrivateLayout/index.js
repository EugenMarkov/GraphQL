import { SideMenuRoutes, PrivateContentRoutes } from "../../routes/PrivateRoutes";
import LogoutButton from "../../components/common/LogoutButton";

import useStyles from "./useStyles";

/**
 * @desc function for create inner layout
 * @returns {JSX.Element}
 */
const PrivateLayout = () => {
  const classes = useStyles();

  return (
    <section className={`${classes.main_section} container`}>
      <aside className={classes.aside}>
        <SideMenuRoutes />
        <LogoutButton />
      </aside>
      <main className={classes.main}>
        <PrivateContentRoutes />
      </main>
    </section>
  );
};

export default PrivateLayout;
