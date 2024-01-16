import { Box, useMediaQuery } from "@mui/material"
import Navbar from "scenes/navbar"
import AdvertWidget from "scenes/widgets/AdvertWidget"
import PostsWidget from "scenes/widgets/PostsWidget"


const GuestPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const _id = 0


  return (
    <Box>
      <Navbar />
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
          <PostsWidget userId={_id} />
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