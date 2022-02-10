import React from "react";
import Follower from "common/follower";

// DOTO if we don't improve on Follower class, we should delete it; it's meaningless.

class FollowersList extends React.Component {
    renderFollower(user) {
        return (<Following 
            userProfile={user.profile}
            picture={user.picture}
            name={user.name}
            bio={user.bio}
        />);
    }

    render() {
        const followers = this.props.users.map((user, index) => {
            {this.renderFollower(user)}
        });

        return (
            <div className="followersList">
                {followers}
            </div>
        );
    }
}