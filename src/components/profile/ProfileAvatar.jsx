import { useRef } from "react";
import EditIcon from "../../assets/icons/edit.svg";
import { useAuth } from "../../hooks/useAuth";
import { useAvatar } from "../../hooks/useAvatar";
import { useAxios } from "../../hooks/useAxios";
import { useProfile } from "../../hooks/useProfile";

export default function ProfileAvatar() {
  const { profile, setProfile } = useProfile();
  const { api } = useAxios();
  const { auth } = useAuth();
  const { setAvatar } = useAvatar();

  const fileUploadRef = useRef(null);

  const isMe = profile?.user?.id === auth?.user?.id;

  function handleImageUpload(e) {
    e.preventDefault();
    fileUploadRef.current.click();
  }

  async function updateImageDisplay() {
    const formData = new FormData();

    for (const file of fileUploadRef.current.files) {
      formData.append("avatar", file);
    }
    // console.log([...formData.entries()]);
    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/avatar`,
        formData
      );

      if (response.status === 200) {
        setProfile({
          ...profile,
          user: {
            ...profile.user,
            avatar: response?.data?.user?.avatar,
          },
        });
        setAvatar(response?.data?.user?.avatar);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      {profile?.user?.avatar ? (
        <div className="w-full h-full grid place-items-center  rounded-full">
          <img
            className="rounded-full"
            src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${
              profile?.user?.avatar
            }`}
            alt={profile?.user?.firstName}
          />
        </div>
      ) : (
        <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
          <span>{profile?.user?.firstName[0]}</span>
        </div>
      )}

      {isMe && (
        <form>
          <button
            onClick={handleImageUpload}
            className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80"
          >
            <img src={EditIcon} alt="Edit" />
          </button>

          <input
            type="file"
            id="file"
            ref={fileUploadRef}
            onChange={updateImageDisplay}
            hidden
          />
        </form>
      )}
    </div>
  );
}
