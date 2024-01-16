import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined
} from "@mui/icons-material"
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material"
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import FlexBetween from "components/FlexBetween"
import GuestFriend from "components/GuestFriend"
import WidgetWrapper from "components/WidgetWrapper"
import * as React from 'react'
import { useState } from "react"
import { useNavigate } from 'react-router-dom'

  
const GuestPostWidget = ({
	postId,
	postUserId,
	name,
	description,
	location,
	picturePath,
	userPicturePath,
	likes,
	comments,
  }) => {
	const [isComments, setIsComments] = useState(false);

	const likeCount = Object.keys(likes).length;
  
	const { palette } = useTheme();
	const main = palette.neutral.main;
	const navigate = useNavigate();

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
  
	return (
		<>
			<WidgetWrapper mb="2rem">
				<GuestFriend
					friendId={postUserId}
					name={name}
					subtitle={location}
					userPicturePath={userPicturePath}
					postId={postId}
				/>
				<Typography color={main} sx={{ mt: "1rem" }}>
					{description}
				</Typography>
					{picturePath && (
						<img
							width="100%"
							height="auto"
							alt="post"
							style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
							src={`https://hsoub-api.onrender.com/assets/${picturePath}`}
						/>
					)}
				<FlexBetween mt="0.25rem">
					<FlexBetween gap="1rem">
						<FlexBetween gap="0.3rem">
								<IconButton onClick={handleClickOpen}>
									<FavoriteBorderOutlined />
								</IconButton>
						<Typography>{likeCount}</Typography>
						</FlexBetween>
			
						<FlexBetween gap="0.3rem">
						<IconButton onClick={() => setIsComments(!isComments)}>
							<ChatBubbleOutlineOutlined />
						</IconButton>
						<Typography>{comments.length}</Typography>
						</FlexBetween>
					</FlexBetween>
				</FlexBetween>
				{isComments && (
				<Box mt="0.5rem">
					{comments.map((comment, i) => (
					<Box key={`${name}-${i}`}>
						<Divider />
						<Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
						{comment}
						</Typography>
					</Box>
					))}
					<Divider />
				</Box>
				)}
			</WidgetWrapper>

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
					عملية الإعجاب مسموحة فقط لمسجلي الدخول. سجل دخولك الآن...
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
  
export default GuestPostWidget;