import { getAuth, signOut } from "firebase/auth";

export default function Logout() {
  const auth = getAuth();

  signOut(auth)
    .then(() => {
      console.log("Sign out successful.");
    })
    .catch((error) => {
      console.error("Sign out error: ", error);
    });
}