import { useState } from "react";
import CheckIcon from "../../assets/icons/check.svg";
import CloseIcon from "../../assets/icons/close.svg";
import EditIcon from "../../assets/icons/edit.svg";
import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
import { useProfile } from "../../hooks/useProfile";

export default function ProfileBio() {
  const { profile, setProfile } = useProfile();
  const { api } = useAxios();
  const { auth } = useAuth();
  const isMe = profile?.user?.id === auth?.user?.id;

  const [bio, setBio] = useState(profile?.user?.bio);
  const [editMode, setEditMode] = useState(false);

  async function handleEditBio() {
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile`,
        { bio }
      );
      if (response.status === 200) {
        setProfile({
          ...profile,
          user: {
            ...profile.user,
            bio: response?.data?.user?.bio,
          },
        });
      }
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
      <div className="flex-1">
        {!editMode ? (
          <p className="leading-[188%] text-gray-400 lg:text-lg">
            {profile?.user?.bio}
          </p>
        ) : (
          <textarea
            className="p-2 leading-[188%] text-gray-400 lg:text-lg rounded-md"
            value={bio}
            rows={4}
            cols={55}
            onChange={(e) => setBio(e.target.value)}
          />
        )}
      </div>
      {/* <!-- Edit Bio button. The Above bio will be editable when clicking on the button --> */}
      {!editMode && isMe && (
        <button
          className="flex-center h-7 w-7 rounded-full"
          onClick={() => setEditMode(true)}
        >
          <img src={EditIcon} alt="Edit" />
        </button>
      )}
      {editMode && isMe && (
        <>
          <button
            className="flex-center h-7 w-7 rounded-full bg-green-500"
            onClick={handleEditBio}
          >
            <img src={CheckIcon} alt="Check" />
          </button>
          <button
            className="flex-center h-7 w-7 rounded-full bg-red-500"
            onClick={() => setEditMode(false)}
          >
            <img src={CloseIcon} alt="close" />
          </button>
        </>
      )}
    </div>
  );
}
