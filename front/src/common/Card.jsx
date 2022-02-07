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

class _Card_ extends React.Component {
  render() {
    const clr = GetRandomColor();

    return (
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: clr }} aria-label="recipe">
              {this.props.profile_name}
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
