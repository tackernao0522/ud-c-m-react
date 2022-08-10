import "./Profile.css";

const Profile = ({name}) => {
  return (
    <div className="profile">
      {`Name: ${name}`}
    </div>
  );
};


export default Profile;
