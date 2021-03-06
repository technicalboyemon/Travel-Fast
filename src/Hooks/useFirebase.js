import initializeAuth from "../Firebase/Firebase.init";
import { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

initializeAuth();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [compare, setCompare] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [admin, setAdmin] = useState(false);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  // Google Auth
  const googleAuth = (redirect) => {
    signInWithPopup(auth, provider )
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        redirect()
      })
      .catch((error) => {
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  const regiUser = (email, password, redirect) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        saveUser(email, "POST");
        setError("");
        redirect()
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };
  const loginUser = (email, password, redirect) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setError("");
        redirect()
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  // Observer User State
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setLoading(false);
    });
    return () => unsub;
  }, []);

  useEffect(() => {
    fetch(`https://ancient-scrubland-54558.herokuapp.com/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => setAdmin(data.admin));
  }, [user.email]);

  const logout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {})
      .finally(() => setLoading(false));
  };

  const saveUser = (email, method) => {
    const user = { email };
    fetch("https://ancient-scrubland-54558.herokuapp.com/users", {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then();
  };

  return {
    admin,
    user,
    saveUser,
    auth,
    loading,
    regiUser,
    logout,
    loginUser,
    error,
    googleAuth,
    compare,
    setCompare
  };
};

export default useFirebase;
