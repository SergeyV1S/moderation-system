import { Link } from "react-router";

import { Button, Flex, Grid, Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowLeft, IconArrowRight, IconCheck, IconEdit, IconX } from "@tabler/icons-react";

import { PATHS } from "@/shared/constants";
import { CustomLoader as Loader } from "@/shared/ui";

import {
  FullDescription,
  ListItemImageSlider,
  ModerationHistory,
  RejectRevisionForm
} from "./components";
import { useListItemPage } from "./hooks";

const ListItemPage = () => {
  const [opened, actions] = useDisclosure(false);
  const [opened2, actions2] = useDisclosure(false);
  const { state, functions } = useListItemPage();

  return (
    <>
      <Flex direction='column' gap={20}>
        {!state.adByIdQueryState.isPending && state.adByIdQueryState.data && (
          <>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <ListItemImageSlider images={state.adByIdQueryState.data.data.images} />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <ModerationHistory
                  moderationHistory={state.adByIdQueryState.data.data.moderationHistory}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <FullDescription {...state.adByIdQueryState.data.data} />
              </Grid.Col>
            </Grid>

            <Group justify='center'>
              <Button
                color='green'
                variant='light'
                disabled={
                  state.actionsPending || state.adByIdQueryState.data.data.status === "approved"
                }
                leftSection={<IconCheck size={18} />}
                onClick={functions.approveAd}
              >
                Одобрить
              </Button>
              <Button
                color='red'
                variant='light'
                disabled={
                  state.actionsPending || state.adByIdQueryState.data.data.status === "rejected"
                }
                leftSection={<IconX size={16} />}
                onClick={actions.open}
              >
                Отклонить
              </Button>
              <Button
                color='orange'
                variant='light'
                disabled={
                  state.actionsPending || state.adByIdQueryState.data.data.status === "draft"
                }
                leftSection={<IconEdit size={16} />}
                onClick={actions2.open}
              >
                Доработка
              </Button>
            </Group>

            <Group component='nav' justify='space-between'>
              <Button
                to={PATHS.LIST}
                component={Link}
                color='dark'
                variant='white'
                leftSection={<IconArrowLeft size={16} />}
              >
                К списку
              </Button>
              <Group>
                <Button
                  to={state.navigation.prevAd}
                  component={Link}
                  color='dark'
                  variant='white'
                  leftSection={<IconArrowLeft size={16} />}
                >
                  Предыдущее
                </Button>
                <Button
                  to={state.navigation.nextAd}
                  component={Link}
                  color='dark'
                  variant='white'
                  rightSection={<IconArrowRight size={16} />}
                >
                  Следующее
                </Button>
              </Group>
            </Group>
          </>
        )}
        {state.adByIdQueryState.isPending && <Loader />}
      </Flex>
      <Modal.Root opened={opened} onClose={actions.close} size='md' centered>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title fw={600}>Отклонение объявления</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>
            <RejectRevisionForm onSubmit={functions.rejectAd} />
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
      <Modal.Root opened={opened2} onClose={actions2.close} size='md' centered>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title fw={600}>Доработка объявления</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>
            <RejectRevisionForm onSubmit={functions.revisionAd} />
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};

export default ListItemPage;
