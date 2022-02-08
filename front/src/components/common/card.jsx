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
import Tag from "./tag";
import _ from "lodash";

function doTags(tags) {
  return (
    <>
      {tags.map((tag) => (
        <Tag tagName={tag} />
      ))}
    </>
  );
}

class _Card_ extends React.Component {
  render() {
    const clr = GetRandomColor();

    return (
      <Card
        className="mt-5 d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top "
        sx={{ maxWidth: 400 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: clr }} aria-label="recipe">
              {this.props.name.charAt(0)}
            </Avatar>
          }
          title={this.props.title}
          subheader={this.props.subheader}
        />
        <CardMedia
          component="img"
          height="300"
          image={this.props.image}
          alt="dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {this.props.body}
          </Typography>
        </CardContent>
        <CardHeader subheader={doTags(this.props.tags)} />
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default _Card_;
