import { toast } from "react-toastify";
import { auth, db } from "../../firebase/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { setUser } from "./userSlice";

export const autoLogin = (uid) => async (dispatch) => {
  try {
    // get user from firestore serve

    const userResp = await getDoc(doc(db, "users", uid));
    const userInfo = { ...userResp.data(), uid: uid };

    // mount user to the redux
    dispatch(setUser(userInfo));
  } catch (error) {
    toast.error(error.message);
  }
};

export const loginUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      // check with auth service
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      user?.uid && dispatch(autoLogin(user.uid));
    } catch (error) {
      toast.error(error.message);
    }
  };
