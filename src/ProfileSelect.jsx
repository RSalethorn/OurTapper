import './ProfileManager.css';
import save_icon from '../assets/save.png';
import add_icon from '../assets/add.png';

function ProfileSelect({
  setIsAddingProfile,
  profiles,
  loadProfile,
  saveProfile,
  deleteProfile,
  currentProfileID,
}) {
  const startCreateProfile = () => {
    setIsAddingProfile(true);
  };

  const onProfileSelectChange = (e) => {
    loadProfile(e.target.value);
  };

  // Create an option element for each saved profile
  const profileOptions = profiles.map((profile) => (
    <option value={profile.id} key={profile.id}>
      {profile.name}
    </option>
  ));

  return (
    <div className='profile_manager_select_container'>
      <select
        name='profile_select'
        id='profile_select'
        onChange={onProfileSelectChange}
        value={currentProfileID}
      >
        <option value={0} key={0}>
          -- Choose a profile --
        </option>
        {profileOptions}
      </select>
      <button
        id='add_button'
        className='profile_manager_button'
        onClick={startCreateProfile}
      >
        New
      </button>
      <button
        id='save_button'
        className='profile_manager_button'
        onClick={saveProfile}
      >
        Save
      </button>
      <button
        id='delete_button'
        className='profile_manager_button'
        onClick={deleteProfile}
      >
        Delete
      </button>
    </div>
  );
}

export default ProfileSelect;
