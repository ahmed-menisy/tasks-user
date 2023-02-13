import { Direction, Directionality } from '@angular/cdk/bidi';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public translate: TranslateService) {}
  direction: Direction = 'ltr';
  lang: string = 'en';

  ngOnInit(): void {
    const _lang = localStorage.getItem('_lang');
    if (_lang === 'en' || _lang === 'ar') {
      this.lang = _lang;
      this.setLanguage(_lang);
    }
  }

  setLanguage(lang: string): void {
    let language: string = 'en';
    this.translate.use(lang);

    lang === 'en'
      ? ((this.direction = 'ltr'), (language = 'en'))
      : ((this.direction = 'rtl'), (language = 'ar'));

    document.documentElement.dir = this.direction;
    document.documentElement.lang = language;

    localStorage.setItem('_lang', lang);
  }
}
