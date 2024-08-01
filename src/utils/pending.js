import { atomWithStorage } from "jotai/utils";

export const pendingAtom = atomWithStorage("pending", []);
