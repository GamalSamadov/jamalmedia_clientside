import { Box, useMediaQuery } from "@mui/material"
import { useSelector } from "react-redux"
import { useLocation } from 'react-router-dom'
import Navbar from "scenes/navbar"
import AdvertWidget from "scenes/widgets/AdvertWidget"
import FriendListWidget from "scenes/widgets/FriendListWidget"
import MyPostWidget from "scenes/widgets/MyPostWidget"
import PostsWidget from "scenes/widgets/PostsWidget"
import UserWidget from "scenes/widgets/UserWidget"


const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const loc = useLocation()
  
  const { _id, picturePath } = useSelector((state) => state.user);


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
          { loc.pathname !== "/guest" ? <UserWidget userId={_id} picturePath={picturePath} /> : 
            <>
              {/* TODO:  add log in form hare */}
            </>
          }
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          { loc.pathname !== "/guest" && <MyPostWidget picturePath={picturePath} />}
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            { loc.pathname !== "/guest" && <FriendListWidget userId={_id} />}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;