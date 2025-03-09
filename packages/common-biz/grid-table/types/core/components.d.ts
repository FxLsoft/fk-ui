import type { Button, Checkbox, Drawer, Dropdown, Form, Modal, Pager, RadioGroup, Select, Spin, Tooltip } from '@erp/common';
import type { Input } from '../../../components';
/**
 * TODO
 * 替换里面的组件
 */
export interface VxeGlobalComponents {
	Form: typeof Form;
	Pager: typeof Pager;
	Loading: typeof Spin;
	Tooltip: typeof Tooltip;
	Button: typeof Button;
	Dropdown: typeof Dropdown;
	Checkbox: typeof Checkbox;
	Modal: typeof Modal;
	Select: typeof Select;
	Input: typeof Input;
	Drawer: typeof Drawer;
	RadioGroup: typeof RadioGroup;
}

export type VxeGlobalComponentMethod = (comp: any) => void;
export type VxeGlobalGetComponentMethod = <T extends keyof VxeGlobalComponents>(name: T) => VxeGlobalComponents[T];
