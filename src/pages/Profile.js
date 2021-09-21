import Header from "../components/Header/Header";
import ProfileComponent from "../components/Profile/Profile";

const Profile = (props) => (
  <>
    <Header />
    <ProfileComponent {...props} />
  </>
);

export default Profile;
