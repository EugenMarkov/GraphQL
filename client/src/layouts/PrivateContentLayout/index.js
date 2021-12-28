import { Outlet } from "react-router-dom";

/**
 * @desc function for create inner content
 * @returns {JSX.Element}
 */
const PrivateContentLayout = () => {
  return <Outlet />;
};

export default PrivateContentLayout;
