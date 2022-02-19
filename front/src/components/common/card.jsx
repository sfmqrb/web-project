import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreIcon from "@mui/icons-material/More";
import doIngredients from "./commonUtils/doIngredients";
import doTags from "./commonUtils/doTags";
import {Link} from "react-router-dom";

const clr = "dark";

const _Card_ = (props) => {
    const {
        id,
        name: userName,
        profileImgUrl,
        title,
        subheader,
        images,
        body,
        liked,
        onLike,
        tags,
        ingredients,
    } = props;
    const image = images[0] || null;
    console.log("card img  ",image)
    return (
        <Card
            key={id}
            className="m-5"
            sx={{
                maxWidth: 500,
                marginRight: "2px!important",
                marginLeft: "2px!important",
            }}>
            <div>
                <CardMedia
                    className="pic-overlay"
                    component="img"
                    image={image? image:"https://images.freekaamaal.com/post_images/1606817930.jpg"}
                    alt="dish"
                />
            </div>
            <CardHeader
                avatar={
                    <Link to={`/profile/${userName}`} className="no-text-decoration">
                        {profileImgUrl ? <img
                                src={profileImgUrl || ""}
                                alt="avatar"
                                width="50"
                                height="50"
                                className="rounded-circle"
                            /> :
                            <Avatar sx={{bgcolor: clr}} aria-label="recipe">
                                {
                                    userName.charAt(0)
                                }
                            </Avatar>}
                    </Link>
                }
                title={title}
                subheader={subheader}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {body}
                </Typography>
            </CardContent>
            <CardHeader subheader={doTags(tags)}/>
            <CardHeader subheader={doIngredients(ingredients)}/>
            <CardActions disableSpacing>
                <IconButton
                    aria-label="add to favorites"
                    onClick={() => {
                        onLike(id);
                    }}
                    color={liked ? "error" : "default"}>
                    <FavoriteIcon/>
                </IconButton>
                <Link to={`/recipe/${id}`}>
                    <IconButton aria-label="More Info" color="primary">
                        <MoreIcon/>
                    </IconButton>
                </Link>
            </CardActions>
        </Card>
    );
};

export default _Card_;
