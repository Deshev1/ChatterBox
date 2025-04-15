//Icons
import penToSquare from "../../../../assets/icons/penToSquare.svg";
import usersSolid from "../../../../assets/icons/usersSolid.svg";

//CSS
import "./UserHeader.css";

//Dependencies
import { useContext, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../../../context/AppContext";

//Services
import {
  setUserStatus,
  subscribeToStatus,
  subscribeToConnected,
} from "../../../../services/user.service";

//Components imports
import Dropdown from "../../../../components/dropdown/Dropdown";
import Avatar from "../../../../components/avatar/Avatar";

function UserHeader() {
  const { user, userData, setContext } = useContext(AppContext);
  const { filter } = useParams();
  const navigate = useNavigate();

  //Memorize the status and change it only on change in userData
  const status = useMemo(
    () => userData.details.status,
    [userData.details.status]
  );

  //Update status in firebase
  const handleStatus = (option) => {
    try {
      setUserStatus(user.uid, option);
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    const unsubscribeConnected = subscribeToConnected(user.uid);
    const unsubscribe = subscribeToStatus(user.uid, (statusFromFirebase) => {
      setContext((prev) => {
        return {
          ...prev,
          userData: {
            ...prev.userData,
            details: {
              ...prev.userData.details,
              status: statusFromFirebase,
            },
          },
        };
      });

      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...userData,
          details: {
            ...userData.details,
            status: statusFromFirebase,
          },
        })
      );
    });

    return () => {
      unsubscribe();
      unsubscribeConnected();
    };
  }, [user]);

  return (
    <div className="user-header">
      <div className="user-header-details">
        <Avatar
          status={status}
          type={"user"}
          imageUrl={userData.details.avatar || "default-avatar.png"}
        ></Avatar>
        <div className="user-status">
          <Dropdown
            onChange={handleStatus}
            label={status}
            options={["online", "busy", "offline"]}
          ></Dropdown>
          <p className="username">{userData.details.username}</p>
        </div>
      </div>
      <div className="user-btns">
        <Avatar
          imageUrl={usersSolid}
          size={22}
          handleClick={() => {
            if (!filter) navigate(`/${user.uid}/friends/all`);
          }}
        ></Avatar>
        <Avatar
          imageUrl={penToSquare}
          size={22}
          handleClick={() => {
            if (!filter) navigate(`/${user.uid}/friends/all`);
          }}
        ></Avatar>

        {userData?.friendRequests?.received && (
          <div className="pending-friend-requests-bubble">
            {Object.keys(userData.friendRequests.received).length}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserHeader;
