import { Dropdown, Flag } from 'semantic-ui-react';

const languageOptions = [
  {
    key: 'en',
    text: 'English',
    value: 'en',
    image: () => <Flag name='uk' />,
  },
  {
    key: 'cn',
    text: 'Chinese',
    value: 'cn',
    image: () => <Flag name='china' />,
  },
  {
    key: 'tw',
    text: 'Chinese',
    value: 'tw',
    image: () => <Flag name='taiwan' />,
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