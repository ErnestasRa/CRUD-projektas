type SelectOptions = {
    label: string,
    value: string,
};

type SelectFieldProps = {
    label: string,
    options: SelectOptions[],
    onChange: (value: string) => void,
};

class SelectField {
    private static count: number = 0;

    private readonly id: string;

    private props: SelectFieldProps;

    public HtmlElement: HTMLDivElement;

    constructor(props: SelectFieldProps) {
        SelectField.count += 1;
        this.id = `SelectField- ${SelectField.count}`;
        this.props = props;
        this.HtmlElement = document.createElement('div');

        this.initialize();
    }

    private initialize = ():void => {
       const { label, options, onChange } = this.props;

        const labelHTMLString = document.createElement('label');
        labelHTMLString.innerHTML = `${label}:`;
        labelHTMLString.className = 'mb-1';
        labelHTMLString.setAttribute('for', this.id);

        const optionHTMLString = options
        .map((option) => `<option value="${option.value}">${option.label}</option>`)
        .join('');

        const selectHTMLElement = document.createElement('select');
        selectHTMLElement.className = 'form-select';
        selectHTMLElement.id = this.id;
        selectHTMLElement.innerHTML = optionHTMLString;
        selectHTMLElement.addEventListener('change', () => onChange(selectHTMLElement.value));

        this.HtmlElement.className = 'mb-3';
        this.HtmlElement.append(
            labelHTMLString,
            selectHTMLElement,
        );
    };
}

export default SelectField;
