import { Button, Group } from "@mantine/core";
import { IconCheck, IconEdit, IconX } from "@tabler/icons-react";

import type { useListItemPage } from "@/pages/list-item-[id]/hooks";

interface IActionsButtonsProps {
  state: ReturnType<typeof useListItemPage>["state"];
  functions: ReturnType<typeof useListItemPage>["functions"];
}

export const ActionsButtons = ({ state, functions }: IActionsButtonsProps) => (
  <Group justify='center'>
    <Button
      color='green'
      variant='light'
      disabled={state.actionsPending || state.adByIdQueryState.data?.data.status === "approved"}
      leftSection={<IconCheck size={18} />}
      onClick={functions.approveAd}
    >
      Одобрить
    </Button>
    <Button
      color='red'
      variant='light'
      disabled={state.actionsPending || state.adByIdQueryState.data?.data.status === "rejected"}
      leftSection={<IconX size={16} />}
      onClick={functions.rejectMoadalActions.open}
    >
      Отклонить
    </Button>
    <Button
      color='orange'
      variant='light'
      disabled={state.actionsPending || state.adByIdQueryState.data?.data.status === "draft"}
      leftSection={<IconEdit size={16} />}
      onClick={functions.revisionMoadalActions.open}
    >
      Доработка
    </Button>
  </Group>
);
