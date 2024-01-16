import { Box, useMediaQuery } from "@mui/material"
import GuestNavbar from "scenes/navbar/guest"
import AdvertWidget from "scenes/widgets/AdvertWidget"
import GuestPostsWidget from "scenes/widgets/GuestPostsWidget"


const GuestPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");


  return (
    <Box>
      <GuestNavbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>  
            <>
              {/* TODO:  add log in form hare */}
            </>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <GuestPostsWidget />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default GuestPage;