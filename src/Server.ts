import '@tsed/platform-express';
import './common/filters/badger-exception-filter';
import '@tsed/swagger';
import { Configuration, Inject, PlatformApplication } from '@tsed/common';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import methodOverride from 'method-override';
import { loadChains } from './chains/chain';
import { BinanceSmartChain } from './chains/config/bsc.config';
import { Chain } from './chains/config/chain.config';
import { Ethereum } from './chains/config/eth.config';
import { ChainNetwork } from './chains/enums/chain-network.enum';
import { controllers } from './ControllerRegistry';
import { swaggerConfig } from './LambdaServer';

@Configuration({
  rootDir: __dirname,
  acceptMimes: ['application/json'],
  mount: {
    '/v2/': controllers,
  },
  swagger: [swaggerConfig],
  logger: {
    disableRoutesSummary: true,
    disableBootstrapLog: true,
    logRequest: false,
  },
  exclude: ['**/*.spec.ts'],
})
export class Server {
  @Inject()
  app!: PlatformApplication;

  public $beforeInit(): void {
    loadChains();
  }

  /**
   * This method let you configure the express middleware required by your application to work.
   * @returns {Server}
   */
  $beforeRoutesInit(): void | Promise<void> {
    Chain.register(ChainNetwork.Ethereum, new Ethereum());
    Chain.register(ChainNetwork.BinanceSmartChain, new BinanceSmartChain());
    this.app
      .use(cors())
      .use(cookieParser())
      .use(methodOverride())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true,
        }),
      );
  }
}
