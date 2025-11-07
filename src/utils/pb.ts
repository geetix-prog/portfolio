import PocketBase from "pocketbase";
import type { TypedPocketBase } from "./pocketbase-types";

const path =
  import.meta.env.MODE === "development"
    ? "http://127.0.0.1:8090"
    : "http://localhost:8089";

const pb = new PocketBase(path) as TypedPocketBase;
export default pb;
