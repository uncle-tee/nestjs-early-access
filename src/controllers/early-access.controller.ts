import { EarlyAccessService } from '../contracts/early-access-service.interface';
import { SubscribeDto } from '../dtos/subcribe.dto';
import { ConfigImpl } from '../impl/config.impl';
import { Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import { EARLY_ACCESS_URL } from '../constants/token.constants';

export class EarlyAccessController {

  constructor(@Inject(EarlyAccessService) private readonly earlyAccessService: EarlyAccessService,
              private readonly configService: ConfigImpl) {

  }


  public async index(req: Request, res: Response) {

    let data = {
      showShareWithTwitter: !!this.configService.twitterHandle,
      isSubscribed: req.query.isSubscribed,
      template: this.configService.defaultTemplate,
    };

    return res.render(this.configService.index, data);
  }


  public async subscribe(request: Request, res: Response) {
    let subscribeDto: SubscribeDto = request.body;

    this.earlyAccessService.subscribe(subscribeDto.email, subscribeDto.name)
        .then(isSubscribed => {
          let url = `?isSubscribed=${isSubscribed}`;
          res.redirect(url);
        }).catch(error => {
      let url = `?isSubscribed=${false}`;
      res.redirect(url);
    });
  }

  public unSubscribe(req: Request, res: Response) {
    let email: string = req.param('email');
    this.earlyAccessService.unSubscribe(email).then(unSubscribe => {
      let url = `?unSubscribe=${unSubscribe}`;
      res.redirect(url);
    }).catch(error => {
      let url = `?unSubscribe=${false}`;
      res.redirect(url);
    });
  }


  public shareOnTwitter(request: Request, response: Response) {
    let twitterHandle = this.configService.twitterHandle;
    let url = EARLY_ACCESS_URL;
    if (twitterHandle) {
      let twitterShareMessage = this.configService.twitterShareMessage;
      url = twitterShareMessage ?? `@${twitterHandle}is coming soon. Request early access to be one of the first people to try it out ${url}`;
      let redirectURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(url)}&related=${twitterHandle}&handle=${twitterHandle}`;
      response.redirect(redirectURL);
      return;
    }

    response.redirect(url);

  }
}