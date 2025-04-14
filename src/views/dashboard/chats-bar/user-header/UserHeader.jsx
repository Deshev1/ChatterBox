//Font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faEdit } from "@fortawesome/free-solid-svg-icons";

//CSS
import "./UserHeader.css";

//Dependencies
import { useContext, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../../../context/AppContext";

//Services
import { updateUserStatus } from "../../../../services/user.service";

//Components imports
import Dropdown from "../../../../components/dropdown/Dropdown";
import Avatar from "../../../../components/avatar/Avatar";

function UserHeader() {
  const { user, userData } = useContext(AppContext);
  const { filter } = useParams();
  const navigate = useNavigate();

  //Memorize the status and change it only on change in userData
  const status = useMemo(
    () => userData.details.status,
    [userData.details.status]
  );

  //Update status in firebase
  const handleStatus = (option) => {
    updateUserStatus(user.uid, option);
  };

  return (
    <div className="user-header">
      <div className="user-header-details">
        <Avatar
          status={status}
          type={"user"}
          imageUrl={userData.details.profilePicture || "default-avatar.png"}
        ></Avatar>
        <div className="user-status">
          <p className="username">{userData.details.username}</p>
          <Dropdown
            handleStatus={handleStatus}
            status={status}
            options={["online", "busy", "offline"]}
          ></Dropdown>
        </div>
      </div>
      <div className="user-btns">
        <FontAwesomeIcon
          icon={faUsers}
          className="icon-btn"
          onClick={() => {
            if (!filter) navigate(`/${user.uid}/friends/all`);
          }}
        ></FontAwesomeIcon>
        {userData?.friendRequests?.received && (
          <div className="pending-friend-requests-bubble">
            {Object.keys(userData.friendRequests.received).length}
          </div>
        )}
        <FontAwesomeIcon
          icon={faEdit}
          className="icon-btn edit-profile-btn"
          onClick={() => navigate(`/${user.uid}/friends/settings`)}
        ></FontAwesomeIcon>
      </div>
    </div>
  );
}

export default UserHeader;
