import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@chakra-ui/react";

import { MainPageLayout } from "layouts/MainPageLayout";
import { InputField } from "./common/forms/InputField";
import { mintNFT } from "utils/minting/mintNFT";
import { MintingStatusType } from "pages/Minting/Mintingpage";

type FormData = {
  image_url: string;
  name: string;
  description: string;
  flexibility: number;
  toughness: number;
  power: number;
};

type MintingFormProps = {
  setMintingStatus: (arg: MintingStatusType) => void;
  onOpen: () => void;
};

const schema = yup
  .object({
    image_url: yup
      .string()
      .url("This field must contain a valid URL")
      .required(),
    name: yup.string().min(4).required(),
    description: yup.string().min(4).required(),
    flexibility: yup.number().max(10).required(),
    toughness: yup.number().max(10).required(),
    power: yup.number().max(10).required(),
  })
  .required();

export const MintingForm = ({ setMintingStatus, onOpen }: MintingFormProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(values: FormData) {
    try {
      const mintingResponse = await mintNFT({
        image_url: values.image_url,
        name: values.name,
        description: values.description,
        attributes: {
          flexibility: values.flexibility,
          toughness: values.toughness,
          power: values.power,
        },
      });
      setMintingStatus(mintingResponse);
      reset();
      onOpen();
    } catch (error: any) {
      setMintingStatus(error.message);
      onOpen();
    }
  }

  return (
    <MainPageLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          name="image_url"
          error={errors.image_url}
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
          Mint NFT
        </Button>
      </form>
    </MainPageLayout>
  );
};
