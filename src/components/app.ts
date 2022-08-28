import CarsCollection from '../helpers/cars-collection';
import cars from '../data/cars';
import models from '../data/models';
import brands from '../data/brands';
import Table from './table';
import CarJoin from '../types/car-joined';
import stringifyObject from '../helpers/stringify-object';
import SelectField from './select-field';

type CarTableRow = [string, string, string, string, string];

const formatCarTableRow = (car: CarJoin): CarTableRow => {
  const {
    id,
    brand,
    model,
    price,
    year,
  } = stringifyObject(car);
  return [
    id,
    brand,
    model,
    price,
    year,
  ];
};
const ALL_CATEGORIES_ID = '-1';
const ALL_CARS_TITLES = 'All cars:';

class App {
  private htmlElement: HTMLElement;

  private carsCollection: CarsCollection;

  private carsTable: Table<CarTableRow>;

  private selectedBrandId: string;

  constructor(selector: string) {
    const foundElement = document.querySelector<HTMLElement>(selector);

    if (foundElement === null) throw new Error(`Nerastas elementas su selektoriumi '${selector}'`);

    this.carsCollection = new CarsCollection({ cars, brands, models });
    this.htmlElement = foundElement;

    this.carsTable = new Table({
      title: ALL_CARS_TITLES,
      columns: ['ID', 'Marke', 'Modelis', 'Kaina', 'Metai'],
      rowsData: this.carsCollection.all.map(formatCarTableRow),
      onDelete: this.delete,
    });
      this.selectedBrandId = ALL_CATEGORIES_ID;
    }

    private handleBrandChange = (brandId: string) => {
      this.selectedBrandId = brandId;

      this.update();
    };

    private delete = (carId: string): void => {
      this.selectedBrandId = carId;

      this.update();
    };

    private update = (): void => {
      if (this.selectedBrandId === ALL_CATEGORIES_ID) {
        this.carsTable.updateProps({
          title: ALL_CARS_TITLES,
          rowsData: this.carsCollection.all.map(formatCarTableRow),
        });
      } else {
        const brandTitle = brands
        .find((brand) => brand.id === this.selectedBrandId)?.title ?? 'No Brand';

        this.carsTable.updateProps({
          title: brandTitle,
          rowsData: this.carsCollection.getByBrandId(this.selectedBrandId)
          .map(formatCarTableRow),
        });
      }
    };

    public initialize() {
      const brandSelect = new SelectField({
        label: 'Brands',
        options: [
          { label: ALL_CARS_TITLES, value: ALL_CATEGORIES_ID },
          ...brands.map((brand) => ({
            label: brand.title,
            value: brand.id,
          })),
        ],
        onChange: this.handleBrandChange,
      });

      const container = document.createElement('div');
      container.className = 'container mt-8';
      container.append(
        brandSelect.HtmlElement,
        this.carsTable.htmlElement,
        );

      this.htmlElement.append(container);
    }
    }

export default App;
