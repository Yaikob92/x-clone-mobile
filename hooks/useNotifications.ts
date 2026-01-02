import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../utils/api";

interface NotificationResponse {
  notifications: Notification[];
  _id: string;
}
export const useNotifications = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const {
    data: notificationsData,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery<NotificationResponse>({
    queryKey: ["notifications"],
    queryFn: async () => {
      const response = await api.get("/notifications");
      return response.data.notifications;
    },
    retry: 2,
    staleTime: 5 * 600 * 1000, // 5 minutes
  });

  const deleteNotificationMutation = useMutation({
    mutationFn: async (notificationId: string) => {
      try {
        await api.delete(`notifications/${notificationId}`);
      } catch (error) {
        throw new Error("Failed to delete notifcations");
      }
    },
    onMutate: async (notificationId) => {
      // Optimistic Update
      await queryClient.cancelQueries({ queryKey: ["notifications"] });
      const previousNotifications = queryClient.getQueryData(["notifications"]);
      queryClient.setQueryData(
        ["notifications"],
        (old: NotificationResponse[]) =>
          old?.filter((notification) => notification._id !== notificationId) ||
          []
      );
      return { previousNotifications };
    },
    onError: (error, notificationId, context) => {
      // Reverse optimistic update on error
      queryClient.setQueryData(
        ["notifications"],
        context?.previousNotifications
      );
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });

  const deleteNotification = (notificationId: string) => {
    deleteNotificationMutation.mutate(notificationId);
  };

  return {
    notifications: notificationsData || [],
    isLoading,
    error,
    refetch,
    isRefetching,
    deleteNotification,
    isDeletingNotification: deleteNotificationMutation.isPending,
  };
};
