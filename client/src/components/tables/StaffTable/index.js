import { useState, useEffect } from "react";
import { useQuery, useMutation, useReactiveVar } from "@apollo/client";
import { staffVar } from "../../../graphql/cache";

import MaterialTable from "@material-table/core";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import TablePagination from "@mui/material/TablePagination";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import RoleHandler from "../../common/RoleHanlder";
import StaffModal from "../../modals/StaffModal";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { USER_UPDATE } from "../../../graphql/mutations";
import { GET_STAFF } from "../../../graphql/queries";

import useStyles from "../useStyles";

/**
 * @desc function for create users table
 * @returns {JSX.Element}
 */
const StaffTable = () => {
  const classes = useStyles();
  const { content, currentPage, email, size, totalCount } = useReactiveVar(staffVar);
  const [modalData, setModalData] = useState({
    isModalOpen: false,
    modalContent: null,
    user: {
      id: null,
    },
  });

  const { loading, error, data } = useQuery(GET_STAFF, {
    variables: {
      page: currentPage,
      size,
      email,
    },
  });

  const [updateUser] = useMutation(USER_UPDATE, {
    refetchQueries: [GET_STAFF, "getStaff"],
  });

  const handleUserEnabled = rowData => {
    updateUser({ variables: { userId: rowData.id, object: { role: rowData.role, enabled: !rowData.enabled } } })
      .then(r => console.log(r))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (data) {
      const {
        getStaff: { content, currentPage, size, totalCount },
      } = data;

      staffVar({ ...staffVar(), content, currentPage, size, totalCount });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const columns = [
    {
      title: "Email",
      field: "email",
      width: 200,
      render: rowData => (
        <Typography noWrap className={classes.tablefield_email}>
          {rowData.email}
        </Typography>
      ),
      sorting: false,
    },
    {
      title: "Username",
      field: "name",
      width: 200,
      render: rowData => (
        <Typography noWrap className={classes.tablefield_email}>
          {rowData.name}
        </Typography>
      ),
      sorting: false,
    },
    {
      title: "Enabled",
      field: "enabled",
      align: "center",
      width: 300,
      render: rowData =>
        rowData.role === "OWNER" ? null : (
          <Switch size="small" checked={rowData.enabled} onChange={() => handleUserEnabled(rowData)} />
        ),
      sorting: false,
    },
    {
      title: "Role",
      field: "role",
      align: "center",
      width: 200,
      render: rowData => (
        <Typography noWrap className={classes.tablefield_role}>
          <RoleHandler role={rowData.role} />
        </Typography>
      ),
      sorting: false,
    },
  ];

  return (
    <section className={`${classes.table_section}`}>
      <Typography align="center" variant="h4" className={classes.table_title}>
        Staff management
      </Typography>
      <MaterialTable
        columns={columns}
        isLoading={loading}
        data={content}
        paging={false}
        title="Staff list"
        actions={[
          {
            icon: <EditIcon />,
            action: "edit",
            tooltip: "Edit user",
            onClick: (event, rowData) => {
              setModalData({
                isModalOpen: true,
                modalContent: "EDIT",
                user: rowData,
              });
            },
          },
          {
            icon: <DeleteForeverIcon />,
            action: "delete",
            tooltip: "Delete user",
            onClick: (event, rowData) => {
              setModalData({
                isModalOpen: true,
                modalContent: "DELETE",
                user: rowData,
              });
            },
          },
        ]}
        onSearchChange={str => staffVar({ ...staffVar(), email: str, page: 1 })}
        options={{
          actionsColumnIndex: -1,
          pageSize: 20,
          emptyRowsWhenPaging: false,
          minBodyHeight: 410,
          draggable: false,
          searchText: email,
        }}
        components={{
          Pagination: () => (
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              page={currentPage - 1}
              count={totalCount}
              rowsPerPage={size}
              SelectProps={{ inputProps: { "aria-label": "rows per page" } }}
              onPageChange={(e, page) => staffVar({ ...staffVar(), currentPage: page + 1 })}
              onRowsPerPageChange={e => staffVar({ ...staffVar(), size: +e.target.value, page: 1 })}
            />
          ),
          Action: props => {
            if (props.data.role === "OWNER") {
              return null;
            }
            return props.action.action === "delete" && props.data.enabled ? (
              <IconButton aria-label={props.action.icon} disabled={props.data.enabled || props.data.role === "OWNER"}>
                <Icon>{props.action.icon}</Icon>
              </IconButton>
            ) : (
              <Tooltip title={props.action.tooltip}>
                <IconButton aria-label={props.action.icon} onClick={event => props.action.onClick(event, props.data)}>
                  <Icon>{props.action.icon}</Icon>
                </IconButton>
              </Tooltip>
            );
          },
        }}
      />

      <StaffModal
        setModalData={setModalData}
        isModalOpen={modalData.isModalOpen}
        modalContent={modalData.modalContent}
        user={modalData.user}
      />
    </section>
  );
};

export default StaffTable;
