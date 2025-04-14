//CSS
import "./CreateTeam.css";

//Dependency
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

//Services
import { AppContext } from "../../../context/AppContext";
import { createTeam } from "../../../services/team.service";
import { validateTeamName } from "../../../utils/formValidations";

//Components
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import UploadImage from "../../../components/upload-image/UploadImage";

function CreateTeam() {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();
  const imageUrl = watch("avatar");

  const handleCreateTeam = async (data) => {
    console.log(data);
    const teamData = await createTeam(data.teamName, user.uid, data.avatar);
    // navigate(`/${teamData.id}/${Object.keys(teamData.chats)[0]}`);
  };

  const teamNameOptions = {
    ...register("teamName", {
      validate: (v) => validateTeamName(v),
    }),
  };

  const imageOptions = {
    ...register("avatar", {
      required: "Image is required.",
    }),
  };

  return (
    <div className="create-team-container">
      <div className="create-team-header">
        <h2>Create team</h2>
      </div>
      <div className="create-team-body">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(handleCreateTeam)(e);
          }}
          className="create-team-form"
        >
          <UploadImage
            clearErrors={clearErrors}
            setValue={setValue}
            imageUrl={imageUrl}
            error={errors.avatar}
          ></UploadImage>
          <Input
            name="Team name"
            options={teamNameOptions}
          ></Input>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}

export default CreateTeam;
