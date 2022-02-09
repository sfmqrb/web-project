import React from 'react';

// user img ID must be updated

class UserInfo extends React.Component {
    render() {
        return (
            <div>
                <a href={this.props.userProfile}>
                    <img src='../../img/profile1.jpg' alt='user picture'></img>
                </a>
                <p>{this.props.name} &emsp {this.props.bio}</p>
            </div>
        );
    }
}