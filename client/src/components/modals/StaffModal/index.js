import { useState } from "react";
import { useMutation } from "@apollo/client";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Preloader from "../../common/Preloader";
import ErrorHandler from "../../common/ErrorHandler";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { USER_UPDATE, USER_DELETE } from "../../../graphql/mutations";

import useStyles from "../useStyles";
import { GET_STAFF } from "../../../graphql/queries";

/**
 * @desc function for create staff modal
 * @returns {JSX.Element}
 */
const StaffModal = ({ isModalOpen, modalContent, user, setModalData }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = [
    { title: "User", value: "USER" },
    { title: "Administrator", value: "ADMIN" },
  ];

  const handleSelectChange = (event, option) => {
    setModalData({ isModalOpen, modalContent, user: { ...user, role: option.value } });
  };

  const [updateUser] = useMutation(USER_UPDATE, {
    refetchQueries: [GET_STAFF, "getStaff"],
  });

  const closeModal = () => {
    setError(null);
    setModalData({
      isModalOpen: false,
      modalContent: null,
      user: {
        id: null,
      },
    });
  };

  const editUserRole = () => {
    setLoading(true);
    setError(null);
    updateUser({ variables: { userId: user.id, object: { role: user.role, enabled: user.enabled } } })
      .then(
        ({
          data: {
            updateUser: { status, error },
          },
        }) => {
          setLoading(false);
          status && closeModal();
          error && setError(error);
        }
      )
      .catch(err => {
        console.log(err);
        setLoading(false);
        setError(err.message);
      });
  };

  const [deleteUser] = useMutation(USER_DELETE, {
    refetchQueries: [GET_STAFF, "getStaff"],
  });

  const deleteUserConfirm = () => {
    setLoading(true);
    setError(null);
    deleteUser({ variables: { userId: user.id } })
      .then(
        ({
          data: {
            deleteUser: { status, error },
          },
        }) => {
          setLoading(false);
          status && closeModal();
          error && setError(error);
        }
      )
      .catch(err => {
        console.log(err);
        setLoading(false);
        setError(err.message);
      });
  };

  const confirmBtnClick = () => {
    modalContent === "DELETE" && deleteUserConfirm();
    modalContent === "EDIT" && editUserRole();
  };

  return (
    isModalOpen && (
      <Modal open={isModalOpen} onClose={closeModal} className={classes.modal} closeAfterTransition disableScrollLock={true}>
        <div className={classes.paper}>
          <div className={classes.modal_wrap}>
            <Typography className={classes.modal_text}>
              {modalContent === "DELETE" && `Delete user ${user.email}`}
              {modalContent === "EDIT" && `Change the role of user ${user.email}`}
            </Typography>

            <IconButton className={classes.modal_close_btn} onClick={closeModal} aria-label="close">
              <CloseIcon />
            </IconButton>

            {modalContent === "EDIT" && (
              <Autocomplete
                value={options.filter(el => el.value === user.role)[0]}
                onChange={handleSelectChange}
                disableClearable
                options={options}
                autoHighlight
                getOptionLabel={option => option.title}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Role"
                    className={classes.modal_autocomplete_input}
                    placeholder="Role"
                    variant="outlined"
                    type="button"
                  />
                )}
                classes={{ inputRoot: classes.modal_autocomplete }}
              />
            )}

            <div className={classes.modal_buttons}>
              <Button onClick={closeModal} variant="contained" className={classes.modal_btn}>
                No
              </Button>
              {loading ? (
                <div className={classes.modal_btn}>
                  <Preloader />
                </div>
              ) : (
                <Button onClick={confirmBtnClick} variant="contained" className={classes.modal_btn}>
                  Yes
                </Button>
              )}
            </div>

            {!!error && <ErrorHandler error={error} />}
          </div>
        </div>
      </Modal>
    )
  );
};

export default StaffModal;
