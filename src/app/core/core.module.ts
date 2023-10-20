import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrService } from './toastr.service';

@NgModule({
  declarations: [],
  providers: [ToastrService],
  imports: [CommonModule, BrowserAnimationsModule],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}

export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    console.log('core check🚚🚗');
    throw new Error(
      `${moduleName} has already been loaded. Import core module in the AppModule only.`
    );
  }
}
