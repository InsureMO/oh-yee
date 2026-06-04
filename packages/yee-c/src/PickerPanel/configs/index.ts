// @ts-ignore
import EnglishPanel from './English';
// @ts-ignore
import ChinesePanel from './Chinese';
// @ts-ignore
import JapanesePanel from './Japanese';
// @ts-ignore
import TaiwanPanel from './Taiwan';

let obj = EnglishPanel;

const r18n = {
  currentLanguage: 'en',
};

if (r18n.currentLanguage === 'zh') {
  obj = ChinesePanel;
} else if (r18n.currentLanguage === 'jp') {
  obj = JapanesePanel;
} else if (r18n.currentLanguage === 'zh_tw') {
  obj = TaiwanPanel;
}

export default obj;
