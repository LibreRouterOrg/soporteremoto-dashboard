import { configure, addDecorator, addParameters } from '@storybook/react';
import requireContext from 'require-context.macro';
import { addReadme } from 'storybook-readme';

import '../src/index.css';

const req = requireContext('../src/components', true, /\.stories\.js$/);

addParameters({
  options: {
    showPanel: true,
    panelPosition: 'right',
    // theme: themes.dark,
  },
  readme: {
    // You can set the global code theme here.
    codeTheme: 'github',
  },
});

addDecorator(addReadme);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);