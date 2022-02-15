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
import Tag from "./Tag/tag";
import TitleMellow from "./Titles/titleMellow";
import doIngredients from "./commonUtils/doIngredients";
import _ from "lodash";
import { Link } from "react-router-dom";

function doTags(tags) {
  return (
    <>
      <TitleMellow title="Tags" />
      {tags.map((tag) => (
        <Tag key={tag.id} active={true}>
          {tag.text}
        </Tag>
      ))}
    </>
  );
}

const clr = "dark";

const _Card_ = (props) => {
  const {
    _id,
    name: userName,
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
  return (
    <Card
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
          image={image}
          alt="dish"
        />
      </div>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: clr }} aria-label="recipe">
            {userName.charAt(0)}
          </Avatar>
        }
        title={title}
        subheader={subheader}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {body}
        </Typography>
      </CardContent>
      <CardHeader subheader={doTags(tags)} />
      <CardHeader subheader={doIngredients(ingredients)} />
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => {
            onLike(_id);
          }}
          color={liked ? "error" : "default"}>
          <FavoriteIcon />
        </IconButton>
        <Link to={`/recipe/${_id}`}>
          <IconButton aria-label="More Info" color="primary">
            <MoreIcon />
          </IconButton>
        </Link>
      </CardActions>
    </Card>
  );
};

export default _Card_;
