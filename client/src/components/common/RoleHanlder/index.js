/**
 * @desc function for handling user role
 * @param {string} role - current user role
 * @returns {JSX.Element}
 */
const RoleHandler = ({ role }) => {
  const roles = {
    USER: "User",
    ADMIN: "Administrator",
    OWNER: "Owner",
  };

  return role ? roles[role] : "";
};

export default RoleHandler;
