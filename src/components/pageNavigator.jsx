import React from "react";
import { Input, Icon, Button, List, Image, Header } from "semantic-ui-react";

export default function pageNavigator({
  pageNumber,
  setPageNumber,
  setShowFavorites,
  showFavorites,
}) {
  return (
    <div className="pageNavigator">
      <Icon
        name="angle left"
        link
        size="large"
        onClick={() => {
          if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
          }
        }}
      />
      <div>page: {pageNumber}</div>
      <Icon
        name="angle right"
        link
        size="large"
        onClick={() => {
          setPageNumber(pageNumber + 1);
        }}
      />
      <button onClick={() => setShowFavorites(!showFavorites)}>
        {showFavorites ? "hide saved" : "show saved"}
      </button>
    </div>
  );
}
