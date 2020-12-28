import { useState, useEffect } from "react";
import { Input, Icon, Header, Modal } from "semantic-ui-react";
import axios from "axios";
import "./App.css";
import { useFetch } from "./hooks/useFetch";
import UserListItem from "./components/userListItem";
import PageNavigator from "./components/pageNavigator";
import UserList from "./components/userList";
const PAGESIZE = 10;
function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState({});
  const [showFavorites, setShowFavorites] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalmessage, setModalmessage] = useState("");

  const { status, error, data } = useFetch(
    `https://api.github.com/search/users?q=${searchQuery}&page=${pageNumber}&per_page=${PAGESIZE}`
  );

  // Handles add to favorites click
  const handleFavorites = (login, value, data) => {
    if (value) {
      const temp = { ...favorites };
      temp[login] = data;
      setFavorites(temp);
      localStorage.setItem("favorites", JSON.stringify(temp));
      setModalmessage("saved");
      setModalOpen(true);
      setTimeout(() => setModalOpen(false), 1000);
    } else {
      const temp = { ...favorites };
      delete temp[login];
      setFavorites(temp);
      localStorage.setItem("favorites", JSON.stringify(temp));
      setModalmessage("removed");
      setModalOpen(true);
      setTimeout(() => setModalOpen(false), 1000);
    }
  };

  // Retrive favorites stored in localStorage
  useEffect(() => {
    const temp = localStorage.getItem("favorites");
    if (temp) {
      setFavorites(JSON.parse(temp));
    }
  }, []);

  // flattens and return list of favorites
  const getFavoritesList = () => {
    const list = Object.keys(favorites).map((k, i) => {
      return favorites[k];
    });

    return list;
  };

  return (
    <div className="App">
      {modalOpen && (
        <div className="messageModal">
          <div>
            <Icon name="exclamation" size="large" />
            {modalmessage}
          </div>
        </div>
      )}

      <div className="header">Github User Search</div>

      <Input
        loading={status === "fetching" ? true : false}
        icon="users"
        focus
        iconPosition="left"
        placeholder="Search users..."
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="usersContainer">
        {/* page navigator  */}
        {data.items
          ? data.items.length !== 0 && (
              <PageNavigator
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                showFavorites={showFavorites}
                setShowFavorites={setShowFavorites}
              />
            )
          : null}

        {/* users list */}
        <UserList
          status={status}
          list={showFavorites ? getFavoritesList() : data.items}
          favorites={favorites}
          handleFavorites={handleFavorites}
        />

        {/* page navigator  */}
        {data.items
          ? data.items.length !== 0 && (
              <PageNavigator
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                showFavorites={showFavorites}
                setShowFavorites={setShowFavorites}
              />
            )
          : null}
      </div>
    </div>
  );
}

export default App;
