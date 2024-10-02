// pages/profile.js
import { useSession, signIn } from 'next-auth/client';
import { Container } from 'react-bootstrap';

const Profile = () => {
  const [session, loading] = useSession();

  if (loading) return <p>Loading...</p>;
  if (!session) {
    signIn();
    return null;
  }

  return (
    <Container>
      <h1 className="my-4">Profile</h1>
      <p>Username: {session.user.name}</p>
      <p>Email: {session.user.email}</p>
      <p>Role: {session.user.role}</p>
    </Container>
  );
};

export default Profile;
