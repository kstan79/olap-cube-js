import Tuple from './Tuple.js'

export default class TupleTable extends Array {
	constructor(array) {
		super();
		if (Array.isArray(array)) {
			Object.assign(this, array.map(item => new Tuple(item)))
		}
	}
	addTuple(data) {
		this.push(new Tuple(data))
	}
	forEach() {
		return super.forEach.apply(this, arguments)
	}
}
