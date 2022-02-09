import React from "react";
import UserInfo from "./UserInfo";

// we cxan add more properties like the starting date of following for each uesr

class Follower extends React.Component {
    render() {
        return (
            <div className="follower">
                <UserInfo userProfile={this.props.userProfile}
                          picture={this.props.picture}
                          name={this.props.name}
                          bio={this.props.bio} />
            </div>
        );
    }
}