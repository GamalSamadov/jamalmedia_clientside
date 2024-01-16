import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import {
	Box,
	Button,
	TextField,
	Typography,
	useMediaQuery,
	useTheme
} from "@mui/material"
import MuiAlert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import FlexBetween from 'components/FlexBetween'
import { Formik } from "formik"
import * as React from 'react'
import { useState } from 'react'
import Dropzone from 'react-dropzone'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { setLogin } from 'state'
import * as yup from "yup"


const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const registerSchema = yup.object().shape({
	firstName: yup.string().required("حقل إجباري"),
	lastName: yup.string().required("حقل إجباري"),
	email: yup.string().email("البريد الإلكتروني غير صالح").required("حقل إجباري"),
	password: yup.string().required("حقل إجباري"),
	location: yup.string().required("حقل إجباري"),
	occupation: yup.string().required("حقل إجباري"),
	picture: yup.string().required("حقل إجباري"),
})

const loginSchema = yup.object().shape({
	email: yup.string().email("البريد الإلكتروني غير صالح").required("حقل إجباري"),
	password: yup.string().required("حقل إجباري"),
})

const initialValuesRegister = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	location: "",
	occupation: "",
	picture: "",
}

const initialValuesLogin  = {
	email: "",
	password: ""
}

const Form = () => {

	const [ pageType, setPageType ] = useState("login")
	const { palette } = useTheme()
	const dispatch = useDispatch()
	const isNonMobile = useMediaQuery("(min-width:600px)")
	const isLogin = pageType === 'login'
	const isRegister = pageType === 'register'
	const navigate = useNavigate();

	const register = async (values, onSubmitProps) => {
		// this allows us to send form info with image
		const formData = new FormData();
		for (let value in values) {
		  formData.append(value, values[value]);
		}
		formData.append("picturePath", values.picture.name);
	
		const savedUserResponse = await fetch(
		  "https://hsoub-api.onrender.com/auth/register",
		  {
			method: "POST",
			body: formData,
			
		  }
		);
		const savedUser = await savedUserResponse.json();
		
		if (savedUser) {
			setPageType("login");
			registerAlert()
		}

		onSubmitProps.resetForm();
	};
	
	const login = (values, onSubmitProps) => {
		fetch(
			"https://hsoub-api.onrender.com/auth/login", 
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			}
		)
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
			loginAlert() // error
		})
		.then((user) => {
			console.log(user)
			if (user) {
				dispatch(
					setLogin({
						user: user.user,
						token: user.token,
					})
				)
			}
		})
		.catch(() => {
			loginAlert() // error
		})
	};

	const handleFormSubmit = async (values, onSubmitProps) => {
		if (isLogin) await login(values, onSubmitProps)
		if (isRegister) await register(values, onSubmitProps)
	}

	const [openRegisterSuccessed, setOpenRegisterSuccessed] = React.useState(false);

	const registerAlert = () => {
		setOpenRegisterSuccessed(true);
	};
  
	const handleCloseRegisterSuccessed = (event, reason) => {
	  if (reason === 'clickaway') {
		return;
	  }
  
	  setOpenRegisterSuccessed(false);
	};

	const [openLoginError, setOpenLoginError] = React.useState(false);

	const loginAlert = () => {
		setOpenLoginError(true);
	};
  
	const handleCloseLoginError = (event, reason) => {
	  if (reason === 'clickaway') {
		return;
	  }
  
	  setOpenLoginError(false);
	};

	return (
		<>
			<Formik 
				onSubmit={handleFormSubmit}
				initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
				validationSchema={isLogin ? loginSchema : registerSchema}
			>
				{({
					values,
					errors,
					touched,
					handleBlur,
					handleChange,
					handleSubmit,
					setFieldValue,
					resetForm
				}) => (
					<form onSubmit={(e) => {
						e.preventDefault()
						handleSubmit()
					}}>
						<Box 
							display="grid"
							gap="30px"
							gridTemplateColumns="repeat(4, minmax(0, 1fr))"
							sx={{
								"& > div": {gridColumn: isNonMobile ? undefined : "span 4"}
							}}
						>
							{isRegister && (
								<>
									<TextField
										label="الاسم"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.firstName}
										name="firstName"
										error={Boolean(touched.firstName) && Boolean(errors.firstName)}
										helperText={touched.firstName && errors.firstName}
										sx={{
											gridColumn: "span 2"
										}}
									/>
									<TextField
										label="اسم العائلة"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.lastName}
										name="lastName"
										error={Boolean(touched.lastName) && Boolean(errors.lastName)}
										helperText={touched.lastName && errors.lastName}
										sx={{
											gridColumn: "span 2"
										}}
									/>
									<TextField
										label="العنوان"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.location}
										name="location"
										error={Boolean(touched.location) && Boolean(errors.location)}
										helperText={touched.location && errors.location}
										sx={{
											gridColumn: "span 4"
										}}
									/>
									<TextField
										label="الوظيفة"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.occupation}
										name="occupation"
										error={Boolean(touched.occupation) && Boolean(errors.occupation)}
										helperText={touched.occupation && errors.occupation}
										sx={{
											gridColumn: "span 4"
										}}
									/>
									<Box
										gridColumn="span 4"
										border={`1px solid ${palette.neutral.medium}`}
										borderRadius="5px"
										p="1rem"
									>
										<Dropzone
											acceptedFiles=".jpg,.jpeg,.png"
											multiple={false}
											onDrop={(acceptedFiles) => 
												setFieldValue("picture", acceptedFiles[0])
											}
										>
											{({ getRootProps, getInputProps }) => (
												<Box
													{...getRootProps()}
													border={`2px dashed ${palette.primary.main}`}
													p='1rem'
													sx={{
														"&:hover": { cursor: "pointer" } 
													}}
												>
													<input {...getInputProps()}/>
													{!values.picture ? (
														<p>اسحب صورتك الشخصية هنا</p>
													) : (
														<FlexBetween>
															<Typography>
																{values.picture.name}
															</Typography>
															<EditOutlinedIcon />
														</FlexBetween>
													)}
												</Box>
											)}
										</Dropzone>
									</Box>
								</>
							)}
							<TextField
								label="البريد الإلكتروني"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.email}
								name="email"
								error={Boolean(touched.email) && Boolean(errors.email)}
								helperText={touched.email && errors.email}
								sx={{
									gridColumn: "span 4"
								}}
							/>
							<TextField
								label="الرقم السري"
								type="password"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.password}
								name="password"
								error={Boolean(touched.password) && Boolean(errors.password)}
								helperText={touched.password && errors.password}
								sx={{
									gridColumn: "span 4"
								}}
							/>
						</Box>

						{/* BUTTON */}
						<Box>
							<Button
								fullWidth
								type='submit'
								sx={{
									m: "2rem 0",
									p: "1rem",
									backgroundColor: palette.primary.main,
									color: palette.background.alt,
									"&:hover": {color: palette.primary.main}
								}}
							>
								{isLogin ? "تسجيل الدخول": "إنشاء الحساب"}
							</Button>
							<Typography
								onClick={() => {
									setPageType(isLogin? "register" : "login")
									resetForm()
								}}
								sx={{
									textDecoration: "underlined",
									color: palette.primary.main,
									"&:hover": {
										cursor: "pointer",
										color: palette.primary.light,
									}
								}}
							>
								{isLogin 
									? "لا يوجد لديك حساب؟ أنشئ من هنا..." 
									: "هل لديك حساب؟ سجل الدخول من هنا..."
								}
							</Typography>
						</Box>

						<Box>
							<Button
								fullWidth
								onClick={() => navigate("/guest")}
								type='button'
								sx={{
									m: "2rem 0",
									p: "1rem",
									backgroundColor: palette.primary.main,
									color: palette.background.alt,
									"&:hover": {color: palette.primary.main}
								}}
							>
								متابعة كضيف...
							</Button>
						</Box>
					</form>
				)}
			</Formik>

			{/* REGISTER SUCCESS */}
			<Snackbar open={openRegisterSuccessed} autoHideDuration={6000} onClose={handleCloseRegisterSuccessed}>
			<Alert onClose={handleCloseRegisterSuccessed} severity="success" sx={{ width: '100%' }}>
				تم إنشاء الحساب! يمكنك الدخول إليه الآن...
			</Alert>
			</Snackbar>

			{/* LOGIN ERROR */}
			<Snackbar open={openLoginError} autoHideDuration={6000} onClose={handleCloseLoginError}>
			<Alert onClose={handleCloseLoginError} severity="error" sx={{ width: '100%' }}>
				البريد الإلكتروني أو الرقم السري خاطئ!
			</Alert>
			</Snackbar>


		</>
	)
}

export default Form