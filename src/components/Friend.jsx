import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material"
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, IconButton, Typography, useTheme } from "@mui/material"
import MuiAlert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Snackbar from '@mui/material/Snackbar'
import TextField from '@mui/material/TextField'
import { Formik } from "formik"
import * as React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { setFriends, setPosts } from "state"
import * as yup from "yup"
import FlexBetween from "./FlexBetween"
import UserImage from "./UserImage"

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const editPostSchema = yup.object().shape({
	description: yup.string().required("حقل إجباري"),
})

const initialValuesEditPost = {
	description: "",
}

const Friend = ({ friendId, name, subtitle, userPicturePath, postId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const loc = useLocation()

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const isFriend = friends?.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `https://hsoub-api.onrender.com/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };
  
  const deletePostSubmit = async (e) => {
    await fetch(
      `https://hsoub-api.onrender.com/posts/${postId}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type':'application/json',
          'Accept':'application/json',
        },
      }
    )
    handleCloseDeletePost()
    successDeleteAlertShow()
  }

  const editPostSubmit = async (values, onSubmitProps) => {
    const response = await fetch(
      `https://hsoub-api.onrender.com/posts/${postId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type':'application/json',
          'Accept':'application/json',
        },
        body: JSON.stringify({
          description: values.description
        }),
      }
    )
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
    onSubmitProps.resetForm()
    handleEditDialogClose()
    successAlertShow()
  }

  const [editDialogOpen, setEditDialogOpen] = React.useState(false);

  const handleEditDialogOpen = () => {
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const [openDeletePost, setOpenDeletePost] = React.useState(false);

  const handleClickOpenDeletePost = () => {
    setOpenDeletePost(true);
  };

  const handleCloseDeletePost = () => {
    setOpenDeletePost(false);
  };

  const [openEditSuccessed, setOpenEditSuccessed] = React.useState(false);

  const successAlertShow = () => {
    setOpenEditSuccessed(true);
  };

  const handleCloseEditSuccessed = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenEditSuccessed(false);
  };

  const [openDeleteSuccessed, setOpenDeleteSuccessed] = React.useState(false);

  const successDeleteAlertShow = () => {
    setOpenDeleteSuccessed(true);
  };

  const handleCloseDeleteSuccessed = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenDeleteSuccessed(false);
  };

  return (
    <>
      <FlexBetween>
        <FlexBetween gap="1rem">
          <UserImage image={userPicturePath} size="55px" />
          <Box
            onClick={() => {
              navigate(`/profile/${friendId}`);
              navigate(0);
            }}
          >
            <Typography
              color={main}
              variant="h5"
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {name}
            </Typography>
            <Typography color={medium} fontSize="0.75rem">
              {subtitle}
            </Typography>
          </Box>
        </FlexBetween>
        {loc.pathname === `/profile/${_id}` ? 
          <div>
            {/* EDIT BTN */}
            <BorderColorIcon
              onClick={handleEditDialogOpen}
              sx={{
                color: palette.primary.main,
                ml: "15px",
                "&:hover": {
                  cursor: "pointer",
                }
              }}
            />
            
            {/* EDIT DIALOG */}
            <Formik 
              onSubmit={editPostSubmit}
              initialValues={initialValuesEditPost}
              validationSchema={editPostSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <Dialog 
                  open={editDialogOpen}
                  onClose={handleEditDialogClose}
                  PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit,
                  }}
                >
                  <DialogTitle>التعديل</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      وصف المنشور
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      fullWidth
                      variant="standard"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="description"
                      error={Boolean(touched.description) && Boolean(errors.description)}
                      helperText={touched.description && errors.description}
                      value={values.description}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleEditDialogClose}>إلغاء</Button>
                    <Button type="submit">حفظ</Button>
                  </DialogActions>
                </Dialog>
              )}
            </Formik>
            
            {/* DELETE BTN */}
            <DeleteIcon 
              onClick={handleClickOpenDeletePost}
              sx={{
                color: "red",
                "&:hover": {
                  cursor: "pointer",
                }
              }}
            />

            {/* DELETE DIALOG */}
            <Dialog
              open={openDeletePost}
              onClose={handleCloseDeletePost}
              PaperProps={{
                component: 'form',
                onSubmit: deletePostSubmit,
              }}
            >
              <DialogTitle>حذع المنشور</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  هل أنت متأكد من الحذف؟!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDeletePost}>إلغاء</Button>
                <Button type="submit" sx={{color: "red"}}>حذف</Button>
              </DialogActions>
            </Dialog>

          </div>
          : <IconButton
              onClick={() => patchFriend()}
              sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
            >
              {isFriend ? (
                <PersonRemoveOutlined sx={{ color: primaryDark }} />
              ) : (
                <PersonAddOutlined sx={{ color: primaryDark }} />
              )}
            </IconButton>
          }
      </FlexBetween>

      {/* POST EDIT SUCCESS */}
      <Snackbar open={openEditSuccessed} autoHideDuration={4000} onClose={handleCloseEditSuccessed}>
      <Alert onClose={handleCloseEditSuccessed} severity="success" sx={{ width: '100%' }}>
        تم التعديل!
      </Alert>
      </Snackbar>

      {/* POST DELETE SUCCESS */}
      <Snackbar open={openDeleteSuccessed} autoHideDuration={4000} onClose={handleCloseDeleteSuccessed}>
      <Alert onClose={handleCloseDeleteSuccessed} severity="info" sx={{ width: '100%' }}>
        تم الحذف!
      </Alert>
      </Snackbar>
    </>
  );
};

export default Friend;