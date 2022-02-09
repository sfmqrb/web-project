import React from "react";
import Following from "common/following";

// probably can change userID so we don't need to pass it on

class FollowingList extends React.Component {
    renderFollowing(user) {
        return (<Following 
            userProfile={user.profile}
            picture={user.picture}
            name={user.name}
            bio={user.bio}
            userID={user.userID}
            followingState={user.followingState}
            onClick={(ID) => this.props.onClick(ID)}
        />);
    }
// TODO can I do the mapping with only one element?
    render() {
        const followings = this.props.users.map((user, index) => {
            {this.renderFollowing(user)}
        });

        return (
            <div className="followingList">
                {followings}
            </div>
        );
    }
}