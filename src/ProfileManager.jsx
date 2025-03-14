import React, { useState, useEffect } from 'react';

import './ProfileManager.css';

import ProfileSelect from './ProfileSelect';
import ProfileCreate from './ProfileCreate';

function ProfileManager({
  currentSessionDuration,
  setCurrentSessionDuration,
  currentTapDuration,
  setCurrentTapDuration,
  currentBreakDuration,
  setCurrentBreakDuration,
  currentVibrationParameters,
  setCurrentVibrationParameters,
}) {
  // isAddingProfile: Tracks if user is current adding a profile
  const [isAddingProfile, setIsAddingProfile] = useState(false);

  // currentProfileID: id of the profile that is currently loaded
  const [currentProfileID, setCurrentProfileID] = useState(0);

  // profiles: list of saved profiles
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    let profilesStorageJSON = localStorage.getItem('profiles');

    if (profilesStorageJSON === null) {
      localStorage.setItem('profiles', JSON.stringify([]));
      profilesStorageJSON = '[]';
    }

    setProfiles(JSON.parse(profilesStorageJSON));
  }, []);

  // Params - currentID: the ID of the profile to be changed to
  // Changes the currently loaded profile
  const loadProfile = (currentID) => {
    // Finds the profile in profiles list that has ID of currentID
    const currentProfile = profiles.find(({ id }) => id === Number(currentID));

    setCurrentProfileID(Number(currentID));

    setCurrentSessionDuration(currentProfile.sessionDuration);
    setCurrentTapDuration(currentProfile.tapDuration);
    setCurrentBreakDuration(currentProfile.breakDuration);
    setCurrentVibrationParameters(currentProfile.vibrationParameters);
  };

  // Params - name: the name input for the new profile
  // Adds a new profile to saved profiles list
  const createProfile = (name) => {
    const newProfileID = profiles.length + 1;

    setCurrentProfileID(newProfileID);

    const profilesStorageJSON = localStorage.getItem('profiles');

    console.log(profilesStorageJSON);

    let profilesStorage = JSON.parse(profilesStorageJSON);

    const updatedProfiles = [
      ...profiles,
      {
        id: newProfileID,
        name: name,
        sessionDuration: currentSessionDuration,
        tapDuration: currentTapDuration,
        breakDuration: currentBreakDuration,
        vibrationParameters: currentVibrationParameters,
      },
    ];

    setProfiles(updatedProfiles);

    localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
  };

  // Updates the current profile to have the settings that are currently input
  const saveProfile = () => {
    // Loop all profiles
    const updatedProfiles = profiles.map((profile) => {
      // Update profile if it is the current profile
      if (profile.id === currentProfileID) {
        return {
          ...profile,
          sessionDuration: currentSessionDuration,
          tapDuration: currentTapDuration,
          breakDuration: currentBreakDuration,
          vibrationParameters: currentVibrationParameters,
        };
        // Don't change profile
      } else {
        return profile;
      }
    });
    localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
    setProfiles(updatedProfiles);
  };

  // Delete the profile that is currently loaded
  const deleteProfile = () => {
    // Remove profile with the currently loaded profile ID.
    let updatedProfiles = profiles.filter(
      (profile) => profile.id !== currentProfileID,
    );

    // Update ids to keep continuous sequence starting at 1
    let idCounter = 0;
    updatedProfiles = updatedProfiles.map((profile) => {
      idCounter += 1;
      return {
        ...profile,
        id: idCounter,
      };
    });

    setCurrentProfileID(0);

    setProfiles(updatedProfiles);
    localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
  };

  const profileManagerCurrentComponent = isAddingProfile ? (
    <ProfileCreate
      createProfile={createProfile}
      setIsAddingProfile={setIsAddingProfile}
    />
  ) : (
    <ProfileSelect
      setIsAddingProfile={setIsAddingProfile}
      profiles={profiles}
      loadProfile={loadProfile}
      saveProfile={saveProfile}
      deleteProfile={deleteProfile}
      currentProfileID={currentProfileID}
    />
  );

  return (
    <div className='profile_manager_container'>
      {profileManagerCurrentComponent}
    </div>
  );
}

export default ProfileManager;
