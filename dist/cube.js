var Cube =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class NormalizedData {
    constructor(data, options) {
        Object.assign(this, data);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = NormalizedData;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const ENTITY_ID = 'id';
/* harmony export (immutable) */ __webpack_exports__["a"] = ENTITY_ID;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__const_js__ = __webpack_require__(1);


class Member {
    constructor(id) {
        if (typeof id === "string") {
            debugger;
        }
        this[__WEBPACK_IMPORTED_MODULE_0__const_js__["a" /* ENTITY_ID */]] = id;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Member;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NormalizedData_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__NormalizedDataNotSaved_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__const_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Member_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__CreatedMember_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Schema_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Measurements_js__ = __webpack_require__(9);









class Cube {
    constructor(dataArray, measurementsSchema) {
        const schema = new __WEBPACK_IMPORTED_MODULE_6__Schema_js__["a" /* default */](measurementsSchema);
        Object.defineProperty(this, 'schema', { value: schema });
        Object.defineProperty(this, 'dataArray', { value: dataArray });
        this.normalizedDataArray = dataArray.map(data => new __WEBPACK_IMPORTED_MODULE_0__NormalizedData_js__["a" /* default */](data));
        this.measurements = this._getMembersGroupsByMeasurementsFromSchema(dataArray, this.schema.createIterator());
    }
    /**
     *
     * @public
     * */
    getDataArray(options = Object) {
        return this.getRawDataArray(options, true);
    }
    /**
     *
     * @public
     * */
    getRawDataArray(Constructor, forSave = false) {
        const list = [];

        this.normalizedDataArray.forEach(data => {
            const newEntity = Object.assign(new Constructor(), data);

            if (forSave && data instanceof __WEBPACK_IMPORTED_MODULE_1__NormalizedDataNotSaved_js__["a" /* default */]) {
                delete newEntity[__WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]];
            }

            const handleMeasurement = measurement => {
                const subEntityIdName = Cube.genericId(measurement.name);
                const subEntityId = data[subEntityIdName];
                const subEntity = this.measurements[measurement.name].find(item => {
                    return item[__WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]] === subEntityId;
                });
                const subEntityCopy = Object.assign({}, subEntity);
                delete subEntityCopy[__WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]];
                delete newEntity[subEntityIdName];
                Object.assign(newEntity, subEntityCopy);
            };

            const iterator = this.schema.createIterator();
            let next;
            while (!(next = iterator.next()) || !next.done) {
                handleMeasurement(next.value);
            }

            list.push(newEntity);
        });

        return list;
    }
    /**
     *
     * @public
     * */
    addColumn(name, options, cellOptions = {}) {
        const measurements = this.schema.getColumns();

        const columns = {};

        // остальные измерения этого уровня
        measurements.forEach(value => {
            if (value.name !== name) {
                if (!cellOptions[value.name]) {
                    columns[value.name] = this.measurements[value.name];
                }
            }
        });

        cellOptions = Object.assign({}, cellOptions, this._createMemberDependency(name, options));

        const reqursiveForEach = (cellOptions, columns, index, isDependency) => {
            const keys = Object.keys(columns);
            const measurementsLength = keys.length;

            if (index !== measurementsLength) {
                const mesurement = columns[keys[index]];

                mesurement.forEach(member => {
                    cellOptions[keys[index]] = member;
                    let dependency = this.schema.getByDependency(keys[index]);
                    if (dependency) {
                        const uniqueOptions = { [keys[index]]: member };
                        const unique = this.unique(dependency.name, uniqueOptions);
                        const columns = { [dependency.name]: unique };

                        reqursiveForEach(cellOptions, columns, 0, true);
                    }
                    reqursiveForEach(cellOptions, columns, index + 1, isDependency);

                    if (isDependency) {
                        return;
                    }

                    if (index + 1 === measurementsLength) {
                        // create cell
                        const measureName = this.schema.getMeasure().name;
                        const measure = this._createMember();
                        const options = Object.assign({}, cellOptions, { [measureName]: measure });
                        this._createNormalizeData(options);
                    }
                });
            }
        };

        reqursiveForEach(cellOptions, columns, 0);
    }
    /**
     *
     * @public
     * */
    unique(measurementName, dependency) {
        const members = this.measurements[measurementName];
        let data = this.normalizedDataArray;

        if (dependency) {
            Object.keys(dependency).forEach(key => {
                const measurement = key;
                const etalonEntity = dependency[key];
                data = data.filter(data => {
                    return data[Cube.genericId(measurement)] == etalonEntity[__WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]];
                });
            });
        }

        const measurementIdName = Cube.genericId(measurementName);
        const map = data.map(data => {
            return data[measurementIdName];
        });
        const uniq = __WEBPACK_IMPORTED_MODULE_2__js__["a" /* default */].uniq(map);
        const result = [];

        // фильтрация без потери порядка в массиве
        members.forEach(member => {
            if (uniq.indexOf(member[__WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]]) !== -1) {
                result.push(member);
            }
        });
        return result;
    }
    /**
     *
     * @public
     * */
    removeSubModelDepend(subModelName, subModel, dependencies) {
        // подчистить суб-модельку
        const index = this.measurements[subModelName].indexOf(subModel);
        if (index === -1) {
            debugger; // что то пошло не так
        }
        this.measurements[subModelName].splice(index, 1);

        // подчистить нормальную форму
        const filterData = this.normalizedDataArray.filter(data => {
            return data[Cube.genericId(subModelName)] == subModel[__WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]];
        });

        filterData.forEach(data => {
            const index = this.normalizedDataArray.indexOf(data);
            this.normalizedDataArray.splice(index, 1);

            dependencies.forEach(depName => {
                this._removeSubModel(data, depName);
            });
        });
        this._normalize();
    }
    /**
     *
     * @private
     * */
    _getMembersGroupsByMeasurementsFromSchema(dataArray, iterator) {
        const measurements = new __WEBPACK_IMPORTED_MODULE_7__Measurements_js__["a" /* default */]();

        const handleMeasurement = measurement => {
            const { name, dependency, keyProps, otherProps = [] } = measurement;
            let measure;
            if (dependency) {
                // определим подмножества для каждой зависимости
                let entitiesParts = [];

                if (Array.isArray(dependency)) {

                    const dismember = (dependencyName, data) => {
                        const dependencyMeasure = measurements[dependencyName];

                        // определим подмножества для каждой зависимости
                        let entitiesParts;
                        entitiesParts = dependencyMeasure.map(measure => {
                            // множество сущностей соответствующих измерению
                            const measureId = measure[__WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]];
                            const entitiesPart = data.filter(data => {
                                let isPart = true;
                                let idName = Cube.genericId(dependencyName);
                                isPart = data[idName] == measureId;
                                return isPart;
                            });
                            return entitiesPart;
                        });
                        return entitiesParts;
                    };

                    let parts = [this.normalizedDataArray];
                    dependency.forEach(dependencyName => {
                        let newParts = [];
                        parts.forEach(partData => {
                            const entitiesParts = dismember(dependencyName, partData);
                            entitiesParts.forEach(part => {
                                newParts.push(part);
                            });
                        });
                        parts = newParts;
                    });

                    entitiesParts = parts;
                } else {
                    const dependencyMeasure = measurements[dependency];

                    entitiesParts = dependencyMeasure.map(measure => {
                        // множество сущностей соответствующих измерению
                        const measureId = measure[__WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]];
                        const entitiesPart = this.normalizedDataArray.filter(data => {
                            let isPart = true;
                            let idName = Cube.genericId(dependency);
                            isPart = data[idName] == measureId;
                            return isPart;
                        });
                        return entitiesPart;
                    });
                }

                // для каждого подмножества определим свои меры
                let countId = 0;
                const measures = entitiesParts.map(entitiesPart => {
                    const measure = this._makeMeasureFrom(entitiesPart, keyProps, countId, name, otherProps);
                    countId = countId + measure.length;
                    return measure;
                });

                // затем меры объединяем, таким образум образуя срез
                let total = [];
                measures.forEach(measure => {
                    total = total.concat(measure);
                });
                const totalUniq = __WEBPACK_IMPORTED_MODULE_2__js__["a" /* default */].uniq(total, item => {
                    return item[__WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]];
                });

                measure = totalUniq;
            } else {
                measure = this._makeMeasureFrom(dataArray, keyProps, 0, name, otherProps);
            }
            measurements[name] = measure;
        };

        let next;
        while (!(next = iterator.next()) || !next.done) {
            handleMeasurement(next.value);
        }

        return measurements;
    }
    /**
     *
     * @private
     * */
    _makeMeasureFrom(dataArray, keyProps, startFrom = 0, measurement, otherProps) {
        // соотношение созданных id к ключам
        const cache = {};
        const DIVIDER = ',';
        const mesure = [];

        // создания групп по уникальным ключам
        dataArray.forEach(data => {

            // собрать ключ на основе ключевых значений
            const key = keyProps.map(prop => {
                return data[prop];
            }).join(DIVIDER);

            // полный список свойств подлежащих стриранию из натуральной формы и записи в подсущности
            const totalProps = [].concat(keyProps, otherProps);

            // если ключ уникальный создается подсущность и назначается ей присваивается уникальный id (уникальность достигается простым счетчиком)
            if (!(key in cache)) {
                const id = ++startFrom;
                cache[key] = id;

                // создать подсущность
                const member = new __WEBPACK_IMPORTED_MODULE_4__Member_js__["a" /* default */](id);

                // запись по ключевым параметрам
                totalProps.forEach(prop => {
                    // исключить идентификатор самой сущности
                    if (prop !== __WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]) {
                        member[prop] = data[prop];
                    }
                });

                mesure.push(member);
            }

            // удалаять данные из нормальной формы
            const entityClone = this.normalizedDataArray.find(entityClone => {
                return entityClone[__WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]] == data[__WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]] ? entityClone : false;
            });

            totalProps.forEach(prop => {
                if (prop !== __WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]) {
                    delete entityClone[prop];
                }
            });

            // оставить в нормальной форме ссылку на id под сущности
            const idName = Cube.genericId(measurement);
            entityClone[idName] = cache[key];
            return key;
        });

        return mesure;
    }
    /**
     *
     * @private
     * */
    _createNormalizeData(obj) {
        const options = {};
        Object.keys(obj).forEach(key => {
            options[Cube.genericId(key)] = obj[key][__WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]];
        });
        const newNormaliseData = new __WEBPACK_IMPORTED_MODULE_1__NormalizedDataNotSaved_js__["a" /* default */](options);
        this.normalizedDataArray.push(newNormaliseData);
    }
    /**
     *
     * @private
     * */
    _removeSubModel(normalizeData, name) {
        // подчистить суб-модельку
        const filtered = this.measurements[name].filter(rate => {
            return rate[__WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]] == normalizeData[Cube.genericId(name)];
        });

        // и подчистить суб-модельку
        filtered.forEach(data => {
            const index = this.measurements[name].indexOf(data);
            this.measurements[name].splice(index, 1);
        });
    }
    /**
     *
     * @private
     * */
    _createMember(name, options = {}) {
        const measurement = this.schema.getByName(name);
        const memberOptions = Object.assign({}, options, {
            id: Cube.reduceId(this.measurements[name])
        });
        measurement.keyProps.forEach(propName => {
            memberOptions[propName] = options[propName] || null;
        });

        const member = new __WEBPACK_IMPORTED_MODULE_5__CreatedMember_js__["a" /* default */](memberOptions);
        this.measurements[name].push(member);
        return member;
    }
    /**
     * Remove subentity, links to which none of the model does not remain
     * @private
     * */
    _normalize() {
        const names = this.schema.getNames();
        const report = [];
        names.forEach(name => {
            if (this.measurements[name].length) {
                const copy = [].concat(this.measurements[name]);
                // чтобы splice корректно отработал
                copy.forEach((member, index) => {
                    const idName = Cube.genericId(name);
                    const findLink = this.normalizedDataArray.find(data => {
                        return data[idName] == member[__WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]];
                    });
                    if (!findLink) {
                        this.measurements[name].splice(index - (copy.length - this.measurements[name].length), 1);
                        report.push(member);
                    }
                });
            }
        });
        if (report.length) {
            console.log('битые ссылки:', report);
        }
    }
    /**
     *
     * @private
     * */
    _createMemberDependency(name, options = {}) {
        const result = {};
        const reqursive = (name, options = {}) => {
            // create
            const member = this._createMember(name, options);
            result[name] = member;

            // check dep
            let dependency = this.schema.getByDependency(name);
            if (dependency) {
                reqursive(dependency.name);
            }
        };
        reqursive(name, options);
        return result;
    }
    /**
     * A way to create a name for a property in which a unique identifier will be stored
     * */
    static genericId(entityName) {
        return entityName + '_' + __WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */];
    }
    /**
     * Method of generating a unique identifier within the selected space
     * */
    static reduceId(array) {
        if (array.length) {
            return array.reduce((acc, curValue) => {
                return acc[__WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]] > curValue[__WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]] ? acc : curValue;
            }, 0).id + 1;
        } else {
            return 1;
        }
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Cube);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NormalizedData_js__ = __webpack_require__(0);


