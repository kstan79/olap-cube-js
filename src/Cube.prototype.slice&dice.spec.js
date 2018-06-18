import Cube from './Cube.js'
import {isEqualObjects} from '../spec/helpers/helpers.js'

describe('methods slice and dice must work', () => {
	let facts;
	let dimensionHierarchies;
	let cube;
	let debug;
	beforeEach(() => {
		facts = [
			{ id: 1, x: 1, xx: 1.1, y: 1 },
			{ id: 1, x: 2, xx: 2.3, y: 2 },
			{ id: 1, x: 3, xx: 3.5, y: 3 },
		];
		dimensionHierarchies = [
			{
				dimensionTable: {
					dimension: 'xx',
					keyProps: ['xx'],
				},
				dependency: [
					{
						dimensionTable: {
							dimension: 'x',
							keyProps: ['x'],
						},
					}
				]
			},
			{
				dimensionTable: {
					dimension: 'y',
					keyProps: ['y'],
				},
			}
		];
		cube = Cube.create(facts, dimensionHierarchies)
	});
	it('should define slice', () => {
		expect(Cube.prototype.slice).toBeDefined();
	});
	it('should define dice', () => {
		expect(Cube.prototype.dice).toBeDefined();
	});
	const yMember = { id: 1, y: 1 };
	const xMember = { id: 1, x: 1 };
	it('slice must return instance of Cube', () => {
		const subCube = cube.slice('y', yMember);
		expect(subCube instanceof Cube).toBe(true)
	});
	it('dice must return instance of Cube', () => {
		const subCube = cube.dice({ y: yMember, x: xMember });
		expect(subCube instanceof Cube).toBe(true)
	});
	it('slice target dimensionTable must contain one member as passed in arguments', () => {
		const subCube = cube.slice('y', yMember);
		expect(subCube instanceof Cube).toBe(true);
		isEqualObjects(subCube.getDimensionMembers('y'), [yMember])
	});
	it('dice target dimensionTable must contain all members as passed in arguments', () => {
		const subCube = cube.dice({ y: yMember, x: xMember });
		expect(subCube instanceof Cube).toBe(true);
		isEqualObjects(subCube.getDimensionMembers('y'), [yMember]);
		isEqualObjects(subCube.getDimensionMembers('x'), [xMember]);
	});
});
