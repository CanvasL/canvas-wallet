import { Dropdown } from 'semantic-ui-react';
import en from '../../assets/languages/en.svg';
import cn from '../../assets/languages/cn.svg';
import tw from '../../assets/languages/tw.svg';

const languageOptions = [
  {
    key: 'en',
    text: 'English',
    value: 'en',
    image: { avatar: true, src: en },
  },
  {
    key: 'cn',
    text: 'Chinese',
    value: 'cn',
    image: { avatar: true, src: cn },
  },
  {
    key: 'tw',
    text: 'Chinese',
    value: 'tw',
    image: { avatar: true, src: tw },
  },
]

const LanguageSelector = () => (
  <span>
    <Dropdown
      inline
      options={languageOptions}
      defaultValue={languageOptions[0].value}
    />
  </span>
)
  
  export default LanguageSelector;