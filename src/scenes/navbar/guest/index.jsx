import {
	Close,
	DarkMode,
	LightMode,
	Menu,
	Search
} from '@mui/icons-material'
import {
	Box,
	IconButton,
	InputBase,
	useMediaQuery,
	useTheme
} from '@mui/material'
import FlexBetween from 'components/FlexBetween'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setMode } from "state"


const GuestNavbar = () => {

	const [ isMobileMenuToggled, setIsMobileMenuToggled ] = useState(false)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")

	const theme = useTheme()
	const neutralLight = theme.palette.neutral.light
	const dark = theme.palette.neutral.dark
	const backgroundColor = theme.palette.background.default
	const alt = theme.palette.background.alt

	return (
		<FlexBetween padding="1rem 6%" backgroundColor={alt}>

			{/* LOGO */}
			<div 
				onClick={() => navigate("/home")}
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

			{isNonMobileScreens && (
				<FlexBetween 
					backgroundColor={neutralLight}
					borderRadius="9px"
					gap="3rem"
					padding="0.1rem 1.5rem"
				>
					<InputBase placeholder='بحث...' />
					<IconButton>
						<Search />
					</IconButton>
				</FlexBetween>
			)}

			{/* DESKTOP NAVBAR */}
			{isNonMobileScreens ? (
				<FlexBetween gap="2rem">
					<IconButton onClick={() => dispatch(setMode())}>
						{theme.palette.mode === "dark" ? (
							<DarkMode sx={{ fontSize: "25px"}}/>
						) : (
							<LightMode sx={{ color: dark, fontSize: "25px"}}/>
						)}
					</IconButton>

				</FlexBetween>
			) : (
				<IconButton 
					onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
				>
					<Menu />
				</IconButton>
			)}

			{/* MOBILE NAVBAR */}
			{!isNonMobileScreens && isMobileMenuToggled && (
				<Box
					position="fixed"
					right="0"
					bottom="0"
					height="100%"
					zIndex="10"
					maxWidth="500px"
					minWidth="300px"
					backgroundColor={backgroundColor}
				>
					{/* CLOSE ICON */}
					<Box display="flex" justifyContent="flex-end" p="1rem"> 
						<IconButton
							onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
						>
							<Close />
						</IconButton>
					</Box>

					{/* MENU ITEMS */}
					<FlexBetween display="flex" flexDirection="column"  justifyContent="center" alignItems="center" gap="2rem">
						<IconButton 
							onClick={() => dispatch(setMode())} 
							sx={{ fontSize: "25px" }}
						>
							{theme.palette.mode === "dark" ? (
								<DarkMode sx={{ fontSize: "25px"}}/>
							) : (
								<LightMode sx={{ color: dark, fontSize: "25px"}}/>
							)}
						</IconButton>
					</FlexBetween>
				</Box>
			)}
		</FlexBetween>
	)
}

export default GuestNavbar