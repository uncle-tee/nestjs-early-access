import {EarlyAccessService} from '../contracts/early-access-service.interface';
import {SubscribeDto} from '../dtos/subcribe.dto';
import {ConfigImpl} from '../impl/config.impl';
import {ViewCompilerImpl} from '../impl/view-compiler.impl';
import {Body, Controller, Delete, Get, Inject, Param, Post, Req, Res, Query} from '@nestjs/common';
import {Request, Response} from 'express';

@Controller('early-access')
export class EarlyAccessController {

    constructor(@Inject(EarlyAccessService) private readonly earlyAccessService: EarlyAccessService,
                private readonly configService: ConfigImpl) {

    }

    @Get()
    public async index(@Res() res: Response, @Req() req: Request) {

        let assetsDir = this.configService.viewTemplate()?.assetsDir ? this.configService.viewTemplate()?.assetsDir : `${__dirname}/../assets`;
        let viewsDir = this.configService.viewTemplate()?.viewDir ? `${this.configService.viewTemplate()?.viewDir}` : `${__dirname}/../views`;
        let data = {
            showShareWithTwitter: !!this.configService.getTwitterHandle(),
            isSubscribed: req.query.isSubscribed,
            assetsDir,
        };
        let indexPath = this.configService.viewTemplate()?.index ? `${viewsDir}/${this.configService.viewTemplate()?.index}` : `${viewsDir}/index.ejs`;

        let view = new ViewCompilerImpl().compileView(indexPath, data);
        return res.send(view);
    }

    @Post()
    public async subscribe(@Body() subscribeDto: SubscribeDto, @Req() request: Request, @Res() res: Response) {
        this.earlyAccessService.subscribe(subscribeDto.email, subscribeDto.name)
            .then(isSubscribed => {
                let url = `?isSubscribed=${isSubscribed}`;
                res.redirect(url);
            }).catch(error => {
            let url = `?isSubscribed=${false}`;
            res.redirect(url);
        });
    }

    @Delete('/:email')
    public unSubscribe(@Param('email') email: string, @Req() req: Request, @Res() res: Response) {
        this.earlyAccessService.unSubscribe(email).then(unSubscribe => {
            let url = `?unSubscribe=${unSubscribe}`;
            res.redirect(url);
        }).catch(error => {
            let url = `?unSubscribe=${false}`;
            res.redirect(url);
        });
    }

    @Get('/twitter-share')
    public shareOnTwitter(@Req() request: Request, @Res() response: Response) {
        let twitterHandle = this.configService.getTwitterHandle();
        let url = `early-acces`;
        if (twitterHandle) {
            let twitterShareMessage = this.configService.twitterShareMessage();
            url = twitterShareMessage ?? `@${twitterHandle}is coming soon. Request early access to be one of the first people to try it out ${url}`;
            let redirectURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(url)}&related=${twitterHandle}&handle=${twitterHandle}`;
            response.redirect(redirectURL);
            return;
        }

        response.redirect(url);

    }
}