import { useProfile } from "../../hooks/useProfile";
import ProfileAvatar from "./ProfileAvatar";
import ProfileBio from "./ProfileBio";

export default function ProfileInfo() {
  const { profile } = useProfile();
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <ProfileAvatar />
      <div>
        <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
          {profile?.user?.firstName} {profile?.user?.lastName}
        </h3>
        <p className="leading-[231%] lg:text-lg">{profile?.user?.email}</p>
      </div>
      <ProfileBio />
      <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
    </div>
  );
}
