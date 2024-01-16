import { Box, Typography, useTheme } from "@mui/material"
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import * as React from 'react'
import { useNavigate } from "react-router-dom"
import FlexBetween from "./FlexBetween"
import UserImage from "./UserImage"


const GuestFriend = ({ friendId, name, subtitle, userPicturePath, postId }) => {
  const navigate = useNavigate();

  const { palette } = useTheme();

  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

  return (
    <>
      <FlexBetween>
        <FlexBetween gap="1rem">
          <UserImage image={userPicturePath} size="55px" />
          <Box
            onClick={handleClickOpen}
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
          
      </FlexBetween>

      <Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
				  {"سجل الدخول أولا"}
				</DialogTitle>
				<DialogContent>
				<DialogContentText id="alert-dialog-description">
					لمشاهدة محتوى المستخدمين سجل الدخول...
				</DialogContentText>
				</DialogContent>
				<DialogActions>
				<Button onClick={handleClose}>إلغاء</Button>
				<Button onClick={() => {
					navigate("/")
				}} autoFocus>
					تسجيل الدخول
				</Button>
				</DialogActions>
			</Dialog>
    </>
  );
};

export default GuestFriend;