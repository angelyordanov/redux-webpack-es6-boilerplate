import React, { Component } from 'react';

import FriendListItem from '../FriendListItem';
import './FriendList.scss';

export default class FriendList extends Component {
  renderList() {
    return this.props.friends.map((friend) =>
      (
        <FriendListItem
          key={friend.id}
          id={friend.id}
          name={friend.name}
          starred={friend.starred}
          {...this.props.actions} />
      )
    );
  }

  render() {
    return (
      <ul className="friendList">
        {this.renderList()}
      </ul>
    );
  }
}
