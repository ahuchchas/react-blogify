import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileBlogs from "../components/profile/ProfileBlogs";
import ProfileInfo from "../components/profile/ProfileInfo";
import { useProfile } from "../hooks/useProfile";

export default function PofilePage() {
  const { profile, setProfile } = useProfile();
  const { userId } = useParams();
  // console.log(userId);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setProfile({
          ...profile,
          loading: true,
        });

        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${userId}`
        );
        // console.log(response.data);
        setProfile({
          ...profile,
          user: response.data,
          loading: false,
        });
      } catch (error) {
        console.log(error);
        setProfile({
          ...profile,
          error: error.message,
          loading: false,
        });
      }
    };
    fetchProfile();

    return () => {
      setProfile({
        ...profile,
        user: null,
        loading: false,
        error: null,
      });
    };
  }, [userId]);

  return (
    <main className="mx-auto max-w-[1020px] py-8">
      <div className="container">
        {profile.loading && <p>Loading profile...</p>}
        {profile?.error && <p>Error loading profile. {profile?.error}</p>}
        {!profile.loading && !profile?.error && (
          <>
            <ProfileInfo />
            <ProfileBlogs />
          </>
        )}
      </div>
    </main>
  );
}
