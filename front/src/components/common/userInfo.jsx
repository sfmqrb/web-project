import React from 'react';

// TODO name and bio can be more customized

class UserInfo extends React.Component {
    render() {
        return (
            <div>
                <a href={this.props.userProfile}>
                  <img 
                            src={this.props.picture}
                            alt="user picture"
                            width="50"
                            height="50"
                            className="rounded-circle"/>
                </a>
                <span> &nbsp; <b>{this.props.name}</b> &emsp; {this.props.bio}</span>
            </div>
        );
    }
}
  
export default UserInfo;