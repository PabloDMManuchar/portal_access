// src/context/UserContext.tsx
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { users } from "../services/users/users";
import { UserType, CreateUserType, UpdateUserType } from "../types/usertype";

interface UserContextProps {
  userslist: UserType[];
  fetchAllUsers: () => Promise<void>;
  fetchUserById: (id: number) => Promise<UserType | null>;
  createUser: (data: CreateUserType) => Promise<void>;
  updateUser: (data: UpdateUserType) => Promise<void>;
  enableUser: (id: number) => Promise<void>;
  disableUser: (id: number) => Promise<void>;
  refreshPassword: (id: number) => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userslist, setUsersList] = useState<UserType[]>([]);

  const fetchAllUsers = async () => {
    try {
      const response = await users.AllUsers();
      setUsersList(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const fetchUserById = async (id: number) => {
    try {
      const response = await users.UserById(id);
      return response.data;
    } catch (error) {
      console.error("Error fetching user", error);
      return null;
    }
  };

  const createUser = async (usercreate: CreateUserType) => {
    try {
      await users.createUser(usercreate);
      await fetchAllUsers(); // refresca la lista
    } catch (error) {
      console.error("Error creating user", error);
    }
  };

  const updateUser = async (userupdate: UpdateUserType) => {
    try {
      await users.updateUser(userupdate);
      await fetchAllUsers(); // refresca la lista
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  const enableUser = async (id: number) => {
    try {
      await users.enableduser(id);
      await fetchAllUsers(); // refresca la lista
    } catch (error) {
      console.error("Error enabling user", error);
    }
  };

  const disableUser = async (id: number) => {
    try {
      await users.disableduser(id);
      await fetchAllUsers(); // refresca la lista
    } catch (error) {
      console.error("Error disabling user", error);
    }
  };

  const refreshPassword = async (id: number) => {
    try {
      await users.refreshpassword(id);
    } catch (error) {
      console.error("Error refreshing password", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userslist,
        fetchAllUsers,
        fetchUserById,
        createUser,
        updateUser,
        enableUser,
        disableUser,
        refreshPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useUser };
