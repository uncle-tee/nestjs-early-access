import { ViewCompilerService } from '../contracts/view-compiler.service';
import * as fs from 'fs';
import * as ejs from 'ejs';

export class ViewCompilerImpl implements ViewCompilerService {


  compileView(viewPath: string, data?: any, status = 200) {
    return ejs.render(fs.readFileSync(viewPath, 'utf8'), data);
  }

}