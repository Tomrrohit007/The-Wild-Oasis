import styled from "styled-components";

import Input from "../../UI/Input";
import Form from "../../UI/Form";
import Button from "../../UI/Button";
import FileInput from "../../UI/FileInput";
import Textarea from "../../UI/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../UI/FormRow";
import { createCabinHook, editCabinHook } from "./useHooks";

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ editTheCabin = {} }) {
  const { id: editId, ...editCabinValues } = editTheCabin;
  const isEditSession = Boolean(editId);
  
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editCabinValues : {},
  });

  const { isEditing, editFunc } = editCabinHook(reset);
  const { isCreating, createFunc } = createCabinHook(reset);

  const isWorking = isCreating || isEditing;
  
  const { errors } = formState;

  const onSubmit = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      editFunc(
        { newCabin: { ...data, image }, id: editId },
        {
          onSuccess: () => reset(),
        }
      );
    } else
      createFunc(
        { ...data, image },
        {
          onSuccess: () => reset(),
        }
      );
  };
  const onError = (error) => {
    console.log(error);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximun capicity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be atleast 1" },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Regular Price should be more than discount",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
        <Error>{errors?.image?.message}</Error>
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Reset
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : "Create New Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