function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0,
            v = c == 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
}

class NormalizedDataNotSaved extends __WEBPACK_IMPORTED_MODULE_0__NormalizedData_js__["a" /* default */] {
    constructor(data, options) {
        super(data, options);
        if (!data.id) {
            this.id = uuidv4();
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = NormalizedDataNotSaved;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const _ = {};

_.uniq = function (items, fn) {
    const hash = {};
    const forEachFn = fn ? item => {
        hash[fn(item)] = item;
    } : item => {
        hash[item] = item;
    };
    items.forEach(forEachFn);
    return Object.keys(hash).map(key => hash[key]);
};

/* harmony default export */ __webpack_exports__["a"] = (_);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Member_js__ = __webpack_require__(2);


class CreatedMember extends __WEBPACK_IMPORTED_MODULE_0__Member_js__["a" /* default */] {
    constructor(options) {
        const { id } = options;
        super(id);
        Object.assign(this, options);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CreatedMember;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SchemaMeasurement_js__ = __webpack_require__(8);


class Schema {
    constructor(schema) {
        this.schema = schema.map(i => new __WEBPACK_IMPORTED_MODULE_0__SchemaMeasurement_js__["a" /* default */](i));
    }
    createIterator() {
        let i = 0;
        let schema = this.schema;

        return {
            next: () => {
                let done = i >= schema.length;
                let value = !done ? schema[i++] : void 0;
                return {
                    done,
                    value
                };
            }
        };
    }
    getByName(name) {
        return this.schema.find(schemaMeasurement => {
            return schemaMeasurement.name === name;
        });
    }
    getByDependency(name) {
        return this.schema.find(schemaMeasurement => {
            return schemaMeasurement.dependency === name;
        });
    }
    getNames() {
        return this.schema.map(schemaMeasurement => schemaMeasurement.name);
    }
    getMeasure() {
        return this.schema.find(schemaMeasurement => Array.isArray(schemaMeasurement.dependency));
    }
    getColumns() {
        return this.schema.filter(schemaMeasurement => {
            return !schemaMeasurement.dependency;
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Schema;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SchemaMeasurement {
    constructor({ name, keyProps, dependency = null, otherProps = null }) {
        if (!name || !keyProps || !keyProps.length) {
            throw Error("Bad measurement description at schema, params 'name' and 'keyProps' is required");
        }
        this.name = name;
        this.dependency = dependency;
        this.keyProps = keyProps;
        this.otherProps = otherProps;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SchemaMeasurement;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Measurements {}
/* harmony export (immutable) */ __webpack_exports__["a"] = Measurements;


/***/ })
/******/ ]);