
import ProfileHeader from "../../components/shared/ProfileHeader";

async function Page() {

  //* fetch userData from the server

  const userInfo = {
    id: "1",
    name: "Sanjay Sirangi",
    username: "sanjay-sol",
    image:"/assets/user.svg",
    bio: "I am a developer and I love problem solving and building things.",
  };

  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        name={userInfo.name}
        username={userInfo.username}
        image={userInfo.image}
        bio={userInfo.bio}
      />
    </section>
  );
}
export default Page;
