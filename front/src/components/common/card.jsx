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
import GetRandomColor from "./RandomColor";
import Tag from "./Tag/tag";
import TitleMellow from "./Titles/titleMellow";
import _ from "lodash";

function doTags(tags) {
  return (
    <>
      <TitleMellow title="Tags" />
      {tags.map((tag) => (
        <Tag key={tag} active={true}>
          {tag}
        </Tag>
      ))}
    </>
  );
}

function doIngredients(ingredients) {
  return (
    <>
      <TitleMellow title="Ingredients" />
      {ingredients.map((ingredient) => {
        const { name, quantity, unit } = ingredient;
        console.log(name, quantity, unit);
        return (
          <Tag>
            <span>{name + " "}</span>
            <span style={{ fontSize: "12px" }}>{quantity + unit}</span>
          </Tag>
        );
      })}
    </>
  );
}

class _Card_ extends React.Component {
  render() {
    const clr = GetRandomColor();

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
            className="pic-overlay "
            component="img"
            image={this.props.image}
            alt="dish"
          />
        </div>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: clr }} aria-label="recipe">
              {this.props.name.charAt(0)}
            </Avatar>
          }
          title={this.props.title}
          subheader={this.props.subheader}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {this.props.body}
          </Typography>
        </CardContent>
        <CardHeader subheader={doTags(this.props.tags)} />
        <CardHeader subheader={doIngredients(this.props.ingredients)} />
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={() => {
              this.props.onLike(this.props._id);
            }}
            color={this.props.liked ? "error" : "default"}>
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default _Card_;
