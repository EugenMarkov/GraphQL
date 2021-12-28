import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";

/**
 * @desc function for create staff account
 * @returns {JSX.Element}
 */
const StaffAccount = () => {
  const { staffId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    Number.isNaN(+staffId) && navigate("/admin/staff");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staffId]);

  return (
    <div>
      <Typography>{`#${staffId} personal data`}</Typography>
    </div>
  );
};

export default StaffAccount;
