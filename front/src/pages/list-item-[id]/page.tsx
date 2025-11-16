import { Link } from "react-router";

import { Button, Flex, Grid, Group, Modal, Skeleton, Title } from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

import { PATHS } from "@/shared/constants";

import {
  ActionsButtons,
  FullDescription,
  ListItemImageSlider,
  ModerationHistory,
  RejectRevisionForm
} from "./components";
import { useListItemPage } from "./hooks";

const ListItemPage = () => {
  const { state, functions } = useListItemPage();

  return (
    <>
      <Flex direction='column' gap={20}>
        {!state.adByIdQueryState.isPending && state.adByIdQueryState.data && (
          <>
            <Title order={1} size='h2'>
              {state.adByIdQueryState.data.data.title}
            </Title>
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

            <ActionsButtons state={state} functions={functions} />

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
        {state.adByIdQueryState.isPending && (
          <Grid>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Skeleton height={400} radius='md' />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Skeleton height={400} radius='md' />
            </Grid.Col>
            <Grid.Col span={12}>
              <Skeleton height={500} radius='md' />
            </Grid.Col>
          </Grid>
        )}
      </Flex>

      <Modal.Root
        opened={state.rejectMoadalOpened}
        onClose={functions.rejectMoadalActions.close}
        size='md'
        centered
      >
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title fw={600}>Отклонение объявления</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>
            <RejectRevisionForm
              onSubmit={functions.rejectAd}
              handleClose={functions.rejectMoadalActions.close}
            />
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
      <Modal.Root
        opened={state.revisionMoadalOpened}
        onClose={functions.revisionMoadalActions.close}
        size='md'
        centered
      >
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title fw={600}>Доработка объявления</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>
            <RejectRevisionForm
              onSubmit={functions.revisionAd}
              handleClose={functions.revisionMoadalActions.close}
            />
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};

export default ListItemPage;
