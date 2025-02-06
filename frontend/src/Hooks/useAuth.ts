import Cookies from "universal-cookie";

const cookies = new Cookies();

export function removeCookie(name : string) {
  cookies.remove(name)
}

const useAuth = (): boolean => {
  return !!cookies.get("token");
};

export default useAuth;
