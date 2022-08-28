import Car from './car'
import Model from './model'
import Brand from './brand'

type CarJoin = Omit<Car, 'modelId'> & {
    brand: Brand['title'],
    model: Model['title'],
}


export default CarJoin;
