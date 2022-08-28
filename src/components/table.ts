export type TableProps<Type extends string[]> = {
    title:string;
    columns: Type;
    rowsData: Type[];
    onDelete: (id: string) => void;

};

class Table<Type extends string[]> {
    private static checkColumnsCompatability<Type extends string[]>(
        columns: Type,
        rowsData: Type[],
      ): boolean {
        return rowsData.every((rowData) => rowData.length === columns.length);
      }

    public htmlElement: HTMLTableElement;

    private props: TableProps<Type>;

    private tbody: HTMLTableSectionElement;

    private thead: HTMLTableSectionElement;

    constructor(props:TableProps<Type>) {
        const columnsIsCompatible = Table.checkColumnsCompatability(props.columns, props.rowsData);
        if (!columnsIsCompatible) {
            throw new Error('neatitinka eiluciu skaiciu su stulpeliu skaiciais!!!');
        }

        this.props = props;
        this.htmlElement = document.createElement('table');
        this.tbody = document.createElement('tbody');
        this.thead = document.createElement('thead');

        this.initialize();
        this.renderView();
    }

    private initialize() {
        this.htmlElement.className = 'table table-striped order border p-3';
        this.htmlElement.append(
            this.thead,
            this.tbody,

        );
    }

    private renderHeadView() {
        this.thead.className = 'table-dark';

        const columnsHTMLString = this.props.columns
        .map((column) => `<th>${column}</th>`)
        .join('');

        this.thead.innerHTML = `<tr>${columnsHTMLString}</tr>`;
    }

    private renderBodyView() {
        const rowsDataHtmlString = this.props.rowsData
        .map((rowData) => {
            const rowHTMLString = rowData
            .map((data) => `<td>${data}</td>`)
            .join('');

            return `<tr>${rowHTMLString}</tr>`;
        })
        .join('');

        this.tbody.innerHTML = `${rowsDataHtmlString}`;
    }

    private renderView = (): void => {
        this.renderHeadView();
        this.renderBodyView();
    };

    private deleteAction = (rowElement: HTMLTableRowElement, id: string): void => {
        const { onDelete } = this.props;

        const buttonProp = document.createElement('td');

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger';
        deleteButton.innerHTML = 'Delete';
        deleteButton.addEventListener('click', () => onDelete(id));
        deleteButton.style.width = '80px';

        buttonProp.append(deleteButton);
        rowElement.append(buttonProp);
    };

    public updateProps = (newProps: Partial<TableProps<Type>>): void => {
        this.props = {
            ...this.props,
            ...newProps,
        };
        this.renderView();
    };
}

export default Table;
