import { Box, Typography, useMediaQuery, useTheme } from "@mui/material"
import Form from "./Form"

const LoginPage = () => {

	const theme = useTheme()
	const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")

	return (
		<Box>
			<Box 
				width="100%" 
				backgroundColor={theme.palette.background.alt} 
				p="1rem 6%" 
				textAlign="center"
			>
				<div 
					cursor="pointer"
					sx={{
						cursor: "pointer",
						"&:hover" : {
							cursor: "pointer",
						}
					}}
				
				>
				<img src={theme.palette.mode === 'light' ? "../assets/hsoubLightLogo.png" : "../assets/hsoubDarkLogo.png"} alt="Hsoub" width={160} />
			</div>
			</Box>

			<Box 
				width={isNonMobileScreen ? "50%" : "93%"}
				p="2rem"
				m="2rem auto"
				borderRadius="1.5rem"
				backgroundColor={theme.palette.background.alt}
			>
				<Typography
					fontWeight="500"
					variant='h5'
					sx={{
						mb: "1.5rem",
					}}
				>
					أهلا بك في حسوب غرام أفضل تطبيق على وجه الأرض
				</Typography>

				<Form />
			</Box>
		</Box>
	)
}

export default LoginPage