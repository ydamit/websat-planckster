import "reflect-metadata";
import { Container } from "inversify";
import { REPOSITORY, TRPC } from "./client-ioc-symbols";
import { api } from "~/lib/infrastructure/client/trpc/react-api";
import BrowserFileRepository from "~/lib/infrastructure/client/repository/browser-file-repository";

const clientContainer = new Container();

/** GATEWAYS */
clientContainer.bind(TRPC.REACT_CLIENT_COMPONENTS_API).toConstantValue(api);

/** REPOSITORY */
clientContainer.bind(REPOSITORY.FILE_REPOSITORY).to(BrowserFileRepository);

export default  clientContainer;