import React from "react";
import { List, Image, Card, Icon } from "semantic-ui-react";
import { useFetch } from "../hooks/useFetch";

export default function UserListItem({
  login,
  avatar_url,
  handleFavorites,
  isFavorite,
}) {
  const { status, error, data } = useFetch(
    `https://api.github.com/users/${login}/repos?per_page=5&sort=pushed`
  );

  return (
    <div>
      <div className="card">
        <div className="section1">
          <img src={avatar_url} className="profilePic" />
          <div className="saveButton">
            <button
              onClick={() =>
                handleFavorites(login, !isFavorite, { login, avatar_url })
              }
            >
              {isFavorite ? "saved" : "save"}
            </button>
          </div>
        </div>
        <div className="cardDetails">
          <div className="name">{login}</div>
          <div className="repoHeader">Top Repositories:</div>

          {Array.isArray(data) ? (
            data.map((repo, i) => (
              <div
                key={i}
                className="repository"
                onClick={() =>
                  window.open(`https://github.com/${repo.full_name}`)
                }
              >
                {repo.name.length > 23
                  ? repo.name.slice(0, 20) + "..."
                  : repo.name}
              </div>
            ))
          ) : (
            <div>error occured</div>
          )}
        </div>
      </div>
    </div>
  );
}
