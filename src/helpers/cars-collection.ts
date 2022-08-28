import Car from '../types/car';
import Model from '../types/model';
import Brand from '../types/brand';
import CarJoin from '../types/car-joined';

type CarsCollectionProps = {
  cars: Car[],
  brands: Brand[],
  models: Model[],
};

class CarsCollection {
  private props: CarsCollectionProps;

  constructor(props: CarsCollectionProps) {
    this.props = props;
  }

  private joinCar = ({ modelId, ...car }: Car) => {
    const { brands, models } = this.props;
    const carModel = models.find((model) => model.id === modelId);
    const carBrand = brands.find((brand) => brand.id === carModel?.brandId);

    return {
      ...car,
      brand: (carBrand && carBrand.title) ?? 'unknown',
      model: (carModel && carModel.title) ?? 'unknown',
    };
  };

  public get all(): CarJoin[] {
    return this.props.cars.map(this.joinCar);
  }

  public getByBrandId = (brandId: string): CarJoin[] => {
    const brandIds = this.props.models
    .filter((carModel) => carModel.brandId === brandId)
    .map((carModel) => carModel.id);

    const joinedBrands = this.props.cars
    .filter((brand) => brandIds.includes(brand.modelId))
    .map(this.joinCar);

    return joinedBrands;
  };
}

export default CarsCollection;
