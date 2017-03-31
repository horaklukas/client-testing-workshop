import {lang} from './config';
import cs from "./texts/symbolizer-texts-cs";
import en from "./texts/symbolizer-texts-en";

const texts = { cs, en };

export default (text) => texts[lang] && texts[lang][text] || text;