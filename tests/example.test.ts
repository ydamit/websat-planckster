import "reflect-metadata";
import {test, expect } from "@jest/globals";
import { appRouter } from "../src/lib/infrastructure/server/trpc/app-router";
import { createCallerFactory } from "../src/lib/infrastructure/server/trpc/server";
import  serverContainer  from "../src/lib/infrastructure/server/config/ioc/server-container";
import { TRPC } from "~/lib/infrastructure/server/config/ioc/server-ioc-symbols";
import { TServerComponentAPI } from "~/lib/infrastructure/server/trpc/server-api";

test("hello world", async() => { 

    const api: TServerComponentAPI = serverContainer.get(TRPC.REACT_SERVER_COMPONENTS_API);
    expect(api).toBeDefined();
})