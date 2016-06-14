import {Component, PostConstruct, Bean, Autowired, Context} from "ag-grid/main";
import {ColumnSelectPanel} from "./columnsSelect/columnSelectPanel";
import {RowGroupColumnsPanel} from "./columnDrop/rowGroupColumnsPanel";
import {PivotColumnsPanel} from "./columnDrop/pivotColumnsPanel";
import {PivotModePanel} from "./columnDrop/pivotModePanel";
import {ValuesColumnPanel} from "./columnDrop/valueColumnsPanel";

@Bean('toolPanel')
export class ToolPanelComp extends Component {

    private static TEMPLATE = '<div class="ag-tool-panel"></div>';

    @Autowired('context') private context: Context;

    private columnSelectPanel: ColumnSelectPanel;

    constructor() {
        super(ToolPanelComp.TEMPLATE);
    }

    @PostConstruct
    public init(): void {

        this.columnSelectPanel = new ColumnSelectPanel(true);
        this.context.wireBean(this.columnSelectPanel);

        var reducePanel = new PivotModePanel();
        this.context.wireBean(reducePanel);

        var rowGroupColumnsPanel = new RowGroupColumnsPanel(false);
        var pivotColumnsPanel = new PivotColumnsPanel(false);
        var valueColumnsPanel = new ValuesColumnPanel(false);

        this.context.wireBean(rowGroupColumnsPanel);
        this.context.wireBean(pivotColumnsPanel);
        this.context.wireBean(valueColumnsPanel);

        // reducePanel.add

        this.getGui().appendChild(reducePanel.getGui());
        this.getGui().appendChild(this.columnSelectPanel.getGui());
        this.getGui().appendChild(valueColumnsPanel.getGui());
        this.getGui().appendChild(rowGroupColumnsPanel.getGui());
        this.getGui().appendChild(pivotColumnsPanel.getGui());

        this.addDestroyFunc( ()=> {
            reducePanel.destroy();
            rowGroupColumnsPanel.destroy();
            pivotColumnsPanel.destroy();
            valueColumnsPanel.destroy();
        });
    }

    private addInWrapper(eElement: HTMLElement, height: string): void {
        var eDiv = document.createElement('div');
        eDiv.style.height = height;
        eDiv.appendChild(eElement);
        this.getGui().appendChild(eDiv);
    }
}