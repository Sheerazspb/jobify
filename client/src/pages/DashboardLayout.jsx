import { Outlet, redirect,useNavigate,useNavigation } from "react-router-dom"
import PropTypes from 'prop-types';
import Wrapper from "../assets/wrappers/Dashboard"
import { BigSidebar, Navbar, SmallSidebar,Loading } from "../components"
import { useState, useCallback } from "react"
import { DashboardContext } from "../hooks/dashboardHook"
import { checkDefaultTheme } from "../utils/defaultTheme"
import customFetch from "../utils/customFetch"
import { toast } from "react-toastify"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react";

const userQuery = {
  queryKey: ["user"],
  queryFn: async () => {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  },
};


export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    console.log(error);
    return redirect("/");
  }
}

// const DashboardContext =  createContext()

const DashboardLayout = ({queryClient}) => {
  const {user} = useQuery(userQuery).data;
  const navigate = useNavigate()
  const navigation = useNavigation()
  const isPageLoading = navigation.state === "loading"
  const [showSidebar, setShowSidebar] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());
  const [isAuthError, setIsAuthError] = useState(false)


    const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme
    setIsDarkTheme(newDarkTheme)
    localStorage.setItem("darkTheme", newDarkTheme)
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  const logoutUser = useCallback(async () => {
    navigate("/")
    await customFetch.get("/auth/logout")
    queryClient.invalidateQueries()
    toast.success("Logged out")
  }, [navigate, queryClient]);

    customFetch.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error?.response?.status === 401) {
          setIsAuthError(true);
        }
        return Promise.reject(error);
      }
    );
    useEffect(() => {
      if (!isAuthError) return;
      logoutUser();
    }, [isAuthError,logoutUser]);

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        setIsDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
}


// export const useDashboardContext = () => useContext(DashboardContext)
DashboardLayout.propTypes = {
  queryClient: PropTypes.object.isRequired,
};

export default DashboardLayout 
