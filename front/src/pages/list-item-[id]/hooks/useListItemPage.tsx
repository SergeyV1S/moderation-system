import { generatePath, useParams } from "react-router";

import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

import { PATHS, queryClient } from "@/shared/constants";

import {
  useGetAdByIdQuery,
  usePostApproveAdMutation,
  usePostRejectAdMutation,
  usePostRevisionAdMutation
} from "../api";
import type { IRejectRevisonForm } from "../types";

export const useListItemPage = () => {
  const { id } = useParams() as { id: string };

  const [rejectMoadalOpened, rejectMoadalActions] = useDisclosure(false);
  const [revisionMoadalOpened, revisionMoadalActions] = useDisclosure(false);

  const postApproveAdMutation = usePostApproveAdMutation({
    options: {
      onSuccess: ({ data }) => {
        notifications.show({
          title: "Успех!",
          color: "green",
          icon: <IconCheck size={18} />,
          message: data.message
        });
        queryClient.invalidateQueries({ queryKey: ["getAdById"] });
      }
    }
  });

  const postRejectAdMutation = usePostRejectAdMutation({
    options: {
      onSuccess: ({ data }) => {
        notifications.show({
          title: "Успех!",
          color: "green",
          icon: <IconCheck size={18} />,
          message: data.message
        });
        queryClient.invalidateQueries({ queryKey: ["getAdById"] });
        close();
      }
    }
  });

  const postRevisionAdMutation = usePostRevisionAdMutation({
    options: {
      onSuccess: ({ data }) => {
        notifications.show({
          title: "Успех!",
          color: "green",
          icon: <IconCheck size={18} />,
          message: data.message
        });
        queryClient.invalidateQueries({ queryKey: ["getAdById"] });
        close();
      }
    }
  });

  const getAdByIdQuery = useGetAdByIdQuery({ id });

  const prevAd = generatePath(PATHS.ITEM_ID, { id: +id - 1 });

  const nextAd = generatePath(PATHS.ITEM_ID, { id: +id + 1 });

  const approveAd = async () => postApproveAdMutation.mutateAsync({ params: { id } });

  const rejectAd = async (values: IRejectRevisonForm) => {
    const reason = values.reason === "other" ? values.customReason : values.reason;

    await postRejectAdMutation.mutateAsync({
      params: {
        id,
        reason,
        comment: values.comment.trim() || null
      }
    });

    rejectMoadalActions.close();
  };

  const revisionAd = async (values: IRejectRevisonForm) => {
    const reason = values.reason === "other" ? values.customReason : values.reason;

    await postRevisionAdMutation.mutateAsync({
      params: {
        id,
        reason,
        comment: values.comment.trim() || null
      }
    });

    revisionMoadalActions.close();
  };

  const actionsPending = postApproveAdMutation.isPending;

  return {
    state: {
      adByIdQueryState: getAdByIdQuery,
      actionsPending,
      rejectMoadalOpened,
      revisionMoadalOpened,
      navigation: { prevAd, nextAd }
    },
    functions: { approveAd, rejectAd, revisionAd, rejectMoadalActions, revisionMoadalActions }
  };
};
