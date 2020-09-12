import { ViewLoader } from '../abstracts/view.loader';
import { AbstractHttpAdapter } from '@nestjs/core';
import { Injectable } from '@nestjs/common';
import { loadPackage } from '@nestjs/common/utils/load-package.util';
import { Request, Response } from 'express';
import { EarlyAccessController } from '../controllers/early-access.controller';
import { ConfigImpl } from '../impl/config.impl';

@Injectable()
export class ExpressLoaders extends ViewLoader {


  register(httpAdapter: AbstractHttpAdapter,
           controller: EarlyAccessController,
           config: ConfigImpl) {

    const express = loadPackage('express', 'EarlyAccessModule', () =>
      require('express'),
    );
    let app = httpAdapter.getInstance();
    let baseUrl = config.baseUrl;
    let assetsDir = config.assetsDir;

    let indexDir = config.viewsDir;

    app.set('views', indexDir);
    app.set('view engine', 'ejs');
    app.use(express.static(assetsDir));

    let index = async (req: Request, res: Response) => await controller.index(req, res);
    let subscribe = async (req: Request, res: Response) => await controller.subscribe(req, res);
    let unSubscribe = async (req: Request, res: Response) => await controller.unSubscribe(req, res);
    let twitterShare = async (req: Request, res: Response) => await controller.shareOnTwitter(req, res);


    app.get(baseUrl, index);
    app.post(baseUrl, subscribe);
    app.get(`${baseUrl}/un-subscribe`, unSubscribe);
    app.get(`${baseUrl}twitter-share`, twitterShare);

  }


}