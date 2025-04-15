// AddMembers.jsx
import "./AddMembers.css";
import { useForm, Controller } from "react-hook-form";
import { useState, useContext } from "react";
import { AppContext } from "../../../../context/AppContext";
import { useParams } from "react-router-dom";

// Components
import Input from "../../../../components/input/Input";
import Button from "../../../../components/button/Button";
import UserPreview from "../../../../components/user-preview/UserPreview";
import Dropdown from "../../../../components/dropdown/Dropdown";

// Services
import { searchForUsers } from "../../../../services/user.service";
import { addUserToTeam } from "../../../../services/team.service";

function AddMembers() {
  const { user } = useContext(AppContext);
  const { teamId } = useParams();
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      searchInput: "",
      searchBy: "username",
    },
  });

  const searchInputOptions = {
    ...register("searchInput", {
      validate: (v) => {
        console.log(v);
        if (!v.trim()) return "Search criteria cannot be empty.";
        return true;
      },
    }),
  };

  const onSearch = async (data) => {
    setLoading(true);
    clearErrors("searchInput");

    try {
      const matchedUsers = await searchForUsers(
        data.searchBy,
        data.searchInput
      );
      setSearchResult(matchedUsers);
    } catch (e) {
      setError("root", {
        type: "manual",
        message: e.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-members-container">
      <div className="add-members-header">
        <h2>Add members</h2>
      </div>
      <div className="add-members-body">
        <form
          className="members-search-form"
          onSubmit={handleSubmit(onSearch)}
        >
          {errors.root && <p className="form-error">{errors.root.message}</p>}
          <Controller
            control={control}
            name="searchBy"
            render={({ field, fieldState }) => (
              <Dropdown
                label="Search by"
                options={["username", "email"]}
                onChange={field.onChange}
                error={fieldState.error}
              />
            )}
          />

          <Input
            name="Search"
            options={searchInputOptions}
            error={errors.searchInput}
          ></Input>

          <Button type={"submit"}>Submit</Button>
        </form>

        <div className="members-search-results">
          {loading ? (
            <p>Loading...</p>
          ) : searchResult?.length > 0 ? (
            searchResult.map((foundUser) => {
              if (foundUser[0] === user.uid) return null;

              return (
                <UserPreview
                  key={foundUser[0]}
                  userUid={user.uid}
                  foundUser={foundUser}
                  handleFriendRequest={() =>
                    addUserToTeam(teamId, foundUser[0])
                  }
                  renderButton={true}
                />
              );
            })
          ) : (
            <p>Found users will appear here.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddMembers;
