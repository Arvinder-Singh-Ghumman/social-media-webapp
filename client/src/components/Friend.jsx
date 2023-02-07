import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";
import { setFriends } from "state";
import UserImage from "./UserImage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.primary.main;
  const medium = palette.primary.medium;

  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if(response.status===200){
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  }};

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/$friendId`);
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
      <IconButton
        onClick={() => patchFriend()}
        sx={{
          backgroundColor: primaryLight,
          p: "0.6rem",
        }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }}  />
        ) : (
          <PersonAddOutlined />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;