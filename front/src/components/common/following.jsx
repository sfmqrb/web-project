import { Button } from 'bootstrap';
import React from 'react';
import UserInfo from './UserInfo'

// TODO space betwwen user info and button should be set
// TODO chack onClick function with sajad

class Following extends React.Component {
    render() {
        return (
            <div className="followeing">
                <UserInfo userProfile={this.props.userProfile}
                          picture={this.props.picture}
                          name={this.props.name}
                          bio={this.props.bio} />
                &emsp; &emsp; &emsp;
                <Button onClick={() => this.props.onClick(this.props.userID)}>
                    {this.props.followingState}
                </Button>
            </div>
        );
    }
}