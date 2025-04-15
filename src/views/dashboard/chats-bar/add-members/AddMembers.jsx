import "./AddMembers.css";

//Dependency
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AppContext } from "../../../../context/AppContext";
import { useParams } from "react-router-dom";

//Services
import { searchForUsers } from "../../../../services/user.service";
import { addUserToTeam } from "../../../../services/team.service";
import UserPreview from "../../../../components/user-preview/UserPreview";
import Dropdown from "../../../../components/dropdown/Dropdown";
function AddMembers() {
  const { user, userData, setContext } = useContext(AppContext);
  const { teamId } = useParams();
  const [searchResult, setSearchResult] = useState(null);
  const [searchBy, setSearchBy] = useState("username");
  const [searchInputValue, setsSearchInputValue] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentMembers, setCurrentMembers] = useState(null);

  async function handleSearch(e) {
    e.preventDefault();
    if (!searchInputValue)
      return setSearchError("Please enter search criteria");
    setLoading(true);

    try {
      const matchedUsers = await searchForUsers(searchBy, searchInputValue);
      setSearchResult(matchedUsers);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="add-members-container">
      <div className="add-members-header">
        {" "}
        <h2>Add members</h2>
      </div>
      <div
        className="add-friends-container"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          className="friend-search-form"
          onSubmit={handleSearch}
        >
          {searchError && <p>{searchError}</p>}
          <input
            type="text"
            placeholder="Enter username or email"
            onChange={(e) => setsSearchInputValue(e.target.value)}
            className="friend-search-input"
          />
          <Dropdown
            status={searchBy}
            options={["username", "email"]}
            handleStatus={(option) => setSearchBy(option)}
          ></Dropdown>
        </form>
        {loading ? (
          <div className="friend-search-results">
            <p>loading</p>
          </div>
        ) : (
          <div className="friend-search-results">
            {searchResult?.length > 0 ? (
              searchResult.map((foundUser) => {
                if (foundUser[0] === user.uid) return null;

                //   if (friendsList) {
                //     if (Object.keys(friendsList).includes(foundUser[0])) return;
                //   }

                return (
                  <UserPreview
                    key={foundUser[0]}
                    userUid={user.uid}
                    foundUser={foundUser}
                    handleFriendRequest={() =>
                      addUserToTeam(teamId, foundUser[0])
                    }
                    renderButton={true}
                  ></UserPreview>
                );
              })
            ) : (
              <p>Found users will appear here.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddMembers;
