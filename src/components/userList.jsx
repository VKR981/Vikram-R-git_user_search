import React from "react";
import UserListItem from "./userListItem";
const userList = ({ list, handleFavorites, favorites, status }) => {
  return (
    <div
      className="gridView"
      style={{ filter: status === "fetching" ? "blur(8px)" : null }}
    >
      {list
        ? list.map((user, index) => {
            const { login, avatar_url } = user;
            return (
              <UserListItem
                key={index}
                login={login}
                isFavorite={favorites[login] ? true : false}
                avatar_url={avatar_url}
                handleFavorites={handleFavorites}
              />
            );
          })
        : null}
    </div>
  );
};

export default userList;
