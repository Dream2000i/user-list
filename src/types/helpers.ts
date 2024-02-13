import { PayloadAction } from "@reduxjs/toolkit";
import { TypeUserFetch } from "./usersList";

export enum sortDirection {
  asc,
  desc,
}

export type TypePayloadAction = PayloadAction<
  Array<TypeUserFetch> | undefined,
  string,
  { arg: void; requestId: string; requestStatus: "fulfilled" },
  never
>;
