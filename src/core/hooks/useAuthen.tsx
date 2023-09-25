import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const useAuthen = () => useContext(AuthContext)!;

export default useAuthen;
