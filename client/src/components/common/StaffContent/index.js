import { Outlet } from "react-router-dom";

import Typography from "@mui/material/Typography";

/**
 * @desc function for create staff content container
 * @returns {JSX.Element}
 */
const StaffContent = () => {
  return (
    <section>
      <Typography variant="h3">Staff</Typography>
      <Outlet />
    </section>
  );
};

export default StaffContent;
