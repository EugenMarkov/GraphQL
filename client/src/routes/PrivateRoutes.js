import { Routes, Route, Navigate } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { isAuthenticated } from "../graphql/cache";

import SideMenuLayout from "../layouts/SideMenuLayout";
import PrivateContentLayout from "../layouts/PrivateContentLayout";
import SideMenu from "../components/common/SideMenu";
import StaffMenu from "../components/common/StaffMenu";
import PrivateContent from "../components/common/PrivateContent";
import PrivateFilesContent from "../components/common/PrivateFilesContent";
import UsersContent from "../components/common/UsersContent";
import StaffContent from "../components/StaffContent";
import StaffTable from "../components/tables/StaffTable";
import StaffAccount from "../components/common/StaffAccount";

const RequireUser = ({ children, role }) => {
  return role === "USER" ? children : <Navigate to="/admin/content" />;
};

const RequireAdmin = ({ children, role }) => {
  return ["ADMIN", "OWNER"].includes(role) ? children : <Navigate to="/admin/content" />;
};

const RequireOwner = ({ children, role }) => {
  return role === "OWNER" ? children : <Navigate to="/admin/content" />;
};

export const SideMenuRoutes = () => {
  const { role } = useReactiveVar(isAuthenticated);

  return (
    <Routes>
      <Route path="/" element={<SideMenuLayout />}>
        <Route path="content" element={<SideMenu />} />
        <Route path="staff/*" element={<RequireOwner role={role} children={<StaffMenu />} />} />
        <Route path="*" element={<SideMenu />} />
      </Route>
    </Routes>
  );
};

export const PrivateContentRoutes = () => {
  const { role } = useReactiveVar(isAuthenticated);

  return (
    <Routes>
      <Route path="/" element={<PrivateContentLayout />}>
        <Route path="content" element={<PrivateContent />} />
        <Route path="chat" element={<div>Chat</div>} />
        <Route path="support" element={<RequireUser role={role} children={<div>Support</div>} />} />
        <Route path="files" element={<RequireAdmin role={role} children={<PrivateFilesContent />} />} />
        <Route path="users" element={<RequireAdmin role={role} children={<UsersContent />} />} />
        <Route path="staff" element={<RequireOwner role={role} children={<StaffContent />} />}>
          <Route index element={<StaffTable />} />
          <Route path=":staffId" element={<StaffAccount />} />
          <Route path="new" element={<div>Add staff form</div>} />
        </Route>
        <Route path="*" element={<Navigate to="/admin/content" />} />
      </Route>
    </Routes>
  );
};
