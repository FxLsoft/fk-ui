import { Button, Checkbox, Dropdown, Modal, Pagination, Select, Spin, Tooltip } from '@erp/common';
import Input from '../components/input';
import * as VxeTableExport from './components';
import { setComponent } from './core';

import './styles/all.scss';

export * from './components';
export default VxeTableExport;

setComponent('Loading', Spin);
setComponent('Tooltip', Tooltip);
setComponent('Pager', Pagination);
setComponent('Button', Button);
setComponent('Dropdown', Dropdown);
setComponent('Checkbox', Checkbox);
setComponent('Input', Input);
setComponent('Select', Select);
setComponent('Modal', Modal);
