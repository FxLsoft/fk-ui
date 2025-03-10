import type { ComputedRef, WritableComputedRef } from 'vue';
import type { VxeGlobalRendererHandles } from '../ui';
import type { VxeTableDefines } from '../components/table';

export interface TableHandleExport {
	useCellView<D = any, P = Record<string, any>>(props: {
		renderOpts: VxeGlobalRendererHandles.RenderTableCellOptions | VxeGlobalRendererHandles.RenderTableEditOptions;
		renderParams: VxeGlobalRendererHandles.RenderTableCellParams | VxeGlobalRendererHandles.RenderTableEditParams;
	}): {
		currColumn: ComputedRef<VxeTableDefines.ColumnInfo<D>>;
		currRow: ComputedRef<D>;
		cellModel: WritableComputedRef<any>;
		cellOptions: ComputedRef<P>;
	};
}
