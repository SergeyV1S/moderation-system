import { Button, Group, Radio, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";

interface IRejectRevisionFormProps {
  onSubmit: (values: any) => Promise<void>;
  handleClose?: () => void;
}

const initialValues = {
  reason: "",
  customReason: "",
  comment: ""
};

export const RejectRevisionForm = ({ onSubmit, handleClose }: IRejectRevisionFormProps) => {
  const form = useForm({
    initialValues,
    validate: {
      reason: (value) => (!value ? "Выберите причину" : null),
      customReason: (value, values) =>
        values.reason === "other" && !value ? "Укажите причину" : null
    }
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap='lg'>
        <Radio.Group label='Причина отклонения' withAsterisk {...form.getInputProps("reason")}>
          <Stack gap='sm' mt='xs'>
            <Radio value='forbidden' label='Запрещенный товар' />
            <Radio value='wrong_category' label='Неверная категория' />
            <Radio value='other' label='Другое' />
          </Stack>
        </Radio.Group>

        {form.values.reason === "other" && (
          <TextInput
            label='Укажите причину'
            placeholder='Введите причину отклонения'
            withAsterisk
            {...form.getInputProps("customReason")}
          />
        )}

        <Textarea
          label='Комментарий'
          placeholder='Введите комментарий'
          rows={4}
          {...form.getInputProps("comment")}
        />

        <Group justify='flex-end' gap='sm' mt='md'>
          <Button
            variant='outline'
            onClick={
              handleClose &&
              (() => {
                form.reset();
                handleClose;
              })
            }
          >
            Отмена
          </Button>
          <Button color='red' type='submit'>
            Отклонить
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
