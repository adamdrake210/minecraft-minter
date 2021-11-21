import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@chakra-ui/react";

import { MainPageLayout } from "layouts/MainPageLayout";
import { InputField } from "./common/forms/InputField";

const schema = yup
  .object({
    url: yup.string().url("This field must contain a valid URL").required(),
    name: yup.string().min(4).required(),
    description: yup.string().min(4).required(),
    flexibility: yup.number().max(10).required(),
    toughness: yup.number().max(10).required(),
    power: yup.number().max(10).required(),
  })
  .required();

export const MintingForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 500);
    });
  }

  return (
    <MainPageLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          name="url"
          error={errors.url}
          register={register}
          placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
          type="text"
        />

        <InputField
          name="name"
          error={errors.name}
          register={register}
          placeholder="NFT Name goes here"
          type="text"
        />

        <InputField
          name="description"
          error={errors.description}
          register={register}
          placeholder="Describe your NFT in all its glory"
          type="text"
        />

        <InputField
          name="flexibility"
          error={errors.flexibility}
          register={register}
          placeholder="How flexibile is this skin? It must be a number between 1 - 10"
          type="number"
        />

        <InputField
          name="toughness"
          error={errors.toughness}
          register={register}
          placeholder="How tough is this skin? It must be a number between 1 - 10"
          type="number"
        />

        <InputField
          name="power"
          error={errors.power}
          register={register}
          placeholder="How powerful is this skin? It must be a number between 1 - 10"
          type="number"
        />
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </MainPageLayout>
  );
};
