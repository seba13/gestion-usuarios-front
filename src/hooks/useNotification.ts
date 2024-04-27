import { useState } from "react";
import { TypeNotification } from "../components/Notification/Notification";

export const UseNotification = () => {
  const [notifications, setNotifications] = useState<TypeNotification[]>([]);

  const handleAddNotification = ({ propNotification }: { propNotification: TypeNotification }) => {

    setNotifications((prevState) => [...prevState, propNotification]);
  };

  const handleDeleteNotification = (id: number) => {

    setNotifications((prevNotifications) => {
      return prevNotifications.filter((notification) => notification.id !== id);
    });
  };

  const setTimeoutNotification = (id: number, timeout: number) => {
    setTimeout(() => {
      setNotifications((prevNotifications) => {
        return prevNotifications.filter((notification) => notification.id !== id);
      });
    }, timeout);
  };

  return {
    notifications,
    handleDeleteNotification,
    setTimeoutNotification,
    handleAddNotification,
  };
};
