import initStoryshots from '@storybook/addon-storyshots';
import Mockdate from 'mockdate';
import { mount } from 'enzyme';

Mockdate.set('2019-08-10');

initStoryshots({
    renderer: mount,
});